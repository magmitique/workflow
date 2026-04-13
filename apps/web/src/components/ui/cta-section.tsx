import Link from 'next/link';
import { Section } from '@/components/ui/section';
import { buttonVariants } from '@/components/ui/button';
import { H2, P } from '@/components/ui/typography';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/cn';

interface CTASectionProps {
  title: string;
  description: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}

export function CTASection({
  title,
  description,
  primaryHref = '/contact',
  primaryLabel = 'Nous contacter',
  secondaryHref,
  secondaryLabel,
}: CTASectionProps) {
  return (
    <Section className="bg-gradient-to-br from-primary to-[#004d7a] text-primary-foreground">
      <div className="text-center">
        <H2 className="text-3xl font-bold sm:text-4xl">{title}</H2>
        <P className="mx-auto mt-4 max-w-xl text-primary-foreground/80">{description}</P>
        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href={primaryHref}
            className={cn(buttonVariants({ size: 'lg', variant: 'brand' }), 'gap-2')}
          >
            {primaryLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          {secondaryHref && secondaryLabel && (
            <Link
              href={secondaryHref}
              className={cn(
                buttonVariants({ size: 'lg', variant: 'outline' }),
                'border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground'
              )}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </Section>
  );
}
