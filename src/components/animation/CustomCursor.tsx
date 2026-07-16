"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<"default" | "pointer" | "text">("default");
  const [cursorText, setCursorText] = useState("");
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Spring settings for responsive, light outer-ring follow
  const springConfig = { damping: 28, stiffness: 450, mass: 0.25 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch device
    const checkTouch = () => {
      setIsTouchDevice(
        "ontouchstart" in window || 
        navigator.maxTouchPoints > 0
      );
    };
    checkTouch();

    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return; // Do not use custom cursor if reduced motion is requested
    }

    if (isTouchDevice) return;

    // Add class to hide default cursor
    document.documentElement.classList.add("custom-cursor-active");

    const moveCursor = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    // Event delegation to detect hover states
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Find closest link, button, or element requesting pointer/custom text
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
      {/* Center dot cursor (instant tracking, no lag) */}
      <motion.div
        className="custom-cursor"
        style={{
          left: mouseX,
          top: mouseY,
        }}
        animate={{
          scale: cursorType === "pointer" ? 1.5 : cursorType === "text" ? 0 : 1,
          backgroundColor: cursorType === "pointer" ? "#FFFFFF" : "#D4AF37",
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer follow-ring */}
      <motion.div
        className="custom-cursor-ring flex items-center justify-center overflow-hidden"
        style={{
          left: cursorX,
          top: cursorY,
        }}
        animate={{
          width: cursorType === "pointer" ? 64 : cursorType === "text" ? 80 : 40,
          height: cursorType === "pointer" ? 64 : cursorType === "text" ? 80 : 40,
          borderColor: cursorType === "pointer" ? "rgba(255, 255, 255, 0.8)" : "rgba(212, 175, 55, 0.5)",
          backgroundColor: cursorType === "text" ? "rgba(212, 175, 55, 0.95)" : "rgba(212, 175, 55, 0)",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Custom text state label (e.g. "VIEW", "PLAY", "STREAM") */}
        {cursorType === "text" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[10px] font-heading font-extrabold text-black tracking-wider uppercase select-none pointer-events-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}
