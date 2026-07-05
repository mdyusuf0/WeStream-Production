import { HeroSection } from "@/sections/home/HeroSection";
import { SelectedWorkSection } from "@/sections/home/SelectedWorkSection";
import { CapabilitiesSection } from "@/sections/home/CapabilitiesSection";
import { StudioTeaserSection } from "@/sections/home/StudioTeaserSection";
import { TrustSection } from "@/sections/home/TrustSection";
import { ContactCTASection } from "@/sections/home/ContactCTASection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <SelectedWorkSection />
      <CapabilitiesSection />
      <StudioTeaserSection />
      <TrustSection />
      <ContactCTASection />
    </>
  );
}
