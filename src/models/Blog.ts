import mongoose, { Document, Schema, Model } from "mongoose";

export interface IBlog extends Document {
    title: string;
    content: string;
    author?: string;
    tags?: string[];
    category?: mongoose.Schema.Types.ObjectId;
    featuredImage?: string;
    createdAt: Date;
  }
const BlogSchema:Schema<IBlog>  = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    default: "Admin",
  },
  tags: [String],
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  // category: String,
  featuredImage: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Blog || mongoose.model("Blog", BlogSchema);
