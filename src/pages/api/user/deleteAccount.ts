import type { NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import { AuthRequest, verifyToken } from "@/lib/verifyToken";

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  if (req.method !== "DELETE") return res.status(405).json({ message: "Method not allowed" });

  const verified = verifyToken(req, res);
  if (!verified.ok) return;

  try {
    await connectDB();
    const user = await User.findByIdAndDelete(req.user?.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Delete account error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
