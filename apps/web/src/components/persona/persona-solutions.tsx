import { CheckCircle } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateIn } from '@/components/ui/animate-in';
import { H3, P } from '@/components/ui/typography';

interface Solution {
  title: string;
  description: string;
}

interface PersonaSolutionsProps {
  solutions: Solution[];
}

export function PersonaSolutions({ solutions }: PersonaSolutionsProps) {
  return (
    <Section className="bg-secondary">
      <AnimateIn>
        <SectionHeading
          title="Notre approche"
          subtitle="Des solutions concrètes, pas des promesses en l'air."
        />
      </AnimateIn>
      <div className="grid gap-6 sm:grid-cols-2">
        {solutions.map((solution, i) => (
          <AnimateIn key={solution.title} delay={i * 100}>
            <Card className="h-full">
              <CardContent className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <H3>{solution.title}</H3>
                  <P className="mt-1 text-sm">{solution.description}</P>
                </div>
              </CardContent>
            </Card>
          </AnimateIn>
        ))}
      </div>
    </Section>
  );
}
