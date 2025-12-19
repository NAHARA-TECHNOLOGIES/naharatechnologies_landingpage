import type { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import Newsletter from "@/models/Newsletter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { token, email } = req.query;
  if (!token || !email) return res.status(400).json({ success: false, message: "Missing token or email" });

  try {
    await connectDB();
    const sub = await Newsletter.findOne({ email: String(email).toLowerCase(), confirmationToken: String(token) });
    if (!sub) return res.status(404).json({ success: false, message: "Subscriber not found" });

    sub.confirmed = true;
    sub.confirmationToken = null;
    await sub.save();

    return res.status(200).json({ success: true, message: "Subscription confirmed" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
