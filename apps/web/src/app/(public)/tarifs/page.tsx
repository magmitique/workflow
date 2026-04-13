import type { Metadata } from 'next';
import Image from 'next/image';
import { PricingGrid } from '@/components/pricing/pricing-grid';
import { Section, SectionHeading } from '@/components/ui/section';
import { CTASection } from '@/components/ui/cta-section';
import { H1, H3, P } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'Tarifs',
  description:
    'Offres Apio systems pour Artisans, TPE et PME : Essentiel (audit ponctuel), Sérénité (infogérance), Premium (DSI externalisé). Tarifs sur devis.',
  alternates: { canonical: '/tarifs' },
};

export default function TarifsPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEMS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Section className="relative overflow-hidden py-20 md:py-32">
        <Image
          src="/images/heroes/tarifs.jpg"
          alt="Discussion commerciale autour d'une offre"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
        <div className="relative z-10 max-w-xl text-anthracite-foreground">
          <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
            <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />
            Tarifs
          </P>
          <H1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Des offres claires, adaptées à votre taille
          </H1>
          <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">
            Pas de surprise, pas de petit astérisque. Chaque offre est calibrée après un diagnostic
            gratuit de votre environnement. Vous savez exactement ce que vous payez et pourquoi.
          </P>
        </div>
      </Section>

      <PricingGrid />

      <Section className="bg-secondary">
        <SectionHeading
          title="Questions fréquentes"
          subtitle="Les réponses aux questions qu'on nous pose le plus souvent."
        />
        <div className="mx-auto max-w-3xl space-y-8">
          {FAQ_ITEMS.map((faq) => (
            <div key={faq.question}>
              <H3 className="text-lg font-semibold">{faq.question}</H3>
              <P className="mt-2">{faq.answer}</P>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        title="Besoin d'un devis personnalisé ?"
        description="Diagnostic gratuit de 30 minutes. On analyse votre situation et on vous propose une offre sur-mesure."
        primaryLabel="Demander un diagnostic"
      />
    </>
  );
}

const FAQ_ITEMS = [
  {
    question: 'Pourquoi les tarifs sont-ils sur devis ?',
    answer:
      "Chaque entreprise a des besoins différents. Un commerce de 5 personnes n'a pas les mêmes enjeux qu'une PME de 80 collaborateurs. Le diagnostic gratuit nous permet de calibrer précisément notre offre.",
  },
  {
    question: 'Y a-t-il un engagement de durée ?',
    answer:
      'Non, toutes nos offres sont sans engagement. Si vous ne voulez pas rester pour une quelqonque raison, on ne va pas vous retenir.',
  },
  {
    question: 'Que se passe-t-il si je dépasse le périmètre prévu ?',
    answer:
      "On vous prévient avant d'intervenir hors périmètre. Les heures supplémentaires sont facturées au tarif convenu dans votre contrat, sans mauvaise surprise.",
  },
  {
    question: 'Intervenez-vous sur site ?',
    answer:
      "Oui, quand c'est nécessaire. 90% de nos interventions se font à distance, mais nous nous déplaçons pour les audits, les mises en place et les situations critiques.",
  },
];
