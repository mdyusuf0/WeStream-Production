import { Container } from "@/components/layout/Container";
import { placeholders } from "@/data/placeholders";

export function StudioTeaserSection() {
  return (
    <section id="studio" className="section-space">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center">
          <div className="order-2 md:order-1 media-placeholder aspect-square md:aspect-[4/5] rounded-sm">
            <span className="text-label max-w-[200px] text-center">
              Team/Studio media pending
            </span>
          </div>
          <div className="order-1 md:order-2 space-y-8 max-w-xl">
            <h2 className="text-label text-muted-foreground">
              {placeholders.studio.sectionTitle}
            </h2>
            <p className="text-heading-md leading-tight">
              {placeholders.studio.teaser}
            </p>
            <p className="text-body-lg">{placeholders.studio.status}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
