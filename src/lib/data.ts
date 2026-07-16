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
    shortDesc: "Professional video production tailored for businesses, brands, institutions, and organizations.",
    description: "From concept development to final delivery, we help brands, organizations, and creators produce engaging visual content that leaves a lasting impression. Our experienced crew employs high-end gear and meticulous creative direction to turn your vision into cinematic reality.",
    videoUrl: PLACEHOLDER_ASSETS.videos.videoProduction,
    imageUrl: PLACEHOLDER_ASSETS.images.services.videoProduction,
    subServices: [
      "Corporate Films",
      "Brand Videos",
      "Promotional Videos",
      "Event Highlights",
      "Interviews",
      "Documentary Production",
      "Social Media Content",
      "Product Videos"
    ],
    features: [
      "Scriptwriting & Creative Direction",
      "High-end 4K/6K Cinematography",
      "Professional Sound & Lighting Setups",
      "On-set Directors & Crew Management"
    ]
  },
  {
    slug: "live-streaming",
    title: "Live Streaming",
    shortDesc: "Reach your audience anywhere in the world with reliable multi-camera live streaming.",
    description: "Whether it's a political rally with millions of viewers or a high-security corporate conference, WeStream provides rock-solid multi-camera live broadcasting. We employ multiple redundant cellular bonded networks to ensure zero downtime and absolute broadcast stability.",
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    imageUrl: PLACEHOLDER_ASSETS.images.services.liveStreaming,
    subServices: [
      "Corporate Events & AGMs",
      "Political Rallies & Summits",
      "Cultural & Religious Programs",
      "Sports Tournaments",
      "Conferences & Seminars",
      "Product Launches",
      "Award Functions & Webinars"
    ],
    features: [
      "Multi-cam switching & graphics",
      "Redundant cellular bonding (bonded internet)",
      "Platforms: YouTube, Facebook, Zoom, Custom RTMP",
      "Remote call integration (vMix / SRT)"
    ]
  },
  {
    slug: "event-coverage",
    title: "Event Coverage",
    shortDesc: "Capture every important moment with cinematic quality and instant turnarounds.",
    description: "Capture the energy and emotion of your event. We cover large-scale corporate summits, concerts, political gatherings, and product launches, deploying drone units, roaming cameras, and instant editing workflows.",
    videoUrl: PLACEHOLDER_ASSETS.videos.eventCoverage,
    imageUrl: PLACEHOLDER_ASSETS.images.services.eventCoverage,
    subServices: [
      "Multi-Camera Production",
      "Event Photography",
      "Drone Coverage / Aerials",
      "Live Switching to LED Screens",
      "LED Screen Technical Support",
      "Instant Highlights / Same-Day Edits"
    ],
    features: [
      "Zero-latency live video transmission",
      "High-resolution aerial photography",
      "Same-day highlight reel editing",
      "Experienced event shutterbugs & videographers"
    ]
  },
  {
    slug: "post-production",
    title: "Post Production",
    shortDesc: "Transform raw footage into compelling visual stories and high-impact motion graphics.",
    description: "Our post-production house crafts your raw assets into a tight, visually striking final output. We specialize in high-end styling, sound design, logo animations, and specialized social media formatting.",
    videoUrl: PLACEHOLDER_ASSETS.videos.postProduction,
    imageUrl: PLACEHOLDER_ASSETS.images.services.postProduction,
    subServices: [
      "Creative Video Editing",
      "Motion Graphics & Titles",
      "Cinematic Color Grading",
      "Sound Design & Foley",
      "Subtitles & Localization",
      "Reels, Shorts, & TikTok Optimization"
    ],
    features: [
      "Industry-standard editing workflows",
      "Custom 2D/3D animations & transitions",
      "Color accuracy for multiple screens",
      "Bespoke soundscapes and audio cleanup"
    ]
  }
];

export const CAPABILITIES_TAGS: string[] = [
  "Motion Design", "Graphic Design", "Brand Films", "Commercial/Ad Films", 
  "Social Media Reels", "YouTube Editing", "Short-form & Long-form Content", 
  "Documentary Editing", "Real Estate Videos", "Podcast Editing", "Logo Animation", 
  "2D/3D Animation", "VFX/Visual Effects", "Photography", "Videography/Shoots", 
  "Scriptwriting", "Creative Direction", "Pre/Post-production", 
  "Social Media Creatives", "Brand Identity Design"
];

export const PROJECTS_DATA: Project[] = [
  {
    slug: "work-india-live-broadcast",
    title: "National Virtual Job Fair",
    client: "Work India",
    category: "Live Streaming",
    year: "2023",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.workIndia,
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    description: "Multi-city live-streamed panel discussions connecting employers with thousands of job seekers nationwide.",
    challenge: "Deliver a zero-latency broadcast with multiple remote panel members logging in from different parts of India, while streaming to over 100,000 live concurrent viewers.",
    solution: "Used vMix and SRT protocols to feed remote feeds into our Bangalore control room, outputting a high-fidelity 1080p stream supported by bonded network infrastructure.",
    deliverables: ["Multi-camera live broadcast", "Remote speaker integration", "Live lower thirds & graphics", "Interactive Q&A support"],
    results: [
      { label: "Concurrent Viewers", value: "120,000+" },
      { label: "Broadcast Uptime", value: "100%" },
      { label: "Latency", value: "<1.5s" }
    ],
    testimonial: {
      text: "WeStream Production delivered a highly professional live broadcast under extremely tight time constraints. Their network redundancies kept the stream buffer-free.",
      author: "Pooja Mehta",
      role: "Events Lead, Work India"
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
    description: "A cinematic brand film detailing the company's product redesign and brand evolution.",
    challenge: "Capture the sleek, modern aesthetic of a digital-first tech platform while translating abstract software concepts into relatable human stories.",
    solution: "Blended clean cinematic A-roll interviews with custom 3D device mockups, styled with a gold-and-black accent color palette that matches high-end hardware designs.",
    deliverables: ["Creative Direction", "Cinematography", "3D Motion Graphics", "Color Grading & Sound Mix"],
    results: [
      { label: "Views in 1st Week", value: "250K+" },
      { label: "Engagement Rate", value: "18%" }
    ],
    testimonial: {
      text: "They didn't just record a video; they helped redefine how our customers perceive our brand. The cinematic quality is absolute top-tier.",
      author: "Aditya Roy",
      role: "VP Marketing, Suggestable"
    }
  },
  {
    slug: "greenroom-summit-coverage",
    title: "Influencer Marketing Summit",
    client: "Greenroom",
    category: "Event Coverage",
    year: "2023",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.greenroom,
    videoUrl: PLACEHOLDER_ASSETS.videos.eventCoverage,
    description: "Full-scale multi-camera event coverage, live switching, and same-day highlights for India's premier influencer summit.",
    challenge: "Deliver social media highlight cuts within 3 hours of the panels wrapping, while managing live feeds to massive onstage LED walls.",
    solution: "Established an on-site post-production pipeline where editors worked directly off card-swaps while the event was ongoing. Live video feeds were routed directly to LED wall engineers with zero delay.",
    deliverables: ["Live Event Switching", "Same-Day Social Reels", "LED Screen Feed Control", "Professional Photography"],
    results: [
      { label: "Social Edits Delivered", value: "6 Reels" },
      { label: "Onstage Latency", value: "0ms" }
    ],
    testimonial: {
      text: "The speed with which WeStream produced high-quality social reels was incredible. Our online engagement tripled during the live event.",
      author: "Vikram Sen",
      role: "Co-Founder, Greenroom"
    }
  },
  {
    slug: "poonawalla-awards-broadcast",
    title: "Annual Excellence Awards",
    client: "Poonawalla",
    category: "Live Streaming",
    year: "2024",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.poonawalla,
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    description: "Broadcast coverage of the private corporate awards ceremony, ensuring absolute confidentiality and high security.",
    challenge: "Deliver a private high-definition stream exclusively accessible by corporate employees worldwide, with strict access controls and robust encryption.",
    solution: "Built a customized white-label RTMP player hosted on a secure portal with single sign-on (SSO) integration, backed by encrypted CDN distribution.",
    deliverables: ["Secure RTMP streaming", "Multi-camera audio/video crew", "Lower-thirds animations", "Full event archives"],
    results: [
      { label: "Employee Viewers", value: "15,000+" },
      { label: "Security Incidents", value: "0" }
    ]
  },
  {
    slug: "tcz-studio-promo",
    title: "Studio Launch Promo",
    client: "TCZ Studio",
    category: "Post Production",
    year: "2023",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.tczStudio,
    videoUrl: PLACEHOLDER_ASSETS.videos.postProduction,
    description: "A fast-paced, animation-heavy promotional clip showing off the studio's design and sound editing facilities.",
    challenge: "Synthesize complex architectural layouts and audio engineering capabilities into a visual format under 60 seconds.",
    solution: "Utilized kinetic typography, quick match cuts, and custom sound effects to build an energetic teaser suitable for Instagram and LinkedIn.",
    deliverables: ["Video Editing", "Kinetic Typography", "Sound Design", "Social Deliverables"],
    results: [
      { label: "CTR on Social Ads", value: "4.2%" },
      { label: "Leads Generated", value: "300+" }
    ]
  },
  {
    slug: "political-rally-live-stream",
    title: "State Election Campaign Rally",
    client: "National Political Summit",
    category: "Live Streaming",
    year: "2024",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.politicalStream,
    videoUrl: PLACEHOLDER_ASSETS.videos.liveStreaming,
    description: "High-stakes, large-scale live broadcast of a major political campaign rally in Karnataka, reaching millions.",
    challenge: "Operating in an outdoor area with congested cellular networks due to a crowd of 50,000+ attendees. Stream stability was critical.",
    solution: "Deployed a heavy-duty satellite uplink vehicle alongside multi-provider cellular bonding routers. Ran physical fiber links to the cameras to avoid wireless interference.",
    deliverables: ["Outdoor broadcast production", "Redundant uplink (Satellite + Bonded)", "Drone aerial feeds", "Instant social cuts"],
    results: [
      { label: "Total Views", value: "3.2 Million" },
      { label: "Concurrent Peak", value: "450K+" },
      { label: "Network Uptime", value: "100%" }
    ]
  },
  {
    slug: "national-music-festival",
    title: "Live Concert Broadcast",
    client: "Cultural Concert Live",
    category: "Event Coverage",
    year: "2024",
    thumbnail: PLACEHOLDER_ASSETS.images.projects.concertStream,
    videoUrl: PLACEHOLDER_ASSETS.videos.eventCoverage,
    description: "End-to-end multi-cam setup and LED wall feeds for a massive multi-genre music festival in Bangalore.",
    challenge: "Sync audio feeds perfectly from the festival's main soundboard with 6 separate roaming and stationary cameras under dynamic concert lighting conditions.",
    solution: "Used professional digital audio embedders at source to lock audio/video sync, utilizing high-dynamic-range (HDR) cameras to capture extreme contrast on stage.",
    deliverables: ["6-Camera shoot", "Live switching & LED wall feeds", "Soundboard audio integration", "4K Event Aftermovie"],
    results: [
      { label: "Festival Attendees", value: "20,000+" },
      { label: "LED Feeds", value: "3 Screens" }
    ]
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: "member-1",
    name: "Team Member 1",
    role: "Founder & Creative Director",
    bio: "Co-founded WeStream Production in 2019 to redefine event broadcasting and video production in Bangalore. Oversees creative direction and technical pipelines.",
    tags: ["Creative Direction", "Live Production", "Client Relations"],
    avatar: PLACEHOLDER_ASSETS.images.team.member1,
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://www.instagram.com/westream_production"
    }
  },
  {
    id: "member-2",
    name: "Team Member 2",
    role: "Lead Broadcast Engineer",
    bio: "Specializes in multi-camera setups, cellular bonding, and signal routing. Ensures WeStream broadcasts remain online no matter how weak local reception is.",
    tags: ["RTMP/SRT Protocols", "Network Bonding", "vMix Specialist"],
    avatar: PLACEHOLDER_ASSETS.images.team.member2
  },
  {
    id: "member-3",
    name: "Team Member 3",
    role: "Lead Editor & Motion Designer",
    bio: "Maintains WeStream's aesthetic edge in post-production. Crafts kinetic title graphics, custom color grades, and edits that capture the viewer's heartbeat.",
    tags: ["Premiere Pro", "After Effects", "Color Grading"],
    avatar: PLACEHOLDER_ASSETS.images.team.member3
  }
];

export const STATS_DATA: Stat[] = [
  {
    value: "5+",
    label: "Years in Business",
    description: "Founded in 2019, delivering premium services across Bangalore and India."
  },
  {
    value: "350+",
    label: "Events Covered",
    description: "From intimate corporate summits to massive political rallies."
  },
  {
    value: "100%",
    label: "Stream Reliability",
    description: "Backed by multi-provider cellular bonding and satellite uplink solutions."
  },
  {
    value: "15M+",
    label: "Viewers Reached",
    description: "Broadcasts that scale seamlessly to millions of concurrent sessions."
  }
];

export const FAQS_DATA: FAQ[] = [
  {
    question: "Do you travel outside of Bangalore for projects?",
    answer: "Yes, absolutely. While we are based in Bangalore, we frequently execute live streaming and video production projects across all states in India."
  },
  {
    question: "How far in advance should we book your services?",
    answer: "[TODO — client to confirm answers] Typically, we recommend booking corporate films 3-4 weeks in advance, and live streaming services 1-2 weeks in advance to ensure slot availability and adequate technical site checks."
  },
  {
    question: "What equipment do you use for live broadcasts?",
    answer: "We deploy industry-standard PTZ systems, professional cinema cameras (Sony, Blackmagic), wireless video links (Hollyland/Teradek), professional digital audio mixers, and LiveU/Peplink bonding routers for rock-solid internet connection."
  },
  {
    question: "What is your typical turnaround time for edited videos?",
    answer: "[TODO — client to confirm answers] Same-day edits for event highlights can be delivered within hours of event completion. For corporate videos and promotional films, our typical turnaround is 7-14 business days depending on motion graphics complexity."
  },
  {
    question: "Can you stream securely to private corporate portals?",
    answer: "Yes, we support secure streaming via custom RTMP/SRT feeds. We can stream directly to your company's intranet, secure Zoom webinars, password-protected custom web players, or corporate portals with SSO access."
  }
];
