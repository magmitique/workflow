import { cn } from '@/lib/cn';
import { H2, P } from '@/components/ui/typography';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <section id={id} className={cn('px-4 py-16 md:py-24', className)}>
      <div className="mx-auto max-w-6xl">{children}</div>
    </section>
  );
}

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeading({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn('mb-12', centered && 'text-center', className)}>
      <H2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</H2>
      {subtitle && <P className="mt-4 text-lg">{subtitle}</P>}
    </div>
  );
}
