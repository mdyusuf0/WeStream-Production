"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MediaStage } from "@/components/media/MediaStage";

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("westream_loader_seen")) {
      requestAnimationFrame(() => setIsLoaded(true));
      return;
    }
    const handleLoaded = () => requestAnimationFrame(() => setIsLoaded(true));
    window.addEventListener("westream_loaded", handleLoaded);
    return () => window.removeEventListener("westream_loaded", handleLoaded);
  }, []);

  return (
    <section 
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent text-foreground transition-colors duration-500"
    >
      {/* THE ENTIRE HERO IS THE MEDIASTAGE (100dvh Spatial Background) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 w-full h-full"
      >
        <MediaStage mode="sculpture" withNoise={true} />
      </motion.div>

      {/* OVERLAY TYPOGRAPHY & CTAs (Off-Axis Editorial Alignment for Spatial Tension) */}
      <Container className="relative z-30 w-full h-full flex flex-col justify-between pt-28 pb-12 md:pb-16 pointer-events-none">
        
        {/* TOP SPATIAL GAP */}
        <div className="w-full" />

        {/* OFF-AXIS MAIN TAGLINE & SECONDARY HEADLINE */}
        <div className="w-full max-w-4xl space-y-4 md:space-y-6 pointer-events-auto">
          
          {/* Main Headline (Off-axis offset left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading font-extrabold text-[clamp(2.5rem,5.5vw,5.5rem)] uppercase tracking-tight leading-[0.92] text-foreground drop-shadow-2xl">
              Bringing Stories to Life.
            </h1>
          </motion.div>

          {/* Secondary Accent Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1.2, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-heading font-extrabold text-[clamp(1.5rem,3.2vw,3rem)] uppercase tracking-tight text-accent leading-[0.95]">
              Streaming Moments That Matter.
            </h2>
          </motion.div>

          {/* Pinned CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 1.0, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-6 pt-4"
          >
            <Link
              href="/work"
              className="inline-flex items-center justify-center min-h-[54px] px-10 bg-accent text-background font-heading text-[11px] font-extrabold tracking-[0.25em] uppercase rounded-sm shadow-2xl hover:opacity-90 transition-opacity"
            >
              View Our Work
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[54px] px-10 border border-header-border text-foreground font-heading text-[11px] font-extrabold tracking-[0.25em] uppercase rounded-sm hover:border-accent hover:text-accent transition-colors"
            >
              Get a Quote
            </Link>
          </motion.div>

        </div>

      </Container>
    </section>
  );
}
