import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { ConfigService } from '@nestjs/config';
import { StoreModule } from './store.module';

async function bootstrap() {
  const app = await NestFactory.create(StoreModule);
  const configService = app.get(ConfigService);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('STORE'));
  app.useGlobalPipes(new ValidationPipe());
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
