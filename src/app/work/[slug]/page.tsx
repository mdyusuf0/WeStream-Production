import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS_DATA } from "@/lib/data";
import { Container } from "@/components/layout/Container";

export function generateStaticParams() {
  return PROJECTS_DATA.map((project) => ({
    slug: project.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const projectIndex = PROJECTS_DATA.findIndex((p) => p.slug === slug);
  const project = PROJECTS_DATA[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = PROJECTS_DATA[(projectIndex + 1) % PROJECTS_DATA.length];

  const equipmentList = [
    "Sony FX6 / FX9 6K Full-Frame Cinema Systems",
    "Teradek Bolt 4K Zero-Latency Wireless Transmitters",
    "vMix Pro Production Control System w/ SRT Protocol",
    "LiveU Solo & Peplink Bonded Cellular Routers",
    "Blackmagic Design Constellation 8K SDI Switcher",
    "DJI Inspire 3 Cinema Drones w/ ProRes RAW"
  ];

  return (
    <div className="bg-transparent text-foreground transition-colors duration-500 pt-32 pb-24 min-h-screen">
      
      {/* 1. HERO HEADER */}
      <Container className="mb-16">
        <div className="flex flex-col gap-6 max-w-4xl">
          <Link
            href="/work"
            className="text-xs font-heading font-extrabold tracking-widest text-accent hover:opacity-80 uppercase inline-flex items-center gap-2 w-max transition-colors"
          >
            &larr; Back to Portfolio
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent bg-surface border border-header-border px-3 py-1 rounded-full uppercase">
              {project.category}
            </span>
            <span className="text-xs font-heading font-bold text-muted-foreground">
              / Client: {project.client} ({project.year})
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-heading font-extrabold text-white uppercase tracking-tight leading-[0.90] drop-shadow-xl">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed text-muted-foreground font-sans pt-2">
            {project.description}
          </p>
        </div>
      </Container>

      {/* 2. HUGE EDITORIAL STATEMENT */}
      <Container className="mb-20">
        <div className="border-t border-b border-header-border py-10 md:py-14 text-center max-w-5xl mx-auto">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.3em] text-accent uppercase block mb-6">
            CORE BROADCAST MISSION STATEMENT
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[1.10] max-w-4xl mx-auto">
            FOR {project.client.toUpperCase()}, WE STREAMED {project.title.toUpperCase()} WITH AN UNCOMPROMISING MULTI-CAMERA PIPELINE, DELIVERING ZERO-FAILURE CINEMATIC FIDELITY.
          </h2>
        </div>
      </Container>

      {/* 3. MASSIVE CINEMATIC IMAGE PANEL */}
      <Container className="mb-24">
        <div className="relative w-full aspect-[21/9] md:max-h-[580px] border border-header-border bg-surface rounded-sm overflow-hidden shadow-2xl">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            className="object-cover opacity-90 scale-[1.01]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-md px-3 py-1 rounded-sm border border-header-border">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] font-heading font-extrabold tracking-widest text-foreground uppercase">
              MASTER EDITORIAL STILL
            </span>
          </div>
        </div>
      </Container>

      {/* 4. THE STORY & DUAL-COLUMN LAYOUT */}
      <Container className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-header-border pt-16">
          
          {/* Left Column: Challenge & Solution Stories */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase block">
                01 / THE CHALLENGE
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-extrabold text-foreground uppercase">
                Technical Obstacles & Deadlines
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase block">
                02 / THE SOLUTIONS DEPLOYED
              </span>
              <h3 className="text-xl md:text-2xl font-heading font-extrabold text-foreground uppercase">
                Hardware Engineering & Routing
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Right Column: Scope & Pinned Testimonial */}
          <div className="lg:col-span-5 space-y-8 lg:pl-6">
            <div className="bg-surface border border-header-border p-8 rounded-sm space-y-5">
              <h4 className="text-xs font-heading font-extrabold text-accent tracking-widest uppercase">
                Production Deliverables
              </h4>
              <ul className="space-y-3">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs md:text-sm font-sans text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {project.testimonial && (
              <div className="relative bg-surface border border-header-border p-8 rounded-sm space-y-4">
                <div className="absolute top-4 right-6 font-heading text-6xl text-accent/10 font-extrabold select-none pointer-events-none">
                  “
                </div>
                <p className="text-xs sm:text-sm text-foreground leading-relaxed font-sans italic">
                  &ldquo;{project.testimonial.text}&rdquo;
                </p>
                <div className="border-t border-header-border pt-4">
                  <p className="text-xs font-heading font-extrabold text-foreground uppercase tracking-wider">
                    {project.testimonial.author}
                  </p>
                  <p className="text-[10px] text-muted-foreground font-sans mt-0.5">
                    {project.testimonial.role}
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </Container>

      {/* 5. FLOATING METRICS (CINEMATIC STATISTICS BLOCK) */}
      {project.results && project.results.length > 0 && (
        <Container className="mb-24">
          <div className="border-t border-b border-header-border py-12 md:py-16">
            <span className="text-[10px] font-heading font-extrabold tracking-[0.25em] text-accent uppercase block text-center mb-10">
              VERIFIED EVENT METRICS
            </span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-y md:divide-y-0 md:divide-x divide-header-border">
              {project.results.map((res, idx) => (
                <div key={idx} className="text-center pt-6 md:pt-0 md:px-4 space-y-2">
                  <p className="text-5xl sm:text-6xl md:text-7xl font-heading font-extrabold text-accent leading-none">
                    {res.value}
                  </p>
                  <p className="text-[10px] font-heading font-extrabold text-foreground uppercase tracking-widest">
                    {res.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      )}

      {/* 6. TIMELINE OF OPERATIONS (OPERATIONAL PIPELINE) */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            BROADCAST STAGES
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Operational Timeline
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { step: "01", phase: "Pre-Production & Path Simulation", desc: "Technical site surveys, satellite path configurations, and latency profiling." },
            { step: "02", phase: "Hardware Deployment & Fiber Links", desc: "Rigging FX6/FX9 camera clusters, Teradek links, and optical transport lines." },
            { step: "03", phase: "Active Cellular Bonding", desc: "Aggregating multiple 5G networks to guarantee complete redundancy." },
            { step: "04", phase: "Master Control & Live Broadcast", desc: "Live RTMP transmission with full Rec.709 color grade calibration." }
          ].map((item, idx) => (
            <div key={idx} className="bg-surface border border-header-border p-6 rounded-sm space-y-4">
              <span className="font-heading text-4xl font-extrabold text-accent/30 block">
                {item.step}
              </span>
              <h4 className="font-heading text-xs font-bold text-foreground uppercase tracking-wider">
                {item.phase}
              </h4>
              <p className="text-[11px] text-muted-foreground font-sans leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* 7. BEHIND-THE-SCENES GALLERY (FILM-STRIP FRAME) */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            PRODUCTION ARCHIVE
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Behind the Lens & Control Room
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative aspect-video rounded-sm overflow-hidden border border-header-border bg-surface group">
            <Image
              src={project.thumbnail}
              alt="Control Room Monitoring"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-sm border border-header-border text-[9px] font-heading font-bold text-accent uppercase">
              CONTROL ROOM FEED
            </div>
          </div>

          <div className="relative aspect-video rounded-sm overflow-hidden border border-header-border bg-surface group">
            <Image
              src={project.thumbnail}
              alt="Stage Rigging & Optics"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 saturate-150"
            />
            <div className="absolute inset-0 bg-background/30 group-hover:bg-transparent transition-colors" />
            <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-sm border border-header-border text-[9px] font-heading font-bold text-accent uppercase">
              MAINSTAGE OPTICS RIG
            </div>
          </div>
        </div>
      </Container>

      {/* 8. HARDWARE SPECS GRID */}
      <Container className="mb-28">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            HARDWARE SPECIFICATION
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Rigged Equipment Inventory
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {equipmentList.map((eq, idx) => (
            <div key={idx} className="bg-surface border border-header-border p-5 rounded-sm flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
              <span className="text-xs font-heading font-bold text-foreground uppercase">{eq}</span>
            </div>
          ))}
        </div>
      </Container>

      {/* 9. NEXT PROJECT NAVIGATION */}
      <Container>
        <Link
          href={`/work/${nextProject.slug}`}
          className="group block bg-surface border border-header-border p-10 md:p-14 rounded-sm hover:border-accent/40 transition-all duration-300 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-header-border pb-4">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase">
              NEXT CASE STUDY
            </span>
            <span className="text-xs font-heading font-bold text-foreground group-hover:translate-x-1 transition-transform">
              Explore Project &rarr;
            </span>
          </div>
          <h3 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground group-hover:text-accent transition-colors uppercase">
            {nextProject.title}
          </h3>
          <p className="text-xs md:text-sm text-muted-foreground font-sans">
            {nextProject.description}
          </p>
        </Link>
      </Container>

    </div>
  );
}
