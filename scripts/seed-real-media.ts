import fs from "fs";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import Redis from "ioredis";

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
      if (line.trim().startsWith("#") || !line.trim()) continue;
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      if (match) {
        const key = match[1];
        let value = match[2] || "";
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

import { MediaAsset } from "../src/models/MediaAsset";

const MONGODB_URI = process.env.MONGODB_URI;
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT;
const REDIS_PASS = process.env.REDIS_PASS;
const REDIS_URL = process.env.REDIS_URL;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PREMIUM_ASSETS = [
  // --- Hero Section ---
  {
    slotKey: "hero.backgroundVideo",
    type: "VIDEO",
    url: "https://videos.pexels.com/video-files/853889/853889-hd_1920_1080_25fps.mp4",
    label: "Homepage Hero Background Video",
    pageContext: "Home",
  },
  {
    slotKey: "hero.fallbackImage",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1920&q=80",
    label: "Homepage Hero Fallback Image",
    pageContext: "Home",
  },

  // --- Services loops & icons ---
  {
    slotKey: "services.videoProduction.video",
    type: "VIDEO",
    url: "https://videos.pexels.com/video-files/3196614/3196614-hd_1920_1080_25fps.mp4",
    label: "Services - Video Production Loop",
    pageContext: "Services",
  },
  {
    slotKey: "services.videoProduction.image",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    label: "Services - Video Production Image",
    pageContext: "Services",
  },
  {
    slotKey: "services.liveStreaming.video",
    type: "VIDEO",
    url: "https://videos.pexels.com/video-files/3125396/3125396-hd_1920_1080_25fps.mp4",
    label: "Services - Live Streaming Loop",
    pageContext: "Services",
  },
  {
    slotKey: "services.liveStreaming.image",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=1200&q=80",
    label: "Services - Live Streaming Image",
    pageContext: "Services",
  },
  {
    slotKey: "services.eventCoverage.video",
    type: "VIDEO",
    url: "https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4",
    label: "Services - Event Coverage Loop",
    pageContext: "Services",
  },
  {
    slotKey: "services.eventCoverage.image",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
    label: "Services - Event Coverage Image",
    pageContext: "Services",
  },
  {
    slotKey: "services.postProduction.video",
    type: "VIDEO",
    url: "https://vjs.zencdn.net/v/oceans.mp4",
    label: "Services - Post Production Loop",
    pageContext: "Services",
  },
  {
    slotKey: "services.postProduction.image",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80",
    label: "Services - Post Production Image",
    pageContext: "Services",
  },

  // --- Work / Projects ---
  {
    slotKey: "work.workIndia.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=1200&q=80",
    label: "Work - National Virtual Job Fair",
    pageContext: "Work",
  },
  {
    slotKey: "work.suggestable.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    label: "Work - The Next Era of Suggestable",
    pageContext: "Work",
  },
  {
    slotKey: "work.greenroom.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&w=1200&q=80",
    label: "Work - Influencer Marketing Summit",
    pageContext: "Work",
  },
  {
    slotKey: "work.poonawalla.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80",
    label: "Work - Annual Excellence Awards",
    pageContext: "Work",
  },
  {
    slotKey: "work.tczStudio.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=1200&q=80",
    label: "Work - Studio Launch Promo",
    pageContext: "Work",
  },
  {
    slotKey: "work.politicalStream.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=1200&q=80",
    label: "Work - State Election Campaign Rally",
    pageContext: "Work",
  },
  {
    slotKey: "work.concertStream.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    label: "Work - Live Concert Broadcast",
    pageContext: "Work",
  },
  {
    slotKey: "work.corporateAgm.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    label: "Work - Tech Mahindra Global AGM",
    pageContext: "Work",
  },
  {
    slotKey: "work.autoExpo.thumbnail",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1200&q=80",
    label: "Work - Tata Motors Brand Film Expo",
    pageContext: "Work",
  },

  // --- Team ---
  {
    slotKey: "team.member1.avatar",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    label: "Team - Founder & Creative Director Avatar",
    pageContext: "Team",
  },
  {
    slotKey: "team.member2.avatar",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    label: "Team - Lead Broadcast Engineer Avatar",
    pageContext: "Team",
  },
  {
    slotKey: "team.member3.avatar",
    type: "IMAGE",
    url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    label: "Team - Lead Editor & Motion Designer Avatar",
    pageContext: "Team",
  },
];

async function seedCloudinary() {
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is undefined.");
    process.exit(1);
  }

  // Connect to Redis
  let redis: Redis | null = null;
  if (REDIS_HOST) {
    redis = new Redis({
      host: REDIS_HOST,
      port: REDIS_PORT ? Number(REDIS_PORT) : 6379,
      password: REDIS_PASS || undefined,
    });
    console.log("Connected to Redis for cache invalidation.");
  } else if (REDIS_URL) {
    redis = new Redis(REDIS_URL);
    console.log("Connected to Redis for cache invalidation.");
  }

  console.log("Connecting to MongoDB...");
  await mongoose.connect(MONGODB_URI);
  console.log("Connected successfully!");

  console.log(`Starting Cloudinary upload for ${PREMIUM_ASSETS.length} assets...`);
  
  for (const asset of PREMIUM_ASSETS) {
    try {
      const cleanSlotName = asset.slotKey.replace(/\./g, "-");
      const folderMap: Record<string, string> = {
        Home: "westream-production/home",
        Services: "westream-production/services",
        Work: "westream-production/work",
        Team: "westream-production/team",
      };
      const folder = folderMap[asset.pageContext] || "westream-production";

      console.log(`Uploading [${asset.type}] for slot: ${asset.slotKey}...`);

      const result = await cloudinary.uploader.upload(asset.url, {
        folder,
        public_id: cleanSlotName,
        resource_type: asset.type.toLowerCase() as "image" | "video" | "raw" | "auto",
        overwrite: true,
        invalidate: true,
      });

      console.log(`Cloudinary secure URL: ${result.secure_url}`);

      // Upsert in MongoDB
      const doc = await MediaAsset.findOneAndUpdate(
        { slotKey: asset.slotKey },
        {
          slotKey: asset.slotKey,
          type: asset.type,
          cloudinaryId: result.public_id,
          url: result.secure_url,
          label: asset.label,
          pageContext: asset.pageContext,
          altText: `WeStream ${asset.label}`,
          updatedBy: "seeder-cloudinary",
        },
        { upsert: true, new: true }
      );

      console.log(`Database record updated for: ${asset.slotKey}`);

      // Invalidate Redis Cache
      if (redis) {
        const cacheKey = `media:${asset.slotKey}`;
        await redis.del(cacheKey);
        console.log(`Cleared Redis cache key: ${cacheKey}`);
      }
      
      console.log("----------------------------------------");
    } catch (uploadErr) {
      console.error(`Failed to upload asset ${asset.slotKey}:`, uploadErr);
    }
  }

  console.log("Cloudinary Media Seeding completed!");
  
  if (redis) {
    await redis.quit();
  }
  await mongoose.disconnect();
  console.log("Disconnected from MongoDB.");
  process.exit(0);
}

seedCloudinary().catch((err) => {
  console.error("Cloudinary Seeding Failed:", err);
  process.exit(1);
});
