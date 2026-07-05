import { Container } from "@/components/layout/Container";
import { placeholders } from "@/data/placeholders";

export function HeroSection() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-end pb-24 md:pb-32 pt-32">
      {/* Media Placeholder Background */}
      <div className="absolute inset-0 -z-10 media-placeholder">
        <span className="text-label absolute z-10 bg-background/50 px-4 py-2 backdrop-blur-sm rounded-full">
          {placeholders.hero.mediaStatus}
        </span>
      </div>

      <Container className="relative z-10">
        <div className="max-w-4xl space-y-6">
          <h1 className="text-display text-accent drop-shadow-lg">
            {placeholders.hero.title}
          </h1>
          <p className="text-body-lg text-accent/80 max-w-2xl drop-shadow-md">
            {placeholders.hero.subtitle}
          </p>
        </div>
      </Container>
    </section>
  );
}
