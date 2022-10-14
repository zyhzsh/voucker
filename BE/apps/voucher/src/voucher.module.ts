import { Module } from '@nestjs/common';
import { RmqModule } from '@app/common';
import { VoucherController } from './voucher.controller';
import { VoucherService } from './voucher.service';
import * as Joi from 'joi';

import { ConfigModule } from '@nestjs/config';
import { STORE_SERVICE } from '../constants/services';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Voucher } from './entities/voucher.entity';
import { Store } from './entities/store.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        // Database variable
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
        // Listening Port
        PORT: Joi.number().required(),
        // AUTH0 Configure valueable
        AUTH0_AUDIENCE: Joi.string().required(),
        AUTH0_DOMAIN: Joi.string().required(),
        // Rabbit MQ
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_VOUCHER_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/voucher/.env',
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,
      synchronize: true,
      entities: ['dist/voucher/**/*.entity.js'],
    }),
    TypeOrmModule.forFeature([Voucher, Store]),
    //Register comsuer serviers
    RmqModule.register({
      name: STORE_SERVICE,
    }),
  ],
  controllers: [VoucherController],
  providers: [VoucherService],
})
export class VoucherModule {}
