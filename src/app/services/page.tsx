"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { SERVICES_DATA } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

export default function ServicesPage() {
  return (
    <div className="bg-background text-foreground pt-32 pb-24">
      {/* Page Header */}
      <Container className="mb-24">
        <div className="max-w-4xl space-y-6">
          <span className="text-label block">What We Offer</span>
          <h1 className="text-display font-heading font-extrabold text-foreground leading-none">
            End-To-End<br />
            <span className="gold-gradient-text">Production Power.</span>
          </h1>
          <p className="text-body-lg max-w-2xl pt-4 text-muted-foreground">
            From technical camera setups and live multi-provider cellular bonding to high-end video editing and motion design, WeStream offers robust visual solutions.
          </p>
        </div>
      </Container>

      {/* Services List Section */}
      <Container className="space-y-24 mb-32">
        {SERVICES_DATA.map((service, index) => {
          const isEven = index % 2 === 0;

          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`flex flex-col lg:flex-row gap-12 lg:gap-20 items-center justify-between border-b border-border/30 pb-20 ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Left Side: Video Preview Card */}
              <div className="w-full lg:w-1/2 relative aspect-video border border-border/40 bg-muted/15 rounded-sm overflow-hidden group">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
                >
                  <source src={service.videoUrl} type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                
                {/* Index tag */}
                <div className="absolute top-4 left-4 font-heading text-xs font-bold text-gold bg-black/60 px-3 py-1 border border-border/50">
                  /0{index + 1}
                </div>
              </div>

              {/* Right Side: Text Description & Sub-services */}
              <div className="w-full lg:w-1/2 space-y-6">
                <h2 className="text-heading-md font-heading font-extrabold text-foreground">
                  {service.title}
                </h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                  {service.description}
                </p>

                {/* Sub-services Tags */}
                <div className="space-y-3">
                  <span className="text-[10px] font-heading font-extrabold tracking-widest text-gold uppercase block">
                    Capabilities Include:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {service.subServices.map((sub, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] font-heading tracking-wider uppercase font-bold px-3 py-1.5 bg-surface border border-border/30 text-muted-foreground hover:border-gold/30 hover:text-gold transition-colors duration-300 rounded-sm select-none"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Explore button */}
                <div className="pt-4">
                  <Magnetic range={30} strength={0.3}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-heading font-extrabold tracking-widest text-foreground hover:text-gold uppercase py-2 transition-colors border-b border-border hover:border-gold duration-300"
                    >
                      Deep Dive Overview
                      <span>&rarr;</span>
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          );
        })}
      </Container>

      {/* Global Bottom CTA banner */}
      <Container className="text-center">
        <div className="max-w-2xl mx-auto space-y-6 py-12 bg-surface border border-border/40 rounded-sm px-6">
          <span className="h-1.5 w-1.5 rounded-full bg-gold inline-block animate-rec-pulse" />
          <h3 className="text-lg md:text-xl font-heading font-extrabold text-foreground uppercase">
            Need a custom production package?
          </h3>
          <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto">
            Contact us with your budget, project timeline, and event specs. We will design a custom camera layout and streaming solution.
          </p>
          <div className="pt-4">
            <Magnetic range={30} strength={0.3}>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3 bg-gold hover:bg-[#F5E6C4] text-black font-heading font-extrabold text-[10px] tracking-widest uppercase rounded-sm transition-colors duration-300"
              >
                Get Custom Proposal
              </Link>
            </Magnetic>
          </div>
        </div>
      </Container>
    </div>
  );
}
