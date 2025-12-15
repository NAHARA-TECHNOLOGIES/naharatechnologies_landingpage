// pages/api/user/getUser/[userName].ts
import type { NextApiResponse } from 'next';
import { connectDB } from '@/lib/dbConnect';
import User from '@/models/User';
import type { AuthRequest } from '@/lib/verifyToken';
import { verifyToken } from '@/lib/verifyToken';

export default async function handler(req: AuthRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).json({ message: 'Method not allowed' });

  // Disable caching to avoid 304
  res.setHeader('Cache-Control', 'no-store');

  const auth = verifyToken(req, res);
  if (!auth.ok) return;

  try {
    await connectDB();
    const { userName } = req.query;

    if (!userName) return res.status(400).json({ message: 'Username is required' });

    const user = await User.findOne({ username: userName.toString() }).select(
      'username email profilePicture bio createdAt'
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    const initials =
      !user.profilePicture && user.username
        ? `${user.username[0]}${user.username[user.username.length - 1]}`.toUpperCase()
        : null;

    return res.status(200).json({ user: { ...user.toObject(), initials } });
  } catch (err) {
    console.error('Get user error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
