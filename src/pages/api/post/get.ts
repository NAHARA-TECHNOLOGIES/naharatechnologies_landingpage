import type { NextApiResponse } from "next";
import type { AuthRequest } from "@/lib/verifyToken";
import { connectDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { verifyToken, requireAdmin } from "@/lib/verifyToken";

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Auth
  const auth = verifyToken(req, res);
  if (!auth.ok) return;

  const admin = requireAdmin(req, res);
  if (!admin.ok) return;

  try {
    await connectDB();

    const { limit = 5 } = req.body;

    // ✅ Recent posts
    const posts = await Blog.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate("category", "name")
      .select("title featuredImage category");

    const formattedPosts = posts.map((post) => ({
      _id: post._id,
      title: post.title,
      image: post.featuredImage || "/placeholder.png",
      category: post.category ? (post.category as any).name : "Uncategorized",
    }));

    // ✅ Total posts
    const totalPosts = await Blog.countDocuments();

    // ✅ Last month posts
    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastMonthPosts = await Blog.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    // ✅ USE Category (fixes warning)
    const totalCategories = await Category.countDocuments();

    const categoriesWithPosts = await Blog.distinct("category");

    return res.status(200).json({
      posts: formattedPosts,
      totalPosts,
      lastMonthPosts,
      totalCategories,
      categoriesWithPosts: categoriesWithPosts.length,
    });
  } catch (err) {
    console.error("Fetch posts error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
