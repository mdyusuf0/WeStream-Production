"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { PLACEHOLDER_ASSETS } from "@/lib/placeholder-assets";
import Magnetic from "@/components/ui/Magnetic";

export function HeroSection() {
  const headline = "Bringing Stories to Life. Streaming Moments That Matter.";
  const words = headline.split(" ");

  // Framer Motion variants for staggered word reveal
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6, // Delay after loading screen clears
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1] as any, // easeOutCubic
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 1.8,
        ease: "easeOut" as any,
      },
    },
  };

  return (
    <section className="relative w-full h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Looping Video */}
      <div className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none -z-10 bg-black">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={PLACEHOLDER_ASSETS.images.heroFallback}
          className="w-full h-full object-cover opacity-60"
        >
          <source src={PLACEHOLDER_ASSETS.videos.hero} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Radial & linear dark overlay to guarantee text readability and hold black/gold contrast */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#0B0B0B]/60 to-[#0B0B0B]/95" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0B0B0B] to-transparent" />
      </div>

      <Container className="relative z-10 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Branded Pre-Heading */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mb-6 flex items-center gap-2 text-gold"
          >
            <span className="h-2 w-2 rounded-full bg-gold animate-rec-pulse" />
            <span className="font-heading text-xs md:text-sm tracking-[0.35em] uppercase font-bold">
              Bangalore · India-wide Broadcasting
            </span>
          </motion.div>

          {/* Headline: Staggered Word Reveal */}
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-display text-white font-heading font-extrabold max-w-4xl tracking-tight leading-[1.05] drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] mb-10"
          >
            {words.map((word, idx) => (
              <span key={idx} className="inline-block mr-3 overflow-hidden py-1">
                <motion.span variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeInVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col sm:flex-row items-center gap-6 justify-center"
          >
            {/* View Our Work - Primary Gold Button */}
            <Magnetic range={35} strength={0.25}>
              <Link
                href="/work"
                className="w-48 sm:w-auto text-center px-8 py-4 bg-gold hover:bg-[#F5E6C4] text-black font-heading font-extrabold text-xs tracking-widest uppercase rounded-sm transition-colors duration-300 border border-gold"
              >
                View Our Work
              </Link>
            </Magnetic>

            {/* Get a Quote - Secondary White/Outline Button */}
            <Magnetic range={35} strength={0.25}>
              <Link
                href="/contact"
                className="w-48 sm:w-auto text-center px-8 py-4 bg-transparent hover:bg-white hover:text-black text-white font-heading font-extrabold text-xs tracking-widest uppercase rounded-sm transition-colors duration-300 border border-white"
              >
                Get a Quote
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </Container>

      {/* Scroll Cue Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer z-10"
      >
        <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] uppercase text-muted-foreground hover:text-gold transition-colors duration-300">
          Scroll
        </span>
        <div className="relative w-[1.5px] h-10 bg-border/40 overflow-hidden">
          {/* Bouncing line scroll cue */}
          <motion.div
            animate={{
              y: ["-100%", "100%"],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-0 left-0 w-full h-1/2 bg-gold"
          />
        </div>
      </motion.div>
    </section>
  );
}
