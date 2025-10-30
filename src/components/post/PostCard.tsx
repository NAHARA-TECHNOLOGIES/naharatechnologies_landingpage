"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface PostCardProps {
  slug: string;
  title: string;
  category: string;
  image: string;
  excerpt: string;
  publishedAt: string;
  views?: number;
}

const PostCard: React.FC<PostCardProps> = ({
  slug,
  title,
  category,
  image,
  excerpt,
  publishedAt,
  views,
}) => {
  return (
    <Link
      href={`/post/${slug}`}
      className="group bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all hover:scale-[1.01]"
    >
      {/* Thumbnail */}
      <div className="relative w-full h-52 sm:h-60 overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <span className="text-sm font-medium text-indigo-500">{category}</span>
        <h3 className="text-lg font-semibold mt-1 text-gray-900 dark:text-white group-hover:text-indigo-600">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
          {excerpt}
        </p>

        <div className="flex justify-between items-center mt-3 text-xs text-gray-400">
          <span>
            {new Date(publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          {views && <span>{views.toLocaleString()} views</span>}
        </div>
      </div>
    </Link>
  );
};

export default PostCard;
