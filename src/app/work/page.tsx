import React from "react";
import WorkClient from "./WorkClient";
import { getResolvedProjects } from "@/lib/media";

export default async function WorkPage() {
  // Query resolved projects from Redis / MongoDB
  const resolvedProjects = await getResolvedProjects();

  return <WorkClient projects={resolvedProjects} />;
}
