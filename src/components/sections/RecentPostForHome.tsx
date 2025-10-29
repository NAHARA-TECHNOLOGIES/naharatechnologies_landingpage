"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { mockPosts } from "@/mock/post";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LoadingSkeleton from "../common/LoadingSkeleton";

interface RecentPostsProps {
  limit?: number;
  initialCategory?: string;
}

const PAGE_SIZE = 6;

const RecentPosts: React.FC<RecentPostsProps> = ({ limit = PAGE_SIZE, initialCategory = "all" }) => {
  const [allPosts, setAllPosts] = useState<any[]>([]);
  const [visibleCount, setVisibleCount] = useState(limit);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState<"latest" | "oldest">("latest");

  useEffect(() => {
    const t = setTimeout(() => {
      setAllPosts(mockPosts);
      setLoading(false);
    }, 800);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = [...allPosts];
    if (category !== "all") list = list.filter((p) => p.category === category);
    list.sort((a, b) =>
      sortBy === "latest"
        ? new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        : new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime()
    );
    return list;
  }, [allPosts, category, sortBy]);

  const visiblePosts = filtered.slice(0, visibleCount);

  const handleLoadMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  if (loading) return <LoadingSkeleton count={limit} />;

  return (
    <section className="mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8"
      >
        <h2 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-red-600 to-indigo-600 bg-clip-text text-transparent">
          Recent & Featured Posts
        </h2>

        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setVisibleCount(limit);
            }}
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm focus:ring-2
             focus:ring-red-800 outline-none"
          >
            <option value="all">All Categories</option>
            {Array.from(new Set(mockPosts.map((p) => p.category))).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-sm 
            focus:ring-2 focus:ring-red-800 outline-none"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </motion.div>

      <div className="relative mb-12 overflow-hidden rounded-2xl">
        <motion.div
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          {filtered.slice(0, 3).map((post, i) => (
            <motion.div
              key={post.slug}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="min-w-[90%] sm:min-w-[48%] lg:min-w-[32%] snap-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900
               dark:to-gray-800 rounded-2xl shadow-md overflow-hidden relative"
            >
              <Link href={`/post/${post.slug}`}>
                <div className="relative w-full h-64">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <span className="text-xs uppercase bg-red-800 px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold mt-2">{post.title}</h3>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.slice(3).map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md 
            hover:shadow-xl transition-transform hover:scale-[1.02] overflow-hidden"
          >
            <Link href={`/post/${post.slug}`} className="block">
              <div className="relative w-full h-48 sm:h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              <div className="p-5">
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-medium text-red-800">{post.category}</span>
                  <time>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>
                <h3 className="text-lg font-semibold mt-2 group-hover:text-red-800 dark:group-hover:text-red-600 transition">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      {visibleCount < filtered.length && (
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="mt-12 flex justify-center"
        >
          <button
            onClick={handleLoadMore}
            className="relative px-8 py-3 rounded-full bg-gradient-to-r from-red-600 to-red-100 text-white font-semibold hover:shadow-lg overflow-hidden transition"
          >
            <span className="relative z-10">Load More</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-pink-800 via-purple-500 to-red-800 opacity-0"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
          </button>
        </motion.div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          No posts match your filters.
        </p>
      )}
    </section>
  );
};

export default RecentPosts;
