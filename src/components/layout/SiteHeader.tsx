"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Container } from "./Container";
import Magnetic from "../ui/Magnetic";

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
  const pathname = usePathname();

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
  }, [pathname]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 border-b ${
        scrolled
          ? "bg-[#0B0B0B]/90 backdrop-blur-md border-border/80 py-4"
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
            {/* WhatsApp Quick Icon */}
            <Magnetic range={30} strength={0.4}>
              <a
                href="https://wa.me/910000000000" // Placeholder phone
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-10 w-10 rounded-full border border-border bg-black/40 hover:border-gold/50 hover:bg-gold/10 text-muted-foreground hover:text-gold transition-colors duration-300"
                aria-label="Contact WeStream via WhatsApp"
              >
                <svg
                  className="h-5 w-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.197 1.45 4.817 1.45 5.485 0 9.947-4.46 9.95-9.947.002-2.66-1.023-5.158-2.883-7.02C16.672 1.775 14.18 0.75 11.53 0.75c-5.487 0-9.95 4.463-9.954 9.95-.001 1.745.483 3.447 1.402 4.957l-1.014 3.704 3.805-1.011c1.474.805 3.11 1.228 4.793 1.228zM17.486 15c-.287-.144-1.695-.837-1.957-.933-.263-.096-.454-.144-.645.144-.191.287-.74.933-.907 1.124-.167.191-.335.215-.622.072-.287-.144-1.21-.446-2.305-1.424-.853-.76-1.428-1.7-1.595-1.987-.167-.287-.018-.442.126-.583.129-.127.287-.335.43-.502.144-.167.191-.287.287-.478.096-.191.048-.359-.024-.502-.072-.144-.645-1.554-.884-2.129-.233-.56-.469-.483-.645-.492-.167-.008-.359-.01-.55-.01s-.502.072-.765.359c-.263.287-1.004.98-1.004 2.392s1.028 2.775 1.171 2.967c.144.191 2.025 3.093 4.906 4.335.685.296 1.22.473 1.637.605.689.219 1.317.188 1.813.114.553-.082 1.695-.694 1.933-1.365.239-.67.239-1.244.167-1.365-.072-.12-.263-.215-.55-.359z" />
                </svg>
              </a>
            </Magnetic>

            {/* Start a Project CTA Button */}
            <Magnetic range={40} strength={0.3}>
              <Link
                href="/contact"
                className="relative inline-flex items-center justify-center px-6 py-2.5 bg-gold hover:bg-[#F5E6C4] text-black font-heading font-extrabold text-[11px] tracking-widest uppercase rounded-sm overflow-hidden transition-colors duration-300"
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
            className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-[#0B0B0B] border-t border-border flex flex-col p-6 gap-8 md:hidden"
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

            <div className="mt-auto flex flex-col gap-4">
              <a
                href="https://wa.me/910000000000" // Placeholder
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full py-4 border border-border rounded-sm text-sm font-heading font-extrabold tracking-widest uppercase hover:border-gold hover:text-gold transition-colors"
              >
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="flex items-center justify-center w-full py-4 bg-gold text-black rounded-sm text-sm font-heading font-extrabold tracking-widest uppercase hover:bg-[#F5E6C4] transition-colors"
              >
                Start a Project
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
