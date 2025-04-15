import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setup Swagger
  const options = new DocumentBuilder()
    .setTitle('Microservices API Gateway')
    .setDescription('API Gateway for User and Product Microservices')
    .setVersion('1.0')
    .addTag('users')
    .addServer('http://localhost:3000', 'Development')
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
  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  app.useGlobalPipes(new ValidationPipe());

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