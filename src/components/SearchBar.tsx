"use client";
<<<<<<< HEAD
<<<<<<< Updated upstream
import { FiSearch } from "react-icons/fi";

type SearchBarProps = {
  placeholder: string;
  className?: string;
  containerClassName?: string;
  showIcon?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
=======
=======
>>>>>>> 295a02e (feat: restore all missing files and sync project from backup)
import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import SearchPanel from "@/components/SearchPanel";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initialQuery = searchParams?.get("query");
    if (initialQuery) setQuery(initialQuery);
  }, [searchParams]);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (query.trim() === "") return;

    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams();
      params.set("query", query);
      router.replace(`/search?${params.toString()}`);
    }, 600);
  }, [query, router]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() === "") return;
    setIsOpen(true);
  };
>>>>>>> Stashed changes

const SearchBar = ({
  placeholder,
  className,
  containerClassName = "relative mb-6 ",
  showIcon = true,
  onChange,
}: SearchBarProps) => {
  return (
<<<<<<< Updated upstream
    <div className={containerClassName}>
      {showIcon && <FiSearch className="absolute left-3 top-3 text-gray-400" />}

      <input
        type="text"
        placeholder={placeholder}
        className={className ?? "border w-full pl-10 p-3 rounded-md"}
        onChange={onChange}
      />
=======
    <div className="relative">
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

      {isOpen && (
        <SearchPanel
          query={query}
          onClose={() => setIsOpen(false)}
        />
      )}
>>>>>>> Stashed changes
    </div>
  );
};

export default SearchBar;
