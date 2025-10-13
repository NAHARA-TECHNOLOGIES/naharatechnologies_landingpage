import { connectDB } from "@/lib/dbConnect";
import Blog from "@/models/Blog";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req:NextApiRequest,res:NextApiResponse){
    const {id} = req.query;
    if(req.method === 'DELETE'){
        await connectDB();
        const postId=await Blog.findByIdAndDelete(id);
        if(!postId){
            return res.status(404).json({ message: "Post not found" });
        }
        res.status(200).json({message:"post deleted successfully",postId})
    }
    if (req.method === "PATCH") {
        const updatedPost = await Blog.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
      
        if (!updatedPost)
          return res.status(404).json({ message: "Post not found" });
      
        return res.status(200).json({
          message: "Blog post updated successfully",
          post: updatedPost,
        });
      }
      
    if(req.method !== 'GET'){
        return res.status(405).json({message: "message not allowed"})
    }

    try{
        await connectDB();
        const postId = await Blog.findById(id);
       
        if(!postId){
            return res.status(404).json({message: "post not found!"})
        }
        return res.status(201).json({postId})
    }catch(error){
        console.error("get post ID error:",error)
        res.status(500).json({ message: "Internal server error" });
    }
}