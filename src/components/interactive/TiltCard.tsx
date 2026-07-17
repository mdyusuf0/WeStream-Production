"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

export function TiltCard({ children, className = "" }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Track normalized mouse coordinates from -0.5 (left/top) to 0.5 (right/bottom)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  // Faster, lighter spring configuration for instant reaction
  const springConfig = { stiffness: 220, damping: 18, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [3, -3]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-3, 3]), springConfig);
  
  // Radial light sweep coordinates
  const highlightX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const highlightY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
    const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const gradientBackground = useTransform(
    [highlightX, highlightY],
    ([hx, hy]) => `radial-gradient(circle at ${hx}% ${hy}%, rgba(212, 175, 55, 0.15) 0%, transparent 65%)`
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className={`relative select-none ${className}`}
    >
      {/* 3D layer translation for content depth */}
      <div 
        className="w-full h-full relative" 
        style={{ transform: "translateZ(0px)", transformStyle: "preserve-3d" }}
      >
        {children}
      </div>

      {/* Interactive Brushed Gold Rim Light Sheet */}
      <motion.div 
        className="absolute inset-0 rounded-sm pointer-events-none transition-opacity duration-300 z-30"
        style={{
          opacity: isHovered ? 1 : 0,
          background: gradientBackground,
          border: "1.5px solid rgba(212, 175, 55, 0.25)",
        }}
      />
    </motion.div>
  );
}
