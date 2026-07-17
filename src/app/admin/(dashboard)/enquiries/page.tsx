import React from "react";
import { connectToDatabase } from "@/lib/db";
import { ContactSubmission } from "@/models/ContactSubmission";
import EnquiriesManager from "./EnquiriesManager";

export const metadata = {
  title: "Client Enquiries - WeStream Admin",
  description: "View and manage contact form submissions, budgets, and project requests.",
};

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  await connectToDatabase();

  const docs = await ContactSubmission.find({}).sort({ createdAt: -1 });

  const enquiries = docs.map((doc) => ({
    id: doc._id.toString(),
    fullName: doc.fullName,
    company: doc.company || "",
    email: doc.email,
    phone: doc.phone || "",
    projectType: doc.projectType,
    budget: doc.budget || "",
    timeline: doc.timeline || "",
    description: doc.description,
    referenceLinks: doc.referenceLinks || "",
    driveLink: doc.driveLink || "",
    status: doc.status,
    createdAt: doc.createdAt.toISOString(),
  }));

  const unreadCount = await ContactSubmission.countDocuments({ status: "NEW" });

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase block">INBOUND INTEREST</span>
        <h1 className="text-3xl font-heading font-extrabold uppercase text-foreground">Client Enquiries</h1>
      </div>

      <EnquiriesManager initialEnquiries={enquiries} initialUnreadCount={unreadCount} />
    </div>
  );
}
