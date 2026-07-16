"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { PROJECTS_DATA, Project } from "@/lib/data";
import { MediaLightbox } from "@/components/ui/MediaLightbox";

const categories = ["All", "Video Production", "Live Streaming", "Event Coverage", "Post Production"];

export default function WorkPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [activeLightboxProject, setActiveLightboxProject] = useState<Project | null>(null);

  const filteredProjects = activeCategory === "All"
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-background text-foreground pt-32 pb-24 min-h-screen">
      {/* Page Header */}
      <Container className="mb-16">
        <div className="max-w-4xl space-y-6">
          <span className="text-label block">Selected Portfolio</span>
          <h1 className="text-display font-heading font-extrabold text-foreground leading-none">
            Cinematic Outcomes.<br />
            <span className="gold-gradient-text">Zero Compromise.</span>
          </h1>
          <p className="text-body-lg max-w-2xl pt-4 text-muted-foreground">
            Explore WeStream's project portfolio, featuring corporate films, multi-camera broadcasting campaigns, political summits, and live event productions.
          </p>
        </div>
      </Container>

      {/* Filter Tabs Bar */}
      <Container className="mb-16">
        <div className="flex flex-wrap gap-2 border-b border-border/30 pb-6">
          {categories.map((category) => {
            const isSelected = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`relative px-5 py-2.5 font-heading text-xs font-bold tracking-widest uppercase transition-colors rounded-sm cursor-pointer ${
                  isSelected ? "text-black" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="relative z-10">{category}</span>
                {isSelected && (
                  <motion.span
                    layoutId="active-filter-bg"
                    className="absolute inset-0 bg-gold rounded-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </Container>

      {/* Projects Grid */}
      <Container>
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
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
                  data-cursor-text={project.category === "Live Streaming" ? "STREAM" : "VIEW"}
                >
                  {/* Thumbnail / Video Container */}
                  <Link href={`/work/${project.slug}`} onClick={(e) => { e.preventDefault(); setActiveLightboxProject(project); }}>
                    <div className="relative aspect-[3/2] w-full overflow-hidden border border-border/40 bg-muted/15 rounded-sm group-hover:border-gold/30 transition-colors duration-500">
                      {/* Rec blinker indicator */}
                      <div className="absolute top-3 left-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border/50">
                        <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                        <span className="text-[8px] font-heading font-extrabold tracking-widest text-white uppercase">
                          {project.category}
                        </span>
                      </div>

                      {/* Project Year Tag */}
                      <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[8px] font-heading font-extrabold tracking-widest text-gold bg-black/60 backdrop-blur-sm px-2 py-0.5 border border-border/50">
                        {project.year}
                      </div>

                      {/* Image Thumbnail */}
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className={`object-cover transition-transform duration-700 ${
                          isHovered ? "opacity-0 scale-103" : "opacity-100 scale-100"
                        }`}
                      />

                      {/* Hover Video Player */}
                      {isHovered && (
                        <video
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 opacity-100 scale-103"
                        >
                          <source src={project.videoUrl} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  </Link>

                  {/* Details metadata */}
                  <div className="flex justify-between items-start mt-1 px-1">
                    <div className="space-y-1">
                      <span className="text-[9px] font-heading font-extrabold tracking-widest text-gold uppercase">
                        {project.client}
                      </span>
                      <Link href={`/work/${project.slug}`} onClick={(e) => { e.preventDefault(); setActiveLightboxProject(project); }}>
                        <h3 className="text-base md:text-lg font-heading font-extrabold text-foreground group-hover:text-gold transition-colors duration-300">
                          {project.title}
                        </h3>
                      </Link>
                    </div>
                    <span className="text-[10px] font-heading font-bold text-muted-foreground/60">
                      /{project.year}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <div className="py-20 text-center text-muted-foreground font-sans text-sm">
            No projects found in this category. [TODO — client to confirm real projects]
          </div>
        )}
      </Container>

      {/* Cinematic Media Lightbox Overlay */}
      <AnimatePresence>
        {activeLightboxProject && (
          <MediaLightbox
            project={activeLightboxProject}
            onClose={() => setActiveLightboxProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
