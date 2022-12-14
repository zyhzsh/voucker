import { Module } from '@nestjs/common';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { RmqModule } from '@app/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import {
  ORDER_SERVICE,
  STORE_SERVICE,
  VOUCHER_SERVICE,
} from '../constants/services';
import { HealthController } from './healthcheck.controller';
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
        RABBIT_MQ_INVENTORY_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/inventory/.env',
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
      entities: ['dist/inventory/**/*.entity.js'],
    }),
    TypeOrmModule.forFeature([Inventory]),
    //Register comsuer serviers
    RmqModule.register({
      name: STORE_SERVICE,
    }),
    RmqModule.register({
      name: VOUCHER_SERVICE,
    }),
    RmqModule.register({
      name: ORDER_SERVICE,
    }),
  ],
  controllers: [InventoryController, HealthController],
  providers: [InventoryService],
})
export class InventoryModule {}
