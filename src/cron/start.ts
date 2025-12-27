import cron from "node-cron";
import sendNewsletterJob from "./sendNewsletter";
import { log } from "@/lib/logger";


log("Starting local newsletter scheduler...");

cron.schedule("0 8 * * *", async () => {
  try {
    log("[cron] master scheduler triggered");

    const today = new Date();
    const day = today.getDay(); // 1 = Monday

    log("[cron] running daily job");
    await sendNewsletterJob({ runType: "daily" });

    if (day === 1) {
      console.log("[cron] running weekly job");
      await sendNewsletterJob({ runType: "weekly" });
    }

    log("[cron] done for today");
  } catch (err) {
    console.error("[cron] scheduler error:", err);
  }
});

if (require.main === module) {
  log("[cron] scheduler active (local)");
}
