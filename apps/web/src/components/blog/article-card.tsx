import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@apio/shared';
import { FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { H2, P } from '@/components/ui/typography';
import { resolveImageUrl } from '@/lib/image-url';

interface ArticleCardProps {
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | Date | null;
  author: { name: string };
  tags: { name: string; slug: string }[];
}

export function ArticleCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  author,
  tags,
}: ArticleCardProps) {
  return (
    <Card className="group gap-0 overflow-hidden py-0 transition-shadow hover:shadow-md">
      <Link href={`/blog/${slug}`} className="relative block h-48 overflow-hidden">
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
            <FileText className="h-12 w-12 text-muted-foreground/40" />
          </div>
        )}
      </Link>
      <CardContent className="flex flex-1 flex-col py-5">
        {tags.length > 0 && (
          <div className="mb-2 flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <Badge key={tag.slug} variant="secondary">
                {tag.name}
              </Badge>
            ))}
          </div>
        )}
        <H2 className="text-lg font-semibold leading-snug">
          <Link href={`/blog/${slug}`} className="hover:text-primary">
            {title}
          </Link>
        </H2>
        {excerpt && <P className="mt-2 flex-1 text-sm line-clamp-3">{excerpt}</P>}
        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span>{author.name}</span>
          {publishedAt && (
            <>
              <span aria-hidden="true">&middot;</span>
              <time dateTime={new Date(publishedAt).toISOString()}>{formatDate(publishedAt)}</time>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
