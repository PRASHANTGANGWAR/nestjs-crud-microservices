import { Body, Controller, Delete, Get, HttpException, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';

import { ProductService } from './product.service';
import { AddProductDto, UpdateStockDto } from '@/dto/product.dto';
import { ApiKeyGuard } from '@/guard/api-key.guard';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @UseGuards(ApiKeyGuard)
    @Post()
    async addProduct(@Body() addProductDto: AddProductDto) {
        try {
            const user = await this.productService.create(addProductDto);
            return {
                status: HttpStatus.CREATED,
                message: 'Product added successfully',
                data: user,
            };
        } catch (error) {
            console.error('Error adding product:', error.message || error);
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
    @Get()
    async getPoduct() {
        try {
            const { data, count } = await this.productService.findAll();
            if (count === 0) {
                throw new NotFoundException("No products found");
            }
            return {
                success: true,
                message: 'Product fetched successfully',
                data,
                count
            };
        } catch (error) {
            console.error('Error getting products:', error.message || error);
            throw error;
        }
    }

    @UseGuards(ApiKeyGuard)
    @Patch(':id/stock')
    async updateUserById(@Param('id', ParseIntPipe) id: number, @Body() updateStockDto: UpdateStockDto) {
        try {
            const user = await this.productService.updateById(id, updateStockDto);
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            return {
                success: true,
                message: 'Product Stock updated successfully',
                data: user,
            };
        } catch (error) {
            console.error('Error updating product stock:', error.message || error);
            throw error;
        }
    }

    @UseGuards(ApiKeyGuard)
    @Delete(':id')
    async deleteProductById(@Param('id', ParseIntPipe) id: number) {
        try {
            const user = await this.productService.deleteById(id);
            if (!user) {
                throw new NotFoundException(`Product with ID ${id} not found`);
            }

            return {
                success: true,
                message: 'Product deleted successfully',
                data: user,
            };
        } catch (error) {
            console.error('Error deleting product:', error.message || error);
            throw error;
        }
    }
}
