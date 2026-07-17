"use client";

import React from "react";

export function CameraRigShowcase() {
  return (
    <div className="relative bg-surface/40 border border-header-border p-8 md:p-14 rounded-sm space-y-8 select-none overflow-hidden">
      
      {/* Background Lens Flare */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-accent/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Narrative Header */}
      <div className="max-w-2xl space-y-3 relative z-10">
        <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] text-accent uppercase block">
          CINEMATIC HARDWARE CRAFTSMANSHIP
        </span>
        <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-tight">
          6K Full-Frame Glass.<br />Sculpted Light & Anamorphic Flares.
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans leading-relaxed">
          Every optical element is calibrated to bend light into organic bokeh, rich shadow depths, and vivid skin tones.
        </p>
      </div>

      {/* Floating Optical Glass Spec Elements */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
        {[
          { title: "6K FULL-FRAME SENSOR", desc: "15+ stops dynamic range w/ dual base ISO" },
          { title: "ANAMORPHIC GLASS", desc: "Organic horizontal flares & T1.5 prime speed" },
          { title: "WIRELESS SDI LINK", desc: "Zero-latency 4K HDR monitor transmission" },
          { title: "MOTORIZED ND FILTERS", desc: "7-stop optical neutral density precision" },
        ].map((item, idx) => (
          <div key={idx} className="bg-background/60 border border-header-border p-6 rounded-sm space-y-3">
            <span className="text-[9px] font-heading font-extrabold text-accent uppercase block">OPTIC 0{idx + 1}</span>
            <h4 className="text-xs font-heading font-extrabold text-foreground uppercase">{item.title}</h4>
            <p className="text-[10px] text-muted-foreground font-sans leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

    </div>
  );
}
