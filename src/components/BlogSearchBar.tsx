"use client";
import { useState } from "react";
import { Search } from "lucide-react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching for:", query);
    // you can route or call API here
  };

  return (
    <form
      onSubmit={handleSearch}
      className="
        relative flex items-center 
        w-full md:w-[350px] lg:w-[400px]
        bg-gray-100 dark:bg-gray-800
        rounded-full shadow-sm
        transition-all duration-300
        focus-within:ring-2 focus-within:ring-red-800
      "
    >
      <Search className="ml-3 w-5 h-5 text-gray-500 dark:text-gray-400" />
      <input
        type="text"
        placeholder="Search articles, channels..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="
          flex-1 bg-transparent outline-none px-3 py-2
          text-sm text-gray-800 dark:text-gray-200
          placeholder-gray-500 dark:placeholder-gray-400
        "
      />
      <button
        type="submit"
        className="
          absolute right-2 px-3 py-1.5
          bg-red-600 text-white text-sm rounded-full
          hover:bg-red-700 transition
        "
      >
        Go
      </button>
    </form>
  );
};

export default SearchBar;
