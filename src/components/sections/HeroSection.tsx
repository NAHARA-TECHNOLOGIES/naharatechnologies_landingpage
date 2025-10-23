"use client";
import Image from "next/image";
import Link from "next/link";
import { mockPosts } from "@/mock/post";

const HeroSection = () => {
  const [mainPost, ...sidePosts] = mockPosts.slice(0, 4);

  return (
    <section className="mt-10 grid lg:grid-cols-3 gap-8">
      {/* Main Post */}
      <Link
        href={`/post/${mainPost.slug}`}
        className="relative rounded-2xl overflow-hidden group lg:col-span-2"
      >
        <Image
          src={mainPost.image}
          alt={mainPost.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6 flex flex-col justify-end">
          <span className="text-sm text-indigo-400">{mainPost.category}</span>
          <h1 className="text-2xl md:text-4xl font-bold text-white mt-2">
            {mainPost.title}
          </h1>
          <p className="text-gray-200 text-sm mt-2 line-clamp-2">
            {mainPost.excerpt}
          </p>
        </div>
      </Link>

      {/* Side Posts */}
      <div className="space-y-4">
        {sidePosts.map((post) => (
          <Link
            href={`/post/${post.slug}`}
            key={post.slug}
            className="flex gap-3 bg-white dark:bg-gray-900 rounded-xl overflow-hidden hover:scale-[1.01] transition"
          >
            <Image
              src={post.image}
              alt={post.title}
              width={100}
              height={100}
              className="object-cover w-32 h-28"
            />
            <div className="p-3 flex flex-col justify-center">
              <span className="text-xs text-indigo-500">{post.category}</span>
              <h3 className="text-sm font-semibold dark:text-white">
                {post.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
