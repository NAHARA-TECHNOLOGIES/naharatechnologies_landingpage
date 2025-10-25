"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { mockPosts } from "@/mock/post";
import { Flame, Eye, MessageSquare } from "lucide-react";
import AdSection from "@/components/sections/AdSection";
import { motion } from "framer-motion";

export default function TrendingPage() {
  const [randomStats, setRandomStats] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const stats = mockPosts.slice(0, 8).map(() => ({
        views: Math.floor(Math.random() * 5000) + 1000,
        comments: Math.floor(Math.random() * 100),
      }));
      setRandomStats(stats);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const trendingPosts = mockPosts.slice(0, 8);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-white"
        >
          🔥 Trending Now
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 dark:text-gray-400 mt-3 text-sm sm:text-base"
        >
          Stay ahead with the latest and most discussed stories around the world.
        </motion.p>
      </div>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {trendingPosts.map((post, index) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
          >
            <Link
              href={`/post/${post.slug}`}
              className="group relative flex flex-col rounded-2xl overflow-hidden bg-white dark:bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-300 w-full"
            >
              <div className="relative h-56 sm:h-52 md:h-56 lg:h-60 w-full overflow-hidden">
                {loading ? (
                  <div className="animate-pulse bg-gray-200 dark:bg-gray-800 h-full w-full" />
                ) : (
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="100%"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs px-3 py-1 rounded-full font-semibold shadow-md">
                  {post.category}
                </div>
              </div>

              <div className="flex flex-col justify-between flex-1 p-5">
                <div>
                  <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 dark:text-white group-hover:text-indigo-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                {randomStats[index] ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="flex items-center justify-between mt-4 text-gray-500 dark:text-gray-400 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Eye size={14} /> {randomStats[index].views}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare size={14} /> {randomStats[index].comments}
                      </span>
                    </div>
                    <span className="flex items-center gap-1 text-rose-500 font-semibold">
                      <Flame size={14} /> Trending
                    </span>
                  </motion.div>
                ) : (
                  <div className="animate-pulse h-4 bg-gray-200 dark:bg-gray-700 mt-4 rounded w-2/3" />
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <AdSection />
        </motion.div>
      </div>
    </div>
  );
}
