"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeContext";

const navLinks = [
  { href: "/work", label: "Work", subtitle: "Selected productions" },
  { href: "/services", label: "Services", subtitle: "Creative production solutions" },
  { href: "/studio", label: "Studio", subtitle: "Our philosophy" },
  { href: "/contact", label: "Contact", subtitle: "Let's build something together" },
];

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Handle Scroll behavior
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    
    if (latest > 40) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    if (latest > previous && latest > 120) {
      setIsHidden(true); // Hide on scroll down
    } else {
      setIsHidden(false); // Reveal on scroll up
    }
  });

  // Close menu on route change
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when fullscreen menu is active
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Cycle theme: dark -> light -> system -> dark
  const toggleTheme = () => {
    if (theme === "dark") setTheme("light");
    else if (theme === "light") setTheme("system");
    else setTheme("dark");
  };

  const isLight = mounted && resolvedTheme === "light";

  return (
    <>
      {/* ============================================================ */}
      {/* 1. DESKTOP & MOBILE FLOATING CAPSULE BAR                     */}
      {/* ============================================================ */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isHidden && !isMenuOpen ? "-150%" : "0%" }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-3 md:top-6 left-1/2 -translate-x-1/2 w-[calc(100%-1.5rem)] sm:w-[calc(100%-2.5rem)] max-w-7xl z-50 rounded-full transition-all duration-500 pt-[env(safe-area-inset-top,0)] ${
          isScrolled && !isMenuOpen
            ? "bg-surface-header backdrop-blur-md border border-header-border shadow-xl"
            : "bg-transparent border-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 min-h-[52px]">
          
          {/* BRAND LOCKUP: LOGO MARK + NAME */}
          <Link 
            href="/" 
            aria-label="WeStream Production Home"
            className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm py-1"
          >
            <motion.div 
              whileHover={{ opacity: 0.85, scale: 1.02 }}
              transition={{ duration: 0.25 }}
              className="flex items-center gap-2.5 sm:gap-3"
            >
              {/* Transparent PNG Logo Mark */}
              <div className={`relative h-6 w-6 sm:h-7 sm:w-7 flex-shrink-0 transition-all duration-300 ${isLight ? "brightness-0" : ""}`}>
                <Image 
                  src="/logo.png" 
                  alt="WeStream Logo Icon" 
                  fill
                  className="object-contain"
                  priority
                />
              </div>

              {/* Company Title */}
              <span className="font-heading font-extrabold text-[11px] sm:text-xs md:text-sm tracking-[0.18em] uppercase text-foreground transition-colors duration-300">
                <span className="inline sm:hidden">WESTREAM</span>
                <span className="hidden sm:inline">WESTREAM PRODUCTION</span>
              </span>
            </motion.div>
          </Link>

          {/* CENTER NAVIGATION (Hidden on Tablet/Mobile) */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-300 py-1.5 ${
                    isActive 
                      ? "text-foreground font-bold" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {/* Subtle Underline */}
                  <span className={`absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-300 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`} />
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
            
            {/* LUXURY ICON MORPH THEME SWITCH */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center justify-center min-h-[44px] min-w-[44px] h-10 w-10 rounded-full border border-header-border text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              aria-label={`Switch theme (current: ${theme})`}
              title={`Theme: ${theme}`}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isLight ? "sun" : "moon"}
                  initial={{ rotate: -90, opacity: 0, scale: 0.7 }}
                  animate={{ rotate: 0, opacity: 1, scale: 1 }}
                  exit={{ rotate: 90, opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  {isLight ? (
                    <Sun className="h-4 w-4 stroke-[1.75]" />
                  ) : (
                    <Moon className="h-4 w-4 stroke-[1.75]" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            {/* MINIMAL CTA */}
            <Link
              href="/contact"
              className="hidden sm:flex items-center justify-center min-h-[44px] px-5 py-2 bg-transparent border border-accent/40 hover:border-accent text-accent font-heading text-[10px] font-bold tracking-[0.2em] uppercase rounded-full transition-all duration-300 hover:bg-accent/10 hover:shadow-[0_0_20px_var(--color-accent-glow)] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              Get a Quote
            </Link>

            {/* FULLSCREEN MENU TRIGGER */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex items-center gap-2 min-h-[44px] px-2 text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-sm"
              aria-expanded={isMenuOpen}
              aria-label="Toggle Fullscreen Navigation Menu"
            >
              <div className="relative overflow-hidden h-4 w-12 font-heading text-[11px] font-bold uppercase tracking-[0.1em] group-hover:tracking-[0.18em] transition-all duration-300">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={isMenuOpen ? "close" : "menu"}
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="absolute inset-0 flex items-center"
                  >
                    {isMenuOpen ? "CLOSE" : "MENU"}
                  </motion.span>
                </AnimatePresence>
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* ============================================================ */}
      {/* 2. DUAL-THEME FULLSCREEN EDITORIAL MENU                      */}
      {/* ============================================================ */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-menu-overlay-bg text-menu-overlay-text w-full h-[100dvh] flex flex-col justify-center overflow-hidden transition-colors duration-500 pt-[env(safe-area-inset-top,0)]"
          >
            {/* Subtle Texture Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.025] mix-blend-overlay pointer-events-none" aria-hidden="true" />
            
            <div className="container-safe h-full flex flex-col justify-center pt-20 pb-8 sm:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 h-full items-center">
                
                {/* Left Side: Massive Typography Links */}
                <nav className="lg:col-span-7 flex flex-col justify-center space-y-3 sm:space-y-5">
                  {navLinks.map((link, i) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 15 }}
                      transition={{ duration: 0.6, delay: 0.2 + (i * 0.08), ease: [0.16, 1, 0.3, 1] }}
                    >
                      <Link
                        href={link.href}
                        onMouseEnter={() => setHoveredItem(link.href)}
                        onMouseLeave={() => setHoveredItem(null)}
                        className="group relative flex items-center font-heading font-extrabold uppercase text-[clamp(2.2rem,7vw,6.5rem)] leading-[0.95] text-menu-overlay-muted hover:text-menu-overlay-text transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                      >
                        {/* Hover Accent Bar */}
                        <span className="absolute -left-6 sm:-left-8 w-3 sm:w-4 h-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block" />
                        
                        <span className="transform transition-transform duration-300 group-hover:translate-x-0 md:group-hover:translate-x-5">
                          {link.label}
                        </span>

                        {/* Interactive Subtitle */}
                        <span 
                          className={`absolute left-[calc(100%+1.5rem)] bottom-3 font-sans text-xs sm:text-sm tracking-widest text-accent whitespace-nowrap hidden xl:block transition-all duration-300 ${
                            hoveredItem === link.href ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
                          }`}
                        >
                          {link.subtitle}
                        </span>
                      </Link>
                    </motion.div>
                  ))}
                </nav>

                {/* Right Side: Media Frame & Contact Meta */}
                <div className="hidden lg:flex lg:col-span-5 h-full flex-col justify-center relative">
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.7, delay: 0.4 }}
                    className="w-full aspect-[4/5] max-h-[55vh] bg-menu-preview-bg border border-menu-preview-border rounded-sm relative overflow-hidden flex flex-col items-center justify-center text-center p-8 group"
                  >
                    <span className="font-heading text-xs tracking-widest uppercase text-menu-overlay-muted group-hover:text-menu-overlay-text transition-colors duration-300">
                      {hoveredItem ? "Media Stage Reserved" : "Select Category"}
                    </span>
                    <p className="mt-3 font-sans text-xs sm:text-sm text-menu-overlay-muted opacity-70 max-w-xs">
                      Editorial showcase video loops will mount here when hovering portfolio categories.
                    </p>

                    {/* Subtle corner framing */}
                    <div className="absolute top-4 left-4 w-3 h-3 border-t border-l border-menu-preview-border" />
                    <div className="absolute top-4 right-4 w-3 h-3 border-t border-r border-menu-preview-border" />
                    <div className="absolute bottom-4 left-4 w-3 h-3 border-b border-l border-menu-preview-border" />
                    <div className="absolute bottom-4 right-4 w-3 h-3 border-b border-r border-menu-preview-border" />
                  </motion.div>

                  {/* Contact Meta */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="absolute bottom-8 right-0 text-right space-y-1"
                  >
                    <a href="mailto:hello@westream.in" className="block font-sans text-xs sm:text-sm text-menu-overlay-muted hover:text-accent transition-colors duration-300">
                      hello@westream.in
                    </a>
                    <p className="font-heading text-[10px] tracking-widest uppercase text-menu-overlay-muted opacity-50">
                      Bangalore, India
                    </p>
                  </motion.div>
                </div>
                
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
