"use client";

import React from "react";
import { motion } from "framer-motion";

interface NoiseLayerProps {
  opacity?: number;
  blendMode?: "mix-blend-overlay" | "mix-blend-screen" | "mix-blend-multiply";
}

export function NoiseLayer({ 
  opacity = 0.03, 
  blendMode = "mix-blend-overlay" 
}: NoiseLayerProps) {
  return (
    <div 
      className={`absolute inset-0 w-full h-full pointer-events-none bg-[url('/noise.png')] ${blendMode}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
