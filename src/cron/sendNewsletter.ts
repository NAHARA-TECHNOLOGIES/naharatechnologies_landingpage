import { connectDB } from "@/lib/dbConnect";
import Newsletter from "@/models/Newsletter";
import Post from "@/models/Blog";
import NewsletterHistory from "@/models/NewsletterHistory";
import nodemailer from "nodemailer";
import { buildNewsletterHtml } from "@/lib/emailTemplates";

const BATCH_SIZE = Number(process.env.BATCH_SIZE || 50);
const BATCH_DELAY_MS = Number(process.env.BATCH_DELAY_MS || 2000);
const PER_RECIPIENT_POST_LIMIT_DAILY = 5;
const PER_RECIPIENT_POST_LIMIT_WEEKLY = 15;

function createTransporter() {
  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    throw new Error("SMTP not configured");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendBatch(transporter: nodemailer.Transporter, batch: any[]) {
  await Promise.all(
    batch.map(async (job) => {
      try {
        await transporter.sendMail(job);
      } catch (err) {
        console.error("sendMail error", err);
      }
    })
  );
}

export const handler = async (event: any) => {
  const runType: "daily" | "weekly" = event?.runType || "daily";

  await connectDB();

  const dateKey = `${new Date().toISOString().slice(0, 10)}-${runType}`;
  const alreadySent = await NewsletterHistory.findOne({ dateKey });

  if (alreadySent) {
    return { statusCode: 200, body: `Skipped: already sent ${runType} for ${dateKey}` };
  }

  await NewsletterHistory.create({ dateKey, runType });

  const transporter = createTransporter();

  const subscribers = await Newsletter.find({
    confirmed: true,
    unsubscribed: false,
    frequency: runType,
  }).lean();

  if (!subscribers.length) {
    return { statusCode: 200, body: `No subscribers for ${runType}` };
  }

  const byCategory: Record<string, any[]> = {};
  for (const s of subscribers) {
    byCategory[s.category] = byCategory[s.category] || [];
    byCategory[s.category].push(s);
  }

  const jobs: any[] = [];

  for (const category of Object.keys(byCategory)) {
    const limit =
      runType === "daily"
        ? PER_RECIPIENT_POST_LIMIT_DAILY
        : PER_RECIPIENT_POST_LIMIT_WEEKLY;

    const posts = await Post.find({
      category,
      published: true,
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    if (!posts.length) continue;

    const postsForTemplate = posts.map((p: any) => ({
      title: p.title,
      excerpt:
        typeof p.content === "string"
          ? p.content.slice(0, 200)
          : JSON.stringify(p.content).slice(0, 200),
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/post/${p.slug || p._id}`,
    }));

    for (const sub of byCategory[category]) {
      let html = buildNewsletterHtml({
        recipientName: sub.name ?? undefined,
        category,
        posts: postsForTemplate,
      });

      html = html
        .replace("{{EMAIL_PLACEHOLDER}}", encodeURIComponent(sub.email))
        .replace("{{LOGO_URL}}", process.env.NEWSLETTER_LOGO_URL ?? "")
        .replace("{{HERO_URL}}", process.env.NEWSLETTER_HERO_URL ?? "");

      jobs.push({
        from: process.env.NEWSLETTER_FROM_EMAIL,
        to: sub.email,
        subject: `${category} updates — ${runType}`,
        html,
      });
    }
  }

  for (let i = 0; i < jobs.length; i += BATCH_SIZE) {
    const batch = jobs.slice(i, i + BATCH_SIZE);
    console.log(`Sending batch ${Math.floor(i / BATCH_SIZE) + 1}`);
    await sendBatch(transporter, batch);

    if (i + BATCH_SIZE < jobs.length) {
      await new Promise((r) => setTimeout(r, BATCH_DELAY_MS));
    }
  }

  return { statusCode: 200, body: `Sent ${jobs.length} emails for ${runType}` };
};

export default handler;
