import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';

interface SearchProps {
  onSearch: (userInput: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearch }) => {
  const onSearchHandler = (e: any) => {
    e.preventDefault();
    onSearch(e.target[0].value);
  };

  return (
    <form className="flex flex-col items-center" onSubmit={onSearchHandler}>
      <div className="flex w-full pl-20 pt-2">
        <input
          type="text"
          className="flex-1 p-2 border-2 rounded-md focus:border-teal-700 mr-8"
        />
        <button
          type="submit"
          className="flex w-60  mr-20 text-center justify-center font-mono  items-center rounded border border-transparent bg-teal-600 py-2 px-2 font-mon text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 "
        >
          <MagnifyingGlassIcon className="w-4 mr-2" />
          Search
        </button>
      </div>
    </form>
  );
};

export default Search;
