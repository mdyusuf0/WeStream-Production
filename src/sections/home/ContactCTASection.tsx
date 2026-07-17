"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";

export function ContactCTASection() {
  return (
    <section className="relative py-24 md:py-32 bg-transparent text-foreground transition-colors duration-500 overflow-hidden border-t border-header-border">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_70%)] pointer-events-none" />
      
      <Container className="relative z-10 text-center">
        <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 flex flex-col items-center">
          
          {/* Label Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-header-border bg-surface shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase">
              05 // START YOUR BROADCAST
            </span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl text-foreground font-heading font-extrabold max-w-3xl leading-[1.05] tracking-tight uppercase">
            Ready to Stream Your Next Story?
          </h2>
          
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed font-sans">
            Tell us about your event, broadcasting scope, or film project. We typically respond with a detailed technical estimate within 24 hours.
          </p>

          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-10 py-4 bg-accent text-background font-heading font-extrabold text-xs tracking-[0.2em] uppercase rounded-full shadow-xl hover:opacity-90 transition-opacity"
            >
              Start a Project
            </Link>
          </div>

        </div>
      </Container>
    </section>
  );
}
