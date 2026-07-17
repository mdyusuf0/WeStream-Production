"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useTheme } from "@/components/theme/ThemeContext";

interface OpticalSculptureProps {
  className?: string;
}

export function OpticalSculpture({ className = "" }: OpticalSculptureProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  // Mouse tilt values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for 60fps interaction
  const springX = useSpring(mouseX, { stiffness: 40, damping: 25 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 25 });

  // Subtle 3D tilt angles (-4 deg to +4 deg)
  const rotateX = useTransform(springY, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-4, 4]);

  // Light flare position tracking
  const flareX = useTransform(springX, [-0.5, 0.5], [-50, 50]);
  const flareY = useTransform(springY, [-0.5, 0.5], [-35, 35]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const isLight = mounted && resolvedTheme === "light";
  const primaryAccent = isLight ? "#AA8009" : "#D4AF37";
  const strokeMuted = isLight ? "rgba(17,17,17,0.06)" : "rgba(255,255,255,0.06)";
  const glassStroke = isLight ? "rgba(17,17,17,0.12)" : "rgba(255,255,255,0.12)";

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full h-full flex items-center justify-center overflow-hidden select-none ${className}`}
    >
      {/* 1. PRIMARY VOLUMETRIC LIGHT BLOOM */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-colors duration-700 ${
          isLight ? "bg-amber-600/10" : "bg-gold/15"
        }`}
      />

      {/* 2. SIGNATURE 18-SECOND IDLE LIGHT EVENT (Glides across focal plane) */}
      <motion.div
        animate={{
          x: ["-30%", "30%", "-30%"],
          opacity: [0.2, 0.55, 0.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute w-[450px] h-[450px] rounded-full blur-[90px] pointer-events-none transition-colors duration-700 ${
          isLight ? "bg-amber-500/15" : "bg-gold/20"
        }`}
      />

      {/* 3. INTERACTIVE 3D PERSPECTIVE LAYER */}
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full flex items-center justify-center"
      >
        {/* 4. MINIMAL VECTOR GEOMETRY (10 Hairline Elements Focus on Lighting) */}
        <svg
          viewBox="0 0 1000 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full max-h-full object-contain overflow-visible"
        >
          <defs>
            <linearGradient id="lightFlare" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryAccent} stopOpacity="0.8" />
              <stop offset="60%" stopColor={primaryAccent} stopOpacity="0.15" />
              <stop offset="100%" stopColor={primaryAccent} stopOpacity="0" />
            </linearGradient>

            <linearGradient id="glassRefraction" x1="100%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isLight ? "#111111" : "#FFFFFF"} stopOpacity="0.2" />
              <stop offset="100%" stopColor={primaryAccent} stopOpacity="0.04" />
            </linearGradient>
          </defs>

          {/* Hairline Horizon Lines */}
          <line x1="100" y1="300" x2="900" y2="300" stroke={strokeMuted} strokeWidth="1" strokeDasharray="3 9" />
          <line x1="500" y1="80" x2="500" y2="520" stroke={strokeMuted} strokeWidth="1" strokeDasharray="3 9" />

          {/* Outer Focal Halo (Idle Rotation 60s) */}
          <motion.circle
            cx="500"
            cy="300"
            r="230"
            stroke={glassStroke}
            strokeWidth="1"
            strokeDasharray="2 16"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "500px 300px" }}
          />

          {/* Minimal Glass Aperture Planes */}
          <motion.ellipse
            cx="500"
            cy="300"
            rx="200"
            ry="160"
            stroke={primaryAccent}
            strokeWidth="1.5"
            strokeOpacity="0.35"
            animate={{
              scale: [1, 1.025, 1],
              strokeOpacity: [0.25, 0.5, 0.25],
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{ transformOrigin: "500px 300px" }}
          />

          <motion.ellipse
            cx="500"
            cy="300"
            rx="210"
            ry="130"
            stroke="url(#glassRefraction)"
            strokeWidth="1.2"
            transform="rotate(-20 500 300)"
            animate={{ rotate: [-20, -15, -20] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "500px 300px" }}
          />

          {/* Cursor Light Flare Sweep Arc */}
          <motion.path
            d="M 360 300 A 140 140 0 0 1 640 300"
            stroke="url(#lightFlare)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              x: flareX,
              y: flareY,
            }}
          />

          {/* Center Focal Point */}
          <circle cx="500" cy="300" r="3" fill={primaryAccent} opacity="0.75" />
        </svg>
      </motion.div>
    </div>
  );
}
