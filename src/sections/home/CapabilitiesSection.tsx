"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SERVICES_DATA, CAPABILITIES_TAGS } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

export function CapabilitiesSection() {
  return (
    <section id="services" className="section-space bg-[#0D0D0D] relative overflow-hidden">
      {/* Decorative vertical grid line background */}
      <div className="absolute inset-y-0 left-1/4 w-[1px] bg-border/10 hidden lg:block" />
      <div className="absolute inset-y-0 left-2/4 w-[1px] bg-border/10 hidden lg:block" />
      <div className="absolute inset-y-0 left-3/4 w-[1px] bg-border/10 hidden lg:block" />

      <Container className="relative z-10">
        {/* Section Title */}
        <div className="mb-20 max-w-3xl">
          <span className="text-label block mb-3">Our Offerings</span>
          <h2 className="text-heading-lg font-heading font-extrabold text-white">
            Core Production Streams
          </h2>
          <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
            WeStream Production offers comprehensive end-to-end media services, combining heavy broadcast infrastructure with cinematic creative execution.
          </p>
        </div>

        {/* 4 Core Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-black/60 border border-border/40 p-8 md:p-10 rounded-sm hover:border-gold/30 transition-all duration-500 ease-out flex flex-col justify-between"
            >
              <div>
                {/* Index number and rec indicator */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xs font-heading font-bold text-muted-foreground/45 group-hover:text-gold transition-colors duration-300">
                    /0{index + 1}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gold/40 group-hover:bg-gold animate-rec-pulse transition-colors" />
                </div>

                <h3 className="text-heading-md font-heading font-extrabold text-white mb-4 group-hover:text-gold transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 font-sans">
                  {service.shortDesc}
                </p>

                {/* Sub-services list preview */}
                <div className="border-t border-border/30 pt-6 mb-10">
                  <span className="text-[10px] font-heading font-extrabold tracking-widest text-gold uppercase block mb-4">
                    Specializations:
                  </span>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-muted-foreground font-sans">
                    {service.subServices.slice(0, 4).map((sub, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="h-1 w-1 bg-gold/50 rounded-full" />
                        {sub}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Magnetic range={30} strength={0.3}>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-xs font-heading font-extrabold tracking-widest text-white hover:text-gold uppercase py-2 transition-colors duration-300 inline-flex items-center gap-2"
                >
                  Explore Service
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">
                    &rarr;
                  </span>
                </Link>
              </Magnetic>
            </motion.div>
          ))}
        </div>

        {/* Tag Cloud of Full Capabilities */}
        <div className="border-t border-border/30 pt-16">
          <span className="text-label block mb-6 text-center">Full Capability Cloud</span>
          <div className="flex flex-wrap gap-2.5 justify-center max-w-5xl mx-auto">
            {CAPABILITIES_TAGS.map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.02 }}
                className="text-[10px] md:text-xs font-heading tracking-widest uppercase font-bold px-4 py-2 bg-black/40 border border-border/40 text-muted-foreground hover:border-gold/30 hover:text-gold transition-all duration-300 rounded-full select-none"
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
