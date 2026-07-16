"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { TEAM_MEMBERS } from "@/lib/data";

// Team avatar headshot rendering component using standard next/image
function TeamAvatar({ src, name, index }: { src: string; name: string; index: number }) {
  return (
    <div className="relative w-full aspect-square bg-[#111111] border border-border/40 rounded-sm overflow-hidden group">
      {/* Background radial gradient decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,175,55,0.04)_0%,transparent_70%)] z-10 pointer-events-none" />
      
      {/* Profile portrait photo */}
      <Image
        src={src}
        alt={name}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Rec icon dot overlay */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/50 z-20">
        <span className="h-1.5 w-1.5 rounded-full bg-gold/70 animate-rec-pulse" />
        <span className="text-[8px] font-heading font-extrabold text-white tracking-wider">
          STAFF.0{index + 1}
        </span>
      </div>
    </div>
  );
}

export default function TeamPage() {
  return (
    <div className="bg-background text-foreground pt-32 pb-24 min-h-screen">
      {/* Page Header */}
      <Container className="mb-24">
        <div className="max-w-4xl space-y-6">
          <span className="text-label block">Who We Are</span>
          <h1 className="text-display font-heading font-extrabold text-foreground leading-none">
            The Minds Behind<br />
            <span className="gold-gradient-text">The Lenses.</span>
          </h1>
          <p className="text-body-lg max-w-2xl pt-4 text-muted-foreground">
            Meet the WeStream Production team. A select group of broadcast engineers, directors, and editors based in Bangalore, working together to deliver zero-fail streaming operations.
          </p>
        </div>
      </Container>

      {/* Team Cards Grid */}
      <Container className="mb-28">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {TEAM_MEMBERS.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="flex flex-col gap-6 group"
            >
              {/* Headshot portrait image frame */}
              <TeamAvatar src={member.avatar} name={member.name} index={index} />

              {/* Bio & Details */}
              <div className="space-y-4 px-1">
                <div className="space-y-1">
                  <span className="text-[10px] font-heading font-extrabold tracking-widest text-gold uppercase">
                    {member.role}
                  </span>
                  <h3 className="text-lg md:text-xl font-heading font-extrabold text-foreground group-hover:text-gold transition-colors duration-300">
                    {member.name}
                  </h3>
                </div>

                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-sans">
                  {member.bio}
                </p>

                {/* Skill Tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {member.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[9px] font-heading font-extrabold tracking-wider uppercase px-2.5 py-1 bg-surface border border-border/40 text-muted-foreground rounded-sm select-none"
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

      {/* Join the Team Section */}
      <Container className="text-center">
        <div className="max-w-2xl mx-auto space-y-6 py-12 border-t border-border/30">
          <span className="text-label block">Work With Us</span>
          <h3 className="text-lg md:text-xl font-heading font-extrabold text-foreground uppercase">
            Join the WeStream Crew
          </h3>
          <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto leading-relaxed">
            We are always looking for passionate freelance cinematographers, vMix operators, and post-production editors in Bangalore and surrounding states.
          </p>
          <div className="pt-4">
            <a
              href="mailto:ersamirsingh@gmail.com?subject=WeStream%20Production%20Career%20Enquiry" // comment placeholder email
              className="inline-flex px-8 py-3 bg-transparent hover:bg-foreground hover:text-background text-foreground border border-foreground font-heading font-extrabold text-[10px] tracking-widest uppercase rounded-sm transition-colors duration-300"
            >
              Submit Your Showreel
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
