
// import { NextApiRequest, NextApiResponse } from "next";
// import { connectDB } from "@/lib/dbConnect";
// import Blog, { IBlog } from "@/models/Blog";
// import Category from "@/models/Category";

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ message: "Method not allowed" });
//   }

//   try {
    
//     await connectDB();
//     const { title, content, author, tags, category, featuredImage } = req.body;

//     if (!title || !content) {
//       return res.status(400).json({ message: "Title and content are required." });
//     }
//     let categoryId = null;
//     if (category) {
//       const foundCategory = await Category.findOne({
//         $or: [
//           { name: new RegExp(`^${category}$`, "i") },
//           { slug: new RegExp(`^${category}$`, "i") },
//         ],
//       });

//       if (!foundCategory) {
//         // Create new category if it doesn't exist
//         const newCategory = await Category.create({
//           name: category,
//           slug: category.toLowerCase().replace(/\s+/g, "-"),
//         });
//         categoryId = newCategory._id;
//       } else {
//         categoryId = foundCategory._id;
//       }
//     }

//     //then create a blog post
//     const newPost: IBlog = await Blog.create({
//       title,
//       content,
//       author,
//       tags,
//       category: categoryId,
//       featuredImage,
//     });

//     //return success response
//     return res.status(201).json({
//       message: "Blog created successfully",
//       post: newPost,
//     });
//   } catch (error) {
//     console.error("Create Blog Error:", error);
//     return res.status(500).json({ message: "Internal server error" });
//   }
// }
import type { NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
import Category from "@/models/Category";
import { verifyToken, requireAdmin, AuthRequest } from "@/lib/verifyToken";

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
    const { title, content, author, tags, category, featuredImage } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required." });
    }

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

    const newPost: IBlog = await Blog.create({
      title,
      content,
      author: req.user?.id,
      tags,
      category: categoryId,
      featuredImage,
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
