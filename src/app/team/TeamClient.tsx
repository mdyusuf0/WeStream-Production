"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { TeamMember } from "@/lib/data";

interface TeamClientProps {
  teamMembers: TeamMember[];
}

function TeamAvatar({ src, name, index }: { src: string; name: string; index: number }) {
  return (
    <div className="relative w-full aspect-square bg-surface border border-header-border rounded-sm overflow-hidden group">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-accent-glow)_0%,transparent_70%)] z-10 pointer-events-none" />
      <Image
        src={src}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-header-border z-20">
        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
        <span className="text-[8px] font-heading font-extrabold text-foreground tracking-wider uppercase">
          STAFF.0{index + 1}
        </span>
      </div>
    </div>
  );
}

export default function TeamClient({ teamMembers }: TeamClientProps) {
  return (
    <div className="bg-background text-foreground transition-colors duration-500 pt-32 pb-24 min-h-screen">
      
      {/* Page Header */}
      <Container className="mb-20">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-header-border bg-surface shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase">
              STUDIO TEAM
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[0.95]">
            The Minds Behind<br />
            <span className="text-accent">The Lenses.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl font-sans leading-relaxed pt-2">
            Meet the WeStream Production team. A select group of broadcast engineers, directors, and editors based in Bangalore, working together to deliver zero-fail streaming operations.
          </p>
        </div>
      </Container>

      {/* Team Cards Grid */}
      <Container className="mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-6 group"
            >
              <TeamAvatar src={member.avatar} name={member.name} index={index} />

              <div className="space-y-4 px-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase">
                    {member.role}
                  </span>
                  <h2 className="text-lg md:text-xl font-heading font-extrabold text-foreground group-hover:text-accent transition-colors duration-300">
                    {member.name}
                  </h2>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-sans">
                  {member.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {member.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-heading font-extrabold tracking-wider uppercase px-2.5 py-1 bg-surface border border-header-border text-muted-foreground rounded-full select-none"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>

      {/* Join Team CTA */}
      <Container>
        <div className="text-center bg-surface border border-header-border p-12 md:p-16 rounded-sm space-y-6">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase text-foreground">
            Join Our Broadcast Operations
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto font-sans">
            We are always seeking talented vMix engineers, drone operators, and cinema directors across India.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background font-heading text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
              Apply / Get in Touch
            </Link>
          </div>
        </div>
      </Container>

    </div>
  );
}
