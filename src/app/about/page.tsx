import React from "react";
import AboutClient from "./AboutClient";
import { getResolvedTeam } from "@/lib/media";

export default async function AboutPage() {
  // Query resolved team members from Redis / MongoDB
  const resolvedTeam = await getResolvedTeam();

  return <AboutClient teamMembers={resolvedTeam} />;
}
