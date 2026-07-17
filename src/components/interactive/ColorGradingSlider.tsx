"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ColorGradingSliderProps {
  imageSrc: string;
}

export function ColorGradingSlider({ imageSrc }: ColorGradingSliderProps) {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    setMousePos({ x, y });
  };

  return (
    <div className="relative bg-surface/40 border border-header-border p-8 md:p-14 rounded-sm space-y-8 select-none overflow-hidden">
      
      {/* Narrative Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-header-border pb-6">
        <div>
          <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] text-accent uppercase block">
            CINEMATIC OPTICS REVEAL
          </span>
          <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Anamorphic Glass & Color Alchemy
          </h3>
        </div>
        <p className="text-xs font-heading font-bold text-accent uppercase tracking-widest">
          Move cursor to illuminate 10-Bit Master Grade
        </p>
      </div>

      {/* Interactive Spotlight Revealer Frame */}
      <div
        className="relative aspect-video w-full rounded-sm overflow-hidden border border-header-border cursor-none"
        onMouseMove={handleMouseMove}
      >
        {/* Grayscale Base Image */}
        <Image
          src={imageSrc}
          alt="RAW Flat Profile"
          fill
          className="object-cover grayscale brightness-110 contrast-90"
        />

        {/* Illuminated Master Color Radial Spotlight Mask */}
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-75"
          style={{
            clipPath: `circle(160px at ${mousePos.x}% ${mousePos.y}%)`,
          }}
        >
          <Image
            src={imageSrc}
            alt="Master Color Graded"
            fill
            className="object-cover saturate-150 contrast-125 shadow-2xl"
          />
          <div className="absolute inset-0 bg-accent/10 pointer-events-none" />
        </div>

        {/* Ambient Optics Ring Tag */}
        <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-header-border text-[9px] font-heading font-extrabold text-accent uppercase tracking-widest">
          S-LOG3 RAW ↔ DISPLAY MASTER
        </div>
      </div>

    </div>
  );
}
