import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';
import { AddProductDto, UpdateStockDto } from '@/dto/product.dto';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly configService: ConfigService,
  ) { }

  @Post()
  async addProduct(@Body() addProductDto: AddProductDto) {
    const productServiceUrl = this.configService.get<string>('api_gateway.product_service_url');
    if (!productServiceUrl) {
      throw new HttpException('Product Service URL is not configured.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.productService.post(productServiceUrl, addProductDto);
  }

  @Get()
  async getProduct() {
    const productServiceUrl = this.configService.get<string>('api_gateway.product_service_url');
    if (!productServiceUrl) {
      throw new HttpException('Product Service URL is not configured.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.productService.get(productServiceUrl);
  }

  @Patch(':id/stock')
  async updateStock(@Param('id') id: string, @Body() updateStockDto: UpdateStockDto) {
    const baseUrl = this.configService.get<string>('api_gateway.product_service_url');
    if (!baseUrl) {
      throw new HttpException('Product Service URL is not configured.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const url = `${baseUrl}/${id}/stock`;
    return this.productService.patch(url, updateStockDto);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    const baseUrl = this.configService.get<string>('api_gateway.product_service_url');
    if (!baseUrl) {
      throw new HttpException('Product Service URL is not configured.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    const url = `${baseUrl}/${id}`;
    return this.productService.delete(url);
  }
}
