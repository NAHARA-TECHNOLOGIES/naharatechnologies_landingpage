"use client";
import { useState, useEffect, useRef } from "react";
import { X, Filter, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

type SearchPanelProps = {
  query: string;
  onClose: () => void;
};

const SearchPanel = ({ query, onClose }: SearchPanelProps) => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    if (!query) return;

    const fetchResults = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(
          `/api/search?query=${encodeURIComponent(query)}&category=${category}&sort=${sortBy}`
        );
        if (!res.ok) throw new Error("Failed to fetch results");
        const data = await res.json();
        setResults(data.results || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const delay = setTimeout(fetchResults, 400); // debounce
    return () => clearTimeout(delay);
  }, [query, category, sortBy]);

  const handlePostClick = (slug: string) => {
    onClose();
    router.push(`/blog/${slug}`);
  };

  return (
    <div
      ref={panelRef}
      className="absolute top-[110%] left-0 w-full md:w-[400px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 p-4 animate-fadeIn"
    >
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Search Results
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          aria-label="Close search panel"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <Filter className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        <select
          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-md"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="Sports">Sports</option>
          <option value="Tech">Tech</option>
          <option value="News">News</option>
        </select>

        <select
          className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-sm rounded-md"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 className="animate-spin w-6 h-6 text-red-700" />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : results.length > 0 ? (
        <ul className="space-y-2 max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
          {results.map((item) => (
            <li
              key={item.id}
              onClick={() => handlePostClick(item.slug)}
              className="p-3 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition"
            >
              <h4 className="font-medium text-gray-800 dark:text-gray-200">
                {item.title}
              </h4>
              <p className="text-xs text-gray-500">
                {item.category} • {item.date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400 text-sm">
          No results found for <span className="font-semibold">{query}</span>
        </div>
      )}
    </div>
  );
};

export default SearchPanel;
