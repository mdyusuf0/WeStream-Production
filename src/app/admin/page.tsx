import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/admin/media");
  } else {
    redirect("/admin/login");
  }
}
