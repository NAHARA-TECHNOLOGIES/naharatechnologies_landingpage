"use client";

import Image from "next/image";
import Link from "next/link";
import { mockPosts } from "@/mock/post";
import { motion } from "framer-motion";
import { CalendarDays, ArrowRight } from "lucide-react";

const FeaturedPosts = () => {
  const featured = mockPosts.slice(4, 7);

  return (
    <section className="mt-20">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-gray-100">
          🌟 Featured Stories
        </h2>
        <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-xl mx-auto text-sm md:text-base">
          Explore trending insights, expert opinions, and must-read stories
          handpicked for you.
        </p>
      </div>

      {/* Posts Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((post, i) => (
          <motion.div
            key={post.slug}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link
              href={`/post/${post.slug}`}
              className="group relative flex flex-col h-full rounded-2xl overflow-hidden 
                         shadow-lg dark:shadow-gray-800/40 hover:shadow-xl 
                         bg-white dark:bg-gray-900 transition-all duration-300"
            >
              {/* Thumbnail */}
              <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority={i === 0}
                  className="object-cover transform transition-transform duration-500 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3 bg-indigo-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                  {post.category}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h3
                  className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-gray-100 
                             group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2"
                >
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-4 text-gray-400 text-xs sm:text-sm">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>

                  <span className="flex items-center gap-1 font-medium text-indigo-600 group-hover:gap-2 transition-all">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* View More CTA */}
      <div className="mt-12 flex justify-center">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-6 py-3 text-sm sm:text-base 
                     font-medium text-white bg-indigo-600 rounded-full 
                     hover:bg-indigo-700 transition-all shadow-md hover:shadow-lg"
        >
          Explore More Stories
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPosts;
