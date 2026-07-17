import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { PROJECTS_DATA } from "@/lib/data";
import { Container } from "@/components/layout/Container";
import { InteractiveWrapper } from "@/components/interactive/InteractiveWrapper";
import { TelemetryMap } from "@/components/interactive/TelemetryMap";
import { UplinkSwitcher } from "@/components/interactive/UplinkSwitcher";
import { ColorGradingSlider } from "@/components/interactive/ColorGradingSlider";
import { StageMatrix } from "@/components/interactive/StageMatrix";
import { getMediaBySlot } from "@/lib/media";

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
  const originalProject = PROJECTS_DATA[projectIndex];

  if (!originalProject) {
    notFound();
  }

  // Dynamic project media mapping
  const projectMap: Record<string, string> = {
    "work-india-live-broadcast": "work.workIndia.thumbnail",
    "suggestable-brand-film": "work.suggestable.thumbnail",
    "greenroom-summit-coverage": "work.greenroom.thumbnail",
    "poonawalla-awards-broadcast": "work.poonawalla.thumbnail",
    "tcz-studio-promo": "work.tczStudio.thumbnail",
    "political-rally-live-stream": "work.politicalStream.thumbnail",
    "national-music-festival": "work.concertStream.thumbnail",
    "corporate-agm-broadcast": "work.corporateAgm.thumbnail",
    "auto-expo-aftermovie": "work.autoExpo.thumbnail",
  };

  const projectVideoMap: Record<string, string> = {
    "work-india-live-broadcast": "services.liveStreaming.video",
    "suggestable-brand-film": "services.videoProduction.video",
    "greenroom-summit-coverage": "services.eventCoverage.video",
    "poonawalla-awards-broadcast": "services.liveStreaming.video",
    "tcz-studio-promo": "services.postProduction.video",
    "political-rally-live-stream": "services.liveStreaming.video",
    "national-music-festival": "services.eventCoverage.video",
    "corporate-agm-broadcast": "services.liveStreaming.video",
    "auto-expo-aftermovie": "services.videoProduction.video",
  };

  const slotKey = projectMap[originalProject.slug];
  const videoSlotKey = projectVideoMap[originalProject.slug];

  let thumbUrl = originalProject.thumbnail;
  let videoUrl = originalProject.videoUrl;

  if (slotKey) {
    const thumbMedia = await getMediaBySlot(slotKey);
    thumbUrl = thumbMedia.url;
  }
  if (videoSlotKey) {
    const videoMedia = await getMediaBySlot(videoSlotKey);
    videoUrl = videoMedia.url;
  }

  const project = {
    ...originalProject,
    thumbnail: thumbUrl,
    videoUrl: videoUrl,
  };

  // Next project link for continuous browsing
  const nextProjectIndex = (projectIndex + 1) % PROJECTS_DATA.length;
  const originalNext = PROJECTS_DATA[nextProjectIndex];
  
  const nextSlotKey = projectMap[originalNext.slug];
  let nextThumbUrl = originalNext.thumbnail;
  if (nextSlotKey) {
    const nextMedia = await getMediaBySlot(nextSlotKey);
    nextThumbUrl = nextMedia.url;
  }

  const nextProject = {
    ...originalNext,
    thumbnail: nextThumbUrl,
  };

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
      
      {/* 1. HERO & BREADCRUMB */}
      <Container className="mb-12">
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
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[0.95]">
            {project.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed text-muted-foreground font-sans pt-2">
            {project.description}
          </p>
        </div>
      </Container>

      {/* 2. MAIN MEDIA HEADER BOX */}
      <Container className="mb-20">
        <div className="relative w-full aspect-video md:max-h-[540px] border border-header-border bg-surface rounded-sm overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-90"
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-header-border">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[9px] font-heading font-bold tracking-widest text-foreground uppercase">
              ARCHIVE RECORDING
            </span>
          </div>
        </div>
      </Container>

      {/* 3. SIGNATURE INTERACTION SECTION (UNIQUE TO EACH CASE STUDY) */}
      <Container className="mb-24">
        <InteractiveWrapper>
          {slug === "work-india-live-broadcast" && <TelemetryMap />}
          {slug === "political-rally-live-stream" && <UplinkSwitcher />}
          {slug === "suggestable-brand-film" && <ColorGradingSlider imageSrc={project.thumbnail} />}
          {slug === "national-music-festival" && <StageMatrix />}
        </InteractiveWrapper>
      </Container>

      {/* 4. OVERVIEW & CHALLENGE / SOLUTION */}
      <Container className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-header-border pt-16">
          
          <div className="lg:col-span-7 space-y-10">
            <div className="space-y-3">
              <h2 className="text-xs font-heading font-extrabold tracking-widest text-accent uppercase">
                The Technical Brief & Challenge
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xs font-heading font-extrabold tracking-widest text-accent uppercase">
                Execution Strategy & Solution
              </h2>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                {project.solution}
              </p>
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

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface border border-header-border p-8 rounded-sm space-y-5">
              <h2 className="text-xs font-heading font-extrabold text-accent tracking-widest uppercase">
                Production Scope & Deliverables
              </h2>
              <ul className="space-y-2.5">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs md:text-sm font-sans text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {project.results && project.results.length > 0 && (
              <div className="bg-surface border border-header-border p-8 rounded-sm space-y-5">
                <h2 className="text-xs font-heading font-extrabold text-accent tracking-widest uppercase">
                  Verified Performance Metrics
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  {project.results.map((res, idx) => (
                    <div key={idx} className="space-y-1">
                      <p className="text-2xl font-heading font-extrabold text-accent">
                        {res.value}
                      </p>
                      <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase">
                        {res.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </Container>

      {/* 5. BEHIND-THE-SCENES PRODUCTION GALLERY */}
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
              CONTROL ROOM SDI FEED
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

      {/* 6. HARDWARE SPECS GRID */}
      <Container className="mb-28">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            HARDWARE SPECIFICATION
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Production Equipment Rigged
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

      {/* 7. NEXT PROJECT NAVIGATION CARD */}
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
