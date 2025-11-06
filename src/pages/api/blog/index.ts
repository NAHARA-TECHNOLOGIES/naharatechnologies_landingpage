import { connectDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import Category from "@/models/Category";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectDB();

    if (req.method === "DELETE") {
      await Blog.deleteMany({});
      return res.status(200).json({ message: "All blog posts deleted successfully" });
    }


    if (req.method === "GET") {
      const { category } = req.query;
      let filter: any = {};

      if (category) {
       
        const foundCategory = await Category.findOne({
          $or: [
            { slug: category.toString().toLowerCase() },
            { name: new RegExp(`^${category}$`, "i") },
          ],
        });
        if (!foundCategory) {
          return res.status(404).json({ message: "Category not found" });
        }
        filter.category = foundCategory._id;
      }

      const posts = await Blog.find(filter)
        .populate("category", "name slug")
        .sort({ createdAt: -1 });

      if (category) {
        return res.status(200).json({
          message: `Posts under category "${category}" fetched successfully.`,
          posts,
        });
      }
      return res.status(200).json({
        message: "All blog posts fetched successfully.",
        posts,
      });
    }

    // ✅ 4. Handle unsupported methods
    return res.status(405).json({ message: "Method not allowed" });
  } catch (error) {
    console.error("Blog error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
