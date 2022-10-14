import { IsString, IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class CreateVoucherRequest {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsPositive()
  price: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsPositive()
  @IsInt()
  inventory: number;
}
