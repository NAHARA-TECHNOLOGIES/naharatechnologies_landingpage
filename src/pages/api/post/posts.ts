import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import "@/models/Category"; 

interface PostResponse {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  tags: string[];
  publishedAt: string;
}

function extractPlainText(content: any): string {
  if (!content) return "";

  let data = content;

  if (typeof content === "string") {
    try {
      data = JSON.parse(content);
    } catch {
      return content.slice(0, 120);
    }
  }

  if (!Array.isArray(data.blocks)) return "";

  return data.blocks
    .map((b: any) => b.data?.text || "")
    .join(" ")
    .trim()
    .slice(0, 120);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse[] | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    await connectDB();

    const limit = Math.min(Number(req.query.limit) || 10, 50);

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("category", "name")
      .lean();

    const posts: PostResponse[] = blogs.map((blog: any) => ({
      slug: blog.slug || blog._id.toString(),
      title: blog.title,
      excerpt: extractPlainText(blog.content),
      image:
        typeof blog.featuredImage === "string" &&
        blog.featuredImage.startsWith("blob:")
          ? "/placeholder.jpg"
          : blog.featuredImage || "/placeholder.jpg",
      category: blog.category?.name || "General",
      tags: blog.tags || [],
      publishedAt: blog.createdAt?.toISOString(),
    }));

    return res.status(200).json(posts);
  } catch (err) {
    console.error("❌ Failed to fetch posts:", err);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
}
