import { PLACEHOLDER_ASSETS } from "./placeholder-assets";

export interface Service {
  slug: string;
  title: string;
  shortDesc: string;
  description: string;
  videoUrl: string;
  imageUrl: string;
  subServices: string[];
  features: string[];
}

export interface Project {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  thumbnail: string;
  videoUrl: string;
  description: string;
  challenge: string;
  solution: string;
  deliverables: string[];
  results?: {
    label: string;
    value: string;
  }[];
  testimonial?: {
    text: string;
    author: string;
    role: string;
  };
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  tags: string[];
  avatar: string;
  socials?: {
    linkedin?: string;
    instagram?: string;
  };
}

export interface Stat {
  value: string;
  label: string;
  description: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export const SERVICES_DATA: Service[] = [
  {
    slug: "video-production",
    title: "Video Production",
    shortDesc: "Cinematic video production tailored for global brands, corporate keynotes, and commercial releases.",
    description: "We integrate 6K cinematography, custom motion graphics, and precise color grading to transform corporate messaging into elevated visual films.",
    videoUrl: PLACEHOLDER_ASSETS.videos.videoProduction,
    imageUrl: PLACEHOLDER_ASSETS.images.services.videoProduction,
    subServices: [
      "Corporate Films",
      "Brand Videos",
      "Promotional Films",
      "Keynote Content",
      "Executive Interviews",
      "Documentary Production",
      "Commercial Assets",
      "Product Releases"
    ],
    features: [
      "Creative Direction & Scripting",
      "Cinema-Grade 4K/6K Systems",
      "Bespoke Sound & Lighting Rigs",
      "Dedicated On-Set Supervision"
    ]
  },
  {
    slug: "live-streaming",
    title: "Live Streaming",
    shortDesc: "Rock-solid multi-camera live broadcasting engineered for high-stakes international audiences.",
    description: "Powered by redundant cellular bonding and satellite uplinks to guarantee zero downtime and zero-latency stream stability.",
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    imageUrl: PLACEHOLDER_ASSETS.images.services.liveStreaming,
    subServices: [
      "Corporate Summits & AGMs",
      "Political Assemblies",
      "Cultural Broadcasts",
      "Sports Tournaments",
      "Global Conferences",
      "Product Launches",
      "Encrypted Webinars"
    ],
    features: [
      "Multi-cam switching & graphics",
      "Redundant cellular bonding",
      "Encrypted RTMP & CDN distribution",
      "Remote vMix / SRT integration"
    ]
  },
  {
    slug: "event-coverage",
    title: "Event Coverage",
    shortDesc: "Comprehensive live stage coverage and instant turnarounds for summits, political rallies, and concerts.",
    description: "Deploying roaming camera crews, drone operators, and live LED wall engineering for immersive event experiences.",
    videoUrl: PLACEHOLDER_ASSETS.videos.eventCoverage,
    imageUrl: PLACEHOLDER_ASSETS.images.services.eventCoverage,
    subServices: [
      "Multi-Camera Coverage",
      "Aerial Cinema & Drones",
      "LED Screen Feed Control",
      "Instant Social Reels",
      "Live Stage Switching",
      "Event Photography"
    ],
    features: [
      "Zero-latency live SDI feed routing",
      "High-dynamic-range aerial capture",
      "Same-day highlight editing workflow",
      "Broadcast-experienced operators"
    ]
  },
  {
    slug: "post-production",
    title: "Post Production",
    shortDesc: "Precision video editing, bespoke soundscapes, and broadcast motion design.",
    description: "Transforming raw multi-camera assets into polished commercial films with broadcast-grade finishing.",
    videoUrl: PLACEHOLDER_ASSETS.videos.postProduction,
    imageUrl: PLACEHOLDER_ASSETS.images.services.postProduction,
    subServices: [
      "Offline & Online Editing",
      "Motion Graphics & Titles",
      "Cinematic Color Grading",
      "Sound Design & Foley",
      "Multi-Language Subtitles",
      "Social Reel Formatting"
    ],
    features: [
      "Industry-standard master output",
      "Custom 2D/3D title sequences",
      "Display-calibrated color grading",
      "Spatial audio cleanup & mixing"
    ]
  }
];

export const CAPABILITIES_TAGS: string[] = [
  "Live Streaming", "Bonded Network", "Satellite Uplink", "Multi-Cam Broadcast", 
  "Cinematography", "3D Motion Graphics", "Aerial Cinema", "LED Stage Feeds", 
  "Color Grading", "Sound Design", "Executive Keynotes", "Brand Films", 
  "Corporate Summits", "Live Switching", "Post Production"
];

export const PROJECTS_DATA: Project[] = [
  {
    slug: "work-india-live-broadcast",
    title: "National Virtual Job Fair",
    client: "Work India",
    category: "Live Streaming",
    year: "2025",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.workIndia,
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    description: "Multi-city live broadcast connecting keynotes across 4 continents with over 150,000 concurrent delegates.",
    challenge: "Deliver a zero-latency broadcast with multiple remote keynote speakers logging in from international locations.",
    solution: "Used vMix and SRT protocols to feed remote feeds into our control room, outputting a high-fidelity 1080p stream supported by bonded network infrastructure.",
    deliverables: ["Multi-camera live broadcast", "Remote speaker integration", "Live lower thirds & graphics", "Interactive Q&A support"],
    results: [
      { label: "Concurrent Viewers", value: "150,000+" },
      { label: "Broadcast Uptime", value: "100%" },
      { label: "Latency", value: "<1.2s" }
    ],
    testimonial: {
      text: "WeStream Production delivered a flawless live broadcast under extreme constraints. Their network redundancies kept the stream buffer-free.",
      author: "Pooja Mehta",
      role: "Events Director, Work India"
    }
  },
  {
    slug: "suggestable-brand-film",
    title: "The Next Era of Suggestable",
    client: "Suggestable",
    category: "Video Production",
    year: "2024",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.suggestable,
    videoUrl: PLACEHOLDER_ASSETS.videos.videoProduction,
    description: "Cinematic brand film and launch campaign for Suggestable's AI matchmaking platform.",
    challenge: "Create a highly engaging visual narrative highlighting abstract machine learning features.",
    solution: "Shot on full-frame cinema glass and blended with custom 3D particle motion graphics.",
    deliverables: ["Commercial Film", "3D Motion Graphics", "Social Media Cuts", "Color Grade Finishing"],
    results: [
      { label: "Total Views", value: "1.2 Million" },
      { label: "Click-through Rate", value: "14.5%" }
    ],
    testimonial: {
      text: "The creative vision and technical execution were outstanding. They captured our product's soul in 60 seconds.",
      author: "Rahul Krishnan",
      role: "Founder, Suggestable"
    }
  },
  {
    slug: "greenroom-summit-coverage",
    title: "Influencer Marketing Summit",
    client: "Greenroom",
    category: "Event Coverage",
    year: "2025",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.greenroom,
    videoUrl: PLACEHOLDER_ASSETS.videos.eventCoverage,
    description: "Full event coverage, multi-cam live switching, and same-day highlights for India's biggest influencer summit.",
    challenge: "Fast-turnaround post-production highlighting 40+ speakers across three stages.",
    solution: "Established an on-site post trailer running simultaneous edits to deliver social assets within hours of panels wrapping.",
    deliverables: ["Multi-Cam Recording", "Same-Day Highlight Film", "Stage LED Feed Control", "Social Highlight Clips"],
    results: [
      { label: "Speakers Captured", value: "40+" },
      { label: "Delivery Speed", value: "<4 hours" }
    ],
    testimonial: {
      text: "Outstanding coordination. Their on-site editing trailer delivered premium summaries before our attendees left the venue.",
      author: "Nisha Rao",
      role: "Ops Lead, Greenroom"
    }
  },
  {
    slug: "poonawalla-awards-broadcast",
    title: "Annual Excellence Awards",
    client: "Poonawalla Group",
    category: "Live Streaming",
    year: "2024",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.poonawalla,
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    description: "High-security corporate awards ceremony broadcast live with multi-carrier network bonding.",
    challenge: "Ensure zero stream interruptions inside a heavily shielded concrete convention hall.",
    solution: "Deployed custom cellular bonding arrays combining four distinct 5G networks alongside physical fiber lines.",
    deliverables: ["Bonded Cellular Streaming", "Multi-Angle Coverage", "Pre-Produced Nominee Clips", "Stage Display Control"],
    results: [
      { label: "Uptime Rate", value: "100%" },
      { label: "Peak Bitrate", value: "8.5 Mbps" }
    ],
    testimonial: {
      text: "Flawless execution of our annual awards. The network backup worked seamlessly when local lines went down.",
      author: "Siddharth Poonawalla",
      role: "Director, Poonawalla Group"
    }
  },
  {
    slug: "tcz-studio-promo",
    title: "Studio Launch Promo",
    client: "TCZ Studio",
    category: "Post Production",
    year: "2025",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.techConference,
    videoUrl: PLACEHOLDER_ASSETS.videos.postProduction,
    description: "Visual editing, display-calibrated color grading, and heavy sound design for TCZ's soundstage launch.",
    challenge: "Highlight the acoustic spatial precision and visual scale of the soundstage in a teaser.",
    solution: "Utilized DaVinci Resolve color grading to create deep contrast and custom Foley sound mixing.",
    deliverables: ["Offline/Online Edit", "Color Grading", "Spatial Sound Mix", "Sound Effects & Foley"],
    results: [
      { label: "Color Space", value: "DCI-P3 Rec.709" },
      { label: "Audio Channels", value: "5.1 Surround" }
    ],
    testimonial: {
      text: "The audio soundscape they designed makes the teaser feel extremely cinematic. Outstanding work.",
      author: "Karan Johar",
      role: "Producer, TCZ Studio"
    }
  },
  {
    slug: "political-rally-live-stream",
    title: "State Election Campaign Rally",
    client: "Public Affairs",
    category: "Live Streaming",
    year: "2024",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.politicalConvention,
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    description: "Outdoor rally broadcast with satellite uplink backing and drone aerial footage.",
    challenge: "High-congestion area with massive crowd of 80,000+ interfering with cellular signals.",
    solution: "Deployed a dedicated satellite uplink truck to route the master feed directly.",
    deliverables: ["Satellite Uplink Broadcast", "Drone Cinema Feeds", "Multi-Cam Field Switch", "Instant Social Clips"],
    results: [
      { label: "Total Viewers", value: "3.2 Million" },
      { label: "Peak Viewers", value: "450,000+" }
    ],
    testimonial: {
      text: "Reliable, uncompromised streaming under massive crowd densities. Deployed a solid backup system.",
      author: "Aditi Rao",
      role: "Media Advisor"
    }
  },
  {
    slug: "national-music-festival",
    title: "Live Concert Broadcast",
    client: "Cultural Arts",
    category: "Event Coverage",
    year: "2024",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.musicFestival,
    videoUrl: PLACEHOLDER_ASSETS.videos.eventCoverage,
    description: "Multi-camera streaming and aftermovie for a massive three-day live concert festival.",
    challenge: "Sync multi-cam video perfectly with live soundboard feeds under dynamic stage lighting.",
    solution: "Used digital audio embedders at source to lock audio/video sync, utilizing high-dynamic-range cinema cameras.",
    deliverables: ["6-Camera shoot", "Live switching & LED wall feeds", "Soundboard audio integration", "4K Event Aftermovie"],
    results: [
      { label: "Attendees", value: "30,000+" },
      { label: "LED Screens Served", value: "4" }
    ],
    testimonial: {
      text: "WeStream captured the raw energy of our mainstage with breathtaking clarity. The LED wall feeds had zero latency.",
      author: "Vikram Sen",
      role: "Festival Director, Cultural Arts"
    }
  },
  {
    slug: "corporate-agm-broadcast",
    title: "Tech Mahindra Global AGM",
    client: "Tech Mahindra",
    category: "Live Streaming",
    year: "2026",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.workIndia,
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    description: "Secure, encrypted live broadcast of Tech Mahindra's Annual General Meeting for global shareholders.",
    challenge: "Incorporate strict security access controls and sub-1s low latency for real-time voting.",
    solution: "Deployed private WebRTC feeds and multi-regional CDN distribution.",
    deliverables: ["WebRTC Encrypted Feed", "Shareholder Dashboard", "Instant Q&A System", "Multi-Language Feeds"],
    results: [
      { label: "Shareholders Connected", value: "45,000+" },
      { label: "Voting Latency", value: "<800ms" }
    ],
    testimonial: {
      text: "The security protocols and real-time voting speed exceeded our compliance expectations.",
      author: "Anil Kumar",
      role: "Company Secretary, Tech Mahindra"
    }
  },
  {
    slug: "auto-expo-aftermovie",
    title: "Tata Motors Brand Film Expo",
    client: "Tata Motors",
    category: "Video Production",
    year: "2025",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.suggestable,
    videoUrl: PLACEHOLDER_ASSETS.videos.videoProduction,
    description: "High-octane commercial film showcasing Tata Motors' electric concept vehicles at the Auto Expo.",
    challenge: "Highlight futuristic vehicle design detailing under chaotic public expo lights.",
    solution: "Shot during pre-expo hours using heavy lighting rings and stabilization gimbal tracks.",
    deliverables: ["Concept Car Showcase", "Gimbal Stabilization Rigs", "Pre-Expo Solo Footage", "4K Marketing Film"],
    results: [
      { label: "Marketing Campaign Reach", value: "5 Million+" },
      { label: "Video Completion Rate", value: "78%" }
    ],
    testimonial: {
      text: "Breathtaking visual energy. They highlighted our EV concepts exactly the way our designers envisioned them.",
      author: "Meera Nair",
      role: "Marketing Head, Tata Motors"
    }
  }
];

export const STATS_DATA: Stat[] = [
  {
    value: "250+",
    label: "Live Broadcasts",
    description: "Engineered with 100% network uptime."
  },
  {
    value: "4K",
    label: "Cinema Standard",
    description: "6K capture & display-calibrated color."
  },
  {
    value: "1.2s",
    label: "Zero-Latency Stream",
    description: "Redundant satellite & cellular bonding."
  },
  {
    value: "100%",
    label: "Deadline Delivery",
    description: "Meticulous technical execution."
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    name: "Aarav Sharma",
    role: "Technical Broadcast Lead",
    bio: "Specializes in bonded cellular network infrastructure and multi-camera live switching for political and corporate summits.",
    tags: ["Live Streaming", "vMix / SRT", "Satellite Uplink"],
    avatar: PLACEHOLDER_ASSETS.images.team.member1
  },
  {
    id: "member-2",
    name: "Rohan Patel",
    role: "Director of Photography",
    bio: "Over 10 years experience directing 6K brand films, commercial keynotes, and aerial cinema.",
    tags: ["6K Cinematography", "Lighting Rigs", "Drone Pilot"],
    avatar: PLACEHOLDER_ASSETS.images.team.member2
  },
  {
    id: "member-3",
    name: "Priya Nair",
    role: "Post-Production Supervisor",
    bio: "Oversees color grading, 3D motion graphics, and spatial sound design for international enterprise releases.",
    tags: ["Motion Design", "Color Grading", "Editing"],
    avatar: PLACEHOLDER_ASSETS.images.team.member3
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    question: "What is your typical turnaround time for live event coverage?",
    answer: "For live streaming, zero-latency feeds are outputted instantly during the broadcast. Highlight reels and same-day social edits are typically delivered within 3 to 6 hours after event conclusion."
  },
  {
    question: "Do you handle redundant internet for live broadcasts?",
    answer: "Yes. We deploy heavy-duty bonded cellular routers combining multiple telecom providers, alongside dedicated satellite uplinks for high-density outdoor venues."
  },
  {
    question: "Can you provide multi-camera setups for large summits?",
    answer: "We field multi-camera SDI setups ranging from 3 to 8 broadcast cameras, including wireless roaming units, PTZ systems, and aerial drone cinematography."
  },
  {
    question: "Are your crews available to travel across India?",
    answer: "Headquartered in Bangalore, our production teams routinely execute live streams, summits, and commercial shoots across Mumbai, Delhi, Hyderabad, Chennai, and tier-2 hubs nationwide."
  }
];
