import { PersonaHero } from './persona-hero';
import { PersonaPainPoints } from './persona-pain-points';
import { PersonaSolutions } from './persona-solutions';
import { PersonaResults } from './persona-results';
import { PersonaCTA } from './persona-cta';
import type { PersonaData } from '@/data/personas';

interface PersonaPageProps {
  persona: PersonaData;
}

export function PersonaPage({ persona }: PersonaPageProps) {
  return (
    <>
      <PersonaHero
        subtitle={persona.heroSubtitle}
        title={persona.heroTitle}
        description={persona.heroQuestion}
        image={persona.heroImage}
        imagePosition={persona.heroImagePosition}
      />
      <PersonaPainPoints painPoints={persona.painPoints} />
      <PersonaSolutions solutions={persona.solutions} />
      <PersonaResults results={persona.results} />
      <PersonaCTA title={persona.ctaTitle} description={persona.ctaDescription} />
    </>
  );
}
