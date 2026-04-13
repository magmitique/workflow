'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';
import { buttonVariants } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { CaseStudyCarouselCard } from '@/components/case-studies/case-study-carousel-card';
import { cn } from '@/lib/cn';

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

interface FeaturedCaseStudiesProps {
  caseStudies: FeaturedCaseStudy[];
}

export function FeaturedCaseStudies({ caseStudies }: FeaturedCaseStudiesProps) {
  if (caseStudies.length === 0) return null;

  return (
    <Section>
      <SectionHeading
        title="Ils nous ont fait confiance"
        subtitle="Découvrez comment nous avons accompagné des TPE et PME dans la transformation de leur IT."
      />
      <Carousel
        opts={{ align: caseStudies.length <= 3 ? 'center' : 'start', loop: caseStudies.length > 3 }}
      >
        <CarouselContent>
          {caseStudies.map((cs) => (
            <CarouselItem key={cs.id} className="basis-[85%] sm:basis-1/2 lg:basis-1/3">
              <CaseStudyCarouselCard
                title={cs.title}
                slug={cs.slug}
                clientName={cs.clientName}
                clientAnonymous={cs.clientAnonymous}
                sector={cs.sector}
                coverImage={cs.coverImage}
                context={cs.context}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:inline-flex" />
        <CarouselNext className="hidden md:inline-flex" />
      </Carousel>
      <div className="mt-8 text-center">
        <Link href="/cas-clients" className={cn(buttonVariants({ variant: 'outline' }), 'gap-2')}>
          Voir tous les cas clients
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </Section>
  );
}
