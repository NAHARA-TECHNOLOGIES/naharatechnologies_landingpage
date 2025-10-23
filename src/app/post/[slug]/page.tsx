import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CallToAction from "@/components/CallToAction";
import { Button } from "@/components/ui/Button"; 
import { mockPosts } from "@/mock/post"; 
import { Post } from "@/types/post";
import RecentPosts from "@/components/post/RecentPost";
import AdSection from "@/components/AdSection"; 


async function getPost(slug: string): Promise<Post | null> {
  const post = mockPosts.find((p) => p.slug === slug);
  return post || null;
}

// async function getPost(slug: string) {
//   try {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/posts/1`, {
//       method: "GET",
//       cache: "no-store",
//     });

//     if (!res.ok) throw new Error("Failed to fetch post");

//     const data = await res.json();

//     return {
//       slug,
//       title: data.title || "Untitled Post",
//       content: `<p>${data.body}</p>`,
//       image:
//         "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=1200&auto=format&fit=crop&q=60",
//       category: "Technology",
//       author: "Nahara Team",
//       publishedAt: new Date().toISOString(),
//       excerpt: data.body.slice(0, 120) + "...",
//     };
//   } catch (err) {
//     console.error("❌ Error fetching post:", err);
//     return null;
//   }
// }

// ⚙️ Generate dynamic SEO metadata per post
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  return {
    title: post
      ? `${post.title} | Nahara Technologies Blog`
      : "Post Not Found",
    description: post
      ? post.excerpt
      : "Explore insightful technology updates from Nahara Technologies.",
    openGraph: {
      title: post?.title,
      description: post?.excerpt,
      images: [
        {
          url: post?.image || "/default-thumbnail.jpg",
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
    },
  };
}

// 📰 Single Post Page
export default async function SinglePost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="p-4 flex flex-col max-w-5xl mx-auto min-h-screen">
      {/* Post Title */}
      <h1 className="text-3xl lg:text-5xl font-bold text-center mt-10 leading-tight">
        {post.title}
      </h1>

      {/* Category */}
      <div className="flex justify-center mt-4">
        <Link href={`/search?category=${post.category}`}>
          <Button variant="outline" size="sm" className="rounded-full">
            {post.category}
          </Button>
        </Link>
      </div>

      {/* Post Image */}
      <div className="relative w-full h-[400px] mt-8 rounded-2xl overflow-hidden shadow-md">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Meta Info */}
       <div className="flex justify-between items-center mt-6 text-sm text-gray-500 border-b pb-3">
        <span>By {post.author}</span>
        <span className="italic">
          {post?.content
            ? `${Math.ceil(post.content.length / 1200)} min read`
            : ""}
        </span>
        <span>
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
        
      <article
        className="prose dark:prose-invert max-w-none mt-8 leading-relaxed text-lg"
      dangerouslySetInnerHTML={{ __html: post.content || "" }}
      />

       <section className="mt-16">
      <AdSection />
    </section>

      <section className="mt-16">
        <CallToAction />
      </section>
      <section className="mt-16">
      <RecentPosts limit={3} />
    </section>
    </main>
  );
}
