import type { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { SUPPORT_PACKS } from '@/data/pricing';
import { Section, SectionHeading } from '@/components/ui/section';
import { CTASection } from '@/components/ui/cta-section';
import { cn } from '@/lib/cn';
import { buttonVariants } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { H1, P, UL, LI } from '@/components/ui/typography';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Support technique',
  description:
    'Packs de support IT pour TPE/PME : ponctuel, standard ou premium. Temps de réponse garantis, maintenance proactive.',
  alternates: { canonical: '/support' },
};

export default function SupportPage() {
  return (
    <>
      <Section className="relative overflow-hidden py-20 md:py-32">
        <Image
          src="/images/heroes/support.jpg"
          alt="Technicien intervenant sur un équipement"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
        <div className="relative z-10 max-w-xl text-anthracite-foreground">
          <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
            <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />
            Support technique
          </P>
          <H1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Besoin d&apos;aide maintenant ?
          </H1>
          <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">
            Un problème urgent ou un besoin récurrent ? Nos packs de support s&apos;adaptent à votre
            situation avec des temps de réponse garantis par contrat.
          </P>
        </div>
      </Section>

      <Section>
        <SectionHeading
          title="Choisissez votre niveau de support"
          subtitle="Du dépannage ponctuel à l'assistance premium avec astreinte."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {SUPPORT_PACKS.map((pack, index) => (
            <Card
              key={pack.id}
              className={cn(
                'flex flex-col',
                index === 2 && 'border-primary bg-primary/5 shadow-lg ring-1 ring-primary'
              )}
            >
              <CardHeader>
                {index === 2 && (
                  <P className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
                    Environnements critiques
                  </P>
                )}
                <CardTitle className="text-2xl">{pack.name}</CardTitle>
                <CardDescription>{pack.description}</CardDescription>
                <P className="mt-2 text-lg font-semibold text-primary">{pack.responseTime}</P>
              </CardHeader>

              <CardContent className="flex-1">
                <UL className="space-y-3">
                  {pack.features.map((feature) => (
                    <LI key={feature} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{feature}</span>
                    </LI>
                  ))}
                </UL>
              </CardContent>

              <CardFooter>
                <Link
                  href="/contact"
                  className={cn(
                    buttonVariants({
                      variant: index === 2 ? 'default' : 'outline',
                      size: 'lg',
                    }),
                    'w-full gap-2'
                  )}
                >
                  Demander un devis
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </Section>

      <CTASection
        title="Une question sur nos packs de support ?"
        description="On vous rappelle sous 24h pour discuter de votre besoin et vous proposer la formule adaptée."
        primaryLabel="Nous contacter"
      />
    </>
  );
}
