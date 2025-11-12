import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";

export interface AuthRequest extends NextApiRequest {
  user?: { id: string; role: string };
}

export function verifyToken(req: AuthRequest, res: NextApiResponse): { ok: boolean } {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: "No token provided" });
    return { ok: false };
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded as { id: string; role: string };
    return { ok: true };
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
    return { ok: false };
  }
}

export function requireAdmin(req: AuthRequest, res: NextApiResponse): { ok: boolean } {
  if (req.user?.role !== "ADMIN") {
    res.status(403).json({ message: "Admins only" });
    return { ok: false };
  }
  return { ok: true };
}
