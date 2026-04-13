import {
  AlertTriangle,
  BarChart,
  BellOff,
  Clock,
  Compass,
  EyeOff,
  FileWarning,
  Globe,
  HelpCircle,
  Lock,
  MailX,
  Receipt,
  RefreshCw,
  Search,
  ShieldAlert,
  Smartphone,
  ThumbsDown,
  TrendingDown,
  XCircle,
} from 'lucide-react';
import { Section, SectionHeading } from '@/components/ui/section';
import { Card, CardContent } from '@/components/ui/card';
import { AnimateIn } from '@/components/ui/animate-in';
import { H3, P } from '@/components/ui/typography';

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle,
  BarChart,
  BellOff,
  Clock,
  Compass,
  EyeOff,
  FileWarning,
  Globe,
  HelpCircle,
  Lock,
  MailX,
  ThumbsDown,
  Receipt,
  RefreshCw,
  Search,
  ShieldAlert,
  Smartphone,
  TrendingDown,
  XCircle,
};

interface PainPoint {
  title: string;
  description: string;
  icon: string;
}

interface PersonaPainPointsProps {
  painPoints: PainPoint[];
}

export function PersonaPainPoints({ painPoints }: PersonaPainPointsProps) {
  return (
    <Section>
      <AnimateIn>
        <SectionHeading
          title="Vous reconnaissez ces situations ?"
          subtitle="Ce sont les signes que votre IT a besoin d'un coup de main."
        />
      </AnimateIn>
      <div className="grid gap-6 sm:grid-cols-2">
        {painPoints.map((point, i) => {
          const Icon = ICON_MAP[point.icon] ?? AlertTriangle;
          return (
            <AnimateIn key={point.title} delay={i * 100} className="h-full">
              <Card className="h-full">
                <CardContent className="flex h-full gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <H3>{point.title}</H3>
                    <P className="mt-1 text-sm">{point.description}</P>
                  </div>
                </CardContent>
              </Card>
            </AnimateIn>
          );
        })}
      </div>
    </Section>
  );
}
