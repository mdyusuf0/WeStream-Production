import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(req: NextRequest) {
  const path = req.nextUrl.pathname;

  // Check if it is a protected admin dashboard or admin API route
  const isAdminPath = path.startsWith("/admin") && path !== "/admin/login";
  const isAdminApiPath = path.startsWith("/api/admin");

  if (isAdminPath || isAdminApiPath) {
    const token = await getToken({ req, secret: process.env.SECRET_KEY || process.env.NEXTAUTH_SECRET });
    
    // Validate role
    const hasAdminRole = token?.role === "SYSTEM_ADMIN";

    if (!token || !hasAdminRole) {
      if (isAdminApiPath) {
        return NextResponse.json({ error: "Unauthorized: Access Denied." }, { status: 401 });
      }
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  // Apply proxy interceptor to all admin layouts, pages, and api endpoints
  matcher: [
    "/admin/:path*",
    "/api/admin/:path*"
  ],
};
