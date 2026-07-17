"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("westream_loader_seen");
    if (!hasSeenLoader) {
      setIsVisible(true);
      // Disable body scrolling during load
      document.body.style.overflow = "hidden";
      
      // Delay to draw the line first, then show the text
      const textTimer = setTimeout(() => {
        setShowText(true);
      }, 1000);

      // Delay to complete loading
      const completeTimer = setTimeout(() => {
        handleComplete();
      }, 2500);

      return () => {
        clearTimeout(textTimer);
        clearTimeout(completeTimer);
      };
    }
  }, []);

  const handleComplete = () => {
    sessionStorage.setItem("westream_loader_seen", "true");
    setIsVisible(false);
    document.body.style.overflow = "";
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ 
          opacity: 0,
          transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }}
        className="fixed inset-0 z-9999 flex items-center justify-center bg-[#0B0B0B] select-none"
      >
        <div className="relative w-full max-w-lg flex flex-col items-center justify-center px-6">
          
          {/* 1. HORIZONTAL GOLD LINE DRAWING */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-accent relative"
          >
            {/* Pulsing center node on the line */}
            <motion.span 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_10px_#D4AF37]" 
            />
          </motion.div>

          {/* 2. TEXT REVEAL ONCE LINE IS DRAWN */}
          <div className="h-16 flex items-center justify-center mt-6 overflow-hidden">
            <AnimatePresence>
              {showText && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
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

        {/* Ambient static overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6))] pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
