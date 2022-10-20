import { NestFactory } from '@nestjs/core';
import { CategoryModule } from './category.module';
import { ConfigService } from '@nestjs/config';
import { RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(CategoryModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('CATEGORY'));
  app.useGlobalPipes(
    new ValidationPipe({
      //Wipe out redundant data from request
      whitelist: true,
      //Transfrom the data type to match the parameter
      transform: true,
      //Block the request that not match the date of object
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  const configService = app.get(ConfigService);
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
