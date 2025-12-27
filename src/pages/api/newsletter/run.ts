import type { NextApiRequest, NextApiResponse } from "next";
import sendNewsletterJob from "@/cron/sendNewsletter";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const key = (req.headers["x-admin-key"] as string) || req.query.key || null;
  if (!key || key !== process.env.NEWSLETTER_RUN_KEY) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const runType = (req.query.type as "daily" | "weekly") || "daily";

  try {
    await sendNewsletterJob({ runType });
    return res.status(200).json({ success: true, message: `Newsletter ${runType} run complete` });
  } catch (err) {
    console.error("run error", err);
    return res.status(500).json({ success: false, message: "Job failed" });
  }
}
