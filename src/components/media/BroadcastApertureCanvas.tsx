"use client";

import React, { useEffect, useState, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { BroadcastAperture } from "./BroadcastAperture";

// Register GSAP ScrollTrigger on client side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface BroadcastApertureCanvasProps {
  variant?: "hero" | "loader";
  fallback?: React.ReactNode;
}

export default function BroadcastApertureCanvas({
  variant = "hero",
  fallback = null,
}: BroadcastApertureCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef(0);
  const [inView, setInView] = useState(true);
  const [useFallback, setUseFallback] = useState(true); // default true until client-side mount checks
  const [mounted, setMounted] = useState(false);

  // 1. Client-Side WebGL Capability & Reduced Motion Detection
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setUseFallback(true);
      return;
    }

    try {
      const canvas = document.createElement("canvas");
      const glSupported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setUseFallback(!glSupported);
    } catch {
      setUseFallback(true);
    }
  }, []);

  // 2. IntersectionObserver to toggle Canvas Frameloop (saves CPU/GPU when off-screen)
  useEffect(() => {
    if (useFallback || !mounted || variant !== "hero") return;
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      {
        rootMargin: "100px", // pre-load and keep running slightly off-screen
        threshold: 0.0, // trigger as soon as any pixel is visible
      }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, [useFallback, mounted, variant]);

  // 3. ScrollTrigger Binding (Hero) or Time-Tween Binding (Loader)
  useEffect(() => {
    if (useFallback || !mounted) return;

    if (variant === "hero") {
      const element = containerRef.current;
      if (!element) return;

      // GSAP ScrollTrigger links scrolling to aperture open progress (0 -> 1)
      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: "bottom top",
        scrub: 0.4, // Reduced lag from 1.5 for direct scroll synchronization
        onUpdate: (self) => {
          scrollRef.current = self.progress;
        },
      });

      return () => {
        trigger.kill();
      };
    } else if (variant === "loader") {
      // Loader variant: Animate closed -> open (0 -> 1) over 0.6s
      const animObj = { progress: 0 };
      const tween = gsap.to(animObj, {
        progress: 1.0,
        duration: 0.6, // accelerated from 1.4s
        ease: "power2.out",
        onUpdate: () => {
          scrollRef.current = animObj.progress;
        },
      });

      return () => {
        tween.kill();
      };
    }
  }, [useFallback, mounted, variant]);

  // Server-Side Rendering or WebGL Fallback
  if (!mounted || useFallback) {
    return <>{fallback}</>;
  }

  const canvasWidth = variant === "hero" ? "100%" : "120px";
  const canvasHeight = variant === "hero" ? "100%" : "120px";

  return (
    <div
      ref={containerRef}
      className={`relative flex items-center justify-center overflow-hidden ${
        variant === "hero" ? "w-full h-full" : "w-[120px] h-[120px]"
      }`}
    >
      <Canvas
        frameloop={inView ? "always" : "never"}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        dpr={1} // Lighter frame rendering
        camera={{
          position: [0, 0, 3.8],
          fov: 45,
        }}
        style={{
          width: canvasWidth,
          height: canvasHeight,
          background: "transparent",
        }}
      >
        <Suspense fallback={null}>
          <BroadcastAperture scrollProgressRef={scrollRef} variant={variant} />
        </Suspense>
      </Canvas>
    </div>
  );
}
