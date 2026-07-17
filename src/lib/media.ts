import { connectToDatabase } from "./db";
import { MediaAsset } from "../models/MediaAsset";
import { getRedisClient } from "./redis";
import { PLACEHOLDER_ASSETS } from "./placeholder-assets";
import { SERVICES_DATA, PROJECTS_DATA, TEAM_MEMBERS, Service, Project, TeamMember } from "./data";

export function getDefaultAsset(slotKey: string): { url: string; type: "IMAGE" | "VIDEO"; altText: string } {
  switch (slotKey) {
    case "hero.backgroundVideo":
      return { url: PLACEHOLDER_ASSETS.videos.hero, type: "VIDEO", altText: "WeStream Homepage Hero Background Video" };
    case "hero.fallbackImage":
      return { url: PLACEHOLDER_ASSETS.images.heroFallback, type: "IMAGE", altText: "WeStream Homepage Hero Fallback Image" };
    
    // Services
    case "services.videoProduction.video":
      return { url: PLACEHOLDER_ASSETS.videos.videoProduction, type: "VIDEO", altText: "WeStream Services Video Production Loop" };
    case "services.videoProduction.image":
      return { url: PLACEHOLDER_ASSETS.images.services.videoProduction, type: "IMAGE", altText: "WeStream Services Video Production Image" };
    case "services.liveStreaming.video":
      return { url: PLACEHOLDER_ASSETS.videos.liveStreaming, type: "VIDEO", altText: "WeStream Services Live Streaming Loop" };
    case "services.liveStreaming.image":
      return { url: PLACEHOLDER_ASSETS.images.services.liveStreaming, type: "IMAGE", altText: "WeStream Services Live Streaming Image" };
    case "services.eventCoverage.video":
      return { url: PLACEHOLDER_ASSETS.videos.eventCoverage, type: "VIDEO", altText: "WeStream Services Event Coverage Loop" };
    case "services.eventCoverage.image":
      return { url: PLACEHOLDER_ASSETS.images.services.eventCoverage, type: "IMAGE", altText: "WeStream Services Event Coverage Image" };
    case "services.postProduction.video":
      return { url: PLACEHOLDER_ASSETS.videos.postProduction, type: "VIDEO", altText: "WeStream Services Post Production Loop" };
    case "services.postProduction.image":
      return { url: PLACEHOLDER_ASSETS.images.services.postProduction, type: "IMAGE", altText: "WeStream Services Post Production Image" };

    // Work
    case "work.workIndia.thumbnail":
      return { url: PLACEHOLDER_ASSETS.images.projects.workIndia, type: "IMAGE", altText: "WeStream Work National Virtual Job Fair" };
    case "work.suggestable.thumbnail":
      return { url: PLACEHOLDER_ASSETS.images.projects.suggestable, type: "IMAGE", altText: "WeStream Work The Next Era of Suggestable" };
    case "work.greenroom.thumbnail":
      return { url: PLACEHOLDER_ASSETS.images.projects.greenroom, type: "IMAGE", altText: "WeStream Work Influencer Marketing Summit" };
    case "work.poonawalla.thumbnail":
      return { url: PLACEHOLDER_ASSETS.images.projects.poonawalla, type: "IMAGE", altText: "WeStream Work Annual Excellence Awards" };
    case "work.tczStudio.thumbnail":
      return { url: PLACEHOLDER_ASSETS.images.projects.techConference, type: "IMAGE", altText: "WeStream Work Studio Launch Promo" };
    case "work.politicalStream.thumbnail":
      return { url: PLACEHOLDER_ASSETS.images.projects.politicalConvention, type: "IMAGE", altText: "WeStream Work State Election Campaign Rally" };
    case "work.concertStream.thumbnail":
      return { url: PLACEHOLDER_ASSETS.images.projects.musicFestival, type: "IMAGE", altText: "WeStream Work Live Concert Broadcast" };

    // Team
    case "team.member1.avatar":
      return { url: PLACEHOLDER_ASSETS.images.team.member1, type: "IMAGE", altText: "WeStream Team Founder Avatar" };
    case "team.member2.avatar":
      return { url: PLACEHOLDER_ASSETS.images.team.member2, type: "IMAGE", altText: "WeStream Team Lead Broadcast Engineer Avatar" };
    case "team.member3.avatar":
      return { url: PLACEHOLDER_ASSETS.images.team.member3, type: "IMAGE", altText: "WeStream Team Lead Editor Avatar" };
    
    default:
      return { url: PLACEHOLDER_ASSETS.images.heroFallback, type: "IMAGE", altText: "WeStream Media Asset Fallback" };
  }
}

export async function getMediaBySlot(slotKey: string): Promise<{ url: string; type: "IMAGE" | "VIDEO"; altText: string }> {
  // 1. Try reading from Redis Cache first
  try {
    const redis = getRedisClient();
    const cacheKey = `media:${slotKey}`;
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const parsed = JSON.parse(cachedData);
      return {
        url: parsed.url,
        type: parsed.type,
        altText: parsed.altText || `WeStream ${parsed.label || "Media"}`,
      };
    }
  } catch (cacheErr) {
    // Gracefully fallback on cache misses or connection failures
    console.error(`Redis read exception for slotKey ${slotKey}:`, cacheErr);
  }

  // 2. Fall back to MongoDB query
  try {
    await connectToDatabase();
    const asset = await MediaAsset.findOne({ slotKey });

    if (asset) {
      // Repopulate cache
      try {
        const redis = getRedisClient();
        const cacheKey = `media:${slotKey}`;
        const cacheData = JSON.stringify({
          url: asset.url,
          type: asset.type,
          cloudinaryId: asset.cloudinaryId,
          altText: asset.altText,
          label: asset.label,
          pageContext: asset.pageContext,
        });
        
        // Cache for 7 days
        await redis.set(cacheKey, cacheData, "EX", 86400 * 7);
      } catch (redisErr) {
        console.error(`Failed to cache asset ${slotKey} to Redis:`, redisErr);
      }

      return {
        url: asset.url,
        type: asset.type,
        altText: asset.altText || `WeStream ${asset.label}`,
      };
    }
  } catch (dbErr) {
    console.error(`MongoDB read exception for slotKey ${slotKey}:`, dbErr);
  }

  // 3. Fall back to local bundled default asset (zero-regression)
  return getDefaultAsset(slotKey);
}

export async function getResolvedServices(): Promise<Service[]> {
  const slugMap: Record<string, string> = {
    "video-production": "videoProduction",
    "live-streaming": "liveStreaming",
    "event-coverage": "eventCoverage",
    "post-production": "postProduction",
  };

  const promises = SERVICES_DATA.flatMap((s) => {
    const camel = slugMap[s.slug] || s.slug;
    return [
      getMediaBySlot(`services.${camel}.video`),
      getMediaBySlot(`services.${camel}.image`),
    ];
  });

  const results = await Promise.all(promises);

  return SERVICES_DATA.map((s, index) => {
    const video = results[index * 2];
    const image = results[index * 2 + 1];
    return {
      ...s,
      videoUrl: video.url,
      imageUrl: image.url,
    };
  });
}

export async function getResolvedProjects(): Promise<Project[]> {
  const projectMap: Record<string, string> = {
    "work-india-live-broadcast": "work.workIndia.thumbnail",
    "suggestable-brand-film": "work.suggestable.thumbnail",
    "greenroom-summit-coverage": "work.greenroom.thumbnail",
    "poonawalla-awards-broadcast": "work.poonawalla.thumbnail",
    "tcz-studio-promo": "work.tczStudio.thumbnail",
    "political-rally-live-stream": "work.politicalStream.thumbnail",
    "national-music-festival": "work.concertStream.thumbnail",
    "corporate-agm-broadcast": "work.corporateAgm.thumbnail",
    "auto-expo-aftermovie": "work.autoExpo.thumbnail",
  };

  const projectVideoMap: Record<string, string> = {
    "work-india-live-broadcast": "services.liveStreaming.video",
    "suggestable-brand-film": "services.videoProduction.video",
    "greenroom-summit-coverage": "services.eventCoverage.video",
    "poonawalla-awards-broadcast": "services.liveStreaming.video",
    "tcz-studio-promo": "services.postProduction.video",
    "political-rally-live-stream": "services.liveStreaming.video",
    "national-music-festival": "services.eventCoverage.video",
    "corporate-agm-broadcast": "services.liveStreaming.video",
    "auto-expo-aftermovie": "services.videoProduction.video",
  };

  const promises = PROJECTS_DATA.flatMap((p) => {
    const slotKey = projectMap[p.slug];
    const videoSlotKey = projectVideoMap[p.slug];

    return [
      slotKey ? getMediaBySlot(slotKey) : Promise.resolve(null),
      videoSlotKey ? getMediaBySlot(videoSlotKey) : Promise.resolve(null),
    ];
  });

  const results = await Promise.all(promises);

  return PROJECTS_DATA.map((p, index) => {
    const thumbMedia = results[index * 2];
    const videoMedia = results[index * 2 + 1];

    return {
      ...p,
      thumbnail: thumbMedia ? thumbMedia.url : p.thumbnail,
      videoUrl: videoMedia ? videoMedia.url : p.videoUrl,
    };
  });
}

export async function getResolvedTeam(): Promise<TeamMember[]> {
  const teamMap: Record<string, string> = {
    "member-1": "team.member1.avatar",
    "member-2": "team.member2.avatar",
    "member-3": "team.member3.avatar",
  };

  const promises = TEAM_MEMBERS.map((t) => {
    const slotKey = teamMap[t.id];
    return slotKey ? getMediaBySlot(slotKey) : Promise.resolve(null);
  });

  const results = await Promise.all(promises);

  return TEAM_MEMBERS.map((t, index) => {
    const avatarMedia = results[index];
    return {
      ...t,
      avatar: avatarMedia ? avatarMedia.url : t.avatar,
    };
  });
}
