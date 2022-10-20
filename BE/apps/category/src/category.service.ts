import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepostiry: Repository<Category>,
  ) {}

  async getCategory() {
    return await this.categoryRepostiry.find({
      order: {
        name: 'ASC',
      },
    });
  }
}
