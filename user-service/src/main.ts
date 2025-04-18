import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('User Service API')
    .setDescription('Microservice for user management')
    .setVersion('1.0')
    .addTag('users')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  app.useGlobalPipes(new ValidationPipe());

  const configService = app.get(ConfigService);
  const portStr = configService.get<string>('user_service.app_port');
  if (!portStr) {
    throw new Error('APP_PORT is not defined in configuration');
  }
  const port = parseInt(portStr, 10);

  // Validation middleware
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: (errors) => {
        const message = errors
          .map(
            (err) =>
              `${Object.values(err.constraints || {}).join(', ')}`
          )
          .join(', ');

        return new BadRequestException({
          statusCode: 400,
          message: 'Validation failed',
          errors: message,
        });
      },
    }),
  );

  await app.listen(port);
}
bootstrap();
