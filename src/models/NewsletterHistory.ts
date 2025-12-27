import mongoose from "mongoose";

const NewsletterHistorySchema = new mongoose.Schema({
  dateKey: { type: String, unique: true },
  runType: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.NewsletterHistory ||
  mongoose.model("NewsletterHistory", NewsletterHistorySchema);
