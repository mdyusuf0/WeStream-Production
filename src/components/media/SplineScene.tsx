"use client";

import React, { Suspense } from "react";
// Dynamically import Spline to ensure it doesn't block SSR or initial thread
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <div className="w-full h-full animate-pulse bg-white/5 blur-3xl rounded-full" />,
});

interface SplineSceneProps {
  sceneUrl?: string;
  className?: string;
}

export function SplineScene({ sceneUrl, className = "" }: SplineSceneProps) {
  // If no URL is provided, render a lightweight CSS placeholder (the Glass Ring)
  if (!sceneUrl) {
    return (
      <div className={`flex items-center justify-center w-full h-full ${className}`}>
        <div className="w-[30rem] h-[30rem] rounded-full border border-white/5 animate-pulse blur-3xl mix-blend-screen opacity-50" />
      </div>
    );
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Suspense fallback={<div className="w-full h-full animate-pulse bg-white/5 blur-3xl rounded-full" />}>
        <Spline scene={sceneUrl} />
      </Suspense>
    </div>
  );
}
