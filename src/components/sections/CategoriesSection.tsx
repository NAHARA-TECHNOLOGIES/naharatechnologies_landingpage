"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils"; 

const categories = [
  "All",
  "Technology",
  "Sports",
  "Politics",
  "Entertainment",
  "Business",
  "Health",
];

const CategoriesSection = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = (searchParams?.get("category")) ?? "All";
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async (category: string) => {
    try {
      setLoading(true);

      const query = category === "All" ? "" : `?category=${category}`;
      const response = await fetch(`/api/posts${query}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to fetch posts");
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setSelectedCategory(currentCategory);
    fetchPosts(currentCategory);
  }, [currentCategory]);

  const handleCategoryClick = (cat: string) => {
    const newCategory = cat === selectedCategory ? "All" : cat;
    setSelectedCategory(newCategory);

    const params = new URLSearchParams(window.location.search);
    if (newCategory === "All") {
      params.delete("category");
    } else {
      params.set("category", newCategory);
    }

    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <section className="py-10 md:py-20 text-center px-4 md:px-8">
      <h2 className="text-h2 mb-8">
        Browse by Category
      </h2>

      <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
        {categories.map((cat) => (
          <motion.button
            key={cat}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => handleCategoryClick(cat)}
            className={cn(
              "px-5 py-2 rounded-full border text-sm transition-all duration-300",
              "dark:border-gray-700 hover:bg-red-800 hover:text-white",
              selectedCategory === cat
                ? "bg-red-800 text-white shadow-lg font-medium"
                : "bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            )}
          >
            {cat}
          </motion.button>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center items-center py-10">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 1,
            }}
            className="h-10 w-10 border-4 border-t-transparent border-red-600 rounded-full"
          />
        </div>
      )}

      <AnimatePresence mode="wait">
        {!loading && posts.length > 0 && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {posts.map((post) => (
              <motion.div
                key={post.id}
                whileHover={{ scale: 1.02 }}
                className="p-5 rounded-xl border dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm hover:shadow-lg transition"
              >
                <h3 className="text-h3 mb-2 text-gray-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {post.category}
                </p>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && posts.length === 0 && (
          <motion.p
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-gray-500 dark:text-gray-400 mt-10"
          >
            No posts found in{" "}
            <span className="font-semibold text-red-600">
              {selectedCategory}
            </span>
            .
          </motion.p>
        )}
      </AnimatePresence>
    </section>
  );
};

export default CategoriesSection;
