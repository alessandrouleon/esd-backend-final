import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  const port = process.env.BACKEND_PORT;

  app.enableCors();

  //--------------------------------------------------------------------
  // Ou habilitar CORS com configurações específicas
  // app.enableCors({
  //   origin: 'http://localhost:5173', // ou a origem do seu frontend
  //   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //   credentials: true,
  // });
  //Obsevar trexo acima
  //---------------------------------------------------------------------
  await app.listen(port);
  console.log(`🚀 Server running on port ${port}`);
}
bootstrap();
