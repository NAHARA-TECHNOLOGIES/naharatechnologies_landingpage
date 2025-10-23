"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import SearchPanel from "@/components/SearchPanel";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsOpen(true);
  };

  return (
    <div className="relative">
      {/* 🔍 Input Field */}
      <form
        onSubmit={handleSearch}
        className="relative flex items-center w-full md:w-[350px] lg:w-[400px]
          bg-gray-100 dark:bg-gray-800 rounded-full shadow-sm
          transition-all duration-300 focus-within:ring-2 focus-within:ring-red-800"
      >
        <Search className="ml-3 w-5 h-5 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          placeholder="Search articles, channels..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          className="flex-1 bg-transparent outline-none px-3 py-2 text-sm text-gray-800 dark:text-gray-200
            placeholder-gray-500 dark:placeholder-gray-400"
        />
        <button
          type="submit"
          className="absolute right-2 px-3 py-1.5 bg-red-600 text-white text-sm rounded-full hover:bg-red-700 transition"
        >
          Go
        </button>
      </form>

      {/* 🔽 Panel appears below search */}
      {isOpen && (
        <SearchPanel query={query} onClose={() => setIsOpen(false)} />
      )}
    </div>
  );
};

export default SearchBar;
