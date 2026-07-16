import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
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
  const project = PROJECTS_DATA.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-background text-foreground pt-32 pb-24 min-h-screen">
      {/* 1. Header Banner */}
      <Container className="mb-16">
        <div className="flex flex-col gap-6 max-w-4xl">
          <Link
            href="/work"
            className="text-xs font-heading font-extrabold tracking-widest text-gold hover:text-foreground uppercase inline-flex items-center gap-2 w-max transition-colors"
          >
            &larr; Back to Portfolio
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] font-heading font-extrabold tracking-widest text-gold bg-gold/5 border border-gold/20 px-3 py-1 rounded-full uppercase">
              {project.category}
            </span>
            <span className="text-xs font-heading font-bold text-muted-foreground">
              / Client: {project.client}
            </span>
          </div>
          <h1 className="text-display font-heading font-extrabold text-foreground leading-none">
            {project.title}
          </h1>
          <p className="text-body-lg max-w-2xl leading-relaxed pt-2 text-muted-foreground">
            {project.description}
          </p>
        </div>
      </Container>

      {/* 2. Cinematic Media Header Box */}
      <Container className="mb-20">
        <div className="relative w-full aspect-video md:max-h-[550px] border border-border/40 bg-muted/10 rounded-sm overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent pointer-events-none" />
          
          {/* Subtle Rec status indicator overlay */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-border/50">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-heading font-bold tracking-widest text-white uppercase">
              ARCHIVE PLAYBACK
            </span>
          </div>
        </div>
      </Container>

      {/* 3. Narrative breakdown layout */}
      <Container className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-border/30 pt-16">
          
          {/* Left Column: Challenge & Solution */}
          <div className="lg:col-span-7 space-y-12">
            <div className="space-y-4">
              <h3 className="text-xs font-heading font-extrabold tracking-widest text-gold uppercase">
                The Brief / Challenge
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                {project.challenge}
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-heading font-extrabold tracking-widest text-gold uppercase">
                Our Solution / Execution
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                {project.solution}
              </p>
            </div>

            {/* Testimonial block if present */}
            {project.testimonial && (
              <div className="relative bg-surface border border-border/40 p-8 rounded-sm hover:border-gold/15 transition-all duration-300">
                <div className="absolute top-4 right-6 font-heading text-6xl text-gold/5 font-extrabold select-none pointer-events-none">
                  “
                </div>
                <p className="text-xs md:text-sm text-foreground/95 leading-relaxed font-sans italic mb-6">
                  &ldquo;{project.testimonial.text}&rdquo;
                </p>
                <div className="border-t border-border/30 pt-4">
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

          {/* Right Column: Deliverables & Metrics */}
          <div className="lg:col-span-5 space-y-10">
            {/* Deliverables Box */}
            <div className="bg-surface/60 border border-border/40 p-8 rounded-sm space-y-6">
              <h3 className="text-xs font-heading font-extrabold text-gold tracking-widest uppercase">
                Deliverables & Scope
              </h3>
              <ul className="space-y-3">
                {project.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs md:text-sm font-sans text-foreground/95">
                    <span className="h-1.5 w-1.5 rounded-full bg-gold/70 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Results / Performance metrics if present */}
            {project.results && project.results.length > 0 && (
              <div className="bg-surface/40 border border-border/40 p-8 rounded-sm space-y-6">
                <h3 className="text-xs font-heading font-extrabold text-gold tracking-widest uppercase">
                  Project Outcomes
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {project.results.map((result, idx) => (
                    <div key={idx} className="space-y-1 border-l border-border/50 pl-4">
                      <p className="text-3xl font-heading font-extrabold text-foreground">
                        {result.value}
                      </p>
                      <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-widest leading-normal">
                        {result.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </Container>

      {/* 4. Action Banner */}
      <Container className="text-center">
        <div className="max-w-3xl mx-auto space-y-6 py-12 border border-gold/15 bg-surface/60 rounded-sm">
          <span className="text-[10px] font-heading font-extrabold tracking-widest text-gold uppercase block">
            Start Your Project
          </span>
          <h3 className="text-xl md:text-2xl font-heading font-extrabold text-foreground uppercase">
            Have a similar event or film in mind?
          </h3>
          <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto leading-relaxed">
            Let's work together to deliver custom multi-cam layouts and lag-free streaming interfaces.
          </p>
          <div className="pt-4">
            <Link
              href={`/contact?project=${slug}`}
              className="inline-flex px-8 py-3 bg-gold hover:bg-[#F5E6C4] text-black font-heading font-extrabold text-[10px] tracking-widest uppercase rounded-sm transition-colors duration-300"
            >
              Consult on your project
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
