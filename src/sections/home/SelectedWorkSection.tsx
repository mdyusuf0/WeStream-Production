"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { PROJECTS_DATA, Project } from "@/lib/data";
import { MediaLightbox } from "@/components/ui/MediaLightbox";

export function SelectedWorkSection({ projects }: { projects?: Project[] }) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeLightboxProject, setActiveLightboxProject] = useState<Project | null>(null);

  // Take first 3 projects for the home page teaser
  const featuredProjects = (projects || PROJECTS_DATA).slice(0, 3);

  return (
    <section id="work" className="section-space relative bg-transparent text-foreground transition-colors duration-500">
      <Container>
        {/* Section Header */}
        <div className="mb-16 md:mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-header-border pb-8 md:pb-10">
          <div>
            <span className="font-heading text-xs font-bold tracking-[0.25em] uppercase text-muted-foreground block mb-3">
              02 // FEATURED PORTFOLIO
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground uppercase tracking-tight">
              Selected Work
            </h2>
          </div>
          
          <Link
            href="/work"
            className="text-xs font-heading font-extrabold tracking-widest text-accent hover:opacity-80 uppercase flex items-center gap-2 group transition-all duration-300 py-2 border-b border-accent/30"
          >
            View Full Portfolio
            <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
              &rarr;
            </span>
          </Link>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14">
          {featuredProjects.map((project, index) => {
            const isFirst = index === 0;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: index * 0.12 }}
                className={`relative flex flex-col gap-5 group cursor-pointer ${
                  isFirst ? "md:col-span-12" : "md:col-span-6"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => setActiveLightboxProject(project)}
              >
                {/* Media frame with camera motif styling */}
                <div
                  className={`relative w-full overflow-hidden border border-header-border bg-surface rounded-sm transition-all duration-700 ease-out group-hover:border-accent/40 ${
                    isFirst 
                      ? "aspect-[16/9] md:max-h-[520px]" 
                      : "aspect-[4/3] md:aspect-[3/2]"
                  }`}
                >
                  {/* Category Pill */}
                  <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-header-border">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
                    <span className="text-[9px] font-heading font-extrabold tracking-widest text-foreground uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Case Study Year Overlay */}
                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-heading font-extrabold tracking-widest text-accent bg-background/80 backdrop-blur-md px-3 py-1 rounded-sm border border-header-border">
                    {project.year}
                  </div>

                  {/* Base Image Thumbnail */}
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes={isFirst ? "100vw" : "50vw"}
                    priority={isFirst}
                    className={`object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.03] ${
                      isHovered ? "opacity-0" : "opacity-100"
                    }`}
                  />

                  {/* Muted video preview player triggering on hover */}
                  {isHovered && (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-500 opacity-100 scale-[1.03]"
                    >
                      <source src={project.videoUrl} type="video/mp4" />
                    </video>
                  )}

                  {/* Dynamic Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Meta details */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-2 px-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase">
                      {project.client}
                    </span>
                    <h3 className="text-xl md:text-2xl font-heading font-extrabold text-foreground group-hover:text-accent transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs font-heading font-bold text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    /{project.year}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
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
    </section>
  );
}
