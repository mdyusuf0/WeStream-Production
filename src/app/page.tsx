import { HeroSection } from "@/sections/home/HeroSection";
import { SelectedWorkSection } from "@/sections/home/SelectedWorkSection";
import { CapabilitiesSection } from "@/sections/home/CapabilitiesSection";
import { StudioTeaserSection } from "@/sections/home/StudioTeaserSection";
import { TrustSection } from "@/sections/home/TrustSection";
import { ContactCTASection } from "@/sections/home/ContactCTASection";
import { getMediaBySlot, getResolvedServices, getResolvedProjects } from "@/lib/media";
import { FilmReelDivider } from "@/components/media/FilmReelDivider";

export default async function Home() {
  // Fetch hero backgrounds, dynamic services, and projects concurrently on the server
  const [heroVideo, heroFallback, resolvedServices, resolvedProjects] = await Promise.all([
    getMediaBySlot("hero.backgroundVideo"),
    getMediaBySlot("hero.fallbackImage"),
    getResolvedServices(),
    getResolvedProjects(),
  ]);

  return (
    <>
      <HeroSection videoSrc={heroVideo.url} videoPoster={heroFallback.url} />
      
      {/* 3D Film Reel Divider between Hero and Selected Work */}
      <FilmReelDivider triggerId="work" />
      
      <SelectedWorkSection projects={resolvedProjects} />
      
      {/* 3D Film Reel Divider between Selected Work and Services */}
      <FilmReelDivider triggerId="services" />
      
      <CapabilitiesSection services={resolvedServices} />
      
      <StudioTeaserSection />
      <TrustSection projects={resolvedProjects} />
      <ContactCTASection />
    </>
  );
}
