"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Container } from "./Container";
import { SERVICES_DATA } from "@/lib/data";

export function SiteFooter() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-transparent text-foreground transition-colors duration-500 border-t border-header-border pt-24 md:pt-40 pb-10 overflow-hidden">
      
      {/* Dynamic Volumetric Gold Aurora behind ending text */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-accent/8 rounded-full blur-[140px] pointer-events-none" />

      <Container>
        {/* ============================================================ */}
        {/* CINEMATIC ENDING HERO CALL-TO-ACTION                         */}
        {/* ============================================================ */}
        <div className="text-center space-y-10 pb-24 border-b border-header-border max-w-5xl mx-auto mb-24 relative z-10">
          <span className="text-[10px] font-heading font-extrabold tracking-[0.35em] text-accent uppercase block">
            READY TO STREAM YOUR NEXT STORY?
          </span>
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[0.90] drop-shadow-2xl">
            BRING YOUR VISION<br />
            <span className="text-accent">TO BROADCAST.</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-muted-foreground max-w-xl mx-auto font-sans leading-relaxed">
            From Bangalore to any venue in India. Deploys zero-failure 6K optical fields, satellite feeds, and multi-network bonding pipelines.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center min-h-[52px] px-10 bg-accent text-background font-heading text-xs font-bold tracking-[0.25em] uppercase rounded-full shadow-2xl hover:opacity-90 transition-opacity"
            >
              Initiate Technical Brief
            </Link>
          </div>
        </div>

        {/* ============================================================ */}
        {/* STANDARD FOOTER NAVIGATION GRID                              */}
        {/* ============================================================ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16 relative z-10">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group focus:outline-none" aria-label="WeStream Production Home">
              <div className="relative h-6 w-6 flex-shrink-0 transition-all duration-300 dark:brightness-100 brightness-0">
                <Image 
                  src="/logo.png" 
                  alt="WeStream Logo Icon" 
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-heading font-extrabold text-sm tracking-[0.2em] uppercase text-foreground">
                WESTREAM PRODUCTION
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-xs leading-relaxed font-sans">
              Bangalore-based production house specializing in professional video production, multi-camera live streaming, and event broadcasting across India.
            </p>
            <div className="flex items-center gap-2 text-xs font-heading font-extrabold tracking-widest text-accent uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
              </span>
              Accepting Projects 2026 / 2027
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-xs tracking-widest text-accent uppercase">Company</h4>
            <ul className="space-y-2.5 font-heading text-xs tracking-widest uppercase font-bold">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/work" className="text-muted-foreground hover:text-foreground transition-colors">Work</Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-foreground transition-colors">Services</Link>
              </li>
              <li>
                <Link href="/studio" className="text-muted-foreground hover:text-foreground transition-colors">Studio</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services List */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-xs tracking-widest text-accent uppercase">Services</h4>
            <ul className="space-y-2.5 font-heading text-xs tracking-widest uppercase font-bold">
              {SERVICES_DATA.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-heading font-extrabold text-xs tracking-widest text-accent uppercase">Headquarters</h4>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">
                Bangalore, Karnataka.<br />
                Available for travel & execution across all of India.
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-heading font-extrabold text-xs tracking-widest text-accent uppercase">Socials</h4>
              <div className="flex flex-wrap gap-4 font-heading text-xs tracking-widest uppercase font-bold">
                <a
                  href="https://www.instagram.com/westream_production"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="mailto:hello@westream.in"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Email
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-header-border pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
          <p className="text-xs text-muted-foreground tracking-wider font-sans">
            &copy; {new Date().getFullYear()} WeStream Production. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/60 tracking-wider font-sans">
            Designed for cinematic performance. Bangalore, India.
          </p>
        </div>
      </Container>
    </footer>
  );
}
