import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectToDatabase } from "../../../../../lib/db";
import { User } from "../../../../../models/User";
import { authOptions } from "../../../../../lib/auth";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    // 1. Session check
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    await connectToDatabase();

    // 2. Locate target user
    const targetUser = await User.findById(id);
    if (!targetUser) {
      return NextResponse.json({ error: "Target administrator not found" }, { status: 404 });
    }

    // Safety Rule 1: Prevent self-deletion
    if (targetUser.email.toLowerCase() === session.user?.email?.toLowerCase()) {
      return NextResponse.json(
        { error: "Lockout protection: You cannot delete your own active administrator session." },
        { status: 400 }
      );
    }

    // Safety Rule 2: Prevent deleting the last remaining admin
    const totalAdminsCount = await User.countDocuments({ role: "SYSTEM_ADMIN" });
    if (totalAdminsCount <= 1) {
      return NextResponse.json(
        { error: "Lockout protection: The database must retain at least one administrator account." },
        { status: 400 }
      );
    }

    // 3. Delete user
    await User.findByIdAndDelete(id);

    return NextResponse.json({ 
      success: true, 
      message: "Administrator removed successfully." 
    });
  } catch (error: any) {
    console.error("DELETE admin endpoint failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
