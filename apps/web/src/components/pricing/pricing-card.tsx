import Link from 'next/link';
import { Check } from 'lucide-react';
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
import { P, UL, LI } from '@/components/ui/typography';
import type { PricingTier } from '@/data/pricing';

interface PricingCardProps {
  tier: PricingTier;
}

export function PricingCard({ tier }: PricingCardProps) {
  return (
    <Card
      className={cn(
        'flex flex-col',
        tier.featured && 'border-primary bg-primary/5 shadow-lg ring-1 ring-primary'
      )}
    >
      <CardHeader>
        {tier.featured && (
          <P className="text-center text-xs font-semibold uppercase tracking-widest text-primary">
            Le plus vendu
          </P>
        )}
        <CardTitle className="text-2xl">{tier.name}</CardTitle>
        <CardDescription>{tier.description}</CardDescription>
        <div className="mt-2">
          <span className="text-3xl font-bold">{tier.price}</span>
          {tier.period && <span className="text-muted-foreground"> {tier.period}</span>}
        </div>
      </CardHeader>

      <CardContent className="flex-1">
        <UL>
          {tier.features.map((feature) => (
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
              variant: tier.featured ? 'default' : 'outline',
              size: 'lg',
            }),
            'w-full'
          )}
        >
          {tier.cta}
        </Link>
      </CardFooter>
    </Card>
  );
}
