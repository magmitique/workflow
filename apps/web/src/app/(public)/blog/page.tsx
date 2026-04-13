import type { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { ArticleCard } from '@/components/blog/article-card';
import { BlogFilters } from '@/components/blog/blog-filters';
import { Pagination } from '@/components/ui/pagination';
import type { PaginatedResponse } from '@apio/shared';
import { H1, P } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    "Articles, guides et retours d'expérience IT pour TPE/PME. Conseils pratiques par Apio systems.",
  alternates: { canonical: '/blog' },
};

interface ArticleListItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  publishedAt: string | null;
  author: { name: string };
  tags: { name: string; slug: string }[];
}

const ITEMS_PER_PAGE = 12;

async function getArticles(params: {
  page?: string;
  search?: string;
  tag?: string;
}): Promise<PaginatedResponse<ArticleListItem> | null> {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  const qs = new URLSearchParams();
  qs.set('limit', String(ITEMS_PER_PAGE));
  if (params.page) qs.set('page', params.page);
  if (params.search) qs.set('search', params.search);
  if (params.tag) qs.set('tag', params.tag);

  try {
    const res = await fetch(`${apiUrl}/api/articles?${qs.toString()}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<PaginatedResponse<ArticleListItem>>;
  } catch {
    return null;
  }
}

async function getAllTags(): Promise<{ name: string; slug: string }[]> {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  try {
    const res = await fetch(`${apiUrl}/api/articles?limit=100`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as PaginatedResponse<ArticleListItem>;
    const tagMap = new Map<string, { name: string; slug: string }>();
    for (const article of data.data) {
      for (const tag of article.tags) {
        tagMap.set(tag.slug, tag);
      }
    }
    return Array.from(tagMap.values()).sort((a, b) => a.name.localeCompare(b.name));
  } catch {
    return [];
  }
}

interface BlogPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? params.page : undefined;
  const search = typeof params.search === 'string' ? params.search : undefined;
  const tag = typeof params.tag === 'string' ? params.tag : undefined;

  const [result, tags] = await Promise.all([getArticles({ page, search, tag }), getAllTags()]);

  const articles = result?.data ?? [];
  const totalPages = result?.pagination.totalPages ?? 1;
  const currentPage = result?.pagination.page ?? 1;

  function buildPaginationUrl(p: number): string {
    const qs = new URLSearchParams();
    if (p > 1) qs.set('page', String(p));
    if (search) qs.set('search', search);
    if (tag) qs.set('tag', tag);
    const str = qs.toString();
    return str ? `/blog?${str}` : '/blog';
  }

  return (
    <>
      <Section className="relative overflow-hidden py-20 md:py-32">
        <Image
          src="/images/heroes/blog.jpg"
          alt="Espace de travail avec ordinateur portable"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
        <div className="relative z-10 max-w-xl text-anthracite-foreground">
          <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
            <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />
            Blog
          </P>
          <H1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Blog</H1>
          <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">
            Articles, guides et retours d&apos;expérience pour piloter votre IT sereinement.
          </P>
        </div>
      </Section>

      <Section>
        <BlogFilters tags={tags} />

        <div className="mt-8">
          {articles.length === 0 ? (
            <P className="text-center">
              {search || tag
                ? 'Aucun article ne correspond à votre recherche.'
                : 'Aucun article pour le moment. Revenez bientôt !'}
            </P>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  slug={article.slug}
                  excerpt={article.excerpt}
                  coverImage={article.coverImage}
                  publishedAt={article.publishedAt}
                  author={article.author}
                  tags={article.tags}
                />
              ))}
            </div>
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          buildUrl={buildPaginationUrl}
        />
      </Section>
    </>
  );
}
