import type { Metadata } from 'next';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { ENGAGEMENTS_SECTIONS, OPEN_SOURCE_PROJECTS, WORDPRESS_PLUGINS } from '@/data/engagements';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card, CardContent } from '@/components/ui/card';
import { CTASection } from '@/components/ui/cta-section';
import { H1, H3, P } from '@/components/ui/typography';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Nos engagements - Souveraineté, open source, hébergement responsable',
  description:
    "Souveraineté numérique, hébergement responsable, open source et service NTP public. Les engagements concrets d'Apio systems.",
  alternates: { canonical: '/engagements' },
};

function AnchorNav() {
  return (
    <nav aria-label="Sections de la page" className="flex flex-wrap gap-3">
      {ENGAGEMENTS_SECTIONS.map((section) => (
        <Link
          key={section.id}
          href={`#${section.id}`}
          className="rounded-full border border-anthracite-foreground/30 px-4 py-2 text-sm text-anthracite-foreground transition-colors hover:border-brand-yellow hover:text-brand-yellow"
        >
          {section.title}
        </Link>
      ))}
    </nav>
  );
}

export default function EngagementsPage() {
  return (
    <>
      {/* Hero */}
      <Section className="relative overflow-hidden py-20 md:py-32">
        <Image
          src="/images/heroes/engagements.jpg"
          alt="Infrastructure réseau et serveurs"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
        <div className="relative z-10 max-w-xl text-anthracite-foreground">
          <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
            <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />
            Nos engagements
          </P>
          <H1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Ce en quoi on croit, concrètement
          </H1>
          <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">
            Souveraineté des données, hébergement responsable, logiciel libre et services publics.
            Nos engagements ne sont pas des slogans : ils se traduisent dans chaque choix technique.
          </P>
          <div className="mt-10">
            <AnchorNav />
          </div>
        </div>
      </Section>

      {/* Sections dynamiques */}
      {ENGAGEMENTS_SECTIONS.map((section, index) => {
        const isOpenSource = section.id === 'open-source';
        const isEven = index % 2 === 1;

        return (
          <Section
            key={section.id}
            id={section.id}
            className={`scroll-mt-20 ${isEven ? 'bg-muted' : ''}`}
          >
            <SectionHeading title={section.title} subtitle={section.description} />

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {section.items.map((item) => (
                <Card key={item.title}>
                  <CardContent>
                    <H3 className="text-lg font-semibold">{item.title}</H3>
                    <P className="mt-2 text-sm">{item.description}</P>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Projets open source */}
            {isOpenSource && (
              <>
              <div className="mt-10">
                <P className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Projets auxquels nous contribuons, que nous utilisons et recommandons
                </P>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {OPEN_SOURCE_PROJECTS.map((project) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="h-full transition-all group-hover:border-primary group-hover:shadow-md">
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <H3 className="text-base font-semibold group-hover:text-primary">
                              {project.name}
                            </H3>
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                          <P className="mt-1 text-sm">{project.description}</P>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
              <div className="mt-10">
                <P className="mb-6 text-center text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                  Plugins Wordpress auxquels nous contribuons, que nous utilisons et recommandons
                </P>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {WORDPRESS_PLUGINS.map((project) => (
                    <a
                      key={project.name}
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group"
                    >
                      <Card className="h-full transition-all group-hover:border-primary group-hover:shadow-md">
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <H3 className="text-base font-semibold group-hover:text-primary">
                              {project.name}
                            </H3>
                            <ExternalLink className="h-3.5 w-3.5 text-muted-foreground" />
                          </div>
                          <P className="mt-1 text-sm">{project.description}</P>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </div>
              </>
            )}

            {/* Lien NTP stats */}
            {section.id === 'ntp' && (
              <div className="mt-8 text-center">
                <a
                  href="https://www.ntppool.org/scores/ntp.apio.systems"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  Voir les statistiques publiques de notre serveur NTP
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            )}
          </Section>
        );
      })}

      <CTASection
        title="Des questions sur nos engagements ?"
        description="On est transparents sur nos choix techniques et nos partenaires. Posez-nous vos questions."
      />
    </>
  );
}
