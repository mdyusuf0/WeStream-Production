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
  type: "foreground" | "midground" | "background";
  angleOffset: number;
}

export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const { resolvedTheme } = useTheme();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    requestAnimationFrame(() => setPrefersReducedMotion(mediaQuery.matches));

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

    // Mouse coordinates tracking
    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
    };

    const isMobile = width < 768;
    const dustCount = isMobile ? 180 : 520;

    const particles: Particle[] = [];

    // Clustered & Layered distribution
    const numClusters = isMobile ? 2 : 5;
    const clusters: { x: number; y: number; r: number }[] = [];
    for (let c = 0; c < numClusters; c++) {
      clusters.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 300 + 150,
      });
    }

    for (let i = 0; i < dustCount; i++) {
      let x = 0;
      let y = 0;

      // Spawn clustered to create organic clouds
      if (Math.random() < 0.65 && clusters.length > 0) {
        const cluster = clusters[Math.floor(Math.random() * clusters.length)];
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * cluster.r;
        x = (cluster.x + Math.cos(angle) * dist + width) % width;
        y = (cluster.y + Math.sin(angle) * dist + height) % height;
      } else {
        x = Math.random() * width;
        y = Math.random() * height;
      }

      // Determine depth layer
      const rand = Math.random();
      let type: "foreground" | "midground" | "background" = "background";
      let size = 0.3;
      let baseAlpha = 0.2;

      if (rand > 0.88) {
        type = "foreground"; // Large blurred yellow bokeh
        size = Math.random() * 8 + 4.5;
        baseAlpha = Math.random() * 0.05 + 0.02;
      } else if (rand > 0.58) {
        type = "midground"; // Floating medium yellow dust
        size = Math.random() * 2.6 + 1.2;
        baseAlpha = Math.random() * 0.16 + 0.08;
      } else {
        type = "background"; // Micro white specs
        size = Math.random() * 0.45 + 0.15;
        baseAlpha = Math.random() * 0.35 + 0.15;
      }

      const speedMultiplier = type === "foreground" ? 0.3 : type === "midground" ? 0.6 : 1.0;

      particles.push({
        x,
        y,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.42 * speedMultiplier,
        vy: (Math.random() - 0.5) * 0.42 * speedMultiplier,
        size,
        alpha: baseAlpha,
        baseAlpha,
        type,
        angleOffset: Math.random() * Math.PI * 2
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
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    const isLight = resolvedTheme === "light";
    const whiteColor = isLight ? "40, 40, 40" : "255, 255, 255";
    const goldColor = isLight ? "160, 120, 10" : "212, 175, 55";

    // Ambient spot lights representing volumetric studio lighting
    const spots = [
      { x: width * 0.25, y: height * 0.25, targetRadius: width * 0.45, currentRadius: width * 0.45, color: isLight ? "rgba(160,120,10,0.03)" : "rgba(212,175,55,0.045)" },
      { x: width * 0.8, y: height * 0.15, targetRadius: width * 0.35, currentRadius: width * 0.35, color: isLight ? "rgba(0,0,0,0.02)" : "rgba(255,255,255,0.015)" },
      { x: width * 0.5, y: height * 0.8, targetRadius: width * 0.5, currentRadius: width * 0.5, color: isLight ? "rgba(160,120,10,0.02)" : "rgba(212,175,55,0.03)" }
    ];

    let time = 0;

    const render = () => {
      // 1. Draw base atmospheric background tone
      ctx.fillStyle = isLight ? "#FAFAFA" : "#0B0B0B";
      ctx.fillRect(0, 0, width, height);

      // 2. Draw soft volumetric studio haze spotlights
      time += 0.008;
      for (const spot of spots) {
        // Slow volumetric breathing expansion
        const pulse = Math.sin(time + spot.x) * 35;
        const radius = Math.max(100, spot.targetRadius + pulse);
        
        const grad = ctx.createRadialGradient(spot.x, spot.y, 0, spot.x, spot.y, radius);
        grad.addColorStop(0, spot.color);
        grad.addColorStop(1, "rgba(0,0,0,0)");
        
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }

      // Smooth mouse coordinates interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      // 3. Render and animate dust particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Slow organic fluid drift
          const driftX = Math.sin(time * 0.8 + p.angleOffset) * 0.22;
          const driftY = Math.cos(time * 0.8 + p.angleOffset) * 0.22;

          p.x += p.vx + driftX;
          p.y += p.vy + driftY;

          // Wrapping bounds
          if (p.x < -20) p.x = width + 20;
          if (p.x > width + 20) p.x = -20;
          if (p.y < -20) p.y = height + 20;
          if (p.y > height + 20) p.y = -20;

          // Gravitational distortion: particles bend slightly toward cursor
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxInfluence = 260;

          if (dist < maxInfluence && dist > 0) {
            // Force scales smoothly with proximity (no sparkles, no explosions)
            const force = (1 - dist / maxInfluence) * 1.5;
            p.x += (dx / dist) * force * 0.4;
            p.y += (dy / dist) * force * 0.4;
          }

          // Slow alpha breathing pulse
          p.alpha = p.baseAlpha + Math.sin(time * 2 + i) * (p.baseAlpha * 0.3);
        }

        // Draw particle layers
        if (p.type === "foreground") {
          // Blurred bokeh drawing using local radial gradient
          const bokehGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          bokehGrad.addColorStop(0, `rgba(${goldColor}, ${p.alpha * 1.8})`);
          bokehGrad.addColorStop(0.3, `rgba(${goldColor}, ${p.alpha * 0.8})`);
          bokehGrad.addColorStop(1, "rgba(0,0,0,0)");
          
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = bokehGrad;
          ctx.fill();
        } else {
          // Standard sharp midground and background dust points
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          
          const color = p.type === "midground" ? goldColor : whiteColor;
          ctx.fillStyle = `rgba(${color}, ${Math.max(0.05, p.alpha)})`;
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [resolvedTheme, prefersReducedMotion]);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full -z-10 pointer-events-none" />;
}
