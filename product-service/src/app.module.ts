import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from '@config/database.config'
import { DatabaseModule } from '@database/database.module'
import { ProductController } from '@product/product.controller';
import { ProductService } from '@product/product.service';
import { Product } from '@models/products';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Product])
  ],
  controllers: [AppController, ProductController],
  providers: [AppService, ProductService],
})
export class AppModule { }
