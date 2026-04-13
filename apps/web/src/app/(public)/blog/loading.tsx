import { Section } from '@/components/ui/section';

export default function BlogLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <Section className="py-20 md:py-32">
        <div className="max-w-xl space-y-4">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-10 w-64 animate-pulse rounded bg-muted" />
          <div className="h-5 w-96 animate-pulse rounded bg-muted" />
        </div>
      </Section>

      {/* Grid skeleton */}
      <Section>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <div className="h-48 w-full animate-pulse rounded-lg bg-muted" />
              <div className="flex gap-2">
                <div className="h-5 w-12 animate-pulse rounded bg-muted" />
                <div className="h-5 w-16 animate-pulse rounded bg-muted" />
              </div>
              <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
              <div className="h-4 w-full animate-pulse rounded bg-muted" />
              <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
