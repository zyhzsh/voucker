import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';

async function bootstrap() {
  const app = await NestFactory.create(CategoryModule);
  await app.listen(3000);
}
bootstrap();
