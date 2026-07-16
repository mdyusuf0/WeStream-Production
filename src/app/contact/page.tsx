"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { FAQS_DATA } from "@/lib/data";
import { MessageSquare, Check, HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import Magnetic from "@/components/ui/Magnetic";

interface FormState {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  timeline: string;
  description: string;
  references: string;
  driveLink: string;
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
  references: "",
  driveLink: "",
};

// FAQ Accordion Card
function FAQCard({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-border/40 bg-black/60 rounded-sm hover:border-gold/25 transition-all duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full p-6 text-left font-heading text-xs md:text-sm font-extrabold uppercase tracking-wider text-white hover:text-gold transition-colors cursor-pointer"
      >
        <span>{question}</span>
        {isOpen ? <ChevronUp className="h-4 w-4 text-gold shrink-0 ml-4" /> : <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0 ml-4" />}
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
            <p className="px-6 pb-6 text-xs md:text-sm text-muted-foreground leading-relaxed font-sans border-t border-border/20 pt-4">
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

  // Read pre-filled query parameters (e.g. from service click redirects)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const serviceParam = searchParams.get("service") || searchParams.get("project");
      if (serviceParam) {
        let type = "Other";
        if (serviceParam.includes("stream")) type = "Live Streaming";
        else if (serviceParam.includes("production")) type = "Video Production";
        else if (serviceParam.includes("coverage")) type = "Event Coverage";
        else if (serviceParam.includes("post")) type = "Post-Production";
        
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
    if (!form.phone.trim()) tempErrors.phone = "Phone / WhatsApp number is required";
    if (!form.projectType) tempErrors.projectType = "Please select a project type";
    if (!form.description.trim()) tempErrors.description = "Project description is required";
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // TESTING DESTINATION ONLY — swap with client's production endpoint/email before go-live
    const targetEmailRecipient = process.env.NEXT_PUBLIC_ENQUIRY_TEST_EMAIL || "ersamirsingh@gmail.com";
    
    try {
      // Simulate post request to Web3Forms/Formspree.
      // If client provides Web3Forms API Key via NEXT_PUBLIC_WEB3FORMS_KEY, it will perform real submission.
      const apiKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

      if (apiKey) {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: apiKey,
            subject: `New WeStream Enquiry from ${form.fullName}`,
            to_email: targetEmailRecipient,
            ...form,
          }),
        });
        
        if (!response.ok) throw new Error("Submission failed");
      } else {
        // Fallback simulated load (1.5s delay) for offline/testing development
        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("Simulating form submission to:", targetEmailRecipient, form);
      }

      setSubmitted(true);
      setForm(initialFormState);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again or message us directly via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#0B0B0B] text-white pt-32 pb-24 min-h-screen">
      {/* 1. Page Header */}
      <Container className="mb-20">
        <div className="max-w-4xl space-y-6">
          <span className="text-label block">Get In Touch</span>
          <h1 className="text-display font-heading font-extrabold text-white leading-none">
            Let's Bring Your<br />
            <span className="gold-gradient-text">Story to Life.</span>
          </h1>
          <p className="text-body-lg max-w-2xl pt-4">
            Tell us about your broadcasting requirements or video goals, and our Bangalore directors will map out your production plan.
          </p>
          <div className="h-[1px] w-40 bg-gold/50" />
        </div>
      </Container>

      {/* 2. Two-Column Layout Grid */}
      <Container className="mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20">
          
          {/* Left Column: Form */}
          <div className="lg:col-span-7">
            <div className="relative bg-black border border-border/40 p-8 md:p-10 rounded-sm">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="enquiry-form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="font-heading text-sm font-extrabold text-gold tracking-widest uppercase mb-8">
                      Project Briefing Form
                    </h3>

                    {/* Row 1: Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          value={form.fullName}
                          onChange={handleInputChange}
                          className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm"
                          placeholder="e.g. Yusuf Khan"
                        />
                        {errors.fullName && <p className="text-[10px] text-red-500 font-sans">{errors.fullName}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                          Company / Brand
                        </label>
                        <input
                          type="text"
                          name="company"
                          value={form.company}
                          onChange={handleInputChange}
                          className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm"
                          placeholder="e.g. Work India"
                        />
                      </div>
                    </div>

                    {/* Row 2: Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleInputChange}
                          className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm"
                          placeholder="e.g. contact@domain.com"
                        />
                        {errors.email && <p className="text-[10px] text-red-500 font-sans">{errors.email}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                          Phone / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={form.phone}
                          onChange={handleInputChange}
                          className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm"
                          placeholder="e.g. +91 99999 99999"
                        />
                        {errors.phone && <p className="text-[10px] text-red-500 font-sans">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Row 3: Dropdown Project Type & Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                          Project Type *
                        </label>
                        <select
                          name="projectType"
                          value={form.projectType}
                          onChange={handleInputChange}
                          className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm cursor-pointer"
                        >
                          <option value="">Select Category...</option>
                          <option value="Corporate Film">Corporate Film</option>
                          <option value="Live Streaming">Live Streaming</option>
                          <option value="Event Coverage">Event Coverage</option>
                          <option value="Post-Production">Post-Production</option>
                          <option value="Other">Other Capability</option>
                        </select>
                        {errors.projectType && <p className="text-[10px] text-red-500 font-sans">{errors.projectType}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                          Timeline / Deadline
                        </label>
                        <input
                          type="text"
                          name="timeline"
                          value={form.timeline}
                          onChange={handleInputChange}
                          className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm"
                          placeholder="e.g. Immediate / Next Month"
                        />
                      </div>
                    </div>

                    {/* Row 4: Private Budget field (collected privately, never displayed) */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                        Approximate Budget (Private / Optional)
                      </label>
                      <input
                        type="text"
                        name="budget"
                        value={form.budget}
                        onChange={handleInputChange}
                        className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm"
                        placeholder="e.g. INR 2 Lakhs - 5 Lakhs"
                      />
                    </div>

                    {/* Row 5: Reference links & Google Drive Assets link */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                          Reference Links (Vimeo, YouTube, etc.)
                        </label>
                        <input
                          type="text"
                          name="references"
                          value={form.references}
                          onChange={handleInputChange}
                          className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm"
                          placeholder="e.g. https://youtube.com/..."
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                          Google Drive Link for Assets / Specs
                        </label>
                        <input
                          type="text"
                          name="driveLink"
                          value={form.driveLink}
                          onChange={handleInputChange}
                          className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm"
                          placeholder="e.g. https://drive.google.com/..."
                        />
                      </div>
                    </div>

                    {/* Row 6: Description */}
                    <div className="space-y-2">
                      <label className="text-[10px] font-heading font-bold uppercase tracking-widest text-muted-foreground block">
                        Project Description *
                      </label>
                      <textarea
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        rows={5}
                        className="w-full bg-[#111111] border border-border/60 hover:border-gold/30 focus:border-gold focus:outline-none px-4 py-3 text-xs md:text-sm font-sans text-white transition-all rounded-sm resize-none"
                        placeholder="Detail your event venue, multi-cam requirements, or video story objectives..."
                      />
                      {errors.description && <p className="text-[10px] text-red-500 font-sans">{errors.description}</p>}
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-gold hover:bg-[#F5E6C4] disabled:bg-gold/50 disabled:cursor-not-allowed text-black font-heading font-extrabold text-xs tracking-widest uppercase transition-all duration-300 rounded-sm flex items-center justify-center gap-2 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          Processing Estimate
                        </>
                      ) : (
                        "Submit Briefing"
                      )}
                    </button>
                  </motion.form>
                ) : (
                  // Cinematic success confirmation pay-off
                  <motion.div
                    key="success-payoff"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                  >
                    <div className="h-16 w-16 rounded-full border border-gold flex items-center justify-center bg-gold/5 text-gold animate-rec-pulse">
                      <Check className="h-8 w-8" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-heading text-lg font-extrabold text-white uppercase tracking-wider">
                        Briefing Received
                      </h3>
                      <p className="text-xs md:text-sm text-muted-foreground font-sans max-w-sm">
                        Thank you for sharing your project scope. Our directors are reviewing the technical specs and will return an estimate within 24 hours.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-2.5 bg-transparent border border-border hover:border-gold hover:text-gold text-xs font-heading font-extrabold tracking-widest uppercase rounded-sm transition-colors cursor-pointer"
                    >
                      Submit Another Brief
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right Column: Direct Contact & Social details */}
          <div className="lg:col-span-5 space-y-10">
            {/* Direct contact info box */}
            <div className="bg-black/60 border border-border/40 p-8 rounded-sm space-y-8">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-gold animate-rec-pulse" />
                <h3 className="font-heading text-xs md:text-sm font-extrabold text-white uppercase tracking-widest">
                  Direct Inquiries
                </h3>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-heading font-bold text-muted-foreground uppercase tracking-widest">
                  Fastest Response:
                </p>
                <Magnetic range={35} strength={0.3}>
                  <a
                    href="https://wa.me/910000000000" // Placeholder wa link
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-3 px-6 py-3.5 bg-[#25D366] hover:bg-[#1ebd59] text-white font-heading font-extrabold text-xs tracking-wider uppercase rounded-sm transition-all duration-300 w-full"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    WhatsApp Quick Chat
                  </a>
                </Magnetic>
              </div>

              {/* Direct phone */}
              <div className="space-y-2 border-t border-border/20 pt-6">
                <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-widest">
                  Direct Line
                </p>
                <p className="text-sm font-heading font-extrabold text-white tracking-widest">
                  [TODO — Phone Number]
                </p>
              </div>

              {/* Office/Coverage location */}
              <div className="space-y-2 border-t border-border/20 pt-6">
                <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-widest">
                  Operational Hub
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed font-sans">
                  Based in Bangalore, Karnataka. Deploying crews and technical setups across all Indian states.
                </p>
              </div>

              {/* Social links */}
              <div className="space-y-3 border-t border-border/20 pt-6">
                <p className="text-[10px] font-heading font-bold text-muted-foreground uppercase tracking-widest">
                  Instagram
                </p>
                <a
                  href="https://www.instagram.com/westream_production"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-heading font-extrabold tracking-widest text-gold hover:text-white uppercase transition-colors"
                >
                  @westream_production
                </a>
              </div>

              {/* Accept note */}
              <div className="border-t border-[#D4AF37]/20 pt-6 flex items-center gap-2 text-[10px] font-heading font-bold text-gold uppercase tracking-widest">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Response threshold: &lt; 24 Hours
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* 3. Below the fold: FAQ Accordion */}
      <Container>
        <div className="border-t border-border/30 pt-24 max-w-4xl mx-auto space-y-16">
          <div className="text-center space-y-4">
            <span className="text-label block">Technical FAQ</span>
            <h2 className="text-heading-md font-heading font-extrabold text-white">
              Common Broadcast Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS_DATA.map((faq, idx) => (
              <FAQCard key={idx} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
