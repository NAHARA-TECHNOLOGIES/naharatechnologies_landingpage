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
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            Latest News & Insights
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto">
            Explore the latest updates and insights from Nahara Technologies. Stay informed, stay ahead.
          </p>
        </motion.div>

        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex md:grid md:grid-cols-3 gap-6 md:gap-8 snap-x snap-mandatory md:snap-none pb-4">
            {latestPosts.map((post, index) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="min-w-[85%] sm:min-w-[60%] md:min-w-0 bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl 
                transition-all duration-300 snap-center"
              >
                <div className="relative h-56 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>

                <div className="p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-wide text-red-800 dark:text-red-400 font-semibold">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold mt-2 mb-3 text-gray-900 dark:text-white line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 line-clamp-3 text-sm">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="mt-5 flex justify-between items-center">
                    <Link href={`/post/${post.slug}`}>
                      <Button
                        size="sm"
                        className="rounded-full bg-red-800 hover:bg-red-700 text-white px-5"
                      >
                        Read More
                      </Button>
                    </Link>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <Link href="/blog">
            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-red-800 text-red-600 dark:text-red-400 hover:bg-red-50
               dark:hover:bg-red-800/40"
            >
              View All News
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
