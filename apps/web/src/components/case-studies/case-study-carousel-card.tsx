import Link from 'next/link';
import Image from 'next/image';
import { Building2, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { H2, P } from '@/components/ui/typography';
import { resolveImageUrl } from '@/lib/image-url';

interface CaseStudyCarouselCardProps {
  title: string;
  slug: string;
  clientName: string;
  clientAnonymous: boolean;
  sector: string | null;
  coverImage: string | null;
  context: string | null;
}

export function CaseStudyCarouselCard({
  title,
  slug,
  clientName,
  clientAnonymous,
  sector,
  coverImage,
  context,
}: CaseStudyCarouselCardProps) {
  return (
    <Card className="group h-full gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
      <Link href={`/cas-clients/${slug}`} className="relative block h-40 overflow-hidden">
        {resolveImageUrl(coverImage) ? (
          <Image
            src={resolveImageUrl(coverImage)!}
            alt={title}
            fill
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <Building2 className="size-12 text-primary/30" />
          </div>
        )}
        {sector && (
          <div className="absolute right-2 top-2">
            <Badge variant="secondary">{sector}</Badge>
          </div>
        )}
      </Link>
      <CardContent className="flex flex-1 flex-col py-4">
        <H2 className="text-base font-semibold leading-snug line-clamp-2">
          <Link href={`/cas-clients/${slug}`} className="hover:text-primary">
            {title}
          </Link>
        </H2>
        <P className="mt-1 text-sm text-muted-foreground">
          {clientAnonymous ? 'Client confidentiel' : clientName}
        </P>
        {context && <P className="mt-2 flex-1 text-sm line-clamp-2">{context}</P>}
        <Link
          href={`/cas-clients/${slug}`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Lire l&apos;étude <ArrowRight className="size-3" />
        </Link>
      </CardContent>
    </Card>
  );
}
