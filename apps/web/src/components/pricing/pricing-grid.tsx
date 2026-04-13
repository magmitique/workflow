import { Section, SectionHeading } from '@/components/ui/section';
import { PricingCard } from './pricing-card';
import { PRICING_DATA } from '@/data/pricing';

export function PricingGrid() {
  return (
    <Section>
      <SectionHeading
        title="Des offres claires, sans surprise"
        subtitle="Chaque offre est adaptée à votre taille et vos besoins. Tous les tarifs sont sur devis pour s'ajuster à votre contexte. Voici quelques exemples d'offres plébéscités par nos clients."
      />
      <div className="grid gap-8 md:grid-cols-3">
        {PRICING_DATA.map((tier) => (
          <PricingCard key={tier.id} tier={tier} />
        ))}
      </div>
    </Section>
  );
}
