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
  const [transitionType, setTransitionType] = useState<"zoom" | "aperture" | "fade" | "sibling">("aperture");
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

        let type: "zoom" | "aperture" | "fade" | "sibling" = "aperture";

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

  // Sync route switch after exit animations finish playing
  useEffect(() => {
    if (!isTransitioning || !pendingPath) return;

    // Aperture iris takes 650ms to close completely, zoom takes 500ms
    const exitDuration = 
      transitionType === "zoom" ? 500 : 
      transitionType === "aperture" ? 650 : 400;

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
              top: "16vh",
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

      {/* 2. GLOBAL CAMERA APERTURE LENS IRIS REVEAL */}
      <AnimatePresence>
        {isTransitioning && transitionType === "aperture" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-99998 bg-transparent flex items-center justify-center pointer-events-none overflow-hidden"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-[150vw] h-[150vh] max-w-none text-[#0B0B0B]">
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 360) / 8;
                  return (
                    <motion.path
                      key={i}
                      d="M 50 50 L 140 0 L 140 100 Z"
                      fill="currentColor"
                      stroke="#D4AF37"
                      strokeWidth="0.5"
                      strokeOpacity="0.2"
                      style={{
                        transformOrigin: "50px 50px",
                      }}
                      initial={{ rotate: angle, scale: 0 }}
                      animate={{ rotate: angle + 25, scale: 1 }}
                      exit={{ rotate: angle + 50, scale: 0 }}
                      transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
                    />
                  );
                })}
              </svg>
            </div>
            {/* Focal indicator in center */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.15 }}
              exit={{ scale: 1.2, opacity: 0 }}
              className="absolute w-44 h-44 border border-accent rounded-full"
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
