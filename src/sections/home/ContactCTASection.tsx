import { Container } from "@/components/layout/Container";
import { placeholders } from "@/data/placeholders";

export function ContactCTASection() {
  return (
    <section id="contact" className="section-space">
      <Container>
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto py-12 md:py-24">
          <h2 className="text-display hover:text-muted-foreground transition-colors cursor-pointer">
            {placeholders.contact.sectionTitle}
          </h2>
          <p className="text-body-lg max-w-lg">{placeholders.contact.status}</p>
          <div className="pt-8">
            <span className="px-8 py-4 bg-foreground text-background font-medium rounded-full cursor-not-allowed opacity-80">
              Enquiry Form Pending
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
