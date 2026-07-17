import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { v2 as cloudinary } from "cloudinary";
import { authOptions } from "../../../../lib/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: Request) {
  try {
    // 1. Session & Role Validation
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Parse request body
    const body = await req.json();
    const { paramsToSign } = body;

    if (!paramsToSign) {
      return NextResponse.json({ error: "Missing parameters to sign" }, { status: 400 });
    }

    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!apiSecret) {
      return NextResponse.json({ error: "Cloudinary configuration is missing on the server" }, { status: 500 });
    }

    // 3. Generate Cloudinary Signature
    const signature = cloudinary.utils.api_sign_request(paramsToSign, apiSecret);

    return NextResponse.json({ signature });
  } catch (error: any) {
    console.error("Cloudinary signature generation failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
