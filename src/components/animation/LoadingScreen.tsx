"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const BroadcastApertureCanvas = dynamic(
  () => import("../media/BroadcastApertureCanvas"),
  { ssr: false }
);

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  function handleComplete() {
    sessionStorage.setItem("westream_loader_seen", "true");
    setIsVisible(false);
    document.body.style.overflow = "";
    window.dispatchEvent(new Event("westream_loaded"));
  }

  useEffect(() => {
    // Check if the user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("westream_loader_seen");
    if (!hasSeenLoader) {
      requestAnimationFrame(() => setIsVisible(true));
      // Disable body scrolling during load
      document.body.style.overflow = "hidden";
      
      // Delay showing text slightly to let the 3D aperture start opening
      const textTimer = setTimeout(() => {
        setShowText(true);
      }, 700);

      // Delay to complete loading (1.8s instead of original 2.5s for faster under ~1.5s skip-able feel)
      const completeTimer = setTimeout(() => {
        handleComplete();
      }, 1900);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(completeTimer);
      };
    }
  }, []);

  if (!isVisible) return null;

  const loaderFallback = (
    <motion.span 
      initial={{ scale: 0 }}
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
      className="h-3 w-3 rounded-full bg-accent shadow-[0_0_12px_#D4AF37]" 
    />
  );

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
        }}
        className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0B0B0B] select-none"
      >
        <div className="relative w-full max-w-lg flex flex-col items-center justify-center px-6">
          
          {/* Centered 3D Broadcast Aperture Loader */}
          <div className="h-[120px] w-[120px] flex items-center justify-center mb-6">
            <BroadcastApertureCanvas variant="loader" fallback={loaderFallback} />
          </div>

          {/* 2. TEXT REVEAL */}
          <div className="h-16 flex items-center justify-center overflow-hidden">
            <AnimatePresence>
              {showText && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="text-center space-y-1"
                >
                  <h1 className="font-heading text-lg md:text-xl font-extrabold text-white tracking-[0.3em] uppercase">
                    WE STREAM
                  </h1>
                  <p className="font-sans text-[10px] tracking-[0.25em] text-accent uppercase">
                    PRODUCTION
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Skip button for user control */}
        <button 
          onClick={handleComplete}
          className="absolute bottom-10 font-heading text-[10px] tracking-[0.25em] text-muted-foreground hover:text-accent uppercase cursor-pointer py-2 px-4 transition-colors"
        >
          Skip Intro
        </button>

        {/* Ambient static overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6))] pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
