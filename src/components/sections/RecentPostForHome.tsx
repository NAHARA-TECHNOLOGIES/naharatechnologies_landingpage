"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { mockPosts } from "@/mock/post";
import { motion } from "framer-motion";
import LoadingSkeleton from "../common/LoadingSkeleton";

interface RecentPostsProps {
  limit?: number;
}

const RecentPosts: React.FC<RecentPostsProps> = ({ limit = 6 }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async data fetch
    const timer = setTimeout(() => {
      setPosts(mockPosts.slice(0, limit));
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [limit]);

  if (loading) return <LoadingSkeleton count={limit} />;

  return (
    <section className="mt-20">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Recent Posts
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              href={`/post/${post.slug}`}
              className="group bg-white dark:bg-gray-900 
              rounded-2xl shadow-lg overflow-hidden transition-transform 
              hover:scale-[1.02]"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-48 sm:h-56 md:h-60">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <span className="text-sm font-medium text-indigo-500">
                  {post.category}
                </span>
                <h3 className="text-lg font-semibold mt-2 group-hover:text-indigo-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                  {post.excerpt}
                </p>
                <p className="text-xs text-gray-400 mt-3">
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RecentPosts;
