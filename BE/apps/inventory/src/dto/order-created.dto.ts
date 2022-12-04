import { IsNumber, IsString } from 'class-validator';

export class OrderCreatedDto {
  @IsString()
  id: string;

  @IsString()
  user_id: string;

  @IsNumber()
  voucher_id: number;
}
