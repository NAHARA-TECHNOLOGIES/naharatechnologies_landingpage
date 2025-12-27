import mongoose, { Document, Model, Schema } from "mongoose";

export interface INewsletterSubscriber extends Document {
  email: string;
  frequency: "daily" | "weekly" | string;
  category: string;
  unsubscribed: boolean;
  confirmed: boolean;
  confirmationToken?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema = new Schema<INewsletterSubscriber>(
  {
    email: { type: String, required: true, unique: true, index: true },
    frequency: { type: String, enum: ["daily", "weekly"], default: "weekly" },
    category: { type: String, default: "Technology" },
    unsubscribed: { type: Boolean, default: false },
    confirmed: { type: Boolean, default: false },
    confirmationToken: { type: String, default: null },
  },
  { timestamps: true }
);

const Newsletter: Model<INewsletterSubscriber> =
  (mongoose.models.Newsletter as Model<INewsletterSubscriber>) ||
  mongoose.model<INewsletterSubscriber>("Newsletter", NewsletterSchema);

export default Newsletter;
