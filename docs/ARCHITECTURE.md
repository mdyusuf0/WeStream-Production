# Architecture

**Framework:** Next.js (App Router)
**Language:** TypeScript (Strict Mode)
**Styling:** Tailwind CSS (Current stable version, neutral tokens only pending design)
**Package Manager:** npm

## Future Testing Strategy

- **Unit Testing:** To be evaluated (e.g., Jest or Vitest) for complex utility functions.
- **Component Testing:** To be evaluated (e.g., React Testing Library) for interactive UI elements.
- **E2E Testing:** To be evaluated (e.g., Playwright or Cypress) for critical user journeys (e.g., contact form submission).

## Principles

- Separate UI primitives, page sections, business features, animation systems, and 3D systems.
- Avoid duplicated code. Shared systems should live outside individual page implementations where appropriate.
- **Next.js Architecture Principle:** Use shared layouts appropriately. Do not create routes prematurely if content is not confirmed. Document the target architecture first and create routes only when justified.
- Keep components focused.
- Prefer semantic HTML.
- Never expose secrets.

## Conceptual Mapping (Future Feature-Oriented Growth Model)

Do not force old-style Express architecture into Next.js. Document how responsibilities map conceptually:

- **Old-style frontend pages -> Next.js app routes:** E.g., `src/app/work/page.tsx`
- **Old-style layouts -> shared layouts and layout components:** E.g., `src/app/layout.tsx` or `src/components/layout/`
- **Old-style API routes -> Next.js Route Handlers:** Create these only where justified for specific backend endpoints.
- **Old-style services -> feature-local service modules:** Where business logic exists, co-locate them in `src/features/`.
- **Old-style controllers -> usually unnecessary:** Simple website flows and Route Handlers should remain thin.
- **Old-style models -> CMS/domain models:** Use only when a real content source exists (e.g., `src/data/models/`).
- **Old-style config -> src/config:** Only when actual configuration exists.
- **Old-style utilities -> src/lib:** Or feature-local utilities.

_Important: Do not physically create empty future folders (like `src/features` or `src/three`) until justified by actual content or logic._
