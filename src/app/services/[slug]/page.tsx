import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/data";
import { Container } from "@/components/layout/Container";

export function generateStaticParams() {
  return SERVICES_DATA.map((service) => ({
    slug: service.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_DATA.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="bg-[#0B0B0B] text-white pt-32 pb-24 min-h-screen">
      {/* 1. Header Banner */}
      <Container className="mb-16">
        <div className="flex flex-col gap-6 max-w-4xl">
          <Link
            href="/services"
            className="text-xs font-heading font-extrabold tracking-widest text-gold hover:text-white uppercase inline-flex items-center gap-2 w-max transition-colors"
          >
            &larr; Back to Services
          </Link>
          <span className="text-label block">Service Deep-Dive</span>
          <h1 className="text-display font-heading font-extrabold text-white leading-none">
            {service.title}
          </h1>
          <p className="text-body-lg max-w-2xl leading-relaxed pt-2">
            {service.shortDesc}
          </p>
        </div>
      </Container>

      {/* 2. Video Loop Background Box */}
      <Container className="mb-20">
        <div className="relative w-full aspect-video md:max-h-[500px] border border-border/40 bg-muted/10 rounded-sm overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-75"
          >
            <source src={service.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] to-transparent pointer-events-none" />
          {/* Subtle live indicator in top corner */}
          <div className="absolute top-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1.5 border border-border/50">
            <span className="h-2 w-2 rounded-full bg-gold animate-pulse" />
            <span className="text-[10px] font-heading font-bold tracking-widest text-white uppercase">
              REEL PREVIEW
            </span>
          </div>
        </div>
      </Container>

      {/* 3. Detailed Breakdown Grid */}
      <Container className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 border-t border-border/30 pt-16">
          {/* Left Column: Description & Sub-services */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-heading font-extrabold text-white uppercase tracking-wider">
                Technical Scope & Operations
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed font-sans">
                {service.description}
              </p>
            </div>

            {/* List of sub-services */}
            <div className="space-y-4">
              <h4 className="text-xs font-heading font-extrabold tracking-widest text-gold uppercase">
                Specialized Sub-Services
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.subServices.map((sub, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 bg-black border border-border/40 rounded-sm hover:border-gold/20 transition-all duration-300"
                  >
                    <span className="text-gold font-heading text-xs font-bold mt-0.5">
                      {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="text-xs md:text-sm font-sans text-white/90">
                      {sub}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Key Highlights / Features */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-black/60 border border-border/40 p-8 rounded-sm space-y-6">
              <h3 className="text-sm font-heading font-extrabold text-gold tracking-widest uppercase">
                Operational Highlights
              </h3>
              <ul className="space-y-4">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="flex gap-3">
                    <span className="h-5 w-5 rounded-full border border-gold/40 flex items-center justify-center text-[9px] font-heading font-bold text-gold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <div className="space-y-1">
                      <p className="text-xs md:text-sm font-heading font-bold text-white uppercase tracking-wide">
                        {feature.split(":")[0]}
                      </p>
                      {feature.includes(":") && (
                        <p className="text-xs text-muted-foreground font-sans">
                          {feature.split(":")[1]}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      {/* 4. Action Banner */}
      <Container className="text-center">
        <div className="max-w-3xl mx-auto space-y-6 py-12 border border-gold/15 bg-black/60 rounded-sm">
          <span className="text-[10px] font-heading font-extrabold tracking-widest text-gold uppercase block">
            Start a Consultation
          </span>
          <h3 className="text-xl md:text-2xl font-heading font-extrabold text-white">
            Wired for your next {service.title} setup
          </h3>
          <p className="text-xs text-muted-foreground font-sans max-w-md mx-auto leading-relaxed">
            Fill out our briefing form and include references or venue locations. Our engineers will draft a technical proposal.
          </p>
          <div className="pt-4">
            <Link
              href={`/contact?service=${slug}`}
              className="inline-flex px-8 py-3 bg-gold hover:bg-[#F5E6C4] text-black font-heading font-extrabold text-[10px] tracking-widest uppercase rounded-sm transition-colors duration-300"
            >
              Request technical quote
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
