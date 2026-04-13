import type { MetadataRoute } from 'next';

const baseUrl = process.env.SITE_URL ?? 'https://www.apio.systems';

interface ArticleSlug {
  slug: string;
}

interface CaseStudySlug {
  slug: string;
}

interface PaginatedResponse<T> {
  data: T[];
}

async function getPublishedArticleSlugs(): Promise<string[]> {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  try {
    const res = await fetch(`${apiUrl}/api/articles?limit=200`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as PaginatedResponse<ArticleSlug>;
    return json.data.map((a) => a.slug);
  } catch {
    return [];
  }
}

async function getPublishedCaseStudySlugs(): Promise<string[]> {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  try {
    const res = await fetch(`${apiUrl}/api/case-studies?limit=200`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return [];
    const json = (await res.json()) as PaginatedResponse<CaseStudySlug>;
    return json.data.map((c) => c.slug);
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages = [
    '',
    '/contact',
    '/tarifs',
    '/support',
    '/a-propos',
    '/engagements',
    '/ecosysteme',
    '/mentions-legales',
  ];

  const personas = [
    '/dirigeant',
    '/presence',
    '/dsi',
    '/infogerance',
    '/delivrabilite-email',
    '/budget-it',
  ];

  const hubs = ['/blog', '/cas-clients'];

  const allStaticPages = [...staticPages, ...personas, ...hubs];

  const staticEntries: MetadataRoute.Sitemap = allStaticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path === '' ? 'weekly' : 'monthly',
    priority: path === '' ? 1 : 0.8,
  }));

  const [articleSlugs, caseStudySlugs] = await Promise.all([
    getPublishedArticleSlugs(),
    getPublishedCaseStudySlugs(),
  ]);

  const articleEntries: MetadataRoute.Sitemap = articleSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const caseStudyEntries: MetadataRoute.Sitemap = caseStudySlugs.map((slug) => ({
    url: `${baseUrl}/cas-clients/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticEntries, ...articleEntries, ...caseStudyEntries];
}
