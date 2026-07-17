"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { STATS_DATA } from "@/lib/data";

// Counter component for animated stats
function Counter({ value, duration = 1.5 }: { value: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const numVal = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  useEffect(() => {
    if (!isInView) return;
    
    let start = 0;
    const end = numVal;
    if (start === end) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(end);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / end), 8);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / 100);
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
    <span ref={ref} className="font-heading font-extrabold text-accent">
      {count}
      {suffix}
    </span>
  );
}

export function StudioTeaserSection() {
  const benefits = [
    { title: "Broadcast Engineering", desc: "Heavy-duty redundant satellite uplinks and cellular bonding routers." },
    { title: "Cinema Optics", desc: "6K digital cinema camera systems, anamorphic lenses, and specialized lighting." },
    { title: "Zero-Latency Feeds", desc: "Direct SDI routing to live LED walls and international RTMP distribution." },
    { title: "Editorial Finishing", desc: "Display-calibrated color grading, spatial sound design, and motion titles." },
    { title: "Strict Reliability", desc: "Systemic execution workflows built for uncompromised live deadline compliance." },
    { title: "End-to-End Production", desc: "From technical scripting to final broadcast distribution and post audits." }
  ];

  return (
    <section className="section-space bg-transparent text-foreground transition-colors duration-500 relative">
      <Container>
        {/* Top: Blurb & Stats Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-24 items-center">
          {/* Left Column: Teaser Copy */}
          <div className="lg:col-span-6 space-y-6">
            <span className="font-heading text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground block">
              04 // ABOUT WESTREAM
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground leading-tight uppercase tracking-tight">
              We Create.<br />We Capture.<br />We Stream.
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed font-sans max-w-xl">
              WeStream Production operates at the intersection of heavy broadcast infrastructure and cinematic storytelling. We engineer zero-latency video systems for high-stakes corporate summits, political conventions, and commercial releases.
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-sans max-w-xl">
              Headquartered in Bangalore, our technical crew deploys redundant satellite uplinks, bonded cellular streaming, and 6K optics across India.
            </p>
            <div className="pt-2">
              <Link
                href="/studio"
                className="text-xs font-heading font-extrabold tracking-widest text-accent hover:opacity-80 uppercase py-2 transition-all duration-300 inline-flex items-center gap-2 border-b border-accent/30"
              >
                Our Studio & Story
                <span>&rarr;</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Achievements stats in dark luxury card */}
          <div className="lg:col-span-6 bg-surface border border-header-border p-8 md:p-10 rounded-sm space-y-6">
            <div className="flex items-center justify-between border-b border-header-border pb-4">
              <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase">
                STUDIO METRICS SUMMARY
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
              {STATS_DATA.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="space-y-2 border-l-2 border-accent/20 pl-4 py-1 hover:border-accent transition-colors duration-300"
                >
                  <div className="text-4xl md:text-5xl font-heading font-extrabold text-accent">
                    <Counter value={stat.value} />
                  </div>
                  <h3 className="text-xs font-heading font-extrabold tracking-widest uppercase text-foreground">
                    {stat.label}
                  </h3>
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-sans">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: Why Choose Us (Benefits Grid) */}
        <div className="border-t border-header-border pt-16 md:pt-20">
          <div className="mb-14 text-center max-w-2xl mx-auto">
            <span className="font-heading text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground block mb-3">
              Core Pillars
            </span>
            <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
              Why WeStream Production?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-surface border border-header-border p-6 md:p-8 rounded-sm hover:border-accent/40 transition-all duration-300 group"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="h-6 w-6 rounded-full border border-accent/40 flex items-center justify-center group-hover:border-accent transition-colors">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent/60 group-hover:bg-accent transition-colors" />
                  </div>
                  <span className="text-[10px] font-heading font-bold text-muted-foreground">
                    Pillar.0{idx + 1}
                  </span>
                </div>
                <h4 className="text-sm font-heading font-extrabold text-foreground mb-2 group-hover:text-accent transition-colors duration-300">
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
