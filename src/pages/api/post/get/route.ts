import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: NextRequest) {
  const { userId } = await req.json();

  if (!userId) {
    return NextResponse.json({ message: 'Missing userId' }, { status: 400 });
  }

  const response = await fetch(`${process.env.BACKEND_URL}/api/posts/${userId}`);
  const posts = await response.json();

  return NextResponse.json({ posts });
}
