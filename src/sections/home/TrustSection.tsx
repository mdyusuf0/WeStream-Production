"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import Marquee from "@/components/ui/Marquee";
import { PROJECTS_DATA, Project } from "@/lib/data";

export function TrustSection({ projects }: { projects?: Project[] }) {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Extract testimonials from projects data
  const testimonials = (projects || PROJECTS_DATA).filter((p) => p.testimonial).map((p) => ({
    text: p.testimonial!.text,
    author: p.testimonial!.author,
    role: p.testimonial!.role,
    client: p.client,
  }));

  const clientBrands = [
    "GLOBAL ENTERPRISE",
    "GOVERNMENT & PUBLIC AFFAIRS",
    "INTERNATIONAL TECH",
    "BROADCAST NETWORKS",
    "CULTURAL FESTIVALS",
    "CORPORATE SUMMITS",
    "GLOBAL MEDIA SERIES"
  ];

  return (
    <section className="section-space bg-transparent text-foreground transition-colors duration-500 relative overflow-hidden">
      {/* 1. Logo Marquee strip */}
      <div className="mb-20 md:mb-24">
        <div className="mb-8 text-center">
          <span className="font-heading text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground block">
            Trusted Across Sectors
          </span>
        </div>
        <Marquee items={clientBrands} />
      </div>

      {/* 2. Testimonials section */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 space-y-6">
            <span className="font-heading text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground block">
              Client Feedback
            </span>
            <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground leading-tight uppercase tracking-tight">
              The WeStream Production Impact
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans max-w-sm">
              Read how we help brands scale their event broadcasts, optimize network latency, and capture cinematic footage.
            </p>
            
            {/* Slider Dots */}
            <div className="flex gap-2 pt-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    activeTestimonial === idx ? "w-8 bg-accent" : "w-2 bg-header-border hover:bg-accent/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Active Testimonial Card */}
          <div className="lg:col-span-7">
            <div className="relative min-h-[250px] bg-surface border border-header-border p-8 md:p-12 rounded-sm hover:border-accent/30 transition-all duration-500 flex flex-col justify-between">
              {/* Quote Motif decoration */}
              <div className="absolute top-6 right-8 font-heading text-7xl md:text-8xl text-accent/10 font-extrabold select-none pointer-events-none">
                “
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTestimonial}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <p className="text-xs sm:text-sm md:text-base text-foreground/90 leading-relaxed font-sans italic">
                    &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                  </p>
                  
                  <div className="border-t border-header-border pt-6 flex justify-between items-end">
                    <div>
                      <h4 className="font-heading text-xs md:text-sm font-extrabold text-foreground uppercase tracking-wider">
                        {testimonials[activeTestimonial].author}
                      </h4>
                      <p className="text-xs text-muted-foreground font-sans mt-0.5">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                    <span className="text-[10px] font-heading font-extrabold text-accent tracking-widest uppercase">
                      // {testimonials[activeTestimonial].client}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
