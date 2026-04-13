import Link from 'next/link';
import Image from 'next/image';
import { Briefcase } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { H2, P } from '@/components/ui/typography';
import { resolveImageUrl } from '@/lib/image-url';

interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
}

interface CaseStudyCardProps {
  title: string;
  slug: string;
  clientName: string;
  clientAnonymous: boolean;
  sector: string | null;
  coverImage: string | null;
  context: string | null;
  results: CaseStudyResult[];
}

export function CaseStudyCard({
  title,
  slug,
  clientName,
  clientAnonymous,
  sector,
  coverImage,
  context,
  results,
}: CaseStudyCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
      <Link href={`/cas-clients/${slug}`} className="relative block h-48 overflow-hidden">
        {resolveImageUrl(coverImage) ? (
          <Image
            src={resolveImageUrl(coverImage)!}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted">
            <Briefcase className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
      </Link>
      <CardContent className="flex flex-1 flex-col py-5">
        {sector && (
          <div className="mb-2">
            <Badge variant="secondary">{sector}</Badge>
          </div>
        )}
        <H2 className="text-lg font-semibold leading-snug">
          <Link href={`/cas-clients/${slug}`} className="hover:text-primary">
            {title}
          </Link>
        </H2>
        {!clientAnonymous && <P className="mt-1 text-sm">{clientName}</P>}
        {context && <P className="mt-2 flex-1 text-sm line-clamp-3">{context}</P>}
        {results.length > 0 && (
          <div className="mt-4 space-y-1.5">
            {results.slice(0, 3).map((r) => (
              <div key={r.metric} className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">{r.metric}</span>
                <span>{r.before}</span>
                <span aria-hidden="true">&rarr;</span>
                <span className="font-semibold text-primary">{r.after}</span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
