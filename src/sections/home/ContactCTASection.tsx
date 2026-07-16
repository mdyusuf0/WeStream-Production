"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import Magnetic from "@/components/ui/Magnetic";

export function ContactCTASection() {
  return (
    <section className="relative py-28 md:py-36 bg-background overflow-hidden border-t border-border/20">
      {/* Dynamic graphic grids overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,175,55,0.06)_0%,transparent_70%)] pointer-events-none" />
      
      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-8 flex flex-col items-center">
          {/* Pulsing indicator label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold/20 bg-gold/5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-rec-pulse" />
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-gold uppercase">
              Start Your Broadcast
            </span>
          </div>

          <h2 className="text-display text-foreground font-heading font-extrabold max-w-3xl leading-[1.05] tracking-tight">
            Ready to bring your story to life?
          </h2>
          
          <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed font-sans">
            Tell us about your event, broadcasting scope, or film project. We typically respond with a detailed technical estimate within 24 hours.
          </p>

          <div className="pt-6">
            <Magnetic range={40} strength={0.3}>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-5 bg-gold hover:bg-[#F5E6C4] text-black font-heading font-extrabold text-xs tracking-[0.2em] uppercase rounded-sm transition-colors duration-300 border border-gold"
              >
                Start a Project
              </Link>
            </Magnetic>
          </div>
        </div>
      </Container>

      {/* Aesthetic lines */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  );
}
