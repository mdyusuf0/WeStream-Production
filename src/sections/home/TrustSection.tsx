import { Container } from "@/components/layout/Container";
import { placeholders } from "@/data/placeholders";

export function TrustSection() {
  return (
    <section className="section-space bg-surface border-t border-border">
      <Container>
        <div className="flex flex-col items-center text-center space-y-12">
          <h2 className="text-heading-md">{placeholders.trust.sectionTitle}</h2>

          <div className="w-full flex flex-col md:flex-row gap-8 justify-center opacity-60">
            {/* Minimal architectural blocks holding space for logos/testimonials */}
            <div className="flex-1 p-12 border border-dashed border-border rounded-sm flex items-center justify-center">
              <span className="text-label">
                {placeholders.trust.logosStatus}
              </span>
            </div>
            <div className="flex-1 p-12 border border-dashed border-border rounded-sm flex items-center justify-center">
              <span className="text-label">
                {placeholders.trust.testimonialsStatus}
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
