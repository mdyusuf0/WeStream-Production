import { Container } from "@/components/layout/Container";
import { placeholders } from "@/data/placeholders";

export function SelectedWorkSection() {
  return (
    <section id="work" className="section-space">
      <Container>
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-heading-lg">{placeholders.work.sectionTitle}</h2>
          <span className="text-label pb-2 border-b border-border">
            View All
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {placeholders.work.projects.map((project, index) => (
            <div
              key={project.id}
              className={`flex flex-col gap-4 group cursor-pointer ${
                index === 0 ? "md:col-span-12" : "md:col-span-6"
              }`}
            >
              {/* Media Container designed for future aspect ratios (16:9 or custom) */}
              <div
                className={`media-placeholder rounded-sm transition-transform duration-500 ease-out group-hover:scale-[1.01] ${
                  index === 0 ? "aspect-video" : "aspect-[4/5] md:aspect-[3/4]"
                }`}
              >
                <span className="text-label">{project.status}</span>
              </div>

              <div className="flex justify-between items-start mt-2">
                <h3 className="text-heading-md group-hover:text-muted-foreground transition-colors">
                  {project.title}
                </h3>
                <span className="text-label text-muted-foreground">
                  {project.id}
                </span>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
