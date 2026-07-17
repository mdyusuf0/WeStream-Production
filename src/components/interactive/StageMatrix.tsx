"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

export function StageMatrix() {
  const [activePerspective, setActivePerspective] = useState(0);

  const perspectives = [
    { name: "MAINSTAGE WIDE", focus: "Main Arena Center", focal: "24mm Prime" },
    { name: "ARTIST PIT", focus: "Vocalist Eye Line", focal: "85mm T1.5" },
    { name: "CRANE OVERHEAD", focus: "30,000 Audience Elevation", focal: "16mm Cinema" },
    { name: "ARENA ROAMER", focus: "Festival Crowd Energy", focal: "50mm Prime" },
    { name: "STAGE WING RIGHT", focus: "Rhythm & Percussion", focal: "70-200mm" },
    { name: "8K AERIAL DRONE", focus: "Atmospheric Horizon", focal: "Inspire 3" },
  ];

  return (
    <div className="relative bg-surface/40 border border-header-border p-8 md:p-14 rounded-sm space-y-10 overflow-hidden select-none">
      
      {/* Narrative Header */}
      <div className="max-w-2xl space-y-3">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] text-accent uppercase block">
          SPATIAL CINEMATOGRAPHY HARMONY
        </span>
        <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-tight">
          Six Camera Angles.<br />One Convergent Moment.
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          Every optical lens angle is rhythmically switched to capture the unscripted magic of mainstage performances.
        </p>
      </div>

      {/* Floating Spatial Camera Perspectives Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {perspectives.map((persp, idx) => (
          <motion.button
            key={idx}
            onClick={() => setActivePerspective(idx)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`p-4 rounded-sm text-left border transition-all duration-500 cursor-pointer space-y-2 ${
              activePerspective === idx
                ? "bg-surface border-accent shadow-[0_0_25px_rgba(212,175,55,0.2)]"
                : "bg-background/50 border-header-border text-muted-foreground opacity-60 hover:opacity-100"
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-heading font-bold text-accent">CAM 0{idx + 1}</span>
              <span className={`h-1.5 w-1.5 rounded-full ${activePerspective === idx ? "bg-accent animate-ping" : "bg-muted-foreground/30"}`} />
            </div>
            <div className="text-xs font-heading font-extrabold text-foreground uppercase leading-tight">
              {persp.name}
            </div>
            <div className="text-[9px] text-accent/80 font-heading font-bold uppercase tracking-widest pt-1">
              {persp.focal}
            </div>
          </motion.button>
        ))}
      </div>

    </div>
  );
}
