"use client";

import React, { useEffect } from "react";
import Lenis from "lenis";
import CustomCursor from "../animation/CustomCursor";
import LoadingScreen from "../animation/LoadingScreen";
import { usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Check if the system has prefers-reduced-motion active
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    // Initialize smooth scrolling with Lenis
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

    // Scroll to top on page transition
    lenis.scrollTo(0, { immediate: true });

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [pathname]); // Re-initialize or reset scroll position on path changes

  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      {children}
    </>
  );
}
