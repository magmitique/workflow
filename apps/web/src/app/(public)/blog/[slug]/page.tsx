import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { formatDate } from '@apio/shared';
import { Section } from '@/components/ui/section';
import { CTASection } from '@/components/ui/cta-section';
import { Badge } from '@/components/ui/badge';
import { ArticleContent } from '@/components/blog/article-content';
import { ArrowLeft } from 'lucide-react';
import { H1 } from '@/components/ui/typography';
import { resolveImageUrl } from '@/lib/image-url';

interface ArticleDetail {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  updatedAt: string;
  author: { name: string };
  tags: { name: string; slug: string }[];
  metaTitle: string | null;
  metaDescription: string | null;
}

async function getArticle(slug: string): Promise<ArticleDetail | null> {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  try {
    const res = await fetch(`${apiUrl}/api/articles/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<ArticleDetail>;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    return { title: 'Article non trouvé' };
  }

  return {
    title: article.metaTitle ?? article.title,
    description: article.metaDescription ?? article.excerpt ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: article.metaTitle ?? article.title,
      description: article.metaDescription ?? article.excerpt ?? undefined,
      type: 'article',
      publishedTime: article.publishedAt ?? undefined,
      ...(resolveImageUrl(article.coverImage) && {
        images: [{ url: resolveImageUrl(article.coverImage)! }],
      }),
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = await getArticle(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `https://www.apio.systems/blog/${article.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: article.title,
        description: article.excerpt,
        image:
          resolveImageUrl(article.coverImage) ?? 'https://www.apio.systems/images/og-default.jpg',
        datePublished: article.publishedAt,
        dateModified: article.updatedAt,
        mainEntityOfPage: { '@type': 'WebPage', '@id': articleUrl },
        author: {
          '@type': 'Person',
          name: article.author.name,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Apio systems',
          logo: { '@type': 'ImageObject', url: 'https://www.apio.systems/images/icon.svg' },
        },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Accueil', item: 'https://www.apio.systems' },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Blog',
            item: 'https://www.apio.systems/blog',
          },
          { '@type': 'ListItem', position: 3, name: article.title },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Section className="py-8 md:py-12">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour au blog
          </Link>

          {article.tags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-1.5">
              {article.tags.map((tag) => (
                <Badge key={tag.slug} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          )}

          <H1 className="text-3xl font-bold tracking-tight sm:text-4xl">{article.title}</H1>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <span>{article.author.name}</span>
            {article.publishedAt && (
              <>
                <span aria-hidden="true">&middot;</span>
                <time dateTime={new Date(article.publishedAt).toISOString()}>
                  {formatDate(article.publishedAt)}
                </time>
              </>
            )}
          </div>

          {resolveImageUrl(article.coverImage) && (
            <Image
              src={resolveImageUrl(article.coverImage)!}
              alt={article.title}
              width={1200}
              height={630}
              sizes="(max-width: 768px) 100vw, 768px"
              className="mt-8 w-full rounded-lg object-cover"
              priority
            />
          )}

          <div className="mt-10">
            <ArticleContent content={article.content} />
          </div>
        </div>
      </Section>

      <CTASection
        title="Besoin d'aide pour votre IT ?"
        description="Diagnostic gratuit de 30 minutes. On analyse votre situation et on vous propose un plan d'action concret."
        primaryLabel="Demander un diagnostic"
      />
    </>
  );
}
