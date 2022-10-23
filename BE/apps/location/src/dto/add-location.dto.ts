import { IsNotEmpty, IsString } from 'class-validator';

export class AddLocationRequest {
  @IsString()
  @IsNotEmpty()
  name: string;
}
