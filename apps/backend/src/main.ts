/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { ZodValidationPipe, cleanupOpenApiDoc } from 'nestjs-zod';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ZodValidationPipe());

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('AoPonto FoodService API')
    .setDescription('Documentação da API do sistema AoPonto')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users')
    .addTag('sessions')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  cleanupOpenApiDoc(document);
  SwaggerModule.setup('docs', app, document); // Acessível em /api/docs

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
