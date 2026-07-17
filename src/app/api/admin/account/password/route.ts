import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import { authOptions } from "@/lib/auth";

export async function PATCH(req: Request) {
  try {
    // 1. Session check
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Parse request payload
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required." }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters long." }, { status: 400 });
    }

    await connectToDatabase();

    // 3. Locate database user
    const user = await User.findOne({ email: session.user?.email });
    if (!user) {
      return NextResponse.json({ error: "Administrator account not found." }, { status: 404 });
    }

    // 4. Validate current password against stored hash
    const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentValid) {
      return NextResponse.json({ error: "The current password you entered is incorrect." }, { status: 400 });
    }

    // 5. Hash new password and save
    user.password = await bcrypt.hash(newPassword, 12);
    await user.save();

    return NextResponse.json({ 
      success: true, 
      message: "Your password has been updated successfully." 
    });
  } catch (error: any) {
    console.error("PATCH password endpoint failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
