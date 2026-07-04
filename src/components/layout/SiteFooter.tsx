import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <Container>
        <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WeStream Production. All rights
            reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}
