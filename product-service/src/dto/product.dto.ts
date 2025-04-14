import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class AddProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @Type(() => Number)
    @IsNumber({ maxDecimalPlaces: 2 })
    @Min(0)
    price: number;

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    stockQuantity: number;
}


export class UpdateStockDto {
    @Type(() => Number)
    @IsNumber()
    @Min(0, { message: 'Stock quantity must be zero or a positive number' })
    stockQuantity: number;
}
