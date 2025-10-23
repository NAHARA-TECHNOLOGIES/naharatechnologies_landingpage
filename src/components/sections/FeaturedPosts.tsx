"use client";
import Image from "next/image";
import Link from "next/link";
import { mockPosts } from "@/mock/post";

const FeaturedPosts = () => {
  const featured = mockPosts.slice(4, 7);

  return (
    <section className="mt-20">
      <h2 className="text-3xl font-bold text-center mb-10">Featured Stories</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {featured.map((post) => (
          <Link
            href={`/post/${post.slug}`}
            key={post.slug}
            className="group rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition"
          >
            <div className="relative h-52">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-110 transition"
              />
            </div>
            <div className="p-4">
              <span className="text-sm text-indigo-500">{post.category}</span>
              <h3 className="text-lg font-semibold mt-2 group-hover:text-indigo-600">
                {post.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default FeaturedPosts;
