import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
        Customers List
      </h1>

      <div className="relative w-full sm:w-64">
        <input
          type="text"
          placeholder="Search customers..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BiSearch className="absolute right-3 top-2.5 text-gray-400 h-5 w-5" />
      </div>
    </div>
  );
};

export default SearchBar;
