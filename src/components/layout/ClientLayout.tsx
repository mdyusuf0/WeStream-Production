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
  const [transitionType, setTransitionType] = useState<"zoom" | "swipe" | "fade" | "sibling">("fade");
  const [pendingPath, setPendingPath] = useState<string | null>(null);
  const [expandedImage, setExpandedImage] = useState<ExpandedImageState | null>(null);
  const [prevPath, setPrevPath] = useState<string>(pathname);

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

        let type: "zoom" | "swipe" | "fade" | "sibling" = "fade";

        // Sibling transition between project detail pages
        if (window.location.pathname.startsWith("/work/") && url.pathname.startsWith("/work/")) {
          type = "sibling";
        }
        // Zoom card zoom transition
        else if (window.location.pathname === "/work" && url.pathname.startsWith("/work/")) {
          type = "zoom";
        }
        // Menu / footer navigation sweep
        else if (
          target.closest("header") || 
          target.closest("footer") || 
          anchor.closest("header") || 
          anchor.closest("footer")
        ) {
          type = "swipe";
        }

        setTransitionType(type);
        setPendingPath(url.pathname + url.search + url.hash);
        setIsTransitioning(true);
      }
    };

    document.addEventListener("click", handleLinkClick, { capture: true });
    return () => document.removeEventListener("click", handleLinkClick, { capture: true });
  }, []);

  // Sync route switch after exit animations finish playing
  useEffect(() => {
    if (!isTransitioning || !pendingPath) return;

    // Wait for fade out / slide out to complete before swapping children route
    const exitDuration = transitionType === "swipe" ? 600 : transitionType === "zoom" ? 500 : 400;
    const timer = setTimeout(() => {
      setPrevPath(pathname);
      router.push(pendingPath);
      
      // Delay resetting transition state to let enter animation play
      setTimeout(() => {
        setIsTransitioning(false);
        setPendingPath(null);
        setExpandedImage(null);
      }, exitDuration);
    }, exitDuration);

    return () => clearTimeout(timer);
  }, [isTransitioning, pendingPath, transitionType, router, pathname]);

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
              top: "16vh", // aligned to start of project detail banner container
              left: "5vw",
              width: "90vw",
              height: "45vh",
              borderRadius: "0px",
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <img src={expandedImage.src} className="w-full h-full object-cover" alt="Expanding Project Grid Card" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. DOUBLE SHUTTER SWEEP BLADES */}
      <AnimatePresence>
        {isTransitioning && transitionType === "swipe" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99998 pointer-events-none flex flex-col justify-between"
          >
            <motion.div 
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="h-1/2 w-full bg-[#0B0B0B] border-b border-accent/20"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="h-1/2 w-full bg-[#0B0B0B] border-t border-accent/20"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Content Wrapper with Contextual Exit/Enter Shift */}
      <motion.div
        animate={{ 
          opacity: isTransitioning ? 0 : 1, 
          x: isTransitioning && transitionType === "sibling" ? -60 : 0,
          y: isTransitioning && transitionType === "fade" ? -15 : 0 
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10"
      >
        {children}
      </motion.div>
    </>
  );
}
