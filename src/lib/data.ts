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
    slug: "global-leadership-summit-2025",
    title: "Global Leadership Summit 2025",
    client: "Global Series",
    category: "Live Streaming",
    year: "2025",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.globalSummit,
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
      role: "Events Director, Global Series"
    }
  },
  {
    slug: "national-political-convention",
    title: "National Political Convention",
    client: "Public Affairs",
    category: "Event Coverage",
    year: "2024",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.politicalConvention,
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    description: "High-security outdoor convention broadcast featuring satellite uplink redundancies and zero-latency LED stage feeds.",
    challenge: "Operating in an outdoor area with congested cellular networks due to a crowd of 50,000+ attendees.",
    solution: "Deployed a heavy-duty satellite uplink vehicle alongside multi-provider cellular bonding routers. Ran physical fiber links to the cameras.",
    deliverables: ["Outdoor broadcast production", "Redundant uplink (Satellite + Bonded)", "Drone aerial feeds", "Instant social cuts"],
    results: [
      { label: "Total Viewers", value: "2.8 Million" },
      { label: "Peak Concurrent", value: "380K+" },
      { label: "Uptime", value: "100%" }
    ],
    testimonial: {
      text: "The technical precision of WeStream's satellite uplink crew ensured zero disruption throughout the 8-hour live broadcast.",
      author: "Rohan Varma",
      role: "Communications Lead, Public Affairs"
    }
  },
  {
    slug: "international-tech-conference",
    title: "International Tech Conference",
    client: "Enterprise Tech",
    category: "Video Production",
    year: "2025",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.techConference,
    videoUrl: PLACEHOLDER_ASSETS.videos.videoProduction,
    description: "Cinematic keynote production, 3D motion graphics, and same-day social media highlight deliveries.",
    challenge: "Synthesize complex enterprise software launches into an engaging 60-second visual film for global distribution.",
    solution: "Blended 6K cinema camera footage with custom 3D motion graphics and a custom acoustic soundscape.",
    deliverables: ["Keynote Film", "3D Motion Graphics", "Social Highlights", "Color Grade"],
    results: [
      { label: "Views in 1st Week", value: "400K+" },
      { label: "Engagement", value: "22%" }
    ],
    testimonial: {
      text: "They helped elevate our brand keynote to an international standard. The visual rhythm and editorial grade were outstanding.",
      author: "Aditya Roy",
      role: "VP Brand, Enterprise Tech"
    }
  },
  {
    slug: "live-music-festival",
    title: "Live Music Festival",
    client: "Cultural Arts",
    category: "Event Coverage",
    year: "2024",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.musicFestival,
    videoUrl: PLACEHOLDER_ASSETS.videos.eventCoverage,
    description: "End-to-end 6-camera live stream and high-dynamic-range aftermovie for a 30,000-attendee music festival.",
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
