import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import databaseConfig from '@config/database.config'
import { DatabaseModule } from '@database/database.module'
import { UserController } from '@user/user.controller';
import { UserService } from '@user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@models/users';
import { UserModule } from '@user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    UserModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule { }
