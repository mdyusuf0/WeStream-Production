"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SERVICES_DATA, CAPABILITIES_TAGS } from "@/lib/data";

export function CapabilitiesSection() {
  const signalNodes = [
    { step: "01", title: "6K Cinema Capture", desc: "Full-frame optical sensors & SDI feeds" },
    { step: "02", title: "Bonded Cellular Uplink", desc: "Multi-carrier redundant internet bonding" },
    { step: "03", title: "Master vMix Control", desc: "Real-time SRT switching & live graphics" },
    { step: "04", title: "Zero-Latency Stream", desc: "LED stage walls & global RTMP CDN" }
  ];

  return (
    <section id="services" className="section-space bg-transparent text-foreground transition-colors duration-500 relative overflow-hidden">
      <Container className="relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 md:mb-20 max-w-3xl border-b border-header-border pb-8 md:pb-10">
          <span className="font-heading text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground block mb-3">
            03 // PRODUCTION SERVICES
          </span>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Core Production Streams
          </h2>
          <p className="mt-4 text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
            WeStream Production offers comprehensive end-to-end media services, combining heavy broadcast infrastructure with cinematic creative execution.
          </p>
        </div>

        {/* DOMINANT VISUAL FOCAL POINT: BROADCAST SIGNAL FLOW DIAGRAM */}
        <div className="mb-20 bg-surface border border-header-border p-8 md:p-12 rounded-sm space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-header-border pb-6">
            <div>
              <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase block">
                SIGNAL FLOW ARCHITECTURE
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-extrabold text-foreground uppercase">
                End-to-End Live Transmission Topology
              </h3>
            </div>
            <div className="flex items-center gap-2 bg-background/80 px-3 py-1 rounded-full border border-header-border">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-[9px] font-heading font-extrabold tracking-widest text-accent uppercase">
                100% UPTIME SPEC
              </span>
            </div>
          </div>

          {/* Signal Path Nodes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {signalNodes.map((node, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.12 }}
                className="relative bg-background/60 border border-header-border p-6 rounded-sm space-y-3 group hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-heading font-bold text-accent">NODE.{node.step}</span>
                  <span className="h-2 w-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                </div>
                <h4 className="text-sm font-heading font-extrabold text-foreground uppercase">{node.title}</h4>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">{node.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* 4 Core Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-surface border border-header-border p-8 md:p-10 rounded-sm hover:border-accent/40 transition-all duration-500 ease-out flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-heading font-bold text-muted-foreground group-hover:text-accent transition-colors duration-300">
                    /0{index + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />
                </div>

                <h3 className="text-xl md:text-2xl font-heading font-extrabold text-foreground mb-4 group-hover:text-accent transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6 font-sans">
                  {service.shortDesc}
                </p>

                <div className="border-t border-header-border pt-6 mb-8">
                  <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase block mb-4">
                    Specializations:
                  </span>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground font-sans">
                    {service.subServices.slice(0, 4).map((sub, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1 w-1 bg-accent/50 rounded-full" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Link
                href={`/services/${service.slug}`}
                className="text-xs font-heading font-extrabold tracking-widest text-foreground hover:text-accent uppercase py-2 transition-colors duration-300 inline-flex items-center gap-2"
              >
                Explore Service
                <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                  &rarr;
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Tag Cloud of Full Capabilities */}
        <div className="border-t border-header-border pt-12 md:pt-16">
          <span className="font-heading text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground block mb-6 text-center">
            Full Capability Cloud
          </span>
          <div className="flex flex-wrap gap-2.5 justify-center max-w-5xl mx-auto">
            {CAPABILITIES_TAGS.map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.015 }}
                className="text-[10px] md:text-xs font-heading tracking-widest uppercase font-bold px-4 py-2 bg-surface border border-header-border text-muted-foreground hover:border-accent/40 hover:text-accent transition-all duration-300 rounded-full select-none"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>

      </Container>
    </section>
  );
}
