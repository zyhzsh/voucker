import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getHello(): string {
    return this.categoryService.getHello();
  }
}
