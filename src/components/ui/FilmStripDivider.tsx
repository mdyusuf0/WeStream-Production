"use client";

import React from "react";

interface FilmStripDividerProps {
  className?: string;
}

export function FilmStripDivider({ className = "" }: FilmStripDividerProps) {
  return (
    <div className={`w-full flex items-center select-none pointer-events-none opacity-[0.15] ${className}`}>
      <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-accent to-transparent relative">
        <div 
          className="absolute inset-x-0 h-[6px] -top-[2px] bg-repeat-x"
          style={{
            backgroundImage: "repeating-linear-gradient(to right, transparent, transparent 18px, currentColor 18px, currentColor 20px)",
            color: "#D4AF37"
          }}
        />
      </div>
    </div>
  );
}
