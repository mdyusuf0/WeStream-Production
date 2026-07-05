import { Container } from "@/components/layout/Container";
import { placeholders } from "@/data/placeholders";

export function CapabilitiesSection() {
  return (
    <section
      id="services"
      className="section-space bg-surface border-y border-border"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <div className="lg:col-span-4 space-y-6">
            <h2 className="text-heading-lg">
              {placeholders.capabilities.sectionTitle}
            </h2>
            <p className="text-label text-muted-foreground">
              {placeholders.capabilities.status}
            </p>
          </div>

          <div className="lg:col-span-8">
            <ul className="flex flex-col">
              {placeholders.capabilities.provisionalList.map((item, i) => (
                <li
                  key={i}
                  className="py-6 md:py-8 border-b border-border last:border-0 flex items-center group cursor-default"
                >
                  <span className="text-label w-12 text-muted-foreground group-hover:text-foreground transition-colors">
                    0{i + 1}
                  </span>
                  <h3 className="text-heading-md group-hover:translate-x-4 transition-transform duration-300">
                    {item}
                  </h3>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
