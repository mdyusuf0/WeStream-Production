"use client";

import React from "react";
import { motion } from "framer-motion";

export function SDIRouter() {
  return (
    <div className="relative bg-surface/40 border border-header-border p-8 md:p-14 rounded-sm space-y-8 select-none overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] bg-accent/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Narrative Header */}
      <div className="max-w-2xl space-y-3 relative z-10">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] text-accent uppercase block">
          ONSTAGE VISUAL SYNCHRONICITY
        </span>
        <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-tight">
          Feeds Converging Live.<br />Reflecting Arena Energy.
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          Zero-latency SDI streams connect live stage cameras directly to massive LED walls, creating instant optical visual impact for thousands in the arena.
        </p>
      </div>

      {/* Flowing SDI Signal Pathways */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
        {[
          { target: "MAINSTAGE LED WALL", feed: "Camera 01 Master Feed", status: "0ms Direct SDI" },
          { target: "STAGE WING DISPLAYS", feed: "Camera 03 Roamer", status: "0ms Direct SDI" },
          { target: "VIP ARENA STREAM", feed: "SRT Encrypted Route", status: "Sub-Second Uplink" },
        ].map((screen, idx) => (
          <div key={idx} className="bg-background/60 border border-header-border p-6 rounded-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-heading font-extrabold text-accent uppercase">{screen.status}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            </div>
            <h4 className="text-xs font-heading font-extrabold text-foreground uppercase">{screen.target}</h4>
            <p className="text-[10px] text-muted-foreground font-sans">{screen.feed}</p>
            <div className="h-1 w-full bg-header-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
