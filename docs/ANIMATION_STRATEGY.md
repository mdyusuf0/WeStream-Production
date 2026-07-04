# Animation Strategy

**Current Status:** Deferred. No animation libraries (GSAP, Lenis, Motion, Three.js) are installed in the foundation phase.

## Future Evaluation

- **Motion:** For React-centric layout animations and simpler declarative transitions.
- **GSAP:** For complex, sequential, or scroll-based cinematic animations.
- **Lenis:** For smooth scrolling, if performance budget allows.
- **Three.js / R3F:** For 3D elements (e.g., camera lens, aperture concepts), only if they earn their place and don't block core content.

## Strict Rules

- Every animation must respect `prefers-reduced-motion`.
- Mobile fallbacks are required.
- Do not animate every element; use motion purposefully.
