import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AllExceptionsFilter } from './filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.useGlobalFilters(new AllExceptionsFilter());

  const port = process.env.BACKEND_PORT;

  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
