"use client";

import React, { useEffect, useState } from "react";
import { mockPosts } from "@/mock/post";
import PostCard from "./PostCard";

interface RecentPostsProps {
  limit?: number;
}

const RecentPosts: React.FC<RecentPostsProps> = ({ limit }) => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate network delay like Facebook loading
    setTimeout(() => {
      setPosts(mockPosts.slice(0, limit || mockPosts.length));
      setLoading(false);
    }, 1500);
  }, [limit]);

  return (
    <section className="mt-20">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
        Recent Posts
      </h2>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {loading
          ? Array.from({ length: limit || 3 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse bg-white dark:bg-gray-900 rounded-2xl shadow-md overflow-hidden"
              >
                <div className="w-full h-52 sm:h-60 bg-gray-200 dark:bg-gray-700" />
                <div className="p-4 space-y-3">
                  <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-5 w-2/3 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 w-full bg-gray-300 dark:bg-gray-600 rounded"></div>
                  <div className="h-3 w-5/6 bg-gray-300 dark:bg-gray-600 rounded"></div>
                </div>
              </div>
            ))
          : posts.map((post) => <PostCard key={post.slug} {...post} />)}
      </div>
    </section>
  );
};

export default RecentPosts;
