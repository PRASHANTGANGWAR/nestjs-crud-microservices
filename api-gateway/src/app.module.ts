import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import databaseConfig from '@config/database.config'
import { UserController } from '@user/user.controller';
import { ProductController } from '@product/product.controller';
import { UserService } from '@user/user.service';
import { ProductService } from '@product/product.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
  ],
  controllers: [UserController, ProductController],
  providers: [UserService, ProductService],
  exports: [UserService, ProductService]
})
export class AppModule { }
