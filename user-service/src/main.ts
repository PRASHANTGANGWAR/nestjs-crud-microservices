import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const portStr = configService.get<string>('user_service.app_port');
  if (!portStr) {
    throw new Error('APP_PORT is not defined in configuration');
  }
  const port = parseInt(portStr, 10);

  await app.listen(port);
}
bootstrap();
