import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../../../../../lib/db";
import { MediaAsset } from "../../../../../models/MediaAsset";
import { getRedisClient } from "../../../../../lib/redis";
import { authOptions } from "../../../../../lib/auth";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ slotKey: string }> }
) {
  try {
    const { slotKey } = await params;

    // 1. Authenticated Admin Session Check
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "SYSTEM_ADMIN") {
      return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
    }

    // 2. Parse and Validate Request Payload
    const body = await req.json();
    const { url, cloudinaryId, altText } = body;

    if (!url || !cloudinaryId) {
      return NextResponse.json({ error: "Missing required fields: url, cloudinaryId" }, { status: 400 });
    }

    await connectToDatabase();

    // 3. Ensure the Media Slot exists in DB (no arbitrary slot creation)
    const asset = await MediaAsset.findOne({ slotKey });
    if (!asset) {
      return NextResponse.json(
        { error: "Target media slot key does not exist. Arbitrary slot creation is forbidden." },
        { status: 404 }
      );
    }

    // 4. Update the DB record
    asset.url = url;
    asset.cloudinaryId = cloudinaryId;
    if (altText !== undefined) {
      asset.altText = altText;
    }
    asset.updatedBy = session.user?.email || "system";
    await asset.save();

    // 5. Invalidate/Update Redis cache key
    try {
      const redis = getRedisClient();
      const cacheKey = `media:${slotKey}`;
      
      const cacheData = JSON.stringify({
        url: asset.url,
        type: asset.type,
        cloudinaryId: asset.cloudinaryId,
        altText: asset.altText,
        label: asset.label,
        pageContext: asset.pageContext,
      });

      // Cache for 7 days
      await redis.set(cacheKey, cacheData, "EX", 86400 * 7);
      console.log(`Updated Redis cache key: ${cacheKey}`);
    } catch (redisErr) {
      console.error("Redis cache update failed during media PATCH:", redisErr);
    }

    // 6. Trigger ISR path invalidation for layout and pages
    revalidatePath("/", "layout");

    return NextResponse.json({ 
      success: true, 
      message: "Media asset updated successfully", 
      asset 
    });
  } catch (error: any) {
    console.error("PATCH MediaAsset route failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
