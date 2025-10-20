// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const blogHome = new URL("/blog", req.url);

  if (!token) {
    blogHome.searchParams.set("error", "not_permitted");
    return NextResponse.redirect(blogHome);
  }

  try {
    const payload = JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
    if (payload.role !== "ADMIN") {
      blogHome.searchParams.set("error", "not_permitted");
      return NextResponse.redirect(blogHome);
    }
  } catch {
    blogHome.searchParams.set("error", "not_permitted");
    return NextResponse.redirect(blogHome);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/create-post"],
};
