"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { MediaStage } from "@/components/media/MediaStage";

export function HeroSection() {
  return (
    <section 
      className="relative w-full h-[100dvh] flex items-center justify-center overflow-hidden bg-transparent text-foreground transition-colors duration-500"
    >
      {/* THE ENTIRE HERO IS THE MEDIASTAGE (100dvh Spatial Background) */}
      <MediaStage mode="sculpture" withNoise={true} />

      {/* OVERLAY TYPOGRAPHY & CTAs (Off-Axis Editorial Alignment for Spatial Tension) */}
      <Container className="relative z-30 w-full h-full flex flex-col justify-between pt-28 pb-12 md:pb-16 pointer-events-none">
        
        {/* TOP SPATIAL GAP */}
        <div className="w-full" />

        {/* OFF-AXIS MAIN TAGLINE & SECONDARY HEADLINE */}
        <div className="w-full max-w-4xl space-y-4 md:space-y-6 pointer-events-auto">
          
          {/* Main Headline (Off-axis offset left) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <h1 className="font-heading font-extrabold text-[clamp(2.5rem,5.5vw,5.5rem)] uppercase tracking-tight leading-[0.92] text-foreground drop-shadow-2xl">
              Bringing Stories to Life.
            </h1>
          </motion.div>

          {/* Secondary Accent Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="font-heading font-extrabold text-[clamp(1.5rem,3.2vw,3rem)] uppercase tracking-tight text-accent leading-[0.95]">
              Streaming Moments That Matter.
            </h2>
          </motion.div>

          {/* Minimal Pinned CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex items-center gap-6 pt-4"
          >
            <Link
              href="/work"
              className="inline-flex items-center justify-center min-h-[48px] px-8 bg-accent text-background font-heading text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-xl hover:opacity-90 transition-opacity"
            >
              View Our Work
            </Link>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 font-heading text-xs font-bold tracking-[0.2em] uppercase text-foreground hover:text-accent transition-colors py-2"
            >
              Get a Quote
              <span className="w-6 h-[1.5px] bg-accent transition-all duration-300 group-hover:w-10" />
            </Link>
          </motion.div>

        </div>

      </Container>
    </section>
  );
}
