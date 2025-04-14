import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@models/products';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>
    ) { }

    async create(productData: Partial<Product>): Promise<Product> {
        const product = this.productRepository.create(productData);
        return this.productRepository.save(product);
    }

    async findAll(): Promise<{ data: Product[]; count: number }> {
        const [data, count] = await this.productRepository.findAndCount();
        return { count, data };
    }

    async updateById(id: number, updateProductDto: Partial<Product>): Promise<Product> {
        await this.productRepository.update(id, updateProductDto);

        const updatedProduct = await this.productRepository.findOneBy({ id });
        if (!updatedProduct) {
            throw new NotFoundException(`Product with id ${id} not found`);
        }

        return updatedProduct;
    }

    async deleteById(id: number): Promise<Product> {
        const product = await this.productRepository.findOneBy({ id });

        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        await this.productRepository.delete(id);

        return product;
    }
}
