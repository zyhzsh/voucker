import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class PublishVoucherRequest {
  @IsNumber()
  @IsNotEmpty()
  voucherId: number;

  @IsString()
  @IsNotEmpty()
  ownerId: string;
}
