import { IsNotEmpty, IsPositive, IsInt } from 'class-validator';

export class DeleteLocationQuery {
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  id: number;
}
