import React from 'react';
import { Category } from '../../types/Category';
import { StoreManagementOption } from '../../types/StoreManagementOptions';
import Tabs from './Tabs';

// Category Filter Tabs
interface CategoryFilterProps {
  categories: Category[];
  onSelectCategory: (category: Category) => void;
  selectedCategory: Category;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  onSelectCategory,
  selectedCategory,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="felx w-full px-20">
        <h1 className="text-2xl font-mono p-2">Category</h1>
        <Tabs
          selectedTab={selectedCategory}
          onSelect={onSelectCategory}
          tabs={categories}
        />
      </div>
    </div>
  );
};

// Store Management Filter Tabs
interface StoreManagementFilterTabsProps {
  options: StoreManagementOption[];
  onSelectOption: (option: StoreManagementOption) => void;
  selectedOption: StoreManagementOption;
}

export const StoreManagementFilter: React.FC<
  StoreManagementFilterTabsProps
> = ({ options, onSelectOption, selectedOption }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="felx w-full px-20">
        <h1 className="text-2xl font-mono p-2">Manage your store</h1>
        <Tabs
          selectedTab={selectedOption}
          onSelect={onSelectOption}
          tabs={options}
        />
      </div>
    </div>
  );
};
