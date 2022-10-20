import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { RmqModule } from '@app/common';
import { Category } from './entities/category.entity';

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
        RABBIT_MQ_CATEGORY_QUEUE: Joi.string().required(),
      }),
      envFilePath: './apps/category/.env',
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
      entities: ['dist/category/**/*.entity.js'],
    }),
    TypeOrmModule.forFeature([Category]),
    RmqModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
