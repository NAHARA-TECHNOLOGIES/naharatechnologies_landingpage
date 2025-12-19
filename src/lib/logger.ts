import fs from "fs";
import path from "path";

const logFile = path.join(process.cwd(), "logs", "newsletter.log");

export function log(msg: string) {
  const line = `[${new Date().toISOString()}] ${msg}\n`;
  fs.appendFileSync(logFile, line);
  console.log(msg);
}
