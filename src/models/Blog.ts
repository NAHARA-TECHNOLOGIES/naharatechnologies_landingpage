import mongoose, { Document, Schema } from "mongoose";

export interface IBlog extends Document {
  title: string;
  content: any;
  author: mongoose.Schema.Types.ObjectId;
  tags?: string[];
  category?: mongoose.Schema.Types.ObjectId;
  featuredImage?: string;
  createdAt: Date;
}

const BlogSchema = new Schema<IBlog>({
  title: {
    type: String,
    required: true,
  },

  content: {
    type: Schema.Types.Mixed, 
    required: true,
  },

  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  tags: [String],

  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
  },

  featuredImage: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});


export default mongoose.models.Blog
  ? mongoose.deleteModel("Blog") && mongoose.model<IBlog>("Blog", BlogSchema)
  : mongoose.model<IBlog>("Blog", BlogSchema);
