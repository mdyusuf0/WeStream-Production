"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { PROJECTS_DATA } from "@/lib/data";
import Magnetic from "@/components/ui/Magnetic";

export function SelectedWorkSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Take first 3 projects for the home page teaser
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  return (
    <section id="work" className="section-space relative bg-[#0B0B0B]">
      <Container>
        {/* Section Header */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border/30 pb-10">
          <div>
            <span className="text-label block mb-3">Portfolio Teaser</span>
            <h2 className="text-heading-lg font-heading font-extrabold text-white">
              Selected Work
            </h2>
          </div>
          
          <Magnetic range={30} strength={0.3}>
            <Link
              href="/work"
              className="text-xs font-heading font-extrabold tracking-widest text-gold hover:text-white uppercase flex items-center gap-2 group transition-colors duration-300 py-2 border-b border-gold/30 hover:border-white"
            >
              View Full Portfolio
              <span className="inline-block transform group-hover:translate-x-1 transition-transform duration-300">
                &rarr;
              </span>
            </Link>
          </Magnetic>
        </div>

        {/* Dynamic Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16">
          {featuredProjects.map((project, index) => {
            const isFirst = index === 0;
            const isHovered = hoveredIndex === index;

            return (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.15 }}
                className={`relative flex flex-col gap-6 group cursor-pointer ${
                  isFirst ? "md:col-span-12" : "md:col-span-6"
                }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                data-cursor-text={project.category === "Live Streaming" ? "STREAM" : "VIEW"}
              >
                {/* Media frame with camera grid/motif styling */}
                <div
                  className={`relative w-full overflow-hidden border border-border/40 bg-muted/20 rounded-sm transition-all duration-700 ease-out group-hover:border-gold/30 ${
                    isFirst 
                      ? "aspect-[16/9] md:max-h-[550px]" 
                      : "aspect-[4/3] md:aspect-[3/2]"
                  }`}
                >
                  {/* Subtle Shutter Rec motif overlay in corners */}
                  <div className="absolute top-4 left-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
                    <span className="text-[9px] font-heading font-extrabold tracking-widest text-white uppercase">
                      {project.category}
                    </span>
                  </div>

                  {/* Case Study Year Overlay */}
                  <div className="absolute bottom-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-heading font-extrabold tracking-widest text-gold bg-black/60 backdrop-blur-sm px-3 py-1 border border-border/50">
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

                  {/* Dark inner shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
                </div>

                {/* Meta details */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mt-1 px-1">
                  <div className="space-y-1">
                    <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-gold uppercase">
                      {project.client}
                    </span>
                    <h3 className="text-heading-md font-heading font-extrabold text-white group-hover:text-gold transition-colors duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <span className="text-xs font-heading font-bold text-muted-foreground/60 group-hover:text-white transition-colors duration-300">
                    /{project.year}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
