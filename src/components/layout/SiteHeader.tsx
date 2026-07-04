import { Container } from "./Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="font-bold tracking-tight">WeStream Production</div>
          <nav className="hidden md:flex gap-8">
            <a
              href="#work"
              className="text-sm font-medium hover:text-muted-foreground transition-colors"
            >
              Work
            </a>
            <a
              href="#services"
              className="text-sm font-medium hover:text-muted-foreground transition-colors"
            >
              Services
            </a>
            <a
              href="#studio"
              className="text-sm font-medium hover:text-muted-foreground transition-colors"
            >
              Studio
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-muted-foreground transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
      </Container>
    </header>
  );
}
