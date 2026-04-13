import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { PERSONAS_DATA } from '@/data/personas';
import { ABOUT_STATS } from '@/data/about';
import { Section, SectionHeading } from '@/components/ui/section';
import { buttonVariants } from '@/components/ui/button';
import { CTASection } from '@/components/ui/cta-section';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateIn } from '@/components/ui/animate-in';
import { H1, H2, P } from '@/components/ui/typography';
import { FeaturedCaseStudies } from '@/components/case-studies/featured-case-studies';
import { cn } from '@/lib/cn';
import type { PaginatedResponse } from '@apio/shared';

interface FeaturedCaseStudy {
  id: string;
  title: string;
  slug: string;
  clientName: string;
  clientAnonymous: boolean;
  sector: string | null;
  coverImage: string | null;
  context: string | null;
}

async function getFeaturedCaseStudies(): Promise<FeaturedCaseStudy[]> {
  const apiUrl = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
  try {
    const res = await fetch(`${apiUrl}/api/case-studies?featured=true&limit=6`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = (await res.json()) as PaginatedResponse<FeaturedCaseStudy>;
    return data.data;
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredCaseStudies = await getFeaturedCaseStudies();
  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://www.apio.systems/#organization',
                name: 'Apio systems',
                url: 'https://www.apio.systems',
                description:
                  'DSI externalisé pour TPE/PME : audit IT, infogérance, présence en ligne, délivrabilité email.',
                contactPoint: {
                  '@type': 'ContactPoint',
                  contactType: 'customer service',
                  email: 'ping@apio.systems',
                  url: 'https://www.apio.systems/contact',
                  availableLanguage: 'French',
                },
              },
              {
                '@type': ['LocalBusiness', 'ProfessionalService'],
                '@id': 'https://www.apio.systems/#localbusiness',
                name: 'Apio systems',
                url: 'https://www.apio.systems',
                description:
                  'DSI externalisé pour TPE/PME : audit IT, infogérance, présence en ligne, délivrabilité email.',
                email: 'ping@apio.systems',
                areaServed: { '@type': 'Country', name: 'France' },
                priceRange: '$$',
              },
            ],
          }),
        }}
      />
      {/* Hero */}
      <Section className="relative overflow-hidden py-24 md:py-36">
        <Image
          src="/images/heroes/homepage.jpg"
          alt="Équipe travaillant dans un espace moderne"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
        <div className="relative z-10 max-w-xl text-anthracite-foreground">
          <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
            <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />
            DSI externalisé pour TPE/PME
          </P>
          <H1 className="max-w-4xl text-4xl sm:text-5xl md:text-6xl">
            Votre IT vous freine&nbsp;?
            <br />
            <span className="text-brand-yellow">On s&apos;en occupe.</span>
          </H1>
          <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">
            Apio systems accompagne les Artisans, TPE et PME pour transformer leur IT en levier de croissance.
            Audit, infogérance, présence en ligne, délivrabilité email. Car le succès se construit ensemble.
          </P>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/contact"
              className={cn(buttonVariants({ size: 'lg', variant: 'brand' }), 'gap-2')}
            >
              Diagnostic gratuit
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tarifs"
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'border-anthracite-foreground/30 bg-transparent text-anthracite-foreground hover:bg-white/10 hover:text-anthracite-foreground'
              )}
            >
              Voir les offres
            </Link>
          </div>
        </div>
      </Section>

      {/* Personas / Entry points */}
      <Section className="bg-muted">
        <AnimateIn>
          <SectionHeading
            title="Quelle est votre situation ?"
            subtitle="Cliquez sur la problématique qui vous parle le plus."
          />
        </AnimateIn>
        <div className="flex flex-wrap justify-center gap-6">
          {PERSONAS_DATA.map((persona, i) => (
            <AnimateIn
              key={persona.id}
              delay={i * 100}
              className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
            >
              <Link href={`/${persona.slug}`} className="group block h-full">
                <Card className="h-full group-hover:border-primary">
                  <CardContent>
                    <P className="inline-flex items-center text-xs font-medium uppercase tracking-widest text-primary">
                      <span className="mr-2 inline-block h-0.5 w-3 bg-brand-yellow" />
                      {persona.label}
                    </P>
                    <H2 className="mt-3 text-xl group-hover:text-primary">{persona.heroTitle}</H2>
                    <P className="mt-2 flex-1 text-sm">{persona.heroQuestion.slice(0, 120)}...</P>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                      En savoir plus <ArrowRight className="h-3 w-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </AnimateIn>
          ))}

          {/* Support card */}
          <AnimateIn
            delay={PERSONAS_DATA.length * 100}
            className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
          >
            <Link href="/support" className="group block h-full">
              <Card className="h-full group-hover:border-primary">
                <CardContent>
                  <P className="inline-flex items-center text-xs font-medium uppercase tracking-widest text-primary">
                    <span className="mr-2 inline-block h-0.5 w-3 bg-brand-yellow" />
                    Support technique
                  </P>
                  <H2 className="mt-3 text-xl group-hover:text-primary">
                    Besoin d&apos;aide maintenant ?
                  </H2>
                  <P className="mt-2 flex-1 text-sm">
                    Packs de support ponctuel ou forfait mensuel. Assistance réactive avec SLA
                    garantis.
                  </P>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
                    Voir les packs <ArrowRight className="h-3 w-3" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          </AnimateIn>
        </div>
      </Section>

      {/* Stats */}
      <Section className="bg-secondary">
        <AnimateIn>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <P className="text-4xl font-bold text-primary">{stat.value}</P>
                <P className="mt-2 text-sm">{stat.label}</P>
              </div>
            ))}
          </div>
        </AnimateIn>
      </Section>

      {/* Featured case studies */}
      <FeaturedCaseStudies caseStudies={featuredCaseStudies} />

      {/* CTA */}
      <CTASection
        title="Prêt à reprendre le contrôle de votre IT ?"
        description="Un diagnostic gratuit de 30 minutes pour identifier vos priorités et vous proposer un plan d'action concret."
        primaryLabel="Prendre rendez-vous"
        secondaryHref="/a-propos"
        secondaryLabel="En savoir plus"
      />
    </div>
  );
}
