import type { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { CaseStudyCard } from '@/components/case-studies/case-study-card';
import { CaseStudyFilters } from '@/components/case-studies/case-study-filters';
import { Pagination } from '@/components/ui/pagination';
import type { PaginatedResponse } from '@apio/shared';
import { H1, P } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'Cas clients',
  description:
    "Découvrez comment Apio systems a transformé l'IT de ses clients. Études de cas concrets avec résultats mesurables.",
  alternates: { canonical: '/cas-clients' },
};

interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
}

interface CaseStudyListItem {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  clientAnonymous: boolean;
  sector: string | null;
  coverImage: string | null;
  context: string | null;
  results: CaseStudyResult[];
}

const ITEMS_PER_PAGE = 12;

async function getCaseStudies(params: {
  page?: string;
  sector?: string;
}): Promise<PaginatedResponse<CaseStudyListItem> | null> {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  const qs = new URLSearchParams();
  qs.set('limit', String(ITEMS_PER_PAGE));
  if (params.page) qs.set('page', params.page);
  if (params.sector) qs.set('sector', params.sector);

  try {
    const res = await fetch(`${apiUrl}/api/case-studies?${qs.toString()}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<PaginatedResponse<CaseStudyListItem>>;
  } catch {
    return null;
  }
}

async function getAllSectors(): Promise<string[]> {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  try {
    const res = await fetch(`${apiUrl}/api/case-studies?limit=100`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as PaginatedResponse<CaseStudyListItem>;
    const sectors = new Set<string>();
    for (const cs of data.data) {
      if (cs.sector) sectors.add(cs.sector);
    }
    return Array.from(sectors).sort((a, b) => a.localeCompare(b));
  } catch {
    return [];
  }
}

interface CasClientsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function CasClientsPage({ searchParams }: CasClientsPageProps) {
  const params = await searchParams;
  const page = typeof params.page === 'string' ? params.page : undefined;
  const sector = typeof params.sector === 'string' ? params.sector : undefined;

  const [result, sectors] = await Promise.all([getCaseStudies({ page, sector }), getAllSectors()]);

  const caseStudies = result?.data ?? [];
  const totalPages = result?.pagination.totalPages ?? 1;
  const currentPage = result?.pagination.page ?? 1;

  function buildPaginationUrl(p: number): string {
    const qs = new URLSearchParams();
    if (p > 1) qs.set('page', String(p));
    if (sector) qs.set('sector', sector);
    const str = qs.toString();
    return str ? `/cas-clients?${str}` : '/cas-clients';
  }

  return (
    <>
      <Section className="relative overflow-hidden py-20 md:py-32">
        <Image
          src="/images/heroes/cas-clients.jpg"
          alt="Analyse de données et résultats"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
        <div className="relative z-10 max-w-xl text-anthracite-foreground">
          <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
            <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />
            Cas clients
          </P>
          <H1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Cas clients</H1>
          <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">
            Découvrez comment nous avons transformé l&apos;IT de nos clients avec des résultats
            concrets et mesurables.
          </P>
        </div>
      </Section>

      <Section>
        <CaseStudyFilters sectors={sectors} />

        <div className="mt-8">
          {caseStudies.length === 0 ? (
            <P className="text-center">
              {sector
                ? 'Aucune étude de cas dans ce secteur.'
                : 'Aucune étude de cas pour le moment. Revenez bientôt !'}
            </P>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {caseStudies.map((cs) => (
                <CaseStudyCard
                  key={cs.id}
                  title={cs.title}
                  slug={cs.slug}
                  clientName={cs.clientName}
                  clientAnonymous={cs.clientAnonymous}
                  sector={cs.sector}
                  coverImage={cs.coverImage}
                  context={cs.context}
                  results={cs.results}
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
