# WeStream Production: Design System (2026)

This document is the definitive source of truth for the WeStream Production frontend architecture. Every new section must adhere to these principles.

## 1. Confirmed Brand Identity
- **Theme:** Premium, Cinematic, Minimalist.
- **Background:** `#0B0B0B` (Black must dominate the visual language).
- **Accent:** `#D4AF37` (Gold must remain an accent, reserved only for premium interactions).
- **Primary Text:** `#FFFFFF`.
- **Secondary Surfaces:** Dark Gray (`#1A1A1A`).

## 2. Typography Hierarchy
Typography is treated as a design element itself. We rely on contrast in scale and weight.
- **Heading:** `Montserrat Bold` (Architectural, confident, structural). Do not replace this with other display fonts.
- **Body:** `Poppins` (Highly legible, modern).
- **Display (`text-display`):** Used strictly for major section titles and the Hero tagline. Oversized, aggressive scale. Asymmetrical alignment preferred.
- **Heading (`font-heading`):** Used for standard section headers.
- **Body (`font-sans`):** Kept highly readable (e.g., Poppins) with ample line height.
- **Accent:** Cursive/Accent fonts must NEVER be overused. If introduced, they highlight single words, not paragraphs.
- **Casing:** Use uppercase with extremely wide tracking (`tracking-widest` / `tracking-[0.2em]`) for metadata, sub-labels, and small interactive cues.

## 3. Grid & Composition
- **Asymmetry:** Standard symmetrical grids (e.g., center-aligned blocks) feel generic. Use extreme asymmetry (e.g., massive text on the left, tiny meta-text pinned to the bottom right).
- **Whitespace:** Treat empty space as a structural element. Do not feel compelled to fill every gap.
- **Bleeds:** Allow large typography and media to bleed off the edge of the screen for an immersive feel.

## 4. Media Rules (Video & Spline)
- **MediaStage Abstraction:** All major background media must run through the `MediaStage` architecture to ensure standardized loading, z-indexing, and optimization.
- **Video:** The primary storytelling tool. Must be high-quality, muted, auto-playing, and heavily optimized.
- **Spline:** The primary atmospheric tool. 
  - Spline scenes must never cover the primary text.
  - They must remain lightweight and lazy-loaded.
  - They should respond subtly to mouse movement (parallax) but not demand excessive attention.

## 5. Motion Principles
- **No Bouncy Springs:** Easing should be cinematic, linear, or smooth ease-out. Never bouncy (`type: "spring"` with low damping is banned).
- **Scroll-Linked Narrative:** Elements should fade up and lock into place smoothly as the user scrolls.

## 6. Interaction & Cursors
- **Contextual Cursors:** Use the `data-cursor-text="[ACTION]"` attribute for major interactive areas (like the Hero video). The global cursor transforms to communicate intent (e.g., "PLAY", "DRAG") rather than relying on standard UI buttons.

## 7. Overlays & Texture
- **Noise:** Digital video can feel sterile. Apply `NoiseLayer` (2-3% opacity grain) over media to introduce a premium "film" texture.
- **Gradients:** Use harsh-to-soft dark gradients over media to guarantee typographic legibility. Avoid flat color overlays.

## 8. Surface & Borders
- **Minimal Borders:** Borders should be practically invisible (e.g., `border-white/5` or `border-gold/20`).
- **Radii:** Keep border radii sharp or slightly rounded (`rounded-sm`). Avoid large, bubbly radii which feel like consumer apps rather than premium studios.
