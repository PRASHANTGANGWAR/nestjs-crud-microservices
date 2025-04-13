import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  const options = new DocumentBuilder()
    .setTitle('Your API Title')
    .setDescription('Your API description')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'User Service')
    .addServer('http://localhost:3000/products', 'Product Service')
    .addTag('Your API Tag')
    .addApiKey(
      {
        type: 'apiKey',
        in: 'header',
        name: 'x-api-key',
      },
      'internalApiKey'
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);

  // Get port from configuration and start the app
  const configService = app.get(ConfigService);
  const portStr = configService.get<string>('api_gateway.app_port');
  if (!portStr) {
    throw new Error('APP_PORT is not defined in configuration');
  }

  const port = parseInt(portStr, 10);

  await app.listen(port);
}
bootstrap();
