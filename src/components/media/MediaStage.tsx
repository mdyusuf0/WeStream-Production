"use client";

import React from "react";
import { VideoLayer } from "./VideoLayer";
import { NoiseLayer } from "./NoiseLayer";
import { OpticalSculpture } from "./OpticalSculpture";

interface MediaStageProps {
  videoSrc?: string;
  videoPoster?: string;
  mode?: "sculpture" | "video" | "hybrid" | "motion";
  withNoise?: boolean;
  className?: string;
}

/**
 * MediaStage Orchestrator
 * Full 100dvh spatial stage that integrates atmosphere, optical sculpture, and adaptive CMS video.
 */
export function MediaStage({ 
  videoSrc, 
  videoPoster, 
  mode = "sculpture",
  withNoise = true,
  className = "" 
}: MediaStageProps) {
  const showVideo = (mode === "video" || mode === "hybrid") && Boolean(videoSrc);
  const showSculpture = mode === "sculpture" || mode === "hybrid" || mode === "motion";

  return (
    <div className={`absolute inset-0 w-full h-full select-none overflow-hidden ${className}`}>
      
      {/* LAYER 0: Ambient Color Atmosphere */}
      <div className="absolute inset-0 z-0 bg-gradient-to-tr from-background via-surface to-background opacity-95" />

      {/* LAYER 1: Adaptive CMS Video Layer (When provided) */}
      {showVideo && (
        <div className="absolute inset-0 z-10 opacity-60 mix-blend-overlay">
          <VideoLayer src={videoSrc!} poster={videoPoster} />
        </div>
      )}

      {/* LAYER 2: Abstract Optical Sculpture (The Spatial Centerpiece) */}
      {showSculpture && (
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <OpticalSculpture />
        </div>
      )}

      {/* LAYER 3: Film Grain Scrim */}
      {withNoise && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <NoiseLayer opacity={0.035} blendMode="mix-blend-overlay" />
        </div>
      )}

    </div>
  );
}
