import React from "react";
import TeamClient from "./TeamClient";
import { getResolvedTeam } from "@/lib/media";

export default async function TeamPage() {
  // Query resolved team members from Redis / MongoDB
  const resolvedTeam = await getResolvedTeam();

  return <TeamClient teamMembers={resolvedTeam} />;
}
