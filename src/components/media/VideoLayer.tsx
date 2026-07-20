"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface VideoLayerProps {
  src: string;
  poster?: string;
  className?: string;
}

export function VideoLayer({ src, poster, className = "" }: VideoLayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return (
    <motion.video
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ 
        opacity: isLoaded ? 0.6 : 0, 
        scale: isLoaded ? 1 : 1.05 
      }}
      transition={{ duration: 2, ease: "easeOut" }}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={`w-full h-full object-cover ${className}`}
      onLoadedData={() => setIsLoaded(true)}
    >
      <source src={src} type="video/mp4" />
    </motion.video>
  );
}
