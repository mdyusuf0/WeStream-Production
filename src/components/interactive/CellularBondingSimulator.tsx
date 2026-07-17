"use client";

import React from "react";
import { motion } from "framer-motion";

export function CellularBondingSimulator() {
  return (
    <div className="relative bg-surface/40 border border-header-border p-8 md:p-14 rounded-sm space-y-8 select-none overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Narrative */}
      <div className="max-w-2xl space-y-3 relative z-10">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] text-accent uppercase block">
          BONDED SIGNAL FLOW NARRATIVE
        </span>
        <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-tight">
          Multi-Channel Light Threads.<br />Bound Into Flawless Stream Uptime.
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          Four distinct carrier lines weave into one unbreakable stream conduit, eliminating dropouts before they can ever reach the viewer.
        </p>
      </div>

      {/* Glowing Weaving Filaments */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4">
        {[
          { title: "JIO 5G LINK", role: "Primary Cellular Data" },
          { title: "AIRTEL 5G LINK", role: "Secondary Cellular Data" },
          { title: "VI 4G FALLBACK", role: "Redundant Network Buffer" },
          { title: "SATELLITE UPLINK", role: "Geostationary Beacon" },
        ].map((line, idx) => (
          <div key={idx} className="bg-background/60 border border-header-border p-5 rounded-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-heading font-extrabold text-accent uppercase">THREAD 0{idx + 1}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            </div>
            <h4 className="text-xs font-heading font-extrabold text-foreground uppercase">{line.title}</h4>
            <p className="text-[10px] text-muted-foreground font-sans">{line.role}</p>
            <div className="h-1 w-full bg-header-border rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-accent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 1.5 + idx * 0.3, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
