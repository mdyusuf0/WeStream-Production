"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    // Check if the user has already seen the loader in this session
    const hasSeenLoader = sessionStorage.getItem("westream_loader_seen");
    if (!hasSeenLoader) {
      setIsVisible(true);
      // Disable body scrolling during load
      document.body.style.overflow = "hidden";
    }
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    // Countdown interval
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer);
          setIsLive(true);
          // Wait 600ms on "LIVE" before completing
          setTimeout(() => {
            handleComplete();
          }, 600);
          return 0;
        }
        return prev - 1;
      });
    }, 450);

    return () => clearInterval(timer);
  }, [isVisible]);

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
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
        }}
        className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black select-none"
      >
        {/* Cinematic Film-strip border effect */}
        <div className="absolute inset-y-0 left-4 w-[1px] bg-border/20 hidden md:block" />
        <div className="absolute inset-y-0 right-4 w-[1px] bg-border/20 hidden md:block" />

        <div className="relative flex flex-col items-center justify-center">
          {/* Logo Mark drawing placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 flex items-center gap-3 text-gold"
          >
            <span className="h-3 w-3 rounded-full bg-gold animate-pulse" />
            <span className="font-heading text-xs tracking-[0.3em] uppercase">WE STREAM</span>
          </motion.div>

          {/* Large Countdown numbers */}
          <div className="h-36 flex items-center justify-center">
            <AnimatePresence mode="wait">
              {isLive ? (
                <motion.h1
                  key="live"
                  initial={{ opacity: 0, scale: 0.5, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-heading text-6xl md:text-8xl font-extrabold text-gold tracking-wider drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                >
                  LIVE
                </motion.h1>
              ) : (
                <motion.h1
                  key={countdown}
                  initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 1.5 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="font-heading text-8xl md:text-9xl font-extrabold text-white"
                >
                  {countdown}
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.2 }}
            className="mt-6 font-sans text-xs tracking-widest text-muted-foreground uppercase"
          >
            Configuring Broadcast
          </motion.p>
        </div>

        {/* Skip button in bottom-right corner */}
        <button
          onClick={handleComplete}
          className="absolute bottom-8 right-8 font-heading text-xs text-gold/60 hover:text-gold uppercase tracking-[0.2em] transition-colors py-2 px-4 border border-gold/20 hover:border-gold/50 rounded-sm cursor-pointer z-10"
        >
          Skip Intro
        </button>

        {/* Audio shutter/flicker static overlay indicator */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4))] pointer-events-none" />
      </motion.div>
    </AnimatePresence>
  );
}
