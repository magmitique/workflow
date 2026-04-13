import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { CTASection } from '@/components/ui/cta-section';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ArrowLeft } from 'lucide-react';
import { H1, H2, P, Blockquote } from '@/components/ui/typography';
import { resolveImageUrl } from '@/lib/image-url';

interface CaseStudyResult {
  metric: string;
  before: string;
  after: string;
}

interface CaseStudyDetail {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  clientAnonymous: boolean;
  sector: string | null;
  techStack: string[] | null;
  context: string | null;
  challenge: string | null;
  solution: string | null;
  testimonialQuote: string | null;
  testimonialAuthor: string | null;
  testimonialRole: string | null;
  coverImage: string | null;
  architectureDiagram: string | null;
  results: CaseStudyResult[];
  createdAt: string;
  updatedAt: string;
}

async function getCaseStudy(slug: string): Promise<CaseStudyDetail | null> {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  try {
    const res = await fetch(`${apiUrl}/api/case-studies/${slug}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    return res.json() as Promise<CaseStudyDetail>;
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
  const cs = await getCaseStudy(slug);

  if (!cs) {
    return { title: 'Étude de cas non trouvée' };
  }

  const description = cs.context ? cs.context.slice(0, 160) : `Étude de cas : ${cs.title}`;

  return {
    title: `${cs.title} - Cas clients`,
    description,
    alternates: { canonical: `/cas-clients/${slug}` },
    openGraph: {
      title: cs.title,
      description,
      type: 'article',
      ...(resolveImageUrl(cs.coverImage) && { images: [{ url: resolveImageUrl(cs.coverImage)! }] }),
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cs = await getCaseStudy(slug);

  if (!cs) {
    notFound();
  }

  const displayName = cs.clientAnonymous ? 'Client confidentiel' : cs.clientName;

  const caseStudyUrl = `https://www.apio.systems/cas-clients/${cs.slug}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        headline: cs.title,
        description: cs.context,
        image: resolveImageUrl(cs.coverImage) ?? 'https://www.apio.systems/images/og-default.jpg',
        datePublished: cs.createdAt,
        dateModified: cs.updatedAt,
        mainEntityOfPage: { '@type': 'WebPage', '@id': caseStudyUrl },
        author: {
          '@type': 'Organization',
          name: 'Apio systems',
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
            name: 'Cas clients',
            item: 'https://www.apio.systems/cas-clients',
          },
          { '@type': 'ListItem', position: 3, name: cs.title },
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
            href="/cas-clients"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour aux cas clients
          </Link>

          {cs.sector && (
            <div className="mb-4">
              <Badge variant="secondary">{cs.sector}</Badge>
            </div>
          )}

          <H1 className="text-3xl font-bold tracking-tight sm:text-4xl">{cs.title}</H1>

          <P className="mt-2 text-lg">{displayName}</P>

          {resolveImageUrl(cs.coverImage) && (
            <Image
              src={resolveImageUrl(cs.coverImage)!}
              alt={cs.title}
              width={1200}
              height={630}
              sizes="(max-width: 768px) 100vw, 768px"
              className="mt-8 w-full rounded-lg object-cover"
              priority
            />
          )}

          {cs.context && (
            <div className="mt-10">
              <H2 className="text-xl font-semibold">Contexte</H2>
              <P className="mt-3 leading-relaxed">{cs.context}</P>
            </div>
          )}

          {cs.challenge && (
            <div className="mt-8">
              <H2 className="text-xl font-semibold">Challenge</H2>
              <P className="mt-3 leading-relaxed">{cs.challenge}</P>
            </div>
          )}

          {cs.solution && (
            <div className="mt-8">
              <H2 className="text-xl font-semibold">Solution</H2>
              <P className="mt-3 leading-relaxed">{cs.solution}</P>
            </div>
          )}

          {cs.results.length > 0 && (
            <div className="mt-8">
              <H2 className="text-xl font-semibold">Résultats</H2>
              <Table className="mt-4">
                <TableHeader>
                  <TableRow>
                    <TableHead>Indicateur</TableHead>
                    <TableHead>Avant</TableHead>
                    <TableHead>Après</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cs.results.map((r) => (
                    <TableRow key={r.metric}>
                      <TableCell className="font-medium">{r.metric}</TableCell>
                      <TableCell className="text-muted-foreground">{r.before}</TableCell>
                      <TableCell className="font-semibold text-primary">{r.after}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}

          {cs.testimonialQuote && (
            <Blockquote className="mt-8 border-l-4 border-primary pl-6">
              <P className="text-lg italic">&laquo; {cs.testimonialQuote} &raquo;</P>
              {(cs.testimonialAuthor ?? cs.testimonialRole) && (
                <footer className="mt-3 text-sm font-medium">
                  {cs.testimonialAuthor}
                  {cs.testimonialRole && (
                    <span className="text-muted-foreground"> - {cs.testimonialRole}</span>
                  )}
                </footer>
              )}
            </Blockquote>
          )}

          {cs.techStack && cs.techStack.length > 0 && (
            <div className="mt-8">
              <H2 className="text-xl font-semibold">Stack technique</H2>
              <div className="mt-3 flex flex-wrap gap-2">
                {cs.techStack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {resolveImageUrl(cs.architectureDiagram) && cs.architectureDiagram !== cs.coverImage && (
            <div className="mt-8">
              <H2 className="text-xl font-semibold">Architecture</H2>
              <Image
                src={resolveImageUrl(cs.architectureDiagram)!}
                alt={`Diagramme d'architecture - ${cs.title}`}
                width={1200}
                height={800}
                sizes="(max-width: 768px) 100vw, 768px"
                className="mt-4 w-full rounded-lg"
              />
            </div>
          )}
        </div>
      </Section>

      <CTASection
        title="Un projet similaire ?"
        description="Discutons de vos enjeux IT. Diagnostic gratuit et sans engagement."
        primaryLabel="Nous contacter"
      />
    </>
  );
}
