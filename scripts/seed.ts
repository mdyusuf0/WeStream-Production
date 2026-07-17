import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

// --- Manual Dotenv Loader ---
const envPaths = [
  path.resolve(process.cwd(), ".env.local"),
  path.resolve(process.cwd(), ".env")
];

let loadedEnv = false;
for (const envPath of envPaths) {
  if (fs.existsSync(envPath)) {
    const envConfig = fs.readFileSync(envPath, "utf-8");
    for (const line of envConfig.split(/\r?\n/)) {
      // Ignore comments and empty lines
      if (line.trim().startsWith("#") || !line.trim()) continue;
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
        // Remove enclosing quotes
        if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
        if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
        if (!process.env[key]) {
          process.env[key] = value.trim();
        }
      }
    }
    console.log(`Loaded environment configuration from: ${envPath}`);
    loadedEnv = true;
    break;
  }
}

if (!loadedEnv) {
  console.log("No .env or .env.local file found. Relying on host environment variables.");
}

// Import models using dynamic requires or directly.
// Since this is run via tsx, standard imports work.
import { User } from "../src/models/User";
import { MediaAsset } from "../src/models/MediaAsset";

const MONGODB_URI = process.env.MONGODB_URI;
const SEED_ADMIN_EMAIL = process.env.SEED_ADMIN_EMAIL;
const SEED_ADMIN_PASSWORD = process.env.SEED_ADMIN_PASSWORD;

const DEFAULT_ASSETS = [
  // --- Home ---
  {
    slotKey: "hero.backgroundVideo",
    type: "VIDEO",
    url: "https://res.cloudinary.com/demo/video/upload/sea_turtle.mp4",
    cloudinaryId: "placeholder-hero-video",
    label: "Homepage Hero Background Video",
    pageContext: "Home",
  },
  {
    slotKey: "hero.fallbackImage",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80",
    cloudinaryId: "placeholder-hero-fallback-image",
    label: "Homepage Hero Fallback Image",
    pageContext: "Home",
  },
  // --- Services ---
  {
    slotKey: "services.videoProduction.video",
    type: "VIDEO",
    url: "https://res.cloudinary.com/demo/video/upload/race_road_car.mp4",
    cloudinaryId: "placeholder-video-prod-video",
    label: "Services - Video Production Loop",
    pageContext: "Services",
  },
  {
    slotKey: "services.videoProduction.image",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-video-prod-image",
    label: "Services - Video Production Image",
    pageContext: "Services",
  },
  {
    slotKey: "services.liveStreaming.video",
    type: "VIDEO",
    url: "https://vjs.zencdn.net/v/oceans.mp4",
    cloudinaryId: "placeholder-live-stream-video",
    label: "Services - Live Streaming Loop",
    pageContext: "Services",
  },
  {
    slotKey: "services.liveStreaming.image",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-live-stream-image",
    label: "Services - Live Streaming Image",
    pageContext: "Services",
  },
  {
    slotKey: "services.eventCoverage.video",
    type: "VIDEO",
    url: "https://www.w3schools.com/html/movie.mp4",
    cloudinaryId: "placeholder-event-cov-video",
    label: "Services - Event Coverage Loop",
    pageContext: "Services",
  },
  {
    slotKey: "services.eventCoverage.image",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-event-cov-image",
    label: "Services - Event Coverage Image",
    pageContext: "Services",
  },
  {
    slotKey: "services.postProduction.video",
    type: "VIDEO",
    url: "https://www.w3schools.com/html/mov_bbb.mp4",
    cloudinaryId: "placeholder-post-prod-video",
    label: "Services - Post Production Loop",
    pageContext: "Services",
  },
  {
    slotKey: "services.postProduction.image",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-post-prod-image",
    label: "Services - Post Production Image",
    pageContext: "Services",
  },
  // --- Work ---
  {
    slotKey: "work.workIndia.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-work-india",
    label: "Work - National Virtual Job Fair",
    pageContext: "Work",
  },
  {
    slotKey: "work.suggestable.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-work-suggestable",
    label: "Work - The Next Era of Suggestable",
    pageContext: "Work",
  },
  {
    slotKey: "work.greenroom.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-work-greenroom",
    label: "Work - Influencer Marketing Summit",
    pageContext: "Work",
  },
  {
    slotKey: "work.poonawalla.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-work-poonawalla",
    label: "Work - Annual Excellence Awards",
    pageContext: "Work",
  },
  {
    slotKey: "work.tczStudio.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-work-tczstudio",
    label: "Work - Studio Launch Promo",
    pageContext: "Work",
  },
  {
    slotKey: "work.politicalStream.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-work-political",
    label: "Work - State Election Campaign Rally",
    pageContext: "Work",
  },
  {
    slotKey: "work.concertStream.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    cloudinaryId: "placeholder-work-concert",
    label: "Work - Live Concert Broadcast",
    pageContext: "Work",
  },
  // --- Team ---
  {
    slotKey: "team.member1.avatar",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    cloudinaryId: "placeholder-team-member-1",
    label: "Team - Founder & Creative Director Avatar",
    pageContext: "Team",
  },
  {
    slotKey: "team.member2.avatar",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    cloudinaryId: "placeholder-team-member-2",
    label: "Team - Lead Broadcast Engineer Avatar",
    pageContext: "Team",
  },
  {
    slotKey: "team.member3.avatar",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    cloudinaryId: "placeholder-team-member-3",
    label: "Team - Lead Editor & Motion Designer Avatar",
    pageContext: "Team",
  },
];

async function seed() {
  if (!MONGODB_URI) {
    console.error("Error: MONGODB_URI is not defined.");
    process.exit(1);
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully!");

  // 1. Seed Initial Admin User
  if (!SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) {
    console.warn("Warning: SEED_ADMIN_EMAIL or SEED_ADMIN_PASSWORD not defined. Skipping admin user seeding.");
  } else {
    const existingAdmin = await User.findOne({ email: SEED_ADMIN_EMAIL.toLowerCase() });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(SEED_ADMIN_PASSWORD, 12);
      await User.create({
        email: SEED_ADMIN_EMAIL.toLowerCase(),
        password: hashedPassword,
        role: "SYSTEM_ADMIN",
        createdBy: null,
      });
      console.log(`Successfully seeded initial system_admin user: ${SEED_ADMIN_EMAIL}`);
    } else {
      console.log(`system_admin user (${SEED_ADMIN_EMAIL}) already exists. Skipping.`);
    }
  }

  // 2. Seed Placeholder Media Assets
  console.log(`Checking/seeding ${DEFAULT_ASSETS.length} placeholder media assets...`);
  let createdCount = 0;
  let skippedCount = 0;

  for (const asset of DEFAULT_ASSETS) {
    const existingAsset = await MediaAsset.findOne({ slotKey: asset.slotKey });
    if (!existingAsset) {
      await MediaAsset.create({
        ...asset,
        altText: `WeStream ${asset.label}`,
      });
      createdCount++;
    } else {
      skippedCount++;
    }
  }

  console.log(`Media seeding completed: Created: ${createdCount}, Skipped: ${skippedCount}`);
  
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seeding failed with error:", err);
  process.exit(1);
});
