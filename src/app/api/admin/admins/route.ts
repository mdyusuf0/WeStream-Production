import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import bcrypt from "bcrypt";
import { connectToDatabase } from "../../../../lib/db";
import { User } from "../../../../models/User";
import { authOptions } from "../../../../lib/auth";

// GET: List all administrators (excludes password hashes)
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectToDatabase();
    const admins = await User.find({}, "email role createdBy createdAt").sort({ createdAt: -1 });
    
    return NextResponse.json(admins);
  } catch (error: any) {
    console.error("GET admins list failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Add a new administrator account (authenticated admins only)
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    await connectToDatabase();

    const normalizedEmail = email.toLowerCase().trim();

    // Check if user already exists
    const existing = await User.findOne({ email: normalizedEmail });
    if (existing) {
      return NextResponse.json({ error: "An admin account with this email already exists" }, { status: 400 });
    }

    // Hash the password and save
    const hashedPassword = await bcrypt.hash(password, 12);
    const newAdmin = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      role: "SYSTEM_ADMIN",
      createdBy: session.user?.email || "system",
    });

    return NextResponse.json({
      success: true,
      admin: {
        id: newAdmin._id.toString(),
        email: newAdmin.email,
        role: newAdmin.role,
        createdBy: newAdmin.createdBy,
        createdAt: newAdmin.createdAt,
      }
    });
  } catch (error: any) {
    console.error("POST add admin failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
