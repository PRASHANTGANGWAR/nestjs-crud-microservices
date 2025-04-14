import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) { }

  private getHeaders(): Record<string, string> {
    const apiKey = this.configService.get<string>('api_gateway.internal_api_key');
    if (!apiKey) {
      throw new HttpException('Internal API key not configured', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return { 'x-api-key': apiKey };
  }

  async post<Req, Res>(url: string, data: Req): Promise<Res> {
    return this.request<Res>('post', url, data);
  }

  async get<Res>(url: string): Promise<Res> {
    return this.request<Res>('get', url);
  }

  async patch<Req, Res>(url: string, data: Req): Promise<Res> {
    return this.request<Res>('patch', url, data);
  }

  async delete<Res>(url: string): Promise<Res> {
    return this.request<Res>('delete', url);
  }

  private async request<T>(
    method: 'get' | 'post' | 'patch' | 'delete',
    url: string,
    data?: unknown
  ): Promise<T> {
    try {
      const headers = this.getHeaders();
      const config = { headers };

      const request$ =
        method === 'get'
          ? this.httpService.get<T>(url, config)
          : method === 'delete'
            ? this.httpService.delete<T>(url, config)
            : this.httpService[method]<T>(url, data, config);

      const response = await firstValueFrom(request$);
      return response.data;
    } catch (error) {
      console.error(`Error forwarding ${method.toUpperCase()} request:`, error.response?.data || error.message);

      if (error.response?.data?.statusCode === 400) {
        throw new HttpException({
          statusCode: error.response.data.statusCode,
          message: error.response.data.message,
          errors: error.response.data.errors,
        }, HttpStatus.BAD_REQUEST);
      }

      throw new HttpException(
        error.response?.data?.message || 'Internal server error',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
