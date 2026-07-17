"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { Service } from "@/lib/data";

interface ServicesClientProps {
  services: Service[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
  const generalWorkflow = [
    { phase: "01", title: "Consultation & Scope", desc: "Understanding narrative goals, technical venue requirements, and broadcast scale." },
    { phase: "02", title: "Technical Rigging", desc: "Deploying multi-cam SDI lines, Peplink bonded routers, and 6K optics." },
    { phase: "03", title: "Live Execution", desc: "Real-time multi-channel switching, remote caller integration, and instant graphics." },
    { phase: "04", title: "Master Delivery", desc: "Same-day social reels, 4K master delivery, and post-production archives." }
  ];

  return (
    <div className="bg-transparent text-foreground transition-colors duration-500 pt-32 pb-24 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <Container className="mb-20">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-header-border bg-surface shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase">
              PRODUCTION STREAMS
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[0.95]">
            End-To-End<br />
            <span className="text-accent">Production Power.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl font-sans leading-relaxed pt-2">
            From technical camera setups and live multi-provider cellular bonding to high-end video editing and motion design, WeStream offers robust visual solutions.
          </p>
        </div>
      </Container>

      {/* 2. SERVICES EXPANDED CARDS */}
      <Container className="space-y-20 mb-28">
        {services.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6 }}
              className={`flex flex-col lg:flex-row gap-10 lg:gap-16 items-center justify-between border-b border-header-border pb-16 ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Left Side: Video Preview Card */}
              <div className="w-full lg:w-1/2 relative aspect-video border border-header-border bg-surface rounded-sm overflow-hidden group">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                >
                  <source src={service.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4 font-heading text-xs font-bold text-accent bg-background/80 backdrop-blur-md px-3 py-1 border border-header-border rounded-sm">
                  /0{index + 1}
                </div>
              </div>

              {/* Right Side: Text Description & Sub-services */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
                  {service.title}
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                  {service.description}
                </p>

                {/* Sub-services Tags */}
                <div className="space-y-3">
                  <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase block">
                    Capabilities Include:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.subServices.map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-heading tracking-wider uppercase font-bold px-3 py-1.5 bg-surface border border-header-border text-muted-foreground hover:border-accent/40 hover:text-accent transition-colors duration-300 rounded-full select-none"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-heading font-extrabold tracking-widest text-accent hover:opacity-80 uppercase py-2 transition-all border-b border-accent/30"
                  >
                    Deep Dive Overview &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </Container>

      {/* 3. WORKFLOW METHODOLOGY */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            METHODOLOGY
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Production Lifecycle
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {generalWorkflow.map((item, idx) => (
            <div key={idx} className="bg-surface border border-header-border p-6 rounded-sm space-y-3">
              <span className="text-xs font-heading font-bold text-accent block">
                PHASE.{item.phase}
              </span>
              <h3 className="text-sm font-heading font-extrabold text-foreground uppercase">
                {item.title}
              </h3>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* 4. PAGE CTA */}
      <Container>
        <div className="text-center bg-surface border border-header-border p-12 md:p-16 rounded-sm space-y-6">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase text-foreground">
            Need a custom production package?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto font-sans">
            Contact our production team for venue reconnaissance, equipment specs, and custom bandwidth estimates.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background font-heading text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
              Get Technical Estimate
            </Link>
          </div>
        </div>
      </Container>

    </div>
  );
}
