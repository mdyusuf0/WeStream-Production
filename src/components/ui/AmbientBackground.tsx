"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/theme/ThemeContext";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse position tracking
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
    };

    const isMobile = width < 768;
    // Enhanced particle count for clear visibility
    const starCount = isMobile ? 150 : 400;

    const particles: Particle[] = [];
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const baseAlpha = Math.random() * 0.45 + 0.25;

      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 2.0 + 1.0, // Crisp particle radius (1.0px - 3.0px)
        alpha: baseAlpha,
        baseAlpha,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const isLight = resolvedTheme === "light";
    const starColor = isLight ? "20, 20, 20" : "255, 255, 255";
    const dustColor = isLight ? "170, 128, 9" : "212, 175, 55";

    let time = 0;

    const render = () => {
      // Paint dark background base onto canvas to ensure base tone
      ctx.fillStyle = isLight ? "#FAFAFA" : "#0B0B0B";
      ctx.fillRect(0, 0, width, height);

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      time += 0.02;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Ambient drift
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          // Gravitational distortion toward cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 240; // 240px influence radius

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 2.2;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }

          p.alpha = p.baseAlpha + Math.sin(time + i) * 0.12;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        // Mix white micro-stars with gold/bronze dust
        const color = i % 3 === 0 ? dustColor : starColor;
        ctx.fillStyle = `rgba(${color}, ${Math.max(0.15, Math.min(0.8, p.alpha))})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme, prefersReducedMotion]);

  const isLight = resolvedTheme === "light";

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* 1. SOFT VOLUMETRIC GOLD NEBULA CLOUDS */}
      <div 
        className={`absolute top-[-15%] left-[-10%] w-[65vw] h-[65vw] rounded-full blur-[140px] opacity-40 transition-colors duration-700 pointer-events-none ${
          isLight ? "bg-amber-600/20" : "bg-gold/25"
        }`}
      />
      <div 
        className={`absolute bottom-[-15%] right-[-10%] w-[70vw] h-[70vw] rounded-full blur-[160px] opacity-35 transition-colors duration-700 pointer-events-none ${
          isLight ? "bg-amber-700/20" : "bg-gold/20"
        }`}
      />

      {/* 2. DYNAMIC ATMOSPHERIC CANVAS */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
    </div>
  );
}
