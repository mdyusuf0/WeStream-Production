# Decisions Log

| Date       | Decision                             | Reason                                                                        |
| ---------- | ------------------------------------ | ----------------------------------------------------------------------------- |
| 2026-07-04 | Initialized with Next.js App Router  | Preferred foundation for performance and SEO.                                 |
| 2026-07-04 | Used `npm`                           | `pnpm` was not available in the environment; enforced single package manager. |
| 2026-07-04 | Deferred `src/types` and `src/three` | Avoid aspirational folder creation; keep tree minimal.                        |
| 2026-07-04 | Deferred Animation Libraries         | Await final visual design and performance evaluation.                         |
| 2026-07-04 | Deferred `.env.example`              | No environment variables currently exist.                                     |

## Provisional Stack Decision Record

**CORE:** Next.js, React, TypeScript, Tailwind CSS. Next.js is chosen for full-site architecture, SEO, shared layouts, and maintainability (not strictly replacing React, as it uses React).
**UI:** Custom design system (No DaisyUI initially).
**BACKEND:** Next.js server capabilities only where needed (No separate Express server).
**DATABASE:** None initially.
**CACHE:** No Redis initially.
**CMS:** Deferred pending client requirements.
**MOTION:** Deferred evaluation (Motion or GSAP may be considered later).
**SMOOTH SCROLL:** Lenis only if justified after testing.
**3D:** Three.js / React Three Fiber / Drei only if approved and justified.

_(Deferred technologies will not be installed during the foundation phase.)_
