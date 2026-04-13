import Image from 'next/image';
import { Section } from '@/components/ui/section';
import { H1, P } from '@/components/ui/typography';

interface PersonaHeroProps {
  subtitle: string;
  title: string;
  description: string;
  image: string;
  imagePosition?: string;
}

export function PersonaHero({
  subtitle,
  title,
  description,
  image,
  imagePosition,
}: PersonaHeroProps) {
  return (
    <Section className="relative overflow-hidden py-20 md:py-32">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        style={imagePosition ? { objectPosition: imagePosition } : undefined}
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-primary/60 sm:to-primary/20" />
      <div className="relative z-10 max-w-xl text-anthracite-foreground">
        <P className="mb-4 inline-flex items-center text-sm font-medium uppercase tracking-widest text-brand-yellow">
          <span className="mr-2 inline-block h-0.5 w-4 bg-brand-yellow" />
          {subtitle}
        </P>
        <H1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</H1>
        <P className="mt-6 max-w-2xl text-lg text-anthracite-foreground/80">{description}</P>
      </div>
    </Section>
  );
}
