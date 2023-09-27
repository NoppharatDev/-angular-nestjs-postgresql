import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from '@middlewares/filter/http-exception.filter.ts';
import { ValidationPipe } from '@middlewares/pipe/validation.pipe';

async function bootstrap() {
  const PORT = 3030
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  app.enableCors();
  app.setGlobalPrefix('api/v1');

  await app.listen(PORT);
}

bootstrap();