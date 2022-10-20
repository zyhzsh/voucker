import { IsInt, IsNotEmpty, IsPositive, IsString } from 'class-validator';

export class UpdateLocationRequest {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
