import { Container } from "@/components/layout/Container";
import { placeholders } from "@/data/placeholders";

export default function Home() {
  return (
    <Container className="py-24">
      <div className="flex flex-col items-center text-center space-y-6 max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          {placeholders.projectTitle}
        </h1>
        <p className="text-xl text-muted-foreground">{placeholders.status}</p>
        <div className="mt-10 p-6 border rounded-lg bg-surface">
          <p className="text-sm font-medium">
            Note: {placeholders.contentStatus}
          </p>
        </div>
      </div>
    </Container>
  );
}
