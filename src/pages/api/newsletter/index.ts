import type { NextApiRequest, NextApiResponse } from "next";
import {connectDB} from "@/lib/dbConnect";
import Newsletter from "@/models/Newsletter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") return res.status(405).json({ success: false, message: "Method not allowed" });

  const key = req.headers["x-admin-key"] || req.query.admin_key;
  if (!key || key !== process.env.NEWSLETTER_ADMIN_KEY) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    await connectDB();
    const subscribers = await Newsletter.find().sort({ createdAt: -1 }).lean().limit(200);
    return res.status(200).json({ success: true, subscribers });
  } catch (err) {
    console.error("newsletter list error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
