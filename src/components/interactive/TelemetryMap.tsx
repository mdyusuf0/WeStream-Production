"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export function TelemetryMap() {
  const [pulseIndex, setPulseIndex] = useState(0);

  const hubs = [
    { city: "BANGALORE HQ", coord: "MASTER ORIGIN", ping: "< 12ms" },
    { city: "LONDON", coord: "EUROPE NODE", ping: "110ms" },
    { city: "NEW YORK", coord: "AMERICAS NODE", ping: "85ms" },
    { city: "TOKYO", coord: "ASIA PACIFIC", ping: "140ms" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseIndex((prev) => (prev + 1) % hubs.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [hubs.length]);

  return (
    <div className="relative bg-surface/40 border border-header-border p-8 md:p-14 rounded-sm space-y-10 overflow-hidden select-none">
      
      {/* Background Volumetric Gold Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Header Narrative */}
      <div className="relative z-10 max-w-2xl space-y-3">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] text-accent uppercase block">
          CINEMATIC GLOBAL CONNECTIVITY
        </span>
        <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-tight">
          Four Continents.<br />One Synchronized Pulse.
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          Over 150,000 delegates gathered across four continents, connected by an invisible, zero-latency thread of light.
        </p>
      </div>

      {/* Organic Light Filaments & Hub Nodes */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4">
        {hubs.map((hub, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: idx * 0.15 }}
            className={`relative p-6 rounded-sm border transition-all duration-700 space-y-4 ${
              pulseIndex === idx
                ? "bg-surface border-accent/60 shadow-[0_0_30px_rgba(212,175,55,0.15)] scale-[1.02]"
                : "bg-background/40 border-header-border opacity-70"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-heading font-bold text-accent uppercase tracking-widest">
                {hub.coord}
              </span>
              <span
                className={`h-2 w-2 rounded-full transition-all duration-500 ${
                  pulseIndex === idx ? "bg-accent shadow-[0_0_12px_var(--color-accent)] animate-pulse" : "bg-muted-foreground/30"
                }`}
              />
            </div>

            <div>
              <h4 className="text-lg font-heading font-extrabold text-foreground uppercase">
                {hub.city}
              </h4>
              <p className="text-xs font-heading font-bold text-accent/80 tracking-widest mt-1">
                PING: {hub.ping}
              </p>
            </div>

            {/* Glowing Connection Filament Bar */}
            <div className="h-0.5 w-full bg-header-border overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-accent"
                initial={{ width: "0%" }}
                animate={{ width: pulseIndex === idx ? "100%" : "25%" }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
