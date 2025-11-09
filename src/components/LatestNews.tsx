"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { mockPosts } from "@/mock/post";
import { Button } from "@/components/ui/Button";

export default function LatestNews() {
  const latestPosts = [...mockPosts]
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Latest News & Insights
          </h2>
          <p className="mt-3 sm:mt-4 text-gray-600 dark:text-gray-300 text-sm sm:text-lg max-w-2xl mx-auto">
            Explore the latest updates and insights from Nahara Technologies. Stay informed, stay ahead.
          </p>
        </motion.div>

        {/* News Cards */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide md:overflow-visible">
            <div className="flex md:grid md:grid-cols-3 gap-5 md:gap-8 snap-x snap-mandatory md:snap-none pb-4">
              {latestPosts.map((post, index) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="min-w-[90%] sm:min-w-[60%] md:min-w-0"
                >
                  <Link
                    href={`/post/${post.slug}`}
                    className="block bg-white dark:bg-gray-900 rounded-2xl shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 group"
                  >
                    {/* Image */}
                    <div className="relative h-52 sm:h-64 w-full overflow-hidden">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Content */}
                    <div className="p-4 sm:p-6 flex flex-col justify-between h-full space-y-3">
                      <div>
                        <span className="inline-block text-[10px] sm:text-xs uppercase tracking-wider px-3 py-1 bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-400 font-semibold rounded-full">
                          {post.category}
                        </span>
                        <h3 className="text-base sm:text-lg md:text-xl font-bold leading-snug text-gray-900 dark:text-white mt-3 group-hover:text-red-700 dark:group-hover:text-red-400 transition-colors duration-300 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1 text-red-700 dark:text-red-400 group-hover:underline">
                          Read more →
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Edge Gradients for Scroll on Mobile */}
          <div className="pointer-events-none absolute top-0 left-0 w-10 h-full bg-gradient-to-r from-gray-100 dark:from-gray-900 via-transparent to-transparent z-20 md:hidden" />
          <div className="pointer-events-none absolute top-0 right-0 w-10 h-full bg-gradient-to-l from-gray-100 dark:from-gray-900 via-transparent to-transparent z-20 md:hidden" />
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <Link href="/blog">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-red-700 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-800/30 active:bg-red-900 transition"
            >
              View All News
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
