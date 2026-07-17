"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { FAQS_DATA } from "@/lib/data";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
}

const initialFormState: FormState = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  projectType: "",
  budget: "",
  timeline: "",
  description: "",
};

// FAQ Accordion Card
function FAQCard({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-header-border bg-surface rounded-sm hover:border-accent/40 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left font-heading text-xs md:text-sm font-extrabold uppercase tracking-wider text-foreground hover:text-accent transition-colors cursor-pointer"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-accent shrink-0 ml-4" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-4" />}
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 text-xs md:text-sm text-muted-foreground leading-relaxed font-sans border-t border-header-border pt-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const serviceParam = searchParams.get("service") || searchParams.get("project");
      if (serviceParam) {
        let type = "Live Streaming";
        if (serviceParam.includes("production")) type = "Video Production";
        else if (serviceParam.includes("coverage")) type = "Event Coverage";
        else if (serviceParam.includes("post")) type = "Post Production";
        
        setForm((prev) => ({ ...prev, projectType: type }));
      }
    }
  }, []);

  const validate = () => {
    const tempErrors: Partial<FormState> = {};
    if (!form.fullName.trim()) tempErrors.fullName = "Full Name is required";
    if (!form.email.trim()) {
      tempErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = "Please enter a valid email address";
    }
    if (!form.phone.trim()) tempErrors.phone = "Phone number is required";
    if (!form.projectType) tempErrors.projectType = "Please select a project stream";
    if (!form.description.trim()) tempErrors.description = "Project description is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="bg-transparent text-foreground transition-colors duration-500 pt-32 pb-24 min-h-screen">
      
      {/* 1. HERO HEADER */}
      <Container className="mb-20">
        <div className="max-w-4xl space-y-6">
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1 rounded-full border border-header-border bg-surface shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="text-[10px] font-heading font-extrabold tracking-[0.2em] text-accent uppercase">
              CONTACT & TECHNICAL ESTIMATE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-heading font-extrabold text-foreground uppercase tracking-tight leading-[0.95]">
            Let&apos;s Build Something.<br />
            <span className="text-accent">Extraordinary.</span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-muted-foreground max-w-2xl font-sans leading-relaxed pt-2">
            Tell us about your upcoming event, broadcast scope, or film campaign. Our engineers respond with detailed technical specifications within 24 hours.
          </p>
        </div>
      </Container>

      {/* 2. FORM & DIRECT CONTACT TOPOLOGY */}
      <Container className="mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Form Column */}
          <div className="lg:col-span-7 bg-surface border border-header-border p-8 md:p-12 rounded-sm space-y-8">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center space-y-6"
              >
                <div className="h-16 w-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto border border-accent/40">
                  <Check className="h-8 w-8" />
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-extrabold text-foreground uppercase">
                  Technical Request Received
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto font-sans leading-relaxed">
                  Thank you, {form.fullName}. Our broadcast director will review your requirements and follow up via email/WhatsApp within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm(initialFormState); }}
                  className="inline-flex items-center justify-center px-6 py-2.5 border border-header-border text-foreground hover:border-accent text-xs font-heading font-extrabold tracking-widest uppercase rounded-full transition-colors"
                >
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h3 className="text-xl font-heading font-extrabold text-foreground uppercase border-b border-header-border pb-4">
                  Project Estimate Form
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-extrabold text-accent uppercase tracking-widest block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full bg-background border border-header-border rounded-sm px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.fullName && <p className="text-[10px] text-red-500">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-extrabold text-accent uppercase tracking-widest block">
                      Company / Organization
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={form.company}
                      onChange={handleInputChange}
                      placeholder="e.g. Acme Corp"
                      className="w-full bg-background border border-header-border rounded-sm px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-extrabold text-accent uppercase tracking-widest block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rahul@acme.com"
                      className="w-full bg-background border border-header-border rounded-sm px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-heading font-extrabold text-accent uppercase tracking-widest block">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-background border border-header-border rounded-sm px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                    />
                    {errors.phone && <p className="text-[10px] text-red-500">{errors.phone}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="space-y-2 sm:col-span-3">
                    <label className="text-[10px] font-heading font-extrabold text-accent uppercase tracking-widest block">
                      Primary Production Stream *
                    </label>
                    <select
                      name="projectType"
                      value={form.projectType}
                      onChange={handleInputChange}
                      className="w-full bg-background border border-header-border rounded-sm px-4 py-3 text-xs text-foreground focus:outline-none focus:border-accent transition-colors"
                    >
                      <option value="">Select Stream...</option>
                      <option value="Live Streaming">Multi-Cam Live Streaming</option>
                      <option value="Video Production">Corporate Video Production</option>
                      <option value="Event Coverage">Event Coverage & LED Feeds</option>
                      <option value="Post Production">Post Production & Motion Graphics</option>
                    </select>
                    {errors.projectType && <p className="text-[10px] text-red-500">{errors.projectType}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-heading font-extrabold text-accent uppercase tracking-widest block">
                    Project Details & Scope *
                  </label>
                  <textarea
                    name="description"
                    rows={4}
                    value={form.description}
                    onChange={handleInputChange}
                    placeholder="Describe event dates, venue location, camera count requirements, or streaming targets..."
                    className="w-full bg-background border border-header-border rounded-sm px-4 py-3 text-xs text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent transition-colors"
                  />
                  {errors.description && <p className="text-[10px] text-red-500">{errors.description}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-accent text-background font-heading text-xs font-bold tracking-[0.2em] uppercase rounded-full shadow-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isSubmitting ? "Processing Technical Request..." : "Submit Inquiry"}
                </button>
              </form>
            )}
          </div>

          {/* Right Direct Details Column */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Headquarters */}
            <div className="bg-surface border border-header-border p-8 rounded-sm space-y-4">
              <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase block">
                STUDIO HEADQUARTERS
              </span>
              <h4 className="text-lg font-heading font-extrabold text-foreground uppercase">
                Bangalore Studio
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                MG Road / Indiranagar Corridor,<br />
                Bangalore, Karnataka 560038, India.
              </p>
              <div className="pt-2 text-xs font-heading font-bold text-accent">
                Available for travel & execution across all of India.
              </div>
            </div>

            {/* Direct Channels */}
            <div className="bg-surface border border-header-border p-8 rounded-sm space-y-4">
              <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase block">
                DIRECT CONTACT
              </span>
              <div className="space-y-3 text-xs font-sans">
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-heading font-bold">Email:</span>
                  <a href="mailto:hello@westream.in" className="text-foreground hover:text-accent font-bold transition-colors">
                    hello@westream.in
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-heading font-bold">Phone / WhatsApp:</span>
                  <a href="tel:+919876543210" className="text-foreground hover:text-accent font-bold transition-colors">
                    +91 98765 43210
                  </a>
                </div>
                <div>
                  <span className="text-muted-foreground block text-[10px] uppercase font-heading font-bold">Operating Hours:</span>
                  <span className="text-foreground font-bold">
                    Mon &ndash; Sat: 9:00 AM &ndash; 8:00 PM IST
                  </span>
                </div>
              </div>
            </div>

            {/* DOMINANT VISUAL FOCAL POINT: BROADCAST RADAR & COVERAGE GRAPHIC */}
            <div className="bg-surface border border-header-border p-8 rounded-sm space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-heading font-extrabold tracking-widest text-accent uppercase block">
                  BROADCAST COVERAGE TOPOLOGY
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              </div>

              <div className="relative aspect-video w-full bg-background border border-header-border rounded-sm flex flex-col items-center justify-center p-6 overflow-hidden select-none">
                <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 220" fill="none">
                  <circle cx="200" cy="110" r="40" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="3 3" />
                  <circle cx="200" cy="110" r="80" stroke="var(--color-accent)" strokeWidth="1" strokeDasharray="2 6" />
                  <circle cx="200" cy="110" r="120" stroke="var(--color-accent)" strokeWidth="0.5" />
                  <line x1="200" y1="10" x2="200" y2="210" stroke="var(--color-accent)" strokeWidth="0.5" strokeDasharray="4 4" />
                  <line x1="20" y1="110" x2="380" y2="110" stroke="var(--color-accent)" strokeWidth="0.5" strokeDasharray="4 4" />
                </svg>
                
                <div className="relative z-10 text-center space-y-2">
                  <span className="text-xs font-heading font-extrabold text-foreground uppercase tracking-widest block">
                    BANGALORE HQ (12.9716° N, 77.5946° E)
                  </span>
                  <span className="text-[10px] font-heading font-bold text-accent uppercase tracking-widest block">
                    PAN-INDIA UPLINK & SATELLITE OPERATIONS ACTIVE
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </Container>

      {/* 3. FREQUENTLY ASKED QUESTIONS */}
      <Container className="mb-20">
        <div className="border-t border-header-border pt-16 mb-12">
          <span className="font-heading text-xs font-bold tracking-[0.25em] text-muted-foreground uppercase block mb-2">
            INQUIRY FAQ
          </span>
          <h2 className="text-2xl md:text-4xl font-heading font-extrabold text-foreground uppercase tracking-tight">
            Common Technical Questions
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {FAQS_DATA.map((faq, idx) => (
            <FAQCard key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </Container>

    </div>
  );
}
