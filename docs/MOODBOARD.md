# WeStream Production: Moodboard (2026)

This document serves as the visual anchor for all future frontend decisions.

## 1. Core Brand Identity
- **Vibe:** Cinematic, Editorial, Luxurious, Minimalist, Technical.
- **Goal:** Look like an award-winning production studio, not a tech startup.

## 2. Color Palette
- **Background:** `#0B0B0B` (Deep, rich black. Not grey.)
- **Accent:** `#D4AF37` (Muted, premium gold. Used sparingly for hover states, active indicators, and high-priority CTAs only.)
- **Primary Text:** `#FFFFFF` (Pure white for high contrast on black.)
- **Secondary Surfaces:** Dark Gray / `#1A1A1A` (Used for cards, inputs, and borders to create subtle depth without breaking the dark mode.)

## 3. Typography
- **Heading:** `Montserrat Bold` (Architectural, confident, structural).
- **Body:** `Poppins` (Highly legible, modern).
- **Rule:** Do not use random cursive or display fonts. Luxury is achieved through extreme scale contrast (massive headers vs. tiny, widely-spaced meta text).

## 4. Layout & Composition
- **Asymmetry:** Grid breaking. Large media on one side, tight typography grouped on the opposite.
- **Bleeds:** Images and videos should break out of containers and bleed to the edges.
- **Whitespace:** Treat negative space as a luxury element. 

## 5. Motion & Physics
- **Easing:** Cinematic, linear, or smooth ease-out `[0.16, 1, 0.3, 1]`.
- **Banned:** No spring animations with bounce/wobble.
- **Scroll:** Smooth scroll (Lenis) with a slightly heavier friction to simulate panning a heavy cinema camera.

## 6. Materials & Lighting
- **Glass:** Frosted, deeply blurred backgrounds (no cheap transparency).
- **Film Grain:** 2-3% noise overlay on all major media to prevent the "sterile digital" look.
- **Gradients:** Harsh-to-soft black gradients over images to ensure text readability without looking like a CSS overlay.

## 7. Photography & Media
- **Style:** High contrast, deep shadows, cinematic lighting.
- **Focus:** Behind-the-scenes camera work, raw production moments, high-end event highlights. No generic stock footage.
