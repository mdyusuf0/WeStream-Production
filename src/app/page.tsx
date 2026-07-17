import { HeroSection } from "@/sections/home/HeroSection";
import { SelectedWorkSection } from "@/sections/home/SelectedWorkSection";
import { CapabilitiesSection } from "@/sections/home/CapabilitiesSection";
import { StudioTeaserSection } from "@/sections/home/StudioTeaserSection";
import { TrustSection } from "@/sections/home/TrustSection";
import { ContactCTASection } from "@/sections/home/ContactCTASection";
import { FilmStripDivider } from "@/components/ui/FilmStripDivider";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FilmStripDivider className="my-4" />
      <SelectedWorkSection />
      <FilmStripDivider className="my-4" />
      <CapabilitiesSection />
      <FilmStripDivider className="my-4" />
      <StudioTeaserSection />
      <FilmStripDivider className="my-4" />
      <TrustSection />
      <FilmStripDivider className="my-4" />
      <ContactCTASection />
    </>
  );
}
