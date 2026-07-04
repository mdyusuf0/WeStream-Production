import { Container } from "./Container";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <div className="font-bold tracking-tight">WeStream Production</div>
          <nav className="hidden md:flex gap-6">
            <span className="text-sm text-muted-foreground">
              Navigation pending
            </span>
          </nav>
        </div>
      </Container>
    </header>
  );
}
