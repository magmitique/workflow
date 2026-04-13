import type { Metadata } from 'next';
import Image from 'next/image';
import { ABOUT_VALUES, ABOUT_STATS } from '@/data/about';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card, CardContent } from '@/components/ui/card';
import { CTASection } from '@/components/ui/cta-section';
import { H1, H3, P } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'Apio systems : un DSI externalisé orienté résultats. Transparence, pragmatisme et autonomie du client.',
  alternates: { canonical: '/a-propos' },
};

export default function AProposPage() {
  return (
    <>
      <Section className="relative overflow-hidden py-20 md:py-32">
        <Image
          src="/images/heroes/a-propos.jpg"
          alt="Équipe collaborant autour d'un projet"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
        <div className="relative z-10 max-w-xl text-anthracite-foreground">
          <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
            <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />À propos
          </P>
          <H1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Des résultats, pas des promesses
          </H1>
          <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">
            Apio systems est né d&apos;un constat simple : les Artisans, TPE et PME méritent un accompagnement
            IT à la hauteur de leurs ambitions, sans les tarifs d&apos;un grand cabinet de conseil.
          </P>
        </div>
      </Section>

      {/* Stats */}
      <Section className="bg-secondary">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <P className="text-4xl font-bold text-primary">{stat.value}</P>
              <P className="mt-2 text-sm">{stat.label}</P>
            </div>
          ))}
        </div>
      </Section>

      {/* Approach */}
      <Section>
        <SectionHeading
          title="Notre approche"
          subtitle="Ce qui nous différencie de votre prestataire IT habituel."
        />
        <div className="mx-auto max-w-3xl space-y-6">
          <P>
            On ne vend pas des heures. On vend des résultats. Chaque intervention est mesurée,
            chaque recommandation est justifiée, chaque euro dépensé a un objectif clair.
          </P>
          <P>
            On ne cherche pas à vous rendre dépendant. Notre objectif est de structurer votre IT
            pour que vous puissiez, à terme, prendre vos décisions en toute autonomie. On documente
            tout, on forme vos équipes, on transfère les compétences.
          </P>
          <P>
            Et si un jour vous n&apos;avez plus besoin de nous ? C&apos;est qu&apos;on a bien fait
            notre travail.
          </P>
        </div>
      </Section>

      {/* Values */}
      <Section className="bg-muted">
        <SectionHeading title="Nos valeurs" />
        <div className="grid gap-6 sm:grid-cols-2">
          {ABOUT_VALUES.map((value) => (
            <Card key={value.title}>
              <CardContent>
                <H3 className="text-lg font-semibold">{value.title}</H3>
                <P className="mt-2 text-sm">{value.description}</P>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        title="Envie d'en discuter ?"
        description="30 minutes pour parler de votre situation et voir comment on peut vous aider. Sans engagement."
        primaryLabel="Prendre rendez-vous"
        secondaryHref="/tarifs"
        secondaryLabel="Voir les tarifs"
      />
    </>
  );
}
