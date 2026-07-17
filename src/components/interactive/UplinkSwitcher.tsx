"use client";

import React from "react";
import { motion } from "framer-motion";

export function UplinkSwitcher() {
  return (
    <div className="relative bg-surface/40 border border-header-border p-8 md:p-14 rounded-sm space-y-10 overflow-hidden select-none">
      
      {/* Background Volumetric Glow */}
      <div className="absolute bottom-0 right-0 w-[450px] h-[250px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Narrative */}
      <div className="relative z-10 max-w-2xl space-y-3">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] text-accent uppercase block">
          DUAL TRANSMISSION HARMONY
        </span>
        <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-tight">
          Unshakeable Redundancy.<br />Flowing as One Beam.
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          Geostationary satellite signals and bonded cellular streams weave together, ensuring the live broadcast never falters for even a fraction of a frame.
        </p>
      </div>

      {/* Flowing Conduits Visualization */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-2">
        
        {/* Pipeline 1: Satellite Dish Stream */}
        <div className="lg:col-span-5 bg-background/60 border border-header-border p-6 rounded-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase">
              SATELLITE BEAM
            </span>
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
          </div>
          <h4 className="text-base font-heading font-extrabold text-foreground uppercase">
            36,000 km Orbital Link
          </h4>
          <div className="h-1.5 w-full bg-header-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

        {/* Convergence Core Node */}
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center py-4">
          <div className="h-12 w-12 rounded-full border border-accent/40 bg-surface flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.2)]">
            <span className="h-3 w-3 rounded-full bg-accent animate-pulse" />
          </div>
          <span className="text-[9px] font-heading font-extrabold tracking-widest text-accent uppercase mt-3">
            ZERO FAILURE LOCK
          </span>
        </div>

        {/* Pipeline 2: Bonded Cellular Stream */}
        <div className="lg:col-span-5 bg-background/60 border border-header-border p-6 rounded-sm space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase">
              BONDED CELLULAR ARRAY
            </span>
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
          </div>
          <h4 className="text-base font-heading font-extrabold text-foreground uppercase">
            Multi-Carrier Aggregation
          </h4>
          <div className="h-1.5 w-full bg-header-border rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-accent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
            />
          </div>
        </div>

      </div>

    </div>
  );
}
