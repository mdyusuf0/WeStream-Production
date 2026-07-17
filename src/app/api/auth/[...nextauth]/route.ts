import NextAuth from "next-auth";
import { authOptions } from "../../../../lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { rateLimitLoginBefore, rateLimitLoginAfter } from "../../../../lib/rateLimit";

const nextAuthHandler = NextAuth(authOptions);

export async function GET(req: NextRequest, ctx: { params: Promise<{ nextauth: string[] }> }) {
  return nextAuthHandler(req, ctx);
}

export async function POST(req: NextRequest, ctx: { params: Promise<{ nextauth: string[] }> }) {
  const url = req.nextUrl.pathname;
  
  // Intercept credentials callback to enforce rate-limiting
  if (url.includes("/callback/credentials")) {
    const clone = req.clone();
    let email = "";
    
    try {
      const body = await clone.formData();
      email = body.get("email")?.toString() || "";
    } catch (err) {
      // Body parsing might fail, proceed
    }

    // 1. Run rate-limit precheck
    const blockCheck = await rateLimitLoginBefore(req, email);
    if (blockCheck.blocked) {
      // If blocked, return a JSON error or redirect to login page with blocked error
      const res = NextResponse.redirect(new URL(`/admin/login?error=Blocked`, req.url));
      return res;
    }

    // 2. Perform NextAuth login check
    const response = await nextAuthHandler(req, ctx);

    // 3. Inspect if login failed
    const redirectLocation = response.headers.get("location");
    if (redirectLocation && (redirectLocation.includes("error=CredentialsSignin") || redirectLocation.includes("error="))) {
      // Login failed, track attempt
      const result = await rateLimitLoginAfter(req, email);
      if (result.shouldBlock) {
        const res = NextResponse.redirect(new URL(`/admin/login?error=Blocked`, req.url));
        res.cookies.set("ws_block_token", result.blockToken, {
          httpOnly: true,
          path: "/",
          maxAge: 600, // 10 minutes
          sameSite: "strict",
        });
        return res;
      }
    }

    return response;
  }

  return nextAuthHandler(req, ctx);
}
