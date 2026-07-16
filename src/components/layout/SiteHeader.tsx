"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Monitor } from "lucide-react";
import { Container } from "./Container";
import Magnetic from "../ui/Magnetic";
import { useTheme, Theme } from "@/components/theme/ThemeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsOpen(false);
    setShowThemeDropdown(false);
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border/80 py-4"
          : "bg-transparent border-transparent py-6"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between">
          {/* Logo Mark with gold Live Indicator dot */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-3.5 w-3.5 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold/50 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
            </span>
            <span className="font-heading font-extrabold text-lg md:text-xl tracking-[0.2em] group-hover:text-gold transition-colors duration-300">
              WESTREAM
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative text-xs font-heading font-extrabold tracking-widest uppercase py-2 transition-colors hover:text-gold ${
                    isActive ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[1px] bg-gold"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop CTAs (Magnetic) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Dropdown Toggle */}
            <div className="relative">
              <Magnetic range={30} strength={0.4}>
                <button
                  onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                  className="flex items-center justify-center h-10 w-10 rounded-full border border-border bg-surface/40 hover:border-gold/50 hover:bg-gold/10 text-muted-foreground hover:text-gold transition-colors duration-300 cursor-pointer"
                  aria-label="Toggle theme selection"
                >
                  {theme === "light" && <Sun className="h-4.5 w-4.5" />}
                  {theme === "dark" && <Moon className="h-4.5 w-4.5" />}
                  {theme === "system" && <Monitor className="h-4.5 w-4.5" />}
                </button>
              </Magnetic>

              <AnimatePresence>
                {showThemeDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-32 bg-surface border border-border rounded-sm py-1 shadow-2xl z-50 font-heading text-[9px] font-extrabold tracking-wider uppercase"
                  >
                    {[
                      { value: "light", label: "Light", icon: Sun },
                      { value: "dark", label: "Dark", icon: Moon },
                      { value: "system", label: "System", icon: Monitor },
                    ].map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = theme === opt.value;
                      return (
                        <button
                          key={opt.value}
                          onClick={() => {
                            setTheme(opt.value as Theme);
                            setShowThemeDropdown(false);
                          }}
                          className={`flex items-center justify-between w-full px-4 py-2.5 text-left hover:bg-gold/10 hover:text-gold transition-colors cursor-pointer ${
                            isSelected ? "text-gold bg-gold/5" : "text-muted-foreground"
                          }`}
                        >
                          <span>{opt.label}</span>
                          <Icon className="h-3.5 w-3.5" />
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>



            {/* Start a Project CTA Button */}
            <Magnetic range={40} strength={0.3}>
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center px-6 py-2.5 bg-gold hover:bg-[#F5E6C4] text-black font-heading font-extrabold text-[11px] tracking-widest uppercase rounded-sm overflow-hidden transition-colors duration-300 animate-rec-pulse"
              >
                Start a Project
              </Link>
            </Magnetic>
          </div>

          {/* Mobile Hamburguer trigger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex md:hidden items-center justify-center p-2 text-foreground hover:text-gold transition-colors duration-300"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-background border-t border-border flex flex-col p-6 gap-8 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-heading text-2xl font-extrabold tracking-widest uppercase transition-colors hover:text-gold ${
                    pathname === link.href ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="mt-auto flex flex-col gap-6 pb-8">
              {/* Mobile Theme Switcher Bar */}
              <div className="border-t border-border/40 pt-6 flex flex-col gap-3">
                <span className="text-[10px] font-heading font-extrabold tracking-widest text-muted-foreground uppercase">
                  Theme Select
                </span>
                <div className="flex gap-2">
                  {[
                    { value: "light", label: "Light", icon: Sun },
                    { value: "dark", label: "Dark", icon: Moon },
                    { value: "system", label: "System", icon: Monitor },
                  ].map((opt) => {
                    const Icon = opt.icon;
                    const isSelected = theme === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => setTheme(opt.value as Theme)}
                        className={`flex-1 flex items-center justify-center gap-2 py-3 border rounded-sm font-heading text-[10px] font-extrabold tracking-widest uppercase transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-gold text-black border-gold"
                            : "border-border text-muted-foreground hover:text-white"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" />
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link
                  href="/contact"
                  className="flex items-center justify-center w-full py-4 bg-gold text-black rounded-sm text-sm font-heading font-extrabold tracking-widest uppercase hover:bg-[#F5E6C4] transition-colors"
                >
                  Start a Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
