"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { mockPosts } from "@/mock/post";

const categories = [
  "all",
  ...Array.from(new Set(mockPosts.map((p) => p.category))),
];

const CategoriesSection: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sp = searchParams ?? new URLSearchParams();
  const active = sp.get("category") || "all";

  const handleClick = (cat: string) => {
    const currentParams = searchParams ?? new URLSearchParams();
    const params = new URLSearchParams(Array.from(currentParams.entries()));
    if (cat === "all") {
      params.delete("category");
    } else {
      params.set("category", cat);
    }
    // use push so it's shareable and doesn't reload the page
    router.push(`${window.location.pathname}?${params.toString()}`);
  };

  const counts = useMemo(() => {
    const map = new Map<string, number>();
    mockPosts.forEach((p) => map.set(p.category, (map.get(p.category) || 0) + 1));
    return map;
  }, []);

  return (
    <section className="mt-20 text-center">
      <h2 className="text-3xl font-bold mb-6">Browse by Category</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {categories.map((cat) => {
          const isActive = cat === active;
          return (
            <button
              key={cat}
              onClick={() => handleClick(cat)}
              className={`px-5 py-2 rounded-full border dark:border-gray-700 transition flex items-center gap-2 ${
                isActive ? "bg-indigo-600 text-white" : "hover:bg-indigo-50 dark:hover:bg-gray-800"
              }`}
              aria-pressed={isActive}
            >
              <span className="capitalize">{cat}</span>
              {cat !== "all" && (
                <span className="text-xs text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full">
                  {counts.get(cat) ?? 0}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
};

export default CategoriesSection;
