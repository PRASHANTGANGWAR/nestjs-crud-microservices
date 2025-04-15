import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@/dto/user.dto';

// @ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) { }

  @Post()
  @ApiOperation({ summary: 'Create a new user' })
  @ApiBody({
    type: CreateUserDto,
    examples: {
      example1: {
        summary: 'Example user creation payload',
        value: {
          firstName: 'Monica',
          lastName: 'Geller',
          email: 'monica@gmail.com',
          phoneNumber: '9999999999'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User created successfully',
    schema: {
      example: {
        firstName: 'Monica',
        lastName: 'Geller',
        email: 'monica@gmail.com',
        phoneNumber: '9999999999'
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data'
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'User Service URL is not configured'
  })
  async createUser(@Body() createUserDto: CreateUserDto) {
    const userServiceUrl = this.configService.get<string>('api_gateway.user_service_url');
    if (!userServiceUrl) {
      throw new HttpException('User Service URL is not configured.', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    return this.userService.post(userServiceUrl, createUserDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found and returned'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  async getUser(@Param('id') id: string) {
    const url = `${this.configService.get('api_gateway.user_service_url')}/${id}`;
    return this.userService.get(url);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid input data'
  })
  async updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const url = `${this.configService.get('api_gateway.user_service_url')}/${id}`;
    return this.userService.patch(url, updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID' })
  @ApiParam({ name: 'id', type: String, description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully'
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  async deleteUser(@Param('id') id: string) {
    const url = `${this.configService.get('api_gateway.user_service_url')}/${id}`;
    return this.userService.delete(url);
  }
}