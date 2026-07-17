"use client";

import React, { useEffect, useState } from "react";
import Lenis from "lenis";
import CustomCursor from "../animation/CustomCursor";
import LoadingScreen from "../animation/LoadingScreen";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionType, setTransitionType] = useState<"zoom" | "swipe" | "fade">("fade");
  const [pendingPath, setPendingPath] = useState<string | null>(null);

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

  // Intercept relative page link clicks globally to inject transition delay
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const targetAttr = anchor.getAttribute("target");
      if (targetAttr === "_blank") return;

      // Handle relative paths within our application
      if (href.startsWith("/") || href.startsWith(window.location.origin)) {
        const url = new URL(href, window.location.origin);
        
        // Skip transition if navigating to same page hash
        if (url.pathname === window.location.pathname && url.hash) return;

        e.preventDefault();

        // CONTEXTUAL SELECTION:
        // 1. From portfolio grid (/work) to detail project (/work/[slug]) -> Zoom
        if (window.location.pathname === "/work" && url.pathname.startsWith("/work/")) {
          setTransitionType("zoom");
        } 
        // 2. Navigation bar / Footer -> Elegant gold sweep
        else if (
          target.closest("header") || 
          target.closest("footer") || 
          anchor.closest("header") || 
          anchor.closest("footer")
        ) {
          setTransitionType("swipe");
        } 
        // 3. All other paths -> Subtle crossfade
        else {
          setTransitionType("fade");
        }

        setPendingPath(url.pathname + url.search + url.hash);
        setIsTransitioning(true);
      }
    };

    document.addEventListener("click", handleLinkClick);
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  // Handle path swap half-way through the transition
  useEffect(() => {
    if (!isTransitioning || !pendingPath) return;

    const routeDelay = transitionType === "swipe" ? 450 : 350;
    const timer = setTimeout(() => {
      router.push(pendingPath);
      
      // Delay resetting state to let entering animation conclude
      setTimeout(() => {
        setIsTransitioning(false);
        setPendingPath(null);
      }, routeDelay);
    }, routeDelay);

    return () => clearTimeout(timer);
  }, [isTransitioning, pendingPath, transitionType, router]);

  return (
    <>
      <LoadingScreen />
      <CustomCursor />

      {/* Dynamic contextual transition layers overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* 1. GOLD SWEEP OVERLAY */}
            {transitionType === "swipe" && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                className="fixed inset-0 z-999 bg-gradient-to-r from-[#0B0B0B] via-[#D4AF37]/90 to-[#0B0B0B] pointer-events-none"
              />
            )}

            {/* 2. OPTICAL LENS ZOOM OVERLAY */}
            {transitionType === "zoom" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="fixed inset-0 z-999 bg-[#0B0B0B] pointer-events-none flex items-center justify-center"
              >
                <motion.div 
                  initial={{ width: 0, height: 0 }}
                  animate={{ width: "120vw", height: "120vw" }}
                  transition={{ duration: 0.8 }}
                  className="rounded-full bg-radial from-[#D4AF37]/15 to-transparent blur-md"
                />
              </motion.div>
            )}

            {/* 3. SUBTLE FADE-SHIFT OVERLAY */}
            {transitionType === "fade" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed inset-0 z-999 bg-[#0B0B0B] pointer-events-none"
              />
            )}
          </>
        )}
      </AnimatePresence>

      <div className="relative z-10">
        {children}
      </div>
    </>
  );
}
