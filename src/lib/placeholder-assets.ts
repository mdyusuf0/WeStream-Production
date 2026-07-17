/**
 * Centralized list of royalty-free placeholder video and image assets.
 * Sourced from high-quality platforms (Unsplash, Pexels, Cloudinary) for cinematic look.
 * Swap these out for real client assets here.
 */

// Helper to generate dynamic abstract cinematic SVG placeholders
function createCinematicGradient(title: string, subtitle: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
    <defs>
      <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#0B0B0B"/>
        <stop offset="50%" stop-color="#141414"/>
        <stop offset="100%" stop-color="#181712"/>
      </linearGradient>
      <radialGradient id="bloom" cx="75%" cy="30%" r="65%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.22"/>
        <stop offset="100%" stop-color="#0B0B0B" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="flare" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stop-color="#D4AF37" stop-opacity="0"/>
        <stop offset="50%" stop-color="#D4AF37" stop-opacity="0.3"/>
        <stop offset="100%" stop-color="#D4AF37" stop-opacity="0"/>
      </linearGradient>
    </defs>
    <rect width="1200" height="800" fill="url(#bg)"/>
    <rect width="1200" height="800" fill="url(#bloom)"/>
    
    {/* Horizontal Anamorphic Lens Flare Line */}
    <line x1="0" y1="400" x2="1200" y2="400" stroke="url(#flare)" stroke-width="1.5"/>
    
    <circle cx="900" cy="300" r="220" stroke="#D4AF37" stroke-width="1" stroke-opacity="0.12" fill="none"/>
    <circle cx="900" cy="300" r="140" stroke="#D4AF37" stroke-width="0.5" stroke-opacity="0.08" fill="none"/>
    
    <text x="100" y="650" font-family="'Montserrat', sans-serif" font-size="20" font-weight="700" fill="#D4AF37" letter-spacing="6" text-transform="uppercase">${subtitle}</text>
    <text x="100" y="590" font-family="'Montserrat', sans-serif" font-size="38" font-weight="800" fill="#FFFFFF" letter-spacing="3" text-transform="uppercase">${title}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const PLACEHOLDER_ASSETS = {
  // Looping background video reels (Direct MP4 links)
  videos: {
    hero: "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4",
    videoProduction: "https://res.cloudinary.com/demo/video/upload/race_road_car.mp4",
    liveStreaming: "https://vjs.zencdn.net/v/oceans.mp4",
    eventCoverage: "https://www.w3schools.com/html/movie.mp4",
    postProduction: "https://www.w3schools.com/html/mov_bbb.mp4",
  },

  // Imagery (Abstract cinematic gradients & optimized Unsplash URLs)
  images: {
    heroFallback: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80",
    
    services: {
      videoProduction: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
      liveStreaming: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
      eventCoverage: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
      postProduction: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    },

    projects: {
      globalSummit: createCinematicGradient("Global Leadership Summit 2025", "Live Streaming"),
      politicalConvention: createCinematicGradient("National Political Convention", "Event Coverage"),
      techConference: createCinematicGradient("International Tech Conference", "Video Production"),
      musicFestival: createCinematicGradient("Live Music Festival", "Event Coverage"),
      
      workIndia: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=1200&q=80",
      suggestable: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
      greenroom: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
      poonawalla: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    },

    team: {
      member1: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      member2: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
      member3: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    }
  }
};
