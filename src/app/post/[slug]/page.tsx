
import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mockPosts } from "@/mock/post";
import { Post } from "@/types/post";
import ClientPostPage from "@/components/SinglePostClient";
async function getPost(slug: string): Promise<Post | null> {
  const post = mockPosts.find((p) => p.slug === slug);
  return post || null;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Nahara Technologies Blog",
      description: "Explore insightful technology updates from Nahara Technologies.",
    };
  }

  return {
    title: `${post.title} | Nahara Technologies Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.image || "/default-thumbnail.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function SinglePostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return <ClientPostPage post={post} />;
}
