import { Section } from '@/components/ui/section';

export default function CaseStudyLoading() {
  return (
    <Section className="py-8 md:py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Back link */}
        <div className="h-4 w-40 animate-pulse rounded bg-muted" />

        {/* Sector badge */}
        <div className="h-5 w-24 animate-pulse rounded bg-muted" />

        {/* Title */}
        <div className="h-9 w-3/4 animate-pulse rounded bg-muted" />

        {/* Client name */}
        <div className="h-5 w-40 animate-pulse rounded bg-muted" />

        {/* Cover image */}
        <div className="h-64 w-full animate-pulse rounded-lg bg-muted md:h-96" />

        {/* Context section */}
        <div className="mt-10 space-y-3">
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
        </div>

        {/* Challenge section */}
        <div className="space-y-3">
          <div className="h-6 w-28 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-muted" />
        </div>

        {/* Solution section */}
        <div className="space-y-3">
          <div className="h-6 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
        </div>

        {/* Results table skeleton */}
        <div className="space-y-3">
          <div className="h-6 w-28 animate-pulse rounded bg-muted" />
          <div className="h-10 w-full animate-pulse rounded bg-muted" />
          <div className="h-8 w-full animate-pulse rounded bg-muted" />
          <div className="h-8 w-full animate-pulse rounded bg-muted" />
        </div>
      </div>
    </Section>
  );
}
