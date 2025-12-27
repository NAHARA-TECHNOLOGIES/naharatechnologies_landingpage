import type { NextApiRequest, NextApiResponse } from "next";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { connectDB } from "@/lib/dbConnect";
import Newsletter from "@/models/Newsletter";
import { buildNewsletterHtml } from "@/lib/newsletterConfirmationTemplate";


type Data = { success: boolean; message?: string; subscriber?: any };

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_PER_WINDOW = 6;
const ipMap = new Map<string, { count: number; start: number }>();
const BRAND_COLOR = "#991B1B"; 
const BRAND_NAME = "Nahara Technologies Plc";

function rateLimit(req: NextApiRequest) {
  const ip = (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress || "unknown";
  const entry = ipMap.get(ip);
  const now = Date.now();
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW_MS) {
    ipMap.set(ip, { count: 1, start: now });
    return true;
  }
  if (entry.count >= MAX_PER_WINDOW) return false;
  entry.count += 1;
  ipMap.set(ip, entry);
  return true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") return res.status(405).json({ success: false, message: "Method not allowed" });

  if (!rateLimit(req)) {
    return res.status(429).json({ success: false, message: "Too many requests, try again later." });
  }

  const { email, frequency = "weekly", category = "Technology" } = req.body ?? {};

  if (!email || typeof email !== "string" || !email.includes("@")) {
    return res.status(400).json({ success: false, message: "Valid email is required" });
  }

  const normEmail = email.trim().toLowerCase();

  try {
    await connectDB();

    // find subscriber
    let subscriber = await Newsletter.findOne({ email: normEmail });

    if (subscriber) {
      // if already confirmed, block duplicate subscription
      if (subscriber.confirmed) {
        return res.status(200).json({ success: true, message: "This email is already subscribed." });
      }

      // if unsubscribed, re-enable
      if (subscriber.unsubscribed) subscriber.unsubscribed = false;

      subscriber.frequency = frequency;
      subscriber.category = category;

      // generate new confirmation token if not confirmed
      subscriber.confirmationToken = crypto.randomBytes(20).toString("hex");
      await subscriber.save();
    } else {
      subscriber = await Newsletter.create({
        email: normEmail,
        frequency,
        category,
        confirmationToken: crypto.randomBytes(20).toString("hex"),
        confirmed: false,
      });
    }

    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.NEWSLETTER_FROM_EMAIL) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const confirmationUrl = `${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/newsletter/confirm?token=${subscriber.confirmationToken}&email=${encodeURIComponent(
    normEmail
  )}`;

  // Correct mailOptions
  const mailOptions = {
    from: process.env.NEWSLETTER_FROM_EMAIL,
    to: normEmail,
    subject: `Confirm your subscription to ${BRAND_NAME}`,
  html: buildNewsletterHtml({
  recipientName: "Subscriber", // or normEmail
  confirmationUrl,
  email: subscriber.email,
  frequency: subscriber.frequency,
  category,
  brandColor: BRAND_COLOR,
  logoUrl: "https://yourdomain.com/logo.png",
  heroImageUrl: "https://yourdomain.com/hero.png",
  unsubscribeUrl: `http://localhost:3000/api/newsletter/unsubscribe?email=${encodeURIComponent(subscriber.email)}`,
}),


  };

  transporter.sendMail(mailOptions).catch((err: unknown) => {
    console.error("Newsletter confirmation email failed:", err);
  });
}


    return res.status(200).json({
      success: true,
      message: "Subscribed (check email to confirm if configured)",
      subscriber: { email: subscriber.email, frequency: subscriber.frequency, category: subscriber.category },
    });
  } catch (err: any) {
    console.error("subscribe error:", err);

    // handle unique index violation gracefully
    if (err.code === 11000) {
      return res.status(200).json({ success: true, message: "Already subscribed" });
    }

    return res.status(500).json({ success: false, message: "Server error" });
  }
}
