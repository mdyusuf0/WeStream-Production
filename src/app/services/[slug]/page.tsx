import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SERVICES_DATA, FAQS_DATA } from "@/lib/data";
import { Container } from "@/components/layout/Container";
import { InteractiveWrapper } from "@/components/interactive/InteractiveWrapper";
import { CellularBondingSimulator } from "@/components/interactive/CellularBondingSimulator";
import { CameraRigShowcase } from "@/components/interactive/CameraRigShowcase";
import { SDIRouter } from "@/components/interactive/SDIRouter";
import { AudioScrubber } from "@/components/interactive/AudioScrubber";

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

  const workflowSteps = [
    { phase: "01", title: "Pre-Production & Recon", desc: "Venue internet bandwidth testing, camera positioning maps, and technical scripting." },
    { phase: "02", title: "Setup & Calibration", desc: "Deploying multi-cam SDI cabling, bonded cellular routers, and color-matched cinema sensors." },
    { phase: "03", title: "Live Production Execution", desc: "Real-time multi-channel switching, remote caller integration, and instant graphics." },
    { phase: "04", title: "Post-Production Archival", desc: "Same-day social reels, 4K master delivery, and post-production archives." }
  ];

  return (
    <div className="bg-transparent text-foreground transition-colors duration-500 pt-32 pb-24 min-h-screen">
      
      {/* 1. HERO BREADCRUMB & HEADER */}
      <Container className="mb-12">
        <div className="max-w-4xl space-y-6">
          <Link
            href="/services"
            className="text-xs font-heading font-extrabold tracking-widest text-accent hover:opacity-80 uppercase inline-flex items-center gap-2 w-max transition-colors"
          >
            &larr; All Production Streams
          </Link>
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-full border border-header-border bg-surface shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase">
              SERVICE SPECIFICATION
            </span>
          </div>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[0.95]">
            {service.title}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed font-sans max-w-2xl pt-2">
            {service.description}
          </p>
        </div>
      </Container>

      {/* 2. HERO VIDEO BANNER */}
      <Container className="mb-20">
        <div className="relative w-full aspect-video md:max-h-[500px] border border-header-border bg-surface rounded-sm overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover opacity-80"
          >
            <source src={service.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
        </div>
      </Container>

      {/* 3. SIGNATURE INTERACTION COMPONENT */}
      <Container className="mb-24">
        <InteractiveWrapper>
          {slug === "live-streaming" && <CellularBondingSimulator />}
          {slug === "video-production" && <CameraRigShowcase />}
          {slug === "event-coverage" && <SDIRouter />}
          {slug === "post-production" && <AudioScrubber />}
        </InteractiveWrapper>
      </Container>

      {/* 4. CAPABILITIES & DELIVERABLES */}
      <Container className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-header-border pt-16">
          
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-2xl md:text-3xl font-heading font-extrabold text-foreground uppercase tracking-tight">
              Service Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {service.subServices.map((sub, idx) => (
                <div key={idx} className="bg-surface border border-header-border p-5 rounded-sm flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-accent shrink-0" />
                  <span className="text-xs font-heading font-bold text-foreground">{sub}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 space-y-8">
            <div className="bg-surface border border-header-border p-8 rounded-sm space-y-5">
              <h2 className="text-xs font-heading font-extrabold text-accent tracking-widest uppercase">
                Technical Deliverables
              </h2>
              <ul className="space-y-3">
                {service.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-xs md:text-sm font-sans text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    {feat}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </Container>

      {/* 5. WORKFLOW LIFECYCLE */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            EXECUTION PIPELINE
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            How We Execute {service.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {workflowSteps.map((step, idx) => (
            <div key={idx} className="bg-surface border border-header-border p-6 rounded-sm space-y-3">
              <span className="text-xs font-heading font-bold text-accent block">
                PHASE.{step.phase}
              </span>
              <h3 className="text-sm font-heading font-extrabold text-foreground uppercase">
                {step.title}
              </h3>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* 6. FREQUENTLY ASKED QUESTIONS */}
      <Container className="mb-24">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Common Inquiries
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS_DATA.map((faq, idx) => (
            <div key={idx} className="bg-surface border border-header-border p-6 rounded-sm space-y-3">
              <h3 className="text-sm font-heading font-extrabold text-foreground uppercase">
                {faq.question}
              </h3>
              <p className="text-xs text-muted-foreground font-sans leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </Container>

      {/* 7. CTA */}
      <Container>
        <div className="text-center bg-surface border border-header-border p-12 md:p-16 rounded-sm space-y-6">
          <h2 className="text-2xl sm:text-4xl font-heading font-extrabold uppercase text-foreground">
            Request {service.title} Technical Spec
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-lg mx-auto font-sans">
            Ready to book technical reconnaissance or reserve crew equipment for your event?
          </p>
          <div>
            <Link
              href={`/contact?service=${service.slug}`}
              className="inline-flex items-center justify-center px-8 py-3.5 bg-accent text-background font-heading text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:opacity-90 transition-opacity"
            >
              Contact Studio Engineering Team
            </Link>
          </div>
        </div>
      </Container>

    </div>
  );
}
