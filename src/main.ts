import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {

  const app = await NestFactory.create(AppModule, {cors: {
    origin: [`${process.env.BASE_URL}`, `http://localhost:5173`], //TODO: THIS MUST BE CHANGED TO ALLOWED DOMAINS
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
  }});
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.BASE_PORT);
}
bootstrap();
