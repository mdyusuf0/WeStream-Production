import React from "react";
import { connectToDatabase } from "@/lib/db";
import { ContactSubmission } from "@/models/ContactSubmission";
import { NextAuthProvider } from "@/components/providers/NextAuthProvider";
import AdminDashboardLayout from "./AdminDashboardLayout";

export const metadata = {
  title: "WeStream Production - Admin Control Center",
  description: "Secure management dashboard for WeStream media slots and visitor contact form submissions.",
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  let initialUnreadCount = 0;

  try {
    await connectToDatabase();
    initialUnreadCount = await ContactSubmission.countDocuments({ status: "NEW" });
  } catch (error) {
    console.error("Failed to load initial unread contact submissions in admin layout:", error);
  }

  return (
    <NextAuthProvider>
      <AdminDashboardLayout initialUnreadCount={initialUnreadCount}>
        {children}
      </AdminDashboardLayout>
    </NextAuthProvider>
  );
}
