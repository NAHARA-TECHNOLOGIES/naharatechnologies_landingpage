import type { NextApiResponse } from "next";
import { AuthRequest, verifyToken } from "@/lib/verifyToken";

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ message: "Method not allowed" });

  const verified = verifyToken(req, res);
  if (!verified.ok) return;

  try {
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
