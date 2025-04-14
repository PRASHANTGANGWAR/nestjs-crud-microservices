import { Module } from '@nestjs/common';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { entities } from 'models/index';

@Module({
    imports: [
        ConfigModule,
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get<string>('product_service.host'),
                port: configService.get<number>('product_service.port'),
                username: configService.get<string>('product_service.username'),
                password: configService.get<string>('product_service.password'),
                database: configService.get<string>('product_service.database'),
                entities,
                synchronize: true, // Set to false in production
                autoLoadEntities: true,
            }),
            inject: [ConfigService],
        }),
    ],
})
export class DatabaseModule { }
