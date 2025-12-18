import type { NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
import Category from "@/models/Category";
import { verifyToken, requireAdmin, AuthRequest } from "@/lib/verifyToken";

function generateExcerpt(content: string, length = 120) {
  try {
    const data = JSON.parse(content);
    if (!data.blocks) return "";
    return data.blocks
      .map((b: any) => b.data?.text || "")
      .join(" ")
      .slice(0, length);
  } catch {
    return "";
  }
}

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // 1. Verify Token
  const authCheck = verifyToken(req, res);
  if (!authCheck.ok) return;

  // 2. Ensure Admin
  const adminCheck = requireAdmin(req, res);
  if (!adminCheck.ok) return;

  try {
    await connectDB();
    const { title, content, tags, category, featuredImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

    // Ensure category exists
    let categoryId = null;
    if (category) {
      const foundCategory = await Category.findOne({
        $or: [
          { name: new RegExp(`^${category}$`, "i") },
          { slug: new RegExp(`^${category}$`, "i") },
        ],
      });

      categoryId = foundCategory
        ? foundCategory._id
        : (await Category.create({
            name: category,
            slug: category.toLowerCase().replace(/\s+/g, "-"),
          }))._id;
    }

    // Store content as JSON string
    const contentString = JSON.stringify(content);

    const newPost: IBlog = await Blog.create({
      title,
      content: contentString,
      excerpt: generateExcerpt(contentString),
      author: req.user?.id,
      tags,
      category: categoryId,
      featuredImage,
      slug: title.toLowerCase().replace(/\s+/g, "-"),
    });

    return res.status(201).json({
      message: "Blog created successfully",
      post: newPost,
    });
  } catch (error) {
    console.error("Create Blog Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
