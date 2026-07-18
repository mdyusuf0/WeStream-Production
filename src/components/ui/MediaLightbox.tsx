"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { X, Volume2, VolumeX, ArrowRight } from "lucide-react";
import { Project } from "@/lib/data";

interface MediaLightboxProps {
  project: Project | null;
  onClose: () => void;
}

export function MediaLightbox({ project, onClose }: MediaLightboxProps) {
  const [muted, setMuted] = React.useState(true);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/85 backdrop-blur-md">
      {/* Click-outside backdrop */}
      <div className="absolute inset-0 cursor-pointer" onClick={onClose} />

      {/* Modal Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-5xl bg-surface border border-border/80 rounded-sm shadow-2xl overflow-hidden flex flex-col md:flex-row h-[85vh] md:h-[620px] max-h-[90vh] md:max-h-[80vh]"
      >
        {/* Left Side: Media Container */}
        <div className="relative w-full md:w-[60%] aspect-video md:aspect-auto md:h-full bg-black flex items-center justify-center overflow-hidden border-b md:border-b-0 md:border-r border-border/40 shrink-0">
          {project.videoUrl ? (
            <video
              autoPlay
              muted={muted}
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-90"
            >
              <source src={project.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover opacity-90"
            />
          )}

          {/* Video Control Bar */}
          {project.videoUrl && (
            <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2">
              <button
                onClick={() => setMuted(!muted)}
                className="flex items-center justify-center h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm border border-border/50 text-white hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
                aria-label={muted ? "Unmute audio" : "Mute audio"}
              >
                {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
              </button>
              <span className="text-[9px] font-heading font-extrabold tracking-widest text-white/70 uppercase bg-black/50 px-2.5 py-1 rounded-sm border border-border/30">
                Live Preview loop
              </span>
            </div>
          )}

          {/* Aesthetic Overlay indicator */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-black/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-border/40">
            <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-[8px] font-heading font-extrabold tracking-wider text-white uppercase">
              {project.category}
            </span>
          </div>
        </div>

        {/* Right Side: details panel */}
        <div
          data-lenis-prevent
          className="w-full md:w-[40%] flex-1 md:flex-none md:h-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto text-foreground"
        >
          <div className="space-y-6">
            {/* Meta tags */}
            <div className="flex items-center justify-between border-b border-border/30 pb-4">
              <div className="space-y-0.5">
                <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-gold uppercase block">
                  Client
                </span>
                <span className="text-xs font-heading font-extrabold text-foreground uppercase tracking-wider">
                  {project.client}
                </span>
              </div>
              <div className="text-right space-y-0.5">
                <span className="text-[9px] font-heading font-extrabold tracking-[0.2em] text-gold uppercase block">
                  Year
                </span>
                <span className="text-xs font-heading font-extrabold text-foreground">
                  {project.year}
                </span>
              </div>
            </div>

            {/* Title & Short Details */}
            <div className="space-y-2">
              <h3 className="text-xl md:text-2xl font-heading font-extrabold tracking-tight leading-tight">
                {project.title}
              </h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Challenge Summary */}
            <div className="space-y-2 border-t border-border/30 pt-5">
              <h4 className="text-[9px] font-heading font-extrabold tracking-widest text-gold uppercase">
                Technical Challenge
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans line-clamp-3">
                {project.challenge}
              </p>
            </div>

            {/* Deliverables lists */}
            <div className="space-y-2 border-t border-border/30 pt-5">
              <h4 className="text-[9px] font-heading font-extrabold tracking-widest text-gold uppercase">
                Scope / Setup
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.deliverables.slice(0, 3).map((item, idx) => (
                  <span
                    key={idx}
                    className="text-[9px] font-heading font-bold tracking-wider uppercase px-2.5 py-1 bg-background border border-border/40 text-muted-foreground rounded-sm"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action button link at bottom */}
          <div className="pt-8 border-t border-border/30 mt-6 flex flex-col gap-3">
            <Link
              href={`/work/${project.slug}`}
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full py-3 bg-gold hover:bg-[#F5E6C4] text-black font-heading font-extrabold text-[10px] tracking-widest uppercase rounded-sm transition-colors duration-300"
            >
              View Full Case Study
              <ArrowRight className="h-3 w-3" />
            </Link>
            
            <button
              onClick={onClose}
              className="text-center py-2 text-[9px] font-heading font-extrabold tracking-widest text-muted-foreground hover:text-foreground uppercase transition-colors cursor-pointer"
            >
              Close Overlay
            </button>
          </div>
        </div>

        {/* Absolute Close X icon */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 flex items-center justify-center h-8 w-8 rounded-full bg-black/60 backdrop-blur-sm border border-border/50 text-white hover:text-gold hover:border-gold/50 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </div>
  );
}
