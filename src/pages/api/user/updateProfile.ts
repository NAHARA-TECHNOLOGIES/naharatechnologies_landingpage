import type { NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import { AuthRequest, verifyToken } from "@/lib/verifyToken";

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  // Allow only PUT
  if (req.method !== "PUT") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  //  Verify token
  const verified = verifyToken(req, res);
  if (!verified.ok) {
    return res.status(401).json({
      success: false,
      message:  "Unauthorized",
    });
  }

  try {
    await connectDB();

    const { username, bio, profileImage } = req.body;

    // Validate input
    if (!username || typeof username !== "string") {
      return res.status(400).json({
        success: false,
        message: "Username is required and must be a string",
      });
    }

    //  Prepare fields dynamically (avoid overwriting empty fields)
    const updates: Record<string, any> = {};
    if (username.trim()) updates.username = username.trim();
    if (bio !== undefined) updates.bio = bio;
    if (profileImage !== undefined) updates.profileImage = profileImage;

    // Prevent empty update calls
    if (Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        message: "No update fields provided",
      });
    }

    //  Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      updates,
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Success response
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
