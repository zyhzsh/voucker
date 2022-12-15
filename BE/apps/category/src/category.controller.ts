import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  healthCheck() {
    return 'OK';
  }

  @Get('api/category')
  getCategory() {
    return this.categoryService.getCategory();
  }
}
