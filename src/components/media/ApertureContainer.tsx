"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";

const ThreeAperture = dynamic(
  () => import("./ThreeAperture").then((mod) => mod.ThreeAperture),
  { 
    ssr: false, 
    loading: () => (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-2 w-2 rounded-full bg-accent/40 animate-ping" />
      </div>
    ) 
  }
);

export function ApertureContainer() {
  const [openness, setOpenness] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Viewport observer to pause ThreeJS loop when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // 2. Scroll event listener to bind lens openness
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const height = window.innerHeight;
      
      // Openness goes from 0 (closed) to 1.1 (fully open) during Hero section scroll
      const progress = Math.min(1.1, scrollY / (height * 0.9));
      setOpenness(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none z-20 overflow-hidden"
    >
      {isVisible && (
        <div className="sticky top-0 w-full h-screen">
          <ThreeAperture openness={openness} />
        </div>
      )}
    </div>
  );
}
