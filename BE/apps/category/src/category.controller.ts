import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getCategory(): string {
    //return this.categoryService.getCategory();
    return '';
  }
}
