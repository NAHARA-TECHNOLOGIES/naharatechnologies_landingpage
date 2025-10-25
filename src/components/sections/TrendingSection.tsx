"use client";

import Image from "next/image";
import Link from "next/link";
import { mockPosts } from "@/mock/post";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";

const TrendingPosts = () => {
  const trending = mockPosts.slice(7, 13);

  return (
    <section className="mt-20 relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold flex items-center gap-2">
          <Flame className="text-red-600" /> Trending Now
        </h2>
        <Link
          href="/trending"
          className="text-sm text-indigo-600 hover:text-indigo-800 transition"
        >
          View All →
        </Link>
      </div>

      {/* Scrollable Cards */}
      <div className="relative">
        <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth">
          {trending.map((post, i) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="snap-start min-w-[320px] bg-white dark:bg-gray-900 
                rounded-2xl shadow-lg overflow-hidden relative hover:shadow-xl 
                transition-transform hover:scale-[1.03]"
            >
              {/* Image Section */}
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 text-white text-xs uppercase tracking-wider bg-red-600/80 px-3 py-1 rounded-full">
                  {post.category}
                </div>
              </div>

              {/* Content Section */}
              <div className="p-4">
                <h3 className="text-lg font-semibold line-clamp-2 hover:text-indigo-600 transition-colors">
                  <Link href={`/post/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  <span className="font-medium text-indigo-500">
                    Read More →
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Optional gradient fade edges for a premium look */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-white dark:from-gray-900 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-gray-900 to-transparent" />
      </div>
    </section>
  );
};

export default TrendingPosts;
