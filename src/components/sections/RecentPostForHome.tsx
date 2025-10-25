"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { mockPosts } from "@/mock/post";

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
    }, 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = allPosts;
    if (category && category !== "all") {
      list = list.filter((p) => p.category === category);
    }
    list = list.sort((a, b) => {
      const ta = new Date(a.publishedAt).getTime();
      const tb = new Date(b.publishedAt).getTime();
      return sortBy === "latest" ? tb - ta : ta - tb;
    });
    return list;
  }, [allPosts, category, sortBy]);

  const visiblePosts = filtered.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((c) => c + PAGE_SIZE);
  };

  if (loading) return <LoadingSkeleton count={limit} />;

  return (
    <section className="mt-20">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold">Recent Posts</h2>

        <div className="flex items-center gap-3">
          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setVisibleCount(limit);
            }}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm"
          >
            <option value="all">All categories</option>
            {Array.from(new Set(mockPosts.map((p) => p.category))).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-md text-sm"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post, i) => (
          <motion.article
            key={post.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.06 }}
            className="group bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-[1.02]"
            aria-labelledby={`recent-${post.slug}`}
          >
            <Link href={`/post/${post.slug}`} className="block">
              <div className="relative w-full h-48 sm:h-56">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-medium text-indigo-500">
                    {post.category}
                  </span>
                  <time className="text-xs text-gray-400">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </time>
                </div>

                <h3 id={`recent-${post.slug}`} className="text-lg font-semibold mt-2 group-hover:text-indigo-600 transition-colors">
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
        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            Load more
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No posts match your filters.</p>
      )}
    </section>
  );
};

export default RecentPosts;
