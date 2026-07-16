"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import Marquee from "@/components/ui/Marquee";
import { PROJECTS_DATA } from "@/lib/data";

export function TrustSection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Extract testimonials from projects data
  const testimonials = PROJECTS_DATA.filter((p) => p.testimonial).map((p) => ({
    text: p.testimonial!.text,
    author: p.testimonial!.author,
    role: p.testimonial!.role,
    client: p.client,
  }));

  const clientBrands = [
    "WORK INDIA",
    "SUGGESTABLE",
    "GREENROOM",
    "POONAWALLA",
    "TCZ STUDIO",
    "WESTREAM DIGITAL",
    "GREENROOM MEDIA",
    "TCZ BROADCASTING"
  ];

  return (
    <section className="section-space bg-background relative overflow-hidden">
      {/* 1. Logo Marquee strip */}
      <div className="mb-28">
        <div className="mb-10 text-center">
          <span className="text-label block mb-2">Trusted By Leading Brands</span>
        </div>
        <Marquee items={clientBrands} />
      </div>

      {/* 2. Testimonials section */}
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-label block">Client Reviews</span>
            <h3 className="text-heading-md font-heading font-extrabold text-foreground leading-tight">
              The WeStream<br />Production Impact
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-sm">
              Read how we help brands scale their event broadcasts, optimize network latency, and capture cinematic footage.
            </p>
            
            {/* Slider Dots */}
            <div className="flex gap-2 pt-4">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    activeTestimonial === idx ? "w-8 bg-gold" : "w-2 bg-border hover:bg-gold/40"
                  }`}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Active Testimonial Card */}
          <div className="lg:col-span-7">
            <div className="relative min-h-[250px] bg-surface border border-border/40 p-8 md:p-12 rounded-sm hover:border-gold/20 transition-all duration-500 flex flex-col justify-between">
              {/* Quote Motif decoration */}
              <div className="absolute top-6 right-8 font-heading text-8xl text-gold/5 font-extrabold select-none pointer-events-none">
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
                  <p className="text-sm md:text-base text-foreground/90 leading-relaxed font-sans italic">
                    &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                  </p>
                  
                  <div className="border-t border-border/30 pt-6 flex justify-between items-end">
                    <div>
                      <h5 className="font-heading text-xs md:text-sm font-extrabold text-foreground uppercase tracking-wider">
                        {testimonials[activeTestimonial].author}
                      </h5>
                      <p className="text-xs text-muted-foreground font-sans mt-0.5">
                        {testimonials[activeTestimonial].role}
                      </p>
                    </div>
                    <span className="text-[10px] font-heading font-extrabold text-gold tracking-widest uppercase">
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
