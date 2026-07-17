"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface BladeProps {
  index: number;
  openness: number;
  mouseX: number;
  mouseY: number;
}

function Blade({ index, openness, mouseX, mouseY }: BladeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const angle = (index * Math.PI * 2) / 8;
  const baseRotation = angle + Math.PI / 4.5;

  useFrame((state) => {
    if (!meshRef.current) return;
    
    // 1. Slow breathing motion
    const time = state.clock.getElapsedTime();
    const breath = Math.sin(time * 1.2 + index) * 0.015;

    // 2. Openness moves blades outward radially
    // At openness = 0, blades form a tight closed iris.
    // At openness = 1, blades are completely pushed outside the view camera frustum.
    const r = 0.58 + openness * 2.2 + breath;
    const targetX = Math.cos(angle) * r;
    const targetY = Math.sin(angle) * r;

    // Smooth position interpolation (damping)
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.08);
    meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, targetY, 0.08);

    // 3. Subtle rotation offset on cursor movement
    meshRef.current.rotation.z = THREE.MathUtils.lerp(
      meshRef.current.rotation.z, 
      baseRotation + (mouseX * 0.08) - (mouseY * 0.08), 
      0.06
    );
  });

  const isGold = index % 2 === 0;

  return (
    <mesh ref={meshRef} rotation={[0, 0, baseRotation]}>
      {/* Simple trapezoidal box geometry for the aperture blades */}
      <boxGeometry args={[1.6, 0.45, 0.01]} />
      <meshStandardMaterial
        color={isGold ? "#D4AF37" : "#0D0D0D"}
        metalness={isGold ? 0.9 : 0.1}
        roughness={isGold ? 0.22 : 0.85}
      />
    </mesh>
  );
}

interface SceneProps {
  openness: number;
  mouseX: number;
  mouseY: number;
}

function Scene({ openness, mouseX, mouseY }: SceneProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    // Cursor parallax tilt
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, mouseX * 0.15, 0.05);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -mouseY * 0.15, 0.05);
  });

  return (
    <group ref={groupRef}>
      {/* 8 Procedural Shutter Blades */}
      {[...Array(8)].map((_, i) => (
        <Blade key={i} index={i} openness={openness} mouseX={mouseX} mouseY={mouseY} />
      ))}
      
      {/* Outer lens structural bevel rim */}
      <mesh position={[0, 0, -0.02]}>
        <ringGeometry args={[2.2, 2.35, 64]} />
        <meshStandardMaterial color="#D4AF37" metalness={0.9} roughness={0.3} />
      </mesh>
    </group>
  );
}

export function ThreeAperture({ openness = 0 }: { openness?: number }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [prefersReduced, setPrefersReduced] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mediaQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (mediaQuery.matches) return;
      setMouse({
        x: (e.clientX / window.innerWidth) - 0.5,
        y: (e.clientY / window.innerHeight) - 0.5,
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Simple CSS fallback when reduced-motion is requested
  if (prefersReduced) {
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="w-48 h-48 rounded-full border-2 border-accent/40 animate-pulse"
          style={{ transform: `scale(${1 + openness * 0.5})` }}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full min-h-[100dvh] flex items-center justify-center">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.3} />
        {/* Premium Studio Spotlight Setup */}
        <pointLight position={[6, 6, 6]} intensity={1.8} color="#D4AF37" />
        <pointLight position={[-6, 6, 3]} intensity={1.0} color="#FFFFFF" />
        <directionalLight position={[0, -6, 2]} intensity={0.6} color="#D4AF37" />
        
        <Scene openness={openness} mouseX={mouse.x} mouseY={mouse.y} />
      </Canvas>
    </div>
  );
}
