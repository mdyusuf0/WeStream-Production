"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { STATS_DATA } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

// Counter component for animated stats
function Counter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Extract number and suffix (e.g. "350+" -> number: 350, suffix: "+")
  const numVal = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = numVal;
    if (start === end) {
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 8);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 100); // Speed up increments
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, numVal, duration]);

  return (
    <span ref={ref} className="font-heading font-extrabold text-gold">
      {count}
      {suffix}
    </span>
  );
}

export function StudioTeaserSection() {
  const benefits = [
    { title: "Professional Team", desc: "Experienced crew committed to delivering premium visual layouts." },
    { title: "High-End Equipment", desc: "Professional PTZ setups, drones, wireless audio feeds, and multi-cam switchers." },
    { title: "Reliable Live Streaming", desc: "Redundant bonded internet cellular systems to ensure uninterrupted broadcasts." },
    { title: "Creative Storytelling", desc: "Crafted with attention to editing pace, color grades, and graphics." },
    { title: "On-Time Delivery", desc: "Rigorous execution workflows with strict deadline compliance." },
    { title: "End-to-End Solutions", desc: "From technical scripting to final broadcast distribution and post audits." }
  ];

  return (
    <section className="section-space bg-background relative">
      <Container>
        {/* Top: Blurb & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-32 items-center">
          {/* Left Column: Teaser Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-label block">About WeStream</span>
            <h2 className="text-heading-lg font-heading font-extrabold text-foreground leading-tight">
              We Create.<br />We Capture.<br />We Stream.
            </h2>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans max-w-xl">
              WeStream Production is a Bangalore-based production house specializing in high-stakes video production, multi-camera live streaming, and event broadcasting. 
            </p>
            <p className="text-sm text-muted-foreground/80 leading-relaxed font-sans max-w-xl">
              From corporate conferences and product launches to political rallies and live concerts, our experienced team ensures flawless execution with redundant hardware setups and creative storytelling.
            </p>
            <div className="pt-4">
              <Magnetic range={30} strength={0.3}>
                <Link
                  href="/about"
                  className="text-xs font-heading font-extrabold tracking-widest text-gold hover:text-foreground uppercase py-2 transition-colors inline-flex items-center gap-2 border-b border-gold/20 hover:border-foreground"
                >
                  Our Story & Philosophy
                  <span>&rarr;</span>
                </Link>
              </Magnetic>
            </div>
          </div>

          {/* Right Column: Achievements stats */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-8 md:gap-12">
            {STATS_DATA.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="space-y-2 border-l border-border/40 pl-6"
              >
                <div className="text-4xl md:text-5xl">
                  <Counter value={stat.value} />
                </div>
                <h4 className="text-xs font-heading font-bold tracking-widest uppercase text-foreground">
                  {stat.label}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom: Why Choose Us (Benefits Grid) */}
        <div className="border-t border-border/30 pt-24">
          <div className="mb-16 text-center max-w-2xl mx-auto">
            <span className="text-label block mb-3">Our Core Pillars</span>
            <h3 className="text-heading-md font-heading font-extrabold text-foreground">
              Why WeStream Production?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-surface border border-border/40 p-6 rounded-sm hover:border-gold/25 transition-all duration-300 group"
              >
                {/* Visual Motif: scanning lens circle */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-6 w-6 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold/60 transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/50 group-hover:bg-gold transition-colors" />
                  </div>
                  <span className="text-[10px] font-heading font-bold text-muted-foreground/30">
                    Pillar.0{idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-heading font-extrabold text-foreground mb-2 group-hover:text-gold transition-colors duration-300">
                  {benefit.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  {benefit.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
