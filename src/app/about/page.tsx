"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { STATS_DATA, TEAM_MEMBERS } from "@/lib/data";

export default function AboutPage() {
  const industries = [
    { title: "Corporate Enterprises", desc: "AGMs, product launches, global leadership summits, and white-label RTMP broadcasts." },
    { title: "Public Affairs & Politics", desc: "High-security rallies, election campaign broadcasts, and press conferences across India." },
    { title: "Cultural & Concert Live", desc: "Multi-cam music festivals, stage performances, and zero-latency LED feeds." },
    { title: "Tech & Innovation Summits", desc: "Keynote commercial films, 3D device renders, and same-day social edits." }
  ];

  const technologies = [
    { title: "6K Cinema Systems", desc: "Sony FX6 / FX9 full-frame cinema sensors paired with anamorphic and prime glass." },
    { title: "Bonded Cellular Uplinks", desc: "Peplink and LiveU multi-carrier cellular bonding for uncompromised internet uptime." },
    { title: "SRT & vMix Control", desc: "Encrypted low-latency video transport connecting remote keynotes into live master switchers." },
    { title: "Color & Spatial Audio", desc: "DaVinci Resolve display-calibrated color grading and 5.1 spatial audio mixes." }
  ];

  return (
    <div className="bg-transparent text-foreground transition-colors duration-500 pt-32 pb-24 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <Container className="mb-20">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-header-border bg-surface shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase">
              ABOUT WESTREAM PRODUCTION
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[0.95]">
            Engineering Truth.<br />
            <span className="text-accent">Capturing Cinema.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl font-sans leading-relaxed pt-2">
            WeStream Production operates at the intersection of heavy broadcast infrastructure and cinematic storytelling. We build zero-latency video systems for clients who cannot afford failure.
          </p>
        </div>
      </Container>

      {/* 2. WHO WE ARE & OUR JOURNEY */}
      <Container className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-header-border pt-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block">
              OUR JOURNEY
            </span>
            <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
              Headquartered in Bangalore
            </h2>
          </div>
          
          <div className="lg:col-span-7 space-y-6 text-sm md:text-base text-muted-foreground font-sans leading-relaxed">
            <p>
              Founded with the goal of bringing cinema-grade visual standards to live event broadcasting, WeStream Production has grown into one of South India&apos;s premier multi-cam production houses.
            </p>
            <p>
              From multi-city corporate conventions and political campaign broadcasts to high-profile commercial brand films, our engineers and cinematographers operate with meticulous technical precision.
            </p>
          </div>
        </div>
      </Container>

      {/* 3. OUR APPROACH & PHILOSOPHY */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            OUR APPROACH
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Systemic Execution
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-surface border border-header-border p-8 rounded-sm space-y-3">
            <span className="text-xs font-heading font-bold text-accent">01 // RECONNAISSANCE</span>
            <h3 className="text-lg font-heading font-extrabold text-foreground uppercase">Network Stress-Testing</h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              We audit venue RF environments and bandwidth topologies prior to every production, deploying multi-carrier bonding routers to prevent dropouts.
            </p>
          </div>

          <div className="bg-surface border border-header-border p-8 rounded-sm space-y-3">
            <span className="text-xs font-heading font-bold text-accent">02 // CINEMATOGRAPHY</span>
            <h3 className="text-lg font-heading font-extrabold text-foreground uppercase">Full-Frame Glass</h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              We shoot live broadcasts and commercial keynotes on 6K full-frame sensors with matched cinema lenses for organic color depth and high dynamic range.
            </p>
          </div>

          <div className="bg-surface border border-header-border p-8 rounded-sm space-y-3">
            <span className="text-xs font-heading font-bold text-accent">03 // POST ARCHIVAL</span>
            <h3 className="text-lg font-heading font-extrabold text-foreground uppercase">Same-Day Editing</h3>
            <p className="text-xs text-muted-foreground font-sans leading-relaxed">
              Our on-site post-production trailers deliver high-impact social reels within hours of keynote sessions wrapping.
            </p>
          </div>
        </div>
      </Container>

      {/* 4. INDUSTRIES SERVED */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            SECTORS & DOMAINS
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Industries Served
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industries.map((ind, idx) => (
            <div key={idx} className="bg-surface border border-header-border p-6 rounded-sm space-y-3">
              <span className="text-xs font-heading font-bold text-accent">DOMAIN.0{idx + 1}</span>
              <h3 className="text-sm font-heading font-extrabold text-foreground uppercase">{ind.title}</h3>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">{ind.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* 5. HARDWARE & TECHNOLOGY */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            TECHNICAL CAPABILITY
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Core Technology Stack
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, idx) => (
            <div key={idx} className="bg-surface/50 border border-header-border p-6 rounded-sm space-y-3">
              <span className="text-xs font-heading font-bold text-accent">SPEC.0{idx + 1}</span>
              <h4 className="text-sm font-heading font-extrabold text-foreground uppercase">{tech.title}</h4>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">{tech.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* 6. LEADERSHIP TEASER */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            KEY PERSONNEL
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Leadership & Directors
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.id} className="bg-surface border border-header-border p-6 rounded-sm space-y-4">
              <div className="relative aspect-square w-full rounded-sm overflow-hidden border border-header-border">
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h4 className="text-lg font-heading font-extrabold text-foreground uppercase">{member.name}</h4>
                <p className="text-xs font-heading text-accent uppercase tracking-wider">{member.role}</p>
              </div>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* 7. PAGE CTA */}
      <Container>
        <div className="text-center bg-surface border border-header-border p-12 md:p-16 rounded-sm space-y-6">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase text-foreground">
            Ready to partner with WeStream?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto font-sans">
            Tell us about your upcoming broadcast or video campaign.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background font-heading text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
              Start Your Broadcast
            </Link>
          </div>
        </div>
      </Container>

    </div>
  );
}
