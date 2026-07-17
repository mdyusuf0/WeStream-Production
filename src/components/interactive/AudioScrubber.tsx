"use client";

import React from "react";
import { motion } from "framer-motion";

export function AudioScrubber() {
  return (
    <div className="relative bg-surface/40 border border-header-border p-8 md:p-14 rounded-sm space-y-8 select-none overflow-hidden">
      
      {/* Volumetric Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[250px] bg-accent/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Narrative Header */}
      <div className="max-w-2xl space-y-3 relative z-10">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] text-accent uppercase block">
          LIVING ACOUSTIC ENERGY
        </span>
        <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-tight">
          Sound Visualized as Living Light.
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          From crisp keynote vocals to 5.1 surround festival acoustics, our audio masters sculpt soundscapes that envelop the audience.
        </p>
      </div>

      {/* Rhythmic Pulsing Frequency Waves */}
      <div className="relative z-10 h-24 flex items-end gap-2 px-4 bg-background/60 border border-header-border rounded-sm py-4">
        {[25, 45, 65, 85, 100, 75, 50, 80, 95, 60, 40, 70, 90, 85, 65, 45, 75, 95, 80, 55, 65, 85, 95, 70].map((val, idx) => (
          <motion.div
            key={idx}
            className="flex-1 bg-accent/70 rounded-t-xs"
            initial={{ height: "20%" }}
            animate={{ height: [`${val * 0.3}%`, `${val}%`, `${val * 0.4}%`] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              repeatType: "mirror",
              delay: idx * 0.05,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

    </div>
  );
}
