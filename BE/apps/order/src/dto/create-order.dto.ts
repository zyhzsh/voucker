import { IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  user_id: string;

  @IsNumber()
  voucher_id: number;

  @IsString()
  voucher_name: string;

  @IsString()
  voucher_imageurl: string;

  @IsNumber()
  @IsPositive()
  price: number;
}
