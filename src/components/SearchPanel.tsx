"use client";
import { useState } from "react";
import { X, Filter } from "lucide-react";
import { useRouter } from "next/navigation";

type SearchPanelProps = {
  query: string;
  onClose: () => void;
};

const SearchPanel = ({ query, onClose }: SearchPanelProps) => {
  const router = useRouter();
  const [sortBy, setSortBy] = useState("latest");
  const [category, setCategory] = useState("all");

  // ✅ Add slug to mock results
  const mockResults = [
    {
      id: 1,
      title: "How AI is Changing Sports",
      category: "Tech",
      date: "2025-10-01",
      slug: "how-ai-is-changing-sports",
    },
    {
      id: 2,
      title: "Top 10 Football Predictions",
      category: "Sports",
      date: "2025-10-05",
      slug: "top-10-football-predictions",
    },
  ];

  const filteredResults = mockResults.filter(
    (post) =>
      (category === "all" || post.category === category) &&
      post.title.toLowerCase().includes(query.toLowerCase())
  );

  // ✅ Navigate to post page on click
  const handlePostClick = (slug: string) => {
    onClose(); // close search panel
    router.push(`/blog/${slug}`);
  };

  return (
    <div className="absolute top-[110%] left-0 w-full md:w-[400px] bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-xl z-50 p-4 transition-all duration-300">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800 dark:text-gray-100">
          Search Results
        </h3>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Filter Options */}
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

      {/* Results */}
      <ul className="space-y-2 max-h-64 overflow-y-auto">
        {filteredResults.length > 0 ? (
          filteredResults.map((item) => (
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
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center">
            No results found.
          </p>
        )}
      </ul>
    </div>
  );
};

export default SearchPanel;
