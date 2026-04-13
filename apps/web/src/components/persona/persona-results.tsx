import { Section } from '@/components/ui/section';
import { AnimateIn } from '@/components/ui/animate-in';
import { P } from '@/components/ui/typography';

interface Result {
  metric: string;
  description: string;
}

interface PersonaResultsProps {
  results: Result[];
}

export function PersonaResults({ results }: PersonaResultsProps) {
  return (
    <Section className="bg-muted">
      <AnimateIn>
        <div className="grid gap-8 sm:grid-cols-3">
          {results.map((result) => (
            <div key={result.metric} className="text-center">
              <P className="text-4xl font-bold text-primary">{result.metric}</P>
              <P className="mt-2">{result.description}</P>
            </div>
          ))}
        </div>
      </AnimateIn>
    </Section>
  );
}
