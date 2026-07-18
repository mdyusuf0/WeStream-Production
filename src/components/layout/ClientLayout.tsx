"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import CustomCursor from "../animation/CustomCursor";
import LoadingScreen from "../animation/LoadingScreen";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface ExpandedImageState {
  src: string;
  rect: DOMRect;
}

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<"zoom" | "aperture" | "sibling">("aperture");
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [expandedImage, setExpandedImage] = useState<ExpandedImageState | null>(null);

  // Initialize Lenis Scroll
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    lenis.scrollTo(0, { immediate: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]);

  // Listen to visual zoom coordinates event
  useEffect(() => {
    const handleExpand = (e: Event) => {
      const customEvent = e as CustomEvent;
      setExpandedImage(customEvent.detail);
    };
    window.addEventListener("westream_expand_project", handleExpand);
    return () => window.removeEventListener("westream_expand_project", handleExpand);
  }, []);

  // Intercept relative page link clicks globally in CAPTURE phase
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const targetAttr = anchor.getAttribute("target");
      if (targetAttr === "_blank") return;

      if (href.startsWith("/") || href.startsWith(window.location.origin)) {
        const url = new URL(href, window.location.origin);
        
        // Skip transition if navigating to same page hash
        if (url.pathname === window.location.pathname && url.hash) return;

        // Block Next.js default navigation instantly
        e.preventDefault();
        e.stopPropagation();

        let type: "zoom" | "aperture" | "sibling" = "aperture";

        // Sibling transition between project detail pages
        if (window.location.pathname.startsWith("/work/") && url.pathname.startsWith("/work/")) {
          type = "sibling";
        }
        // Zoom card zoom transition
        else if (window.location.pathname === "/work" && url.pathname.startsWith("/work/")) {
          type = "zoom";
        }

        setTransitionType(type);
        setPendingPath(url.pathname + url.search + url.hash);
        setIsTransitioning(true);
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => document.removeEventListener("click", handleLinkClick, { capture: true });
  }, []);

  // Sync route switch after exit transitions finish
  useEffect(() => {
    if (!isTransitioning || !pendingPath) return;

    // Use a fixed 500ms duration for all transitions to remain crisp
    const exitDuration = 450;

    const timer = setTimeout(() => {
      router.push(pendingPath);
      
      // Delay resetting transition state slightly to let the new page fade in
      setTimeout(() => {
        setIsTransitioning(false);
        setPendingPath(null);
        setExpandedImage(null);
      }, 100);
    }, exitDuration);

    return () => clearTimeout(timer);
  }, [isTransitioning, pendingPath, router]);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      {/* 1. SEAMLESS WORK CARD ZOOM CLONE LAYER */}
      <AnimatePresence>
        {isTransitioning && transitionType === "zoom" && expandedImage && (
          <motion.div
            initial={{
              position: "fixed",
              top: expandedImage.rect.top,
              left: expandedImage.rect.left,
              width: expandedImage.rect.width,
              height: expandedImage.rect.height,
              zIndex: 99999,
              borderRadius: "4px",
              overflow: "hidden",
            }}
            animate={{
              top: "16vh",
              left: "5vw",
              width: "90vw",
              height: "45vh",
              borderRadius: "0px",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={expandedImage.src} className="w-full h-full object-cover" alt="Expanding Project Grid Card" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. CINEMATIC HORIZONTAL ANAMORPHIC FLARE SHUTTER SWEEP */}
      <AnimatePresence>
        {isTransitioning && transitionType === "aperture" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99998] pointer-events-none flex flex-col justify-between overflow-hidden"
          >
            {/* Subtle light vignette backdrop */}
            <div className="absolute inset-0 bg-black/25 backdrop-blur-[1px] transition-opacity duration-300" />
            
            {/* Golden flare line sweeping dynamically across screen (fully GPU accelerated) */}
            <motion.div
              initial={{ y: "-10vh" }}
              animate={{ y: "110vh" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-accent to-transparent shadow-[0_0_10px_#D4AF37,0_0_25px_#D4AF37]"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content Wrapper with Contextual Exit/Enter Shift */}
      <motion.div
        animate={{ 
          opacity: isTransitioning ? 0 : 1, 
          scale: isTransitioning ? 0.99 : 1,
          x: isTransitioning && transitionType === "sibling" ? -50 : 0,
        }}
        transition={{ duration: 0.45, ease: [0.25, 1, 0.5, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </>
  );
}
