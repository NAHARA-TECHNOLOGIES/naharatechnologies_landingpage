import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import Blog, { IBlog } from "@/models/Blog";
export default async function handler(req:NextApiRequest,res:NextApiResponse){
    if(req.method !== 'POST'){
        return res.status(405).json({message: "message not allowed"})
    }
    try{
        await connectDB();
        const { title, content, author, tags, category, featuredImage } = req.body;
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required." });
          }
        const newPost:IBlog = await Blog.create({
            title,
            content,
            author,
            tags,
            category,
            featuredImage
        })
        return res.status(201).json({
            message: "blog created successfully",
            post:newPost,
        })
      
    }catch(error){
        console.error("Create Blog Error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }

}