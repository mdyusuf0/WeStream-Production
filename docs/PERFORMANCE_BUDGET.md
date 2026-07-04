# Performance Budget

**Target:** Excellent Core Web Vitals (LCP, INP, CLS)

## Media Strategy

- Use Next.js `next/image` for responsive, optimized images.
- Provide poster images for all videos.
- Compress web video drastically.
- Implement below-the-fold media deferral (lazy loading).
- No autoplaying video with sound.
- Avoid large unoptimized files in `public/`.
- Evaluate a CDN/DAM (e.g., Cloudinary, Mux) for video hosting before final deployment.

## Code Strategy

- No avoidable layout shifts (CLS).
- Maximize Server Components; use Client Components only when interactivity requires them.
- Defer loading of non-critical third-party scripts.
