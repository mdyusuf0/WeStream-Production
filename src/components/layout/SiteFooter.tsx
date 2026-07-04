import { Container } from "./Container";

export function SiteFooter() {
  return (
    <footer className="border-t py-6 md:py-0">
      <Container>
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-24">
          <div className="space-y-4 max-w-sm">
            <h3 className="font-bold tracking-tight text-xl">WeStream</h3>
            <p className="text-sm text-muted-foreground">
              Premium creative production studio. Client address and details
              pending confirmation.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-4 flex flex-col">
              <span className="text-label text-foreground">Services</span>
              <a
                href="#services"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Capabilities Pending
              </a>
            </div>
            <div className="space-y-4 flex flex-col">
              <span className="text-label text-foreground">Connect</span>
              <a
                href="#contact"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Contact Us
              </a>
              <a
                href="#studio"
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Studio
              </a>
            </div>
          </div>
        </div>
        <div className="mt-24 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} WeStream Production.
          </p>
          <p className="text-sm text-muted-foreground">
            Some rights reserved, others left to the imagination.
          </p>
        </div>
      </Container>
    </footer>
  );
}
