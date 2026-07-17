"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { PROJECTS_DATA } from "@/lib/data";

const categories = ["All", "Video Production", "Live Streaming", "Event Coverage", "Post Production"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);

  const filteredProjects = activeCategory === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  const processSteps = [
    { step: "01", title: "Creative Brief & Recon", desc: "Understanding the broadcast scope, venue connectivity, and narrative goals." },
    { step: "02", title: "Technical Rigging", desc: "Deploying multi-cam SDI setups, bonded cellular routers, and 6K cinema glass." },
    { step: "03", title: "Live Execution", desc: "Real-time multi-channel switching, remote caller integration, and instant graphics." },
    { step: "04", title: "Editorial Finishing", desc: "Same-day social reels, 4K master delivery, and post-production archives." }
  ];

  return (
    <div className="bg-transparent text-foreground transition-colors duration-500 pt-32 pb-24 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <Container className="mb-16">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-header-border bg-surface shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase">
              SELECTED PORTFOLIO
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[0.95]">
            Cinematic Outcomes.<br />
            <span className="text-accent">Zero Compromise.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl font-sans leading-relaxed pt-2">
            Explore WeStream&apos;s project portfolio, featuring corporate keynotes, multi-camera broadcasting campaigns, political summits, and live event productions.
          </p>
        </div>
      </Container>

      {/* 2. CATEGORIES FILTER BAR */}
      <Container className="mb-14">
        <div className="flex flex-wrap gap-2 border-b border-header-border pb-6">
          {categories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 font-heading text-xs font-bold tracking-widest uppercase transition-colors rounded-full cursor-pointer ${
                  isSelected ? "text-background" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{category}</span>
                {isSelected && (
                  <motion.span
                    layoutId="active-filter-bg"
                    className="absolute inset-0 bg-accent rounded-full"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </Container>

      {/* 3. FEATURED PROJECTS GRID (Links to /work/[slug]) */}
      <Container className="mb-28">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 md:gap-12"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => {
              const isHovered = hoveredSlug === project.slug;
              return (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col gap-4 group cursor-pointer"
                  onMouseEnter={() => setHoveredSlug(project.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                >
                  <Link 
                    href={`/work/${project.slug}`} 
                    className="block space-y-4"
                    onClick={(e) => {
                      const img = e.currentTarget.querySelector("img");
                      if (img) {
                        const rect = img.getBoundingClientRect();
                        window.dispatchEvent(new CustomEvent("westream_expand_project", {
                          detail: { src: project.thumbnail, rect }
                        }));
                      }
                    }}
                  >
                     {/* Thumbnail Frame */}
                    <div className="relative aspect-[16/9] w-full overflow-hidden border border-header-border bg-surface rounded-sm group-hover:border-accent/30 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(212,175,55,0.06)] transition-all duration-700 ease-[0.16,1,0.3,1]">
                      
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-header-border">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                        <span className="text-[9px] font-heading font-extrabold tracking-widest text-foreground uppercase">
                          {project.category}
                        </span>
                      </div>

                      {/* Year Overlay */}
                      <div className="absolute bottom-3 right-3 z-10 text-[9px] font-heading font-extrabold tracking-widest text-accent bg-background/80 backdrop-blur-md px-2.5 py-1 rounded-sm border border-header-border">
                        {project.year}
                      </div>

                      {/* Image Thumbnail */}
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={idx < 2}
                        className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
                          isHovered ? "opacity-90" : "opacity-100"
                        }`}
                      />

                      {/* Hover Video Preview */}
                      {isHovered && (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 opacity-100 scale-[1.02]"
                        >
                          <source src={project.videoUrl} type="video/mp4" />
                        </video>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                    </div>

                    {/* Metadata */}
                    <div className="flex justify-between items-start gap-4 px-1 group-hover:translate-x-2 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                      <div className="space-y-1">
                        <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase">
                          {project.client}
                        </span>
                        <h3 className="text-xl md:text-2xl font-heading font-extrabold text-foreground group-hover:text-accent transition-colors duration-300">
                          {project.title}
                        </h3>
                        <p className="text-xs text-muted-foreground font-sans line-clamp-2 pt-1">
                          {project.description}
                        </p>
                      </div>
                      <span className="text-xs font-heading font-bold text-accent group-hover:translate-x-1 transition-transform duration-300">
                        &rarr;
                      </span>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </Container>

      {/* 4. PRODUCTION PROCESS SECTION */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-14">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            METHODOLOGY
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            How We Deliver Excellence
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {processSteps.map((step, idx) => (
            <div key={idx} className="bg-surface border border-header-border p-6 md:p-8 rounded-sm space-y-3">
              <span className="text-xs font-heading font-bold text-accent block">
                PHASE.{step.step}
              </span>
              <h4 className="text-sm font-heading font-extrabold text-foreground uppercase">
                {step.title}
              </h4>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* 5. PAGE CTA */}
      <Container>
        <div className="text-center bg-surface border border-header-border p-12 md:p-16 rounded-sm space-y-6">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase text-foreground">
            Have a project in mind?
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto font-sans">
            Let&apos;s discuss your technical requirements, venue setup, and broadcast distribution scope.
          </p>
          <div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background font-heading text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
              Start a Conversation
            </Link>
          </div>
        </div>
      </Container>

    </div>
  );
}
