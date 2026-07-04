# Accessibility

Accessibility is a requirement, not a feature.

## Requirements

- Semantic HTML.
- Keyboard navigation must work for all interactive elements.
- Focus states must be highly visible.
- Images require meaningful `alt` text (or empty `alt=""` if purely decorative).
- Videos require accessible controls or alternatives.
- Ensure sufficient color contrast.
- Respect `prefers-reduced-motion` in all animations.

## Shell Implementation

- Included a visually hidden `SkipLink` component that becomes visible on focus, allowing keyboard users to skip navigation.
