import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiBearerAuth, ApiHeader } from '@nestjs/swagger';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@/dto/users.dto';
import { ApiKeyGuard } from '@/guard/api-key.guard';

// @ApiBearerAuth()
@ApiTags('users')
@ApiHeader({
  name: 'X-API-KEY',
  description: 'API Key for internal service communication'
})
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @UseGuards(ApiKeyGuard)
  @Post()
  @ApiOperation({ summary: 'Create a new user (Internal)' })
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
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        data: {
          id: 1,
          firstName: 'Monica',
          lastName: 'Geller',
          email: 'monica@gmail.com',
          phoneNumber: '9999999999'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Validation Failed'
  })
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const user = await this.userService.create(createUserDto);
      return {
        status: HttpStatus.CREATED,
        message: 'User created successfully',
        data: user,
      };
    } catch (error) {
      console.error('Error creating user:', error.message || error);
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Validation Failed',
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UseGuards(ApiKeyGuard)
  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID (Internal)' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User found and returned',
    schema: {
      example: {
        success: true,
        message: 'User fetched successfully',
        data: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phoneNumber: '1234567890'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return {
        success: true,
        message: 'User fetched successfully',
        data: user,
      };
    } catch (error) {
      console.error('Error getting user:', error.message || error);
      throw error;
    }
  }

  @UseGuards(ApiKeyGuard)
  @Patch(':id')
  @ApiOperation({ summary: 'Update user by ID (Internal)' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User updated successfully',
    schema: {
      example: {
        success: true,
        message: 'User updated successfully',
        data: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phoneNumber: '1234567890'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const user = await this.userService.updateById(id, updateUserDto);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return {
        success: true,
        message: 'User updated successfully',
        data: user,
      };
    } catch (error) {
      console.error('Error getting user:', error.message || error);
      throw error;
    }
  }

  @UseGuards(ApiKeyGuard)
  @Delete(':id')
  @ApiOperation({ summary: 'Delete user by ID (Internal)' })
  @ApiParam({ name: 'id', type: Number, description: 'User ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User deleted successfully',
    schema: {
      example: {
        success: true,
        message: 'User deleted successfully',
        data: {
          id: 1,
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
          phoneNumber: '1234567890'
        }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User not found'
  })
  async deleteUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.deleteById(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }

      return {
        success: true,
        message: 'User deleted successfully',
        data: user,
      };
    } catch (error) {
      console.error('Error getting user:', error.message || error);
      throw error;
    }
  }
}