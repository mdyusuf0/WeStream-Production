"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { STATS_DATA, TEAM_MEMBERS } from "@/lib/data";

export default function StudioPage() {
  const values = [
    { title: "Broadcast Discipline", desc: "Redundant internet networks, dual control rooms, and zero single points of failure." },
    { title: "Cinematic Aesthetics", desc: "6K cinema sensors, prime glass, and display-calibrated color grading." },
    { title: "Zero Latency", desc: "Direct SDI signal routing to live LED walls and global RTMP distribution." },
    { title: "Complete Confidentiality", desc: "Encrypted stream portals, single sign-on (SSO), and non-disclosure execution." }
  ];

  const workflow = [
    { step: "01", title: "Technical Reconnaissance", desc: "Venue network audits, signal path planning, and bandwidth stress tests." },
    { step: "02", title: "Rigging & Calibration", desc: "Deploying multi-cam SDI lines, bonded routers, and color-matched camera sensors." },
    { step: "03", title: "Live Execution", desc: "Real-time multi-channel switching, remote caller integration, and instant graphics." },
    { step: "04", title: "Post-Event Archival", desc: "Same-day social reels, 4K master delivery, and post-production analytics." }
  ];

  const equipmentList = [
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
              STUDIO OVERVIEW & COMPANY STORY
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[0.95]">
            Engineering Cinema.<br />
            <span className="text-accent">Powering Live Streams.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl font-sans leading-relaxed pt-2">
            WeStream Production is a specialized Bangalore studio engineered for high-stakes broadcasts, corporate keynotes, and commercial film productions across India.
          </p>
        </div>
      </Container>

      {/* 2. COMPANY STORY & MISSION */}
      <Container className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-header-border pt-16">
          <div className="lg:col-span-5 space-y-4">
            <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block">
              COMPANY STORY & MISSION
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
              From multi-city corporate conventions and political campaign broadcasts to high-profile commercial brand films, our engineers and directors operate with meticulous technical precision.
            </p>
          </div>
        </div>
      </Container>

      {/* 3. PHILOSOPHY & VALUES */}
      <Container className="mb-28">
        <div className="mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            FOUNDATIONAL VALUES
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Built for Zero Failure
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div 
              key={idx} 
              className="bg-surface border border-header-border p-6 md:p-8 rounded-sm hover:border-accent/40 transition-all duration-300 space-y-4"
            >
              <span className="text-xs font-heading font-bold text-accent">
                0{idx + 1} //
              </span>
              <h3 className="text-lg font-heading font-extrabold text-foreground uppercase">
                {v.title}
              </h3>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* 4. PRODUCTION PROCESS (VISUAL TIMELINE DIAGRAM FOCAL POINT) */}
      <Container className="mb-28">
        <div className="border-t border-header-border pt-16 mb-14">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            METHODOLOGY
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Production Process Pipeline
          </h2>
        </div>

        {/* Timeline Visualization Card */}
        <div className="bg-surface border border-header-border p-8 md:p-12 rounded-sm space-y-8">
          <div className="flex items-center justify-between border-b border-header-border pb-4">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase">
              LIVE EXECUTION TIMELINE
            </span>
            <span className="text-xs font-heading font-bold text-muted-foreground">
              STAGES 01 &ndash; 04
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {workflow.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-background/70 border border-header-border p-6 md:p-8 rounded-sm space-y-3 hover:border-accent/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-heading font-extrabold text-accent block">
                    {item.step}
                  </span>
                  <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                </div>
                <h3 className="text-sm font-heading font-extrabold text-foreground uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>

      {/* 5. EQUIPMENT & TECHNOLOGY STACK */}
      <Container className="mb-28">
        <div className="border-t border-header-border pt-16 mb-14">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            HARDWARE SPECIFICATION
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Core Equipment & Tech
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {equipmentList.map((eq, idx) => (
            <div key={idx} className="bg-surface border border-header-border p-6 rounded-sm space-y-3">
              <span className="text-xs font-heading font-bold text-accent">SPEC.0{idx + 1}</span>
              <h3 className="text-sm font-heading font-extrabold text-foreground uppercase">{eq.title}</h3>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">{eq.desc}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* 6. LEADERSHIP & TEAM */}
      <Container className="mb-28">
        <div className="border-t border-header-border pt-16 mb-14">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            LEADERSHIP & CREW
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Meet Our Studio Engineers
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
                <h3 className="text-lg font-heading font-extrabold text-foreground uppercase">{member.name}</h3>
                <p className="text-xs font-heading text-accent uppercase tracking-wider">{member.role}</p>
              </div>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">{member.bio}</p>
            </div>
          ))}
        </div>
      </Container>

      {/* 7. STATISTICS SUMMARY */}
      <Container className="mb-24">
        <div className="bg-surface border border-header-border p-10 md:p-14 rounded-sm grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS_DATA.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <p className="text-3xl md:text-5xl font-heading font-extrabold text-accent">
                {stat.value}
              </p>
              <h4 className="text-xs font-heading font-bold uppercase text-foreground">
                {stat.label}
              </h4>
              <p className="text-[10px] text-muted-foreground font-sans">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* 8. FINAL CALL TO ACTION */}
      <Container>
        <div className="text-center bg-surface border border-header-border p-12 md:p-16 rounded-sm space-y-6">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase text-foreground">
            Partner With Our Studio
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto font-sans">
            Ready to deploy broadcast-grade infrastructure for your next live event or video commercial?
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background font-heading text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
              Contact Studio Team
            </Link>
          </div>
        </div>
      </Container>

    </div>
  );
}
