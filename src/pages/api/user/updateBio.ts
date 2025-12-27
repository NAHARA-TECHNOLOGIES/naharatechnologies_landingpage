import type { NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import { AuthRequest, verifyToken } from "@/lib/verifyToken";

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  if (req.method !== "PATCH") return res.status(405).json({ message: "Method not allowed" });

  const verified = verifyToken(req, res);
  if (!verified.ok) return;

  try {
    await connectDB();
    const { bio } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      { bio },
      { new: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "Bio updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update bio error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
