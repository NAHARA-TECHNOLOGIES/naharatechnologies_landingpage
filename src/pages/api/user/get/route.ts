import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { adminId } = await req.json();

  if (!adminId) {
    return NextResponse.json({ message: 'Missing adminId' }, { status: 400 });
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/users`);
  const users = await response.json();

  return NextResponse.json({ users });
}
