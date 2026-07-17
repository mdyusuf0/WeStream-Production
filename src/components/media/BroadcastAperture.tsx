"use client";

import React, { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

// Pure deterministic pseudo-random generator to satisfy react-hooks/purity linter rules
function getDeterministicRandom(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

interface BroadcastApertureProps {
  scrollProgressRef: React.MutableRefObject<number>;
  variant?: "hero" | "loader";
}

export function BroadcastAperture({
  scrollProgressRef,
  variant = "hero",
}: BroadcastApertureProps) {
  const groupRef = useRef<THREE.Group>(null);
  const bladesGroupRef = useRef<THREE.Group>(null);
  const smoothedProgress = useRef(0);

  // 1. Procedural Iris Blade Geometry
  const bladeShape = useMemo(() => {
    const shape = new THREE.Shape();
    // Local origin (0, 0) is the pivot pin.
    // The blade extends outwards, curving in a mechanical leaf pattern.
    shape.moveTo(0, 0);
    shape.lineTo(0.9, -0.15);
    shape.quadraticCurveTo(1.3, 0.35, 0.8, 1.15);
    shape.lineTo(-0.25, 0.75);
    shape.quadraticCurveTo(-0.35, 0.2, 0, 0);
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.02,
    bevelEnabled: true,
    bevelThickness: 0.006,
    bevelSize: 0.006,
    bevelSegments: 1, // Reduced segments for lightweight rendering
  }), []);

  // 2. Materials
  // Matte Black Anodized Aluminium for blades
  const blackBladeMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#181818",
      roughness: 0.55,
      metalness: 0.7,
      clearcoat: 0.1,
      clearcoatRoughness: 0.4,
    });
  }, []);

  // Brushed Gold Metal for pivot pins, rims, and housing accents
  const goldMetalMaterial = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#D4AF37",
      roughness: 0.22,
      metalness: 0.95,
      clearcoat: 0.8,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });
  }, []);

  // 3. Custom blade configuration
  const totalBlades = 8;
  const pivotRadius = 1.35;
  const swingAngle = -0.75; // Angle of rotation around pivot to swing open

  // Generate single-seeded imperfections at initialization to avoid boring perfect loops
  const bladeSeeds = useMemo(() => {
    return Array.from({ length: totalBlades }).map((_, i) => ({
      phaseOffset: Math.sin(i * 1.7) * 0.1, // breathing offset
      radiusOffset: Math.cos(i * 2.3) * 0.015, // structural asymmetry
      rotationOffset: Math.sin(i * 3.1) * 0.01, // mounting tolerance jitter
    }));
  }, []);

  // 4. Subtle Ambient Dust Particle Field (GPU Instanced Points)
  const particleCount = variant === "hero" ? 70 : 0;
  const particlePositions = useMemo(() => {
    if (particleCount === 0) return new Float32Array(0);
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      pos[i] = (getDeterministicRandom(i) - 0.5) * 8; // X range
      pos[i + 1] = (getDeterministicRandom(i + 1) - 0.5) * 8; // Y range
      pos[i + 2] = (getDeterministicRandom(i + 2) - 0.5) * 4 - 1; // Z range
    }
    return pos;
  }, [particleCount]);

  const particlesRef = useRef<THREE.Points>(null);

  // 5. Frame Loop Animation
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Limit delta to prevent massive jumps on frame drops (e.g. tab switches)
    const clampedDelta = Math.min(delta, 0.1);

    // Subtle breathing amplitude
    const breathing = variant === "hero" ? Math.sin(time * 1.3) * 0.025 : 0;

    // Target progress combines user scroll and idle breathing
    const targetProgress = THREE.MathUtils.clamp(scrollProgressRef.current + breathing, 0, 1.1);

    // Frame-rate independent smoothing of the aperture opening state
    smoothedProgress.current = THREE.MathUtils.damp(
      smoothedProgress.current,
      targetProgress,
      12.0, // increased damping lambda for instant scroll updates
      clampedDelta
    );

    // Dynamic rotation and position updates
    if (bladesGroupRef.current) {
      // Loop over child mesh blades and update their Z rotation around individual pivots
      bladesGroupRef.current.children.forEach((child, index) => {
        // Pivot points are calculated using base angles + seeds
        const seed = bladeSeeds[index];
        const angle = (index / totalBlades) * Math.PI * 2;
        const baseRotation = angle + Math.PI / 2;
        
        // Blades swing outward (open) as progress increases to 1.
        // Closed state is progress = 0.
        const bladeProgress = smoothedProgress.current;
        child.rotation.z = baseRotation + (1 - bladeProgress) * swingAngle + seed.rotationOffset;
        
        // Mechanical breathing breathes position slightly
        const r = pivotRadius + seed.radiusOffset + (1 - bladeProgress) * 0.05;
        child.position.x = Math.cos(angle) * r;
        child.position.y = Math.sin(angle) * r;
      });
    }

    if (groupRef.current) {
      // Slow ambient spin to catch light on gold surfaces
      groupRef.current.rotation.z = time * 0.035;

      // Parallax Tilt based on normalized pointer position (Only for Hero variant)
      if (variant === "hero") {
        const targetRotX = state.pointer.y * 0.06; // halved from 0.12
        const targetRotY = state.pointer.x * 0.06; // halved from 0.12
        
        groupRef.current.rotation.x = THREE.MathUtils.damp(
          groupRef.current.rotation.x,
          targetRotX,
          10.0, // increased from 4.0 for instant cursor updates
          clampedDelta
        );
        groupRef.current.rotation.y = THREE.MathUtils.damp(
          groupRef.current.rotation.y,
          targetRotY,
          10.0, // increased from 4.0 for instant cursor updates
          clampedDelta
        );
      }
    }

    // Drift the ambient particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y += clampedDelta * 0.015;
      particlesRef.current.rotation.x += clampedDelta * 0.008;
    }
  });

  return (
    <>
      {/* 3D Scene Assets & Environments */}
      {variant === "hero" && (
        <Environment preset="studio" />
      )}

      {/* Main Light Ring Setup */}
      <ambientLight intensity={variant === "hero" ? 0.35 : 0.6} />
      
      {/* Warm Golden Key Light */}
      <directionalLight
        position={[3, 4, 5]}
        intensity={variant === "hero" ? 2.5 : 1.5}
        color="#FDE047"
      />
      
      {/* Cool Amber Rim/Fill Light to highlight mechanical edges */}
      <pointLight
        position={[-4, 2, -3]}
        intensity={variant === "hero" ? 3.0 : 1.0}
        color="#D4AF37"
      />

      <group ref={groupRef}>
        {/* A. Outer Gold Casing / Housing Ring */}
        <mesh position={[0, 0, -0.05]}>
          <torusGeometry args={[1.75, 0.08, 8, 36]} />
          <primitive object={goldMetalMaterial} attach="material" />
        </mesh>
        
        {/* Subtle inner gold step ring */}
        <mesh position={[0, 0, -0.02]}>
          <ringGeometry args={[1.65, 1.7, 36]} />
          <primitive object={goldMetalMaterial} attach="material" />
        </mesh>

        {/* B. Centered Blades Assembly Group */}
        <group ref={bladesGroupRef}>
          {Array.from({ length: totalBlades }).map((_, index) => {
            const seed = bladeSeeds[index];
            const angle = (index / totalBlades) * Math.PI * 2;
            const r = pivotRadius + seed.radiusOffset;
            const px = Math.cos(angle) * r;
            const py = Math.sin(angle) * r;
            const baseRotation = angle + Math.PI / 2;

            return (
              <group 
                key={index} 
                position={[px, py, index * 0.008]} 
                rotation={[0, 0, baseRotation + swingAngle]}
              >
                {/* Procedural Extruded Mechanical Blade */}
                <mesh castShadow receiveShadow>
                  <extrudeGeometry args={[bladeShape, extrudeSettings]} />
                  <primitive object={blackBladeMaterial} attach="material" />
                </mesh>

                {/* Golden Pivot Screw Detail */}
                <mesh position={[0, 0, 0.024]} rotation={[Math.PI / 2, 0, 0]}>
                  <cylinderGeometry args={[0.035, 0.035, 0.02, 8]} />
                  <primitive object={goldMetalMaterial} attach="material" />
                </mesh>
              </group>
            );
          })}
        </group>
      </group>

      {/* C. Ambient Gold-Lit Dust Particles (Instanced) */}
      {variant === "hero" && particlePositions.length > 0 && (
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            color="#D4AF37"
            size={0.025}
            sizeAttenuation={true}
            transparent={true}
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </points>
      )}
    </>
  );
}
