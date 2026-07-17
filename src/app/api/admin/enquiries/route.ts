import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectToDatabase } from "../../../../lib/db";
import { ContactSubmission } from "../../../../models/ContactSubmission";
import { authOptions } from "../../../../lib/auth";

export async function GET(req: Request) {
  try {
    // 1. Session check
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Parse query parameters
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const projectType = searchParams.get("projectType");
    const search = searchParams.get("search");

    await connectToDatabase();

    // 3. Build Mongo Query
    const query: any = {};

    if (status && status !== "ALL") {
      query.status = status;
    }
    if (projectType && projectType !== "ALL") {
      query.projectType = projectType;
    }
    if (search) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [
        { fullName: regex },
        { email: regex },
        { company: regex },
        { description: regex }
      ];
    }

    // 4. Fetch enquiries and total unread count
    const enquiries = await ContactSubmission.find(query).sort({ createdAt: -1 });
    const unreadCount = await ContactSubmission.countDocuments({ status: "NEW" });

    return NextResponse.json({ 
      enquiries, 
      unreadCount 
    });
  } catch (error: any) {
    console.error("GET enquiries endpoint failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
