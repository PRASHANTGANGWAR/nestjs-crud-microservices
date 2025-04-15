import { IsEmail, Matches, IsString, Length, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({
        description: 'First name of the user',
        example: 'John',
        minLength: 1,
        maxLength: 40
    })
    @IsString()
    @Length(1, 40)
    firstName: string;

    @ApiProperty({
        description: 'Last name of the user',
        example: 'Doe',
        minLength: 1,
        maxLength: 40
    })
    @IsString()
    @Length(1, 40)
    lastName: string;

    @ApiProperty({
        description: 'Email address of the user',
        example: 'john.doe@example.com'
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Phone number (10 digits)',
        example: '1234567890',
        pattern: '^\\d{10}$'
    })
    @IsString()
    @Matches(/^\d{10}$/, {
        message: 'Phone number must be exactly 10 digits',
    })
    phoneNumber: string;
}

export class UpdateUserDto {
    @ApiPropertyOptional({
        description: 'First name of the user',
        example: 'John',
        minLength: 1,
        maxLength: 40
    })
    @IsOptional()
    @IsString()
    @Length(1, 40)
    firstName: string;

    @ApiPropertyOptional({
        description: 'Last name of the user',
        example: 'Doe',
        minLength: 1,
        maxLength: 40
    })
    @IsOptional()
    @IsString()
    @Length(1, 40)
    lastName: string;

    @ApiPropertyOptional({
        description: 'Email address of the user',
        example: 'john.doe@example.com'
    })
    @IsOptional()
    @IsEmail()
    email: string;

    @ApiPropertyOptional({
        description: 'Phone number (10 digits)',
        example: '1234567890',
        pattern: '^\\d{10}$'
    })
    @IsOptional()
    @IsString()
    @Matches(/^\d{10}$/, {
        message: 'Phone number must be exactly 10 digits',
    })
    phoneNumber: string;
}