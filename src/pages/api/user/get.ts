import type { NextApiResponse } from "next";
import type { AuthRequest } from "@/lib/verifyToken";
import { connectDB } from "@/lib/dbConnect";
import User from "@/models/User";
import { verifyToken, requireAdmin } from "@/lib/verifyToken";

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const auth = verifyToken(req, res);
  if (!auth.ok) return;

  const admin = requireAdmin(req, res);
  if (!admin.ok) return;

  try {
    await connectDB();

    const { limit = 5 } = req.body;

    const users = await User.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .select("username email profilePicture createdAt");

    const formattedUsers = users.map((user) => {
      const username = user.username || "User";
      const initials =
        username.length >= 2
          ? `${username[0]}${username[username.length - 1]}`.toUpperCase()
          : username[0]?.toUpperCase() || "U";

      return {
        _id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        profilePicture: user.profilePicture || null,
        initials: user.profilePicture ? null : initials,
      };
    });

    const totalUsers = await User.countDocuments();

    const lastMonth = new Date();
    lastMonth.setMonth(lastMonth.getMonth() - 1);

    const lastMonthUsers = await User.countDocuments({
      createdAt: { $gte: lastMonth },
    });

    return res.status(200).json({
      users: formattedUsers,
      totalUsers,
      lastMonthUsers,
    });
  } catch (err) {
    console.error("Fetch users error:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
}
