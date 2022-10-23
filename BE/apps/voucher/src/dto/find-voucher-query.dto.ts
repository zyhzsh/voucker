import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class FindVoucherQuery {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  id: number;
}
