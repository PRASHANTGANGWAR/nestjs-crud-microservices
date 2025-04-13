import { IsEmail, Matches, IsString, Length, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(1, 40)
    firstName: string;

    @IsString()
    @Length(1, 40)
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @Matches(/^\d{10}$/, {
        message: 'Phone number must be exactly 10 digits',
    })
    phoneNumber: string;
}

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @Length(1, 40)
    firstName: string;

    @IsOptional()
    @IsString()
    @Length(1, 40)
    lastName: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    @Matches(/^\d{10}$/, {
        message: 'Phone number must be exactly 10 digits',
    })
    phoneNumber: string;
}
