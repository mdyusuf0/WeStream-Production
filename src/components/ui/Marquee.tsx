"use client";

import React from "react";

interface MarqueeProps {
  items: string[];
  direction?: "left" | "right";
}

export default function Marquee({ items, direction = "left" }: MarqueeProps) {
  // Duplicate items enough times to fill screen width and loop seamlessly
  const listItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative w-full overflow-hidden border-y border-border/30 bg-black/50 py-10 backdrop-blur-md">
      {/* Edge gradient masks for luxury fade-in/fade-out */}
      <div className="absolute inset-y-0 left-0 w-20 md:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-20 md:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div 
        className={`flex whitespace-nowrap w-max animate-marquee hover:[animation-play-state:paused]`}
        style={{
          animationDirection: direction === "right" ? "reverse" : "normal"
        }}
      >
        {listItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center px-12 md:px-20 text-xl md:text-3xl font-heading font-extrabold tracking-[0.25em] text-muted-foreground/40 hover:text-gold transition-colors duration-500 ease-out select-none cursor-default"
          >
            {/* Live-rec indicator motif preceding each company wordmark */}
            <span className="mr-6 h-1.5 w-1.5 rounded-full bg-gold/50" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
