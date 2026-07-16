"use client";

import React from "react";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import Magnetic from "@/components/ui/Magnetic";
import Link from "next/link";

export default function AboutPage() {
  const timeline = [
    {
      year: "2019",
      title: "The Genesis",
      desc: "Founded in Bangalore, Karnataka, WeStream Production started with a single multi-camera kit and a mission: to make corporate webcasting seamless, stable, and high-fidelity."
    },
    {
      year: "2021",
      title: "Expanding Capabilities",
      desc: "As demand for virtual events surged, we scaled our technical assets, investing in professional PTZ cameras, wireless transmitters, and cell-bonding redundancy."
    },
    {
      year: "2023",
      title: "Nationwide Operations",
      desc: "We expanded our travel crew, executing multi-camera broadcasts and corporate films across all major metro areas and political hubs throughout India."
    },
    {
      year: "2025-2027",
      title: "Cinematic Future",
      desc: "Combining hardware engineering (bonded uplinks, zero-latency switching) with post-production art (color grading, 3D graphics), we deliver world-class visual stories."
    }
  ];

  return (
    <div className="bg-background text-foreground pt-32 pb-24">
      {/* 1. Page Header */}
      <Container className="mb-24">
        <div className="max-w-4xl space-y-6">
          <span className="text-label block">Who We Are</span>
          <h1 className="text-display font-heading font-extrabold text-foreground leading-none">
            Reliability Meets<br />
            <span className="gold-gradient-text">Cinematic Artistry.</span>
          </h1>
          <p className="text-body-lg max-w-2xl pt-4 text-muted-foreground">
            WeStream Production is a Bangalore-based creative studio providing multi-camera event broadcasting, live streaming, and high-end video production services across India.
          </p>
        </div>
      </Container>

      {/* 2. Brand Philosophy Grid */}
      <section className="bg-surface/50 border-y border-border/30 py-20 mb-28">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="space-y-4">
              <span className="text-xs font-heading font-extrabold tracking-widest text-gold uppercase">01 / We Create</span>
              <h3 className="text-xl font-heading font-extrabold text-foreground">SCRIPT TO SCREEN</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                We craft your corporate film, brand video, or launching promo from concept script to high-definition delivery. Creative direction is baked into every shoot.
              </p>
            </div>
            
            <div className="space-y-4">
              <span className="text-xs font-heading font-extrabold tracking-widest text-gold uppercase">02 / We Capture</span>
              <h3 className="text-xl font-heading font-extrabold text-foreground">CINEMATIC QUALITY</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Using professional camera sensors, wireless transmitters, drone rigs, and high-end lighting, we record the energy and emotion of your live event.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-xs font-heading font-extrabold tracking-widest text-gold uppercase">03 / We Stream</span>
              <h3 className="text-xl font-heading font-extrabold text-foreground">ZERO-FAIL BROADCAST</h3>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                Our cellular bonding systems combine multiple internet lines. If one line fluctuates, our backups take over seamlessly for lag-free streaming.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* 3. Storytelling Timeline */}
      <Container className="mb-32">
        <div className="max-w-3xl mx-auto">
          <div className="mb-20 text-center">
            <span className="text-label block mb-3">Our History</span>
            <h2 className="text-heading-lg font-heading font-extrabold text-foreground">
              The Journey Since 2019
            </h2>
          </div>

          <div className="relative border-l border-border/60 pl-8 space-y-16">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="relative"
              >
                {/* Year dot connector */}
                <div className="absolute -left-[41px] top-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-background border border-gold">
                  <div className="h-2 w-2 rounded-full bg-gold animate-rec-pulse" />
                </div>

                <div className="space-y-2">
                  <span className="font-heading text-lg font-extrabold text-gold">
                    {item.year}
                  </span>
                  <h4 className="text-lg font-heading font-extrabold text-foreground">
                    {item.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-xl">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      {/* 4. Mini CTA */}
      <Container className="text-center">
        <div className="max-w-xl mx-auto space-y-6">
          <h3 className="text-xl font-heading font-extrabold text-foreground">
            WANT TO DISCUSS TECHNICAL REQUIREMENTS?
          </h3>
          <p className="text-xs text-muted-foreground font-sans">
            Tell us about your event venue, network reception details, and video objectives.
          </p>
          <div className="pt-4">
            <Magnetic range={30} strength={0.3}>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3 bg-gold hover:bg-[#F5E6C4] text-black font-heading font-extrabold text-[10px] tracking-widest uppercase rounded-sm transition-colors duration-300"
              >
                Contact Our Director
              </Link>
            </Magnetic>
          </div>
        </div>
      </Container>
    </div>
  );
}
