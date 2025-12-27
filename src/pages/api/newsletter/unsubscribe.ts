import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import Newsletter from "@/models/Newsletter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST" && req.method !== "GET") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const email = (req.method === "GET" ? req.query.email : req.body?.email) as string | undefined;

  if (!email) {
    return res.status(400).json({ success: false, message: "Email is required" });
  }

  try {
    await connectDB();
    
    const deleted = await Newsletter.findOneAndDelete({ email: email.trim().toLowerCase() });
    
    if (!deleted) {
      return res.status(404).json({ success: false, message: "Subscriber not found" });
    }

    return res.status(200).json({ success: true, message: "Successfully unsubscribed and removed from the list" });
  } catch (err) {
    console.error("unsubscribe error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
