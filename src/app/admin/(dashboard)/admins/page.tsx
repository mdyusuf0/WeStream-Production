import React from "react";
import { connectToDatabase } from "@/lib/db";
import { User } from "@/models/User";
import AdminsManager from "./AdminsManager";

export const metadata = {
  title: "Authorized Administrators - WeStream Admin",
  description: "View and manage security access logs and authorized system administrators.",
};

export const dynamic = "force-dynamic";

export default async function AdminsPage() {
  await connectToDatabase();

  const docs = await User.find({ role: "SYSTEM_ADMIN" }).sort({ createdAt: -1 });

  const admins = docs.map((doc) => ({
    id: doc._id.toString(),
    email: doc.email,
    createdBy: doc.createdBy || "Seeded System",
    createdAt: doc.createdAt.toISOString(),
  }));

  return (
    <div className="space-y-8">
      <div>
        <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase block">ACCESS CONTROL</span>
        <h1 className="text-3xl font-heading font-extrabold uppercase text-foreground">Authorized Admins</h1>
      </div>

      <AdminsManager initialAdmins={admins} />
    </div>
  );
}
