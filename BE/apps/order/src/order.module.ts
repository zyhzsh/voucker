import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { Order } from './entities/order.entity';
import { INVENTORY_SERVICE } from '../constants/services';

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
        RABBIT_MQ_ORDER_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/order/.env',
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
      entities: ['dist/order/**/*.entity.js'],
    }),
    TypeOrmModule.forFeature([Order]),
    RmqModule.register({
      name: INVENTORY_SERVICE,
    }),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
