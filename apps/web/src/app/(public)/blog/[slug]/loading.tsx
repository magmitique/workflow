import { Section } from '@/components/ui/section';

export default function ArticleLoading() {
  return (
    <Section className="py-8 md:py-12">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Back link */}
        <div className="h-4 w-32 animate-pulse rounded bg-muted" />

        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-5 w-12 animate-pulse rounded bg-muted" />
          <div className="h-5 w-16 animate-pulse rounded bg-muted" />
        </div>

        {/* Title */}
        <div className="h-9 w-3/4 animate-pulse rounded bg-muted" />

        {/* Author + date */}
        <div className="flex items-center gap-2">
          <div className="h-4 w-24 animate-pulse rounded bg-muted" />
          <div className="h-4 w-28 animate-pulse rounded bg-muted" />
        </div>

        {/* Cover image */}
        <div className="h-64 w-full animate-pulse rounded-lg bg-muted md:h-96" />

        {/* Content lines */}
        <div className="mt-10 space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </Section>
  );
}
