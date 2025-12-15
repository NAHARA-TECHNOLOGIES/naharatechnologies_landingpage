import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";

export interface PostResponse {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  publishedAt: string;
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

    const rawLimit = Number(req.query.limit);
    const limit =
      Number.isInteger(rawLimit) && rawLimit > 0 && rawLimit <= 50
        ? rawLimit
        : 10;

    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("category", "name")
      .lean();

    const posts: PostResponse[] = blogs.map((blog: any) => ({
      slug: blog._id.toString(),
      title: blog.title,
      excerpt:
        typeof blog.content === "string"
          ? blog.content.slice(0, 120)
          : JSON.stringify(blog.content).slice(0, 120),
      image: blog.featuredImage || "/placeholder.jpg",
      category: blog.category?.name || "General",
      publishedAt: new Date(blog.createdAt).toISOString(),
    }));

    return res.status(200).json(posts);
  } catch (error) {
    console.error(" Failed to fetch posts:", error);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
}
