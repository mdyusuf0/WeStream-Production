"use client";

import React, { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FilmReelDividerProps {
  className?: string;
  triggerId: string;
}

function RibbonMesh({ scrollRef }: { scrollRef: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const smoothedScroll = useRef(0);

  // 1. Procedural 3D Bent Ribbon Geometry
  const ribbonGeometry = useMemo(() => {
    // Width is long (16 units), height is thin (0.6 units)
    const geom = new THREE.PlaneGeometry(16, 0.6, 32, 2);
    const pos = geom.attributes.position;
    
    // Wave displacement in Z and Y along the X axis
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      
      // Gentle sine curve in Z-depth to weave in/out of the viewport
      const z = Math.sin(x * 0.35) * 0.45;
      pos.setZ(i, z);
      
      // Slight vertical wave in Y to look unfurled/dynamic
      const newY = y + Math.cos(x * 0.3) * 0.18;
      pos.setY(i, newY);
    }
    
    geom.computeVertexNormals();
    return geom;
  }, []);

  // 2. Dynamic Repeating Film Strip Canvas Texture
  const texture = useMemo(() => {
    if (typeof window === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 128;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    // Clear transparent
    ctx.fillStyle = "rgba(0,0,0,0)";
    ctx.fillRect(0, 0, 256, 128);

    // Matte dark grey body
    ctx.fillStyle = "#151515";
    ctx.fillRect(0, 16, 256, 96);

    // Gold brushed borders
    ctx.fillStyle = "#D4AF37";
    ctx.fillRect(0, 12, 256, 4);
    ctx.fillRect(0, 112, 256, 4);

    // Dynamic Alpha Mask for Perforation Holes (transparent cutouts)
    ctx.globalCompositeOperation = "destination-out";
    ctx.fillStyle = "#000000";
    for (let x = 8; x < 256; x += 32) {
      // Top row holes
      ctx.fillRect(x, 4, 16, 8);
      // Bottom row holes
      ctx.fillRect(x, 116, 16, 8);
    }
    ctx.globalCompositeOperation = "source-over";

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    // Repeat along the horizontal length of the ribbon
    tex.repeat.set(12, 1);
    return tex;
  }, []);

  // 3. Render Loop Animation
  // eslint-disable-next-line react-hooks/immutability
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    const clampedDelta = Math.min(delta, 0.1);

    // Smooth scroll position
    smoothedScroll.current = THREE.MathUtils.damp(
      smoothedScroll.current,
      scrollRef.current,
      10.0, // increased damping lambda for instant scroll updates
      clampedDelta
    );

    if (meshRef.current) {
      // Slide texture horizontally as user scrolls
      if (texture) {
        // eslint-disable-next-line react-hooks/immutability
        texture.offset.x = smoothedScroll.current * -0.25;
      }

      // Rotate ribbon slightly as you scroll past
      meshRef.current.rotation.y = THREE.MathUtils.damp(
        meshRef.current.rotation.y,
        smoothedScroll.current * Math.PI * 0.35,
        10.0, // increased damping lambda for instant scroll updates
        clampedDelta
      );

      // Subtle slow ambient floating movement
      meshRef.current.position.y = Math.sin(time * 0.8) * 0.05;
      meshRef.current.rotation.z = Math.cos(time * 0.5) * 0.015;
    }
  });

  return (
    <mesh ref={meshRef} geometry={ribbonGeometry}>
      {texture && (
        <meshPhysicalMaterial
          map={texture}
          alphaMap={texture}
          transparent={true}
          roughness={0.25}
          metalness={0.9}
          clearcoat={0.7}
          clearcoatRoughness={0.15}
          side={THREE.DoubleSide}
        />
      )}
    </mesh>
  );
}

export function FilmReelDivider({ className = "", triggerId }: FilmReelDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollProgress = useRef(0);
  const [mounted, setMounted] = useState(false);
  const [inView, setInView] = useState(false);
  const [useFallback, setUseFallback] = useState(true);

  // 1. Feature Detection
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

  // 2. IntersectionObserver to toggle Canvas Frameloop (performance control)
  useEffect(() => {
    if (useFallback || !mounted) return;
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
  }, [useFallback, mounted]);

  // 3. ScrollTrigger mapping
  useEffect(() => {
    if (useFallback || !mounted) return;

    const element = containerRef.current;
    if (!element) return;

    const trigger = ScrollTrigger.create({
      trigger: `#${triggerId}`, // Trigger based on parent section ID
      start: "top bottom",
      end: "bottom top",
      scrub: 0.4, // Reduced lag from 1.5 for direct scroll synchronization
      onUpdate: (self) => {
        scrollProgress.current = self.progress;
      },
    });

    return () => {
      trigger.kill();
    };
  }, [useFallback, mounted, triggerId]);

  // Fallback: Elegant brushed gold hairline divider line
  if (!mounted || useFallback) {
    return (
      <div className={`w-full py-10 flex items-center justify-center ${className}`}>
        <div className="w-[90%] h-[1px] bg-gradient-to-r from-transparent via-accent/35 to-transparent relative">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent" />
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full h-[120px] relative overflow-hidden select-none bg-transparent flex items-center justify-center ${className}`}
    >
      <Canvas
        frameloop={inView ? "always" : "never"}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        dpr={1} // Lighter frame rendering
        camera={{ position: [0, 0, 1.8], fov: 40 }}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <ambientLight intensity={0.4} />
        
        {/* Spotlight casting warm highlights on gold edges */}
        <spotLight 
          position={[0, 4, 3]} 
          intensity={2.5} 
          color="#D4AF37" 
          angle={0.6}
        />
        <directionalLight 
          position={[-3, 2, -2]} 
          intensity={1.0} 
          color="#ffffff" 
        />
        
        <RibbonMesh scrollRef={scrollProgress} />
      </Canvas>
    </div>
  );
}
