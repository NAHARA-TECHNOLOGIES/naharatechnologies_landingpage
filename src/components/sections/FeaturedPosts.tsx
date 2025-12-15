"use client";

import Image from "next/image";
import Link from "next/link";
import { CalendarDays, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  image?: string;
  category?: string;
  publishedAt: string;
}

const FeaturedPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts");
        if (!res.ok) throw new Error("Failed to fetch posts");
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!posts.length) return null;

  return (
    <section className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold">
         Featured Stories
        </h2>
        <p className="mt-2 text-gray-500 max-w-xl mx-auto">
          Explore trending insights, expert opinions, and must-read stories.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
              className="group relative flex flex-col rounded-2xl overflow-hidden shadow-lg bg-white dark:bg-gray-900 hover:shadow-xl transition"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={post.image || "/placeholder.jpg"}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <span className="absolute top-3 left-3 bg-red-600 text-white text-xs px-3 py-1 rounded-full">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-lg font-semibold group-hover:text-red-600 line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mt-2 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1">
                    <CalendarDays className="w-4 h-4" />
                    {new Date(post.publishedAt).toLocaleDateString()}
                  </span>
                  <span className="flex items-center gap-1 font-medium text-red-700">
                    Read More <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex justify-center">
        <Link
          href="/blog"
          className="px-6 py-3 bg-red-800 text-white rounded-full hover:bg-red-700 transition"
        >
          Explore More Stories →
        </Link>
      </div>
    </section>
  );
};

export default FeaturedPosts;
