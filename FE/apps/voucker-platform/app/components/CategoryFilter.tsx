import React from 'react';
import { Category } from '../types/Category';
import Tabs from './common/Tabs';

interface CategoryFilterProps {
  categories: Category[];
  onSelectedCategory: (category: Category) => void;
  selectedCategory: Category;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onSelectedCategory,
  selectedCategory,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="felx w-full px-20">
        <h1 className="text-2xl font-mono p-2">Category</h1>
        <Tabs
          selectedTab={selectedCategory}
          onSelect={onSelectedCategory}
          tabs={categories}
        />
      </div>
    </div>
  );
};

export default CategoryFilter;
