import { NestFactory } from '@nestjs/core';
import { LocationModule } from './location.module';

async function bootstrap() {
  const app = await NestFactory.create(LocationModule);
  await app.listen(3000);
}
bootstrap();
