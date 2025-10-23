"use client";
import Image from "next/image";
import Link from "next/link";
import { mockPosts } from "@/mock/post";

const TrendingPosts = () => {
  const trending = mockPosts.slice(7, 13);

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
      <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide">
        {trending.map((post) => (
          <Link
            key={post.slug}
            href={`/post/${post.slug}`}
            className="min-w-[300px] bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden hover:scale-[1.02] transition"
          >
            <div className="relative h-48 w-full">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default TrendingPosts;
