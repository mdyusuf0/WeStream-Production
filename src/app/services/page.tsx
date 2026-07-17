import React from "react";
import ServicesClient from "./ServicesClient";
import { getResolvedServices } from "@/lib/media";

export default async function ServicesPage() {
  // Query resolved dynamic services from Redis / MongoDB
  const resolvedServices = await getResolvedServices();
  
  return <ServicesClient services={resolvedServices} />;
}
