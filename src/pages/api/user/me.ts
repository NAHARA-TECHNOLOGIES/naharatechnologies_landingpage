import type { NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import { AuthRequest, verifyToken } from "@/lib/verifyToken";

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  // Allowed method
  if (req.method !== "GET") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed",
    });
  }

  const verified = verifyToken(req, res);
  if (!verified.ok) {
    return res.status(401).json({
      success: false,
      message:  "Unauthorized",
    });
  }

  try {
    // 2️⃣ Ensure DB connection
    await connectDB();

    // 3️⃣ Fetch user
    const user = await User.findById(req.user?.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 4️⃣ Success response
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Fetch user error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
