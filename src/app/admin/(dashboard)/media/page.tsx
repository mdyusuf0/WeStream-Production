import React from "react";
import { connectToDatabase } from "@/lib/db";
import { MediaAsset } from "@/models/MediaAsset";
import MediaManager from "./MediaManager";

export const metadata = {
  title: "Media Management - WeStream Admin",
  description: "View and replace active media slots for WeStream homepage, services, and work.",
};

export const dynamic = "force-dynamic";

export default async function MediaPage() {
  await connectToDatabase();
  
  const assetsDocs = await MediaAsset.find({}).sort({ pageContext: 1, label: 1 });
  
  const assets = assetsDocs.map((doc) => ({
    id: doc._id.toString(),
    slotKey: doc.slotKey,
    type: doc.type,
    cloudinaryId: doc.cloudinaryId,
    url: doc.url,
    altText: doc.altText || "",
    label: doc.label,
    pageContext: doc.pageContext,
    updatedBy: doc.updatedBy || "system",
    updatedAt: doc.updatedAt.toISOString(),
  }));

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME || "";
  const apiKey = process.env.CLOUDINARY_API_KEY || "";

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase block">SYSTEM OPERATIONS</span>
        <h1 className="text-3xl font-heading font-extrabold uppercase text-foreground">Media Management</h1>
      </div>
      
      <MediaManager 
        initialAssets={assets} 
        cloudName={cloudName} 
        apiKey={apiKey} 
      />
    </div>
  );
}
