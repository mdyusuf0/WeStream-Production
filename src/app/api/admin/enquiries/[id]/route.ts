import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectToDatabase } from "../../../../../lib/db";
import { ContactSubmission } from "../../../../../models/ContactSubmission";
import { authOptions } from "../../../../../lib/auth";

// PATCH: Update contact submission status (e.g., NEW -> READ or ARCHIVED)
export async function PATCH(
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

    // 2. Parse and Validate request payload
    const { status } = await req.json();
    if (!status || !["NEW", "READ", "ARCHIVED"].includes(status)) {
      return NextResponse.json({ error: "Invalid status value" }, { status: 400 });
    }

    await connectToDatabase();

    // 3. Update the record
    const enquiry = await ContactSubmission.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!enquiry) {
      return NextResponse.json({ error: "Contact submission not found" }, { status: 404 });
    }

    // Recalculate unread badge count
    const unreadCount = await ContactSubmission.countDocuments({ status: "NEW" });

    return NextResponse.json({ 
      success: true, 
      enquiry, 
      unreadCount 
    });
  } catch (error: any) {
    console.error("PATCH enquiry status failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE: Hard delete contact submissions (for spam/tests)
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

    // 2. Delete the record
    const deleted = await ContactSubmission.findByIdAndDelete(id);
    if (!deleted) {
      return NextResponse.json({ error: "Contact submission not found" }, { status: 404 });
    }

    // Recalculate unread badge count
    const unreadCount = await ContactSubmission.countDocuments({ status: "NEW" });

    return NextResponse.json({ 
      success: true, 
      message: "Submission deleted successfully.",
      unreadCount 
    });
  } catch (error: any) {
    console.error("DELETE enquiry failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
