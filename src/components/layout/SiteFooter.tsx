"use client";

import React from "react";
import Link from "next/link";
import { Container } from "./Container";
import { SERVICES_DATA } from "@/lib/data";
import Magnetic from "../ui/Magnetic";

export function SiteFooter() {
  return (
    <footer className="relative bg-black border-t border-border/30 pt-20 pb-10 overflow-hidden">
      {/* Decorative waveform/shutter line motif at the top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
      
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-gold animate-rec-pulse" />
              <span className="font-heading font-extrabold text-xl tracking-[0.2em]">WESTREAM</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed font-sans">
              Bangalore-based production company specializing in professional video production, multi-camera live streaming, and event broadcasting. Operates across India.
            </p>
            <div className="flex items-center gap-2 text-xs font-heading font-extrabold tracking-widest text-gold uppercase">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              Accepting projects 2026/2027
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-xs tracking-widest text-gold uppercase">Company</h4>
            <ul className="space-y-3 font-heading text-xs tracking-widest uppercase font-bold">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-white transition-colors">About WeStream</Link>
              </li>
              <li>
                <Link href="/work" className="text-muted-foreground hover:text-white transition-colors">Selected Work</Link>
              </li>
              <li>
                <Link href="/team" className="text-muted-foreground hover:text-white transition-colors">Our Team</Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-white transition-colors">Contact / Quote</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services List */}
          <div className="space-y-4">
            <h4 className="font-heading font-extrabold text-xs tracking-widest text-gold uppercase">Services</h4>
            <ul className="space-y-3 font-heading text-xs tracking-widest uppercase font-bold">
              {SERVICES_DATA.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-muted-foreground hover:text-white transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Social Info */}
          <div className="space-y-6">
            <div className="space-y-3">
              <h4 className="font-heading font-extrabold text-xs tracking-widest text-gold uppercase">Headquarters</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Bangalore, Karnataka.<br />
                Available for travel and execution across all of India.
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-heading font-extrabold text-xs tracking-widest text-gold uppercase">Socials</h4>
              <div className="flex flex-wrap gap-4 font-heading text-xs tracking-widest uppercase font-bold">
                <a
                  href="https://www.instagram.com/westream_production"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-gold transition-colors"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="text-muted-foreground/40 hover:text-gold cursor-not-allowed transition-colors"
                  onClick={(e) => e.preventDefault()}
                  title="LinkedIn coming soon"
                >
                  LinkedIn [TODO]
                </a>
                <a
                  href="#"
                  className="text-muted-foreground/40 hover:text-gold cursor-not-allowed transition-colors"
                  onClick={(e) => e.preventDefault()}
                  title="YouTube coming soon"
                >
                  YouTube [TODO]
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="border-t border-border/30 pt-8 mt-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground tracking-wider font-sans">
            &copy; {new Date().getFullYear()} WeStream Production. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground/50 tracking-wider font-sans">
            Designed for cinematic performance. Bangalore, India.
          </p>
        </div>
      </Container>

      {/* Floating Sticky WhatsApp Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40">
        <Magnetic range={30} strength={0.45}>
          <a
            href="https://wa.me/910000000000" // Replace with real phone later
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:bg-[#1ebd59] transition-colors duration-300 group"
            aria-label="Chat with WeStream on WhatsApp"
          >
            {/* Pulsing ring indicator */}
            <span className="absolute -inset-1 rounded-full border-2 border-[#25D366]/40 animate-ping group-hover:animate-none opacity-75"></span>
            
            <svg
              className="h-7 w-7 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.45 5.485 0 9.947-4.46 9.95-9.947.002-2.66-1.023-5.158-2.883-7.02C16.672 1.775 14.18 0.75 11.53 0.75c-5.487 0-9.95 4.463-9.954 9.95-.001 1.745.483 3.447 1.402 4.957l-1.014 3.704 3.805-1.011c1.474.805 3.11 1.228 4.793 1.228zM17.486 15c-.287-.144-1.695-.837-1.957-.933-.263-.096-.454-.144-.645.144-.191.287-.74.933-.907 1.124-.167.191-.335.215-.622.072-.287-.144-1.21-.446-2.305-1.424-.853-.76-1.428-1.7-1.595-1.987-.167-.287-.018-.442.126-.583.129-.127.287-.335.43-.502.144-.167.191-.287.287-.478.096-.191.048-.359-.024-.502-.072-.144-.645-1.554-.884-2.129-.233-.56-.469-.483-.645-.492-.167-.008-.359-.01-.55-.01s-.502.072-.765.359c-.263.287-1.004.98-1.004 2.392s1.028 2.775 1.171 2.967c.144.191 2.025 3.093 4.906 4.335.685.296 1.22.473 1.637.605.689.219 1.317.188 1.813.114.553-.082 1.695-.694 1.933-1.365.239-.67.239-1.244.167-1.365-.072-.12-.263-.215-.55-.359z" />
            </svg>
          </a>
        </Magnetic>
      </div>
    </footer>
  );
}
