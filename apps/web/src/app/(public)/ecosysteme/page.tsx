import type { Metadata } from 'next';
import { ECOSYSTEME_SECTIONS } from '@/data/ecosysteme';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card, CardContent } from '@/components/ui/card';
import { CTASection } from '@/components/ui/cta-section';
import { H1, H3, P } from '@/components/ui/typography';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Écosystème local - Ancré dans notre territoire',
  description:
    "Stages, éducation, partenariats locaux. Apio systems s'engage dans l'écosystème IT des Bouches-du-Rhône.",
  alternates: { canonical: '/ecosysteme' },
};

export default function EcosystemePage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden py-20 md:py-32">
        <Image
          src="/images/heroes/ecosysteme.jpg"
          alt="Paysage provençal"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
        <div className="relative z-10 max-w-xl text-anthracite-foreground">
          <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
            <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />
            Écosystème local
          </P>
          <H1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Ancré dans notre territoire
          </H1>
          <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">
            On ne fait pas que travailler dans les Bouches-du-Rhône : on s&apos;y investit.
            Formation, stages, partenariats locaux - notre engagement va au-delà de la prestation
            IT.
          </P>
        </div>
      </Section>

      {/* Sections */}
      {ECOSYSTEME_SECTIONS.map((section, index) => {
        const isEven = index % 2 === 1;

        return (
          <Section
            key={section.id}
            id={section.id}
            className={`scroll-mt-20 ${isEven ? 'bg-muted' : ''}`}
          >
            <SectionHeading title={section.title} subtitle={section.description} />
            <div className="grid gap-6 sm:grid-cols-2">
              {section.items.map((item) => (
                <Card key={item.title}>
                  <CardContent>
                    <H3 className="text-lg font-semibold">{item.title}</H3>
                    <P className="mt-2 text-sm">{item.description}</P>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Section>
        );
      })}

      <CTASection
        title="Envie de collaborer ?"
        description="Vous êtes dans la région et vous partagez nos valeurs ? Discutons de comment travailler ensemble."
      />
    </>
  );
}
