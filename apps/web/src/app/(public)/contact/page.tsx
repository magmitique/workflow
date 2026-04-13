import type { Metadata } from 'next';
import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { ContactForm } from '@/components/forms/contact-form';
import { H1, P } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez Apio systems pour un diagnostic IT gratuit. Décrivez votre besoin, nous vous répondons sous 24h.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <>
      <Section className="relative overflow-hidden py-20 md:py-32">
        <Image
          src="/images/heroes/contact.jpg"
          alt="Réunion de travail autour d'un projet"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
        <div className="relative z-10 max-w-xl text-anthracite-foreground">
          <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
            <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />
            Contact
          </P>
          <H1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Parlons de votre projet
          </H1>
          <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">
            Remplissez ce formulaire en quelques minutes. Nous vous répondons sous 24h ouvrées avec
            une première analyse gratuite.
          </P>
        </div>
      </Section>

      <Section>
        <ContactForm />
      </Section>
    </>
  );
}
