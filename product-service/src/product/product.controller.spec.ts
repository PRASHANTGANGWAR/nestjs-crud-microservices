import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { AddProductDto, UpdateStockDto } from '@/dto/product.dto';
import { HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { ApiKeyGuard } from '@/guard/api-key.guard';
import { Product } from '@/models/products';

describe('ProductController', () => {
    let controller: ProductController;
    let productService: jest.Mocked<ProductService>;

    const mockProduct = {
        id: 1,
        name: 'Test Product',
        description: 'Test Description',
        price: 99.99,
        stockQuantity: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
    };

    const mockProductResponse = {
        data: [mockProduct],
        count: 1,
    };

    const mockEmptyResponse = {
        data: [],
        count: 0,
    };

    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    beforeEach(async () => {
        const mockProductService = {
            create: jest.fn(),
            findAll: jest.fn(),
            updateById: jest.fn(),
            deleteById: jest.fn(),
        };

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                {
                    provide: ProductService,
                    useValue: mockProductService,
                },
            ],
        })
            .overrideGuard(ApiKeyGuard)
            .useValue({ canActivate: () => true })
            .compile();

        controller = module.get<ProductController>(ProductController);
        productService = module.get(ProductService) as jest.Mocked<ProductService>;
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('addProduct', () => {
        it('should successfully add a product', async () => {
            const addProductDto: AddProductDto = {
                name: 'New Product',
                description: 'New Description',
                price: 199.99,
                stockQuantity: 50
            };

            productService.create.mockResolvedValue(mockProduct);

            const result = await controller.addProduct(addProductDto);

            expect(result).toEqual({
                status: HttpStatus.CREATED,
                message: 'Product added successfully',
                data: mockProduct,
            });
            expect(productService.create).toHaveBeenCalledWith(addProductDto);
        });

        it('should throw HttpException when validation fails', async () => {
            const invalidProductDto = {
                name: '',
                price: -10,
                stockQuantity: 50
            };

            productService.create.mockRejectedValue(
                new HttpException(
                    {
                        status: HttpStatus.BAD_REQUEST,
                        error: 'Validation Failed',
                        message: 'Invalid product data',
                    },
                    HttpStatus.BAD_REQUEST,
                ),
            );

            await expect(controller.addProduct(invalidProductDto as AddProductDto))
                .rejects.toThrow(HttpException);
        });

        it('should handle service errors', async () => {
            const validProductDto: AddProductDto = {
                name: 'Valid Product',
                price: 100,
                stockQuantity: 50
            };

            productService.create.mockRejectedValue(new Error('Database error'));

            await expect(controller.addProduct(validProductDto))
                .rejects.toThrow(HttpException);
        });
    });

    describe('getProduct', () => {
        it('should return array of products with count', async () => {
            productService.findAll.mockResolvedValue(mockProductResponse);

            const result = await controller.getPoduct();

            expect(result).toEqual({
                success: true,
                message: 'Product fetched successfully',
                data: mockProductResponse.data,
                count: mockProductResponse.count,
            });
            expect(productService.findAll).toHaveBeenCalled();
        });

        it('should throw NotFoundException when no products exist', async () => {
            productService.findAll.mockResolvedValue(mockEmptyResponse);

            await expect(controller.getPoduct()).rejects.toThrow(NotFoundException);
        });

        it('should throw error when service fails', async () => {
            productService.findAll.mockRejectedValue(new Error('Database error'));

            await expect(controller.getPoduct()).rejects.toThrow(Error);
        });
    });

    describe('updateStock', () => {
        const updateStockDto: UpdateStockDto = {
            stockQuantity: 150,
        };

        it('should update product stock successfully', async () => {
            const updatedProduct = { ...mockProduct, stockQuantity: updateStockDto.stockQuantity };
            productService.updateById.mockResolvedValue(updatedProduct);

            const result = await controller.updateUserById(1, updateStockDto);

            expect(result).toEqual({
                success: true,
                message: 'Product Stock updated successfully',
                data: updatedProduct,
            });
            expect(productService.updateById).toHaveBeenCalledWith(1, updateStockDto);
        });

        it('should throw NotFoundException when product not found', async () => {
            productService.updateById.mockResolvedValue(null as unknown as Product);

            await expect(controller.updateUserById(999, updateStockDto))
                .rejects.toThrow(NotFoundException);
        });

        it('should throw error for invalid stock quantity', async () => {
            const invalidStockDto = {
                stockQuantity: -5,
            };

            await expect(controller.updateUserById(1, invalidStockDto as UpdateStockDto))
                .rejects.toThrow();
        });
    });

    describe('deleteProductById', () => {
        it('should delete product successfully', async () => {
            productService.deleteById.mockResolvedValue(mockProduct);

            const result = await controller.deleteProductById(1);

            expect(result).toEqual({
                success: true,
                message: 'Product deleted successfully',
                data: mockProduct,
            });
            expect(productService.deleteById).toHaveBeenCalledWith(1);
        });

        it('should throw NotFoundException when product not found', async () => {
            productService.deleteById.mockResolvedValue(null as unknown as Product);

            await expect(controller.deleteProductById(999))
                .rejects.toThrow(NotFoundException);
        });

        it('should propagate service errors', async () => {
            productService.deleteById.mockRejectedValue(new Error('Database error'));

            await expect(controller.deleteProductById(1))
                .rejects.toThrow(Error);
        });
    });
});