import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from '@/dto/users.dto';
import { ApiKeyGuard } from '@/guard/api-key.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @UseGuards(ApiKeyGuard)
  @Post()
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
