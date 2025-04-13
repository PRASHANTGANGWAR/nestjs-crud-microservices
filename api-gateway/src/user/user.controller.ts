import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) { }

  @Post()
  async createUser(@Body() createUserDto: any) {
    const userServiceUrl = this.configService.get<string>('api_gateway.user_service_url');
    if (!userServiceUrl) {
      throw new HttpException('User Service URL is not configured.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.userService.post(userServiceUrl, createUserDto);
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    const url = `${this.configService.get('api_gateway.user_service_url')}/${id}`;
    return this.userService.get(url);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUserDto: any) {
    const url = `${this.configService.get('api_gateway.user_service_url')}/${id}`;
    return this.userService.patch(url, updateUserDto);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    const url = `${this.configService.get('api_gateway.user_service_url')}/${id}`;
    return this.userService.delete(url);
  }
}
