"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Core coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer ring springs
  const ringX = useSpring(mouseX, { damping: 30, stiffness: 400 });
  const ringY = useSpring(mouseY, { damping: 30, stiffness: 400 });

  // Trailing glass reflection springs (Simulating lens reflection offsets)
  const flareX1 = useSpring(mouseX, { damping: 40, stiffness: 180 });
  const flareY1 = useSpring(mouseY, { damping: 40, stiffness: 180 });

  const flareX2 = useSpring(mouseX, { damping: 55, stiffness: 100 });
  const flareY2 = useSpring(mouseY, { damping: 55, stiffness: 100 });

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
    };
    checkTouch();

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    if (isTouchDevice) return;

    // Hide default cursor
    document.documentElement.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const interactive = target.closest("a, button, [role='button'], input, textarea, select");
      const cursorTextEl = target.closest("[data-cursor-text]");

      if (cursorTextEl) {
        setCursorType("text");
        setCursorText(cursorTextEl.getAttribute("data-cursor-text") || "");
      } else if (interactive) {
        setCursorType("pointer");
      } else {
        setCursorType("default");
        setCursorText("");
      }
    };

    document.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [mouseX, mouseY, isTouchDevice, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* 1. HORIZONTAL ANAMORPHIC HAIRLINE (Tracks Y coordinate) */}
      <motion.div
        className="fixed inset-x-0 pointer-events-none z-40 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent mix-blend-screen"
        style={{ top: mouseY }}
        animate={{
          opacity: cursorType === "pointer" ? 0.15 : 0.05,
        }}
        transition={{ duration: 0.2 }}
      />

      {/* 2. PRIMARY TRACKING DOT */}
      <motion.div
        className="custom-cursor fixed h-1 w-1 rounded-full pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          left: mouseX,
          top: mouseY,
        }}
        animate={{
          scale: cursorType === "pointer" ? 1.4 : 1,
          backgroundColor: cursorType === "pointer" ? "#FFFFFF" : "#D4AF37",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* 3. LENS FLARE GLASS REFLECTION 1 (Warm Gold Ring, slightly trailing) */}
      <motion.div
        className="fixed h-8 w-8 rounded-full border border-accent/5 pointer-events-none z-45 -translate-x-1/2 -translate-y-1/2 mix-blend-screen"
        style={{
          left: flareX1,
          top: flareY1,
        }}
        animate={{
          scale: cursorType === "pointer" ? 1.2 : 1,
          borderColor: cursorType === "pointer" ? "rgba(212, 175, 55, 0.15)" : "rgba(212, 175, 55, 0.05)",
        }}
      />

      {/* 4. LENS FLARE GLASS REFLECTION 2 (Cool Blue Spot, longer trail) */}
      <motion.div
        className="fixed h-1.5 w-1.5 rounded-full bg-cyan-500/5 pointer-events-none z-45 -translate-x-1/2 -translate-y-1/2 mix-blend-screen blur-[0.5px]"
        style={{
          left: flareX2,
          top: flareY2,
        }}
        animate={{
          scale: cursorType === "pointer" ? 1.5 : 1,
          opacity: cursorType === "pointer" ? 0.25 : 0.1,
        }}
      />

      {/* 5. FOCUS HOVER RING WITH TEXT */}
      <motion.div
        className="fixed rounded-full border flex items-center justify-center pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 overflow-hidden"
        style={{
          left: ringX,
          top: ringY,
        }}
        animate={{
          width: cursorType === "pointer" ? 48 : cursorType === "text" ? 64 : 0,
          height: cursorType === "pointer" ? 48 : cursorType === "text" ? 64 : 0,
          borderColor: cursorType === "pointer" ? "rgba(255, 255, 255, 0.5)" : "rgba(212, 175, 55, 0.3)",
          backgroundColor: cursorType === "text" ? "rgba(212, 175, 55, 0.95)" : "rgba(212, 175, 55, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {cursorType === "text" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[9px] font-heading font-extrabold text-black tracking-wider uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
