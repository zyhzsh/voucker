import { IsOptional } from 'class-validator';
import { PaginationQueryDto } from './pagination-query.dto';

export class GetAllVouchersQuery extends PaginationQueryDto {
  @IsOptional()
  category: string;

  @IsOptional()
  location: string;

  @IsOptional()
  search: string;
}
