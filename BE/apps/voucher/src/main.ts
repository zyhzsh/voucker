import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqService } from '@app/common';
import { VoucherModule } from './voucher.module';

async function bootstrap() {
  const app = await NestFactory.create(VoucherModule);
  const rmqService = app.get<RmqService>(RmqService);
  app.connectMicroservice(rmqService.getOptions('VOUCHER'));
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
  // app.enableCors({
  //   origin: [configService.get('CLIENTS_SITE'), 'http://localhost:3000'],
  // });
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
``;
