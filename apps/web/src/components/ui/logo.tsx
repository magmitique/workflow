import Image from 'next/image';
import { cn } from '@/lib/cn';

const VARIANTS = {
  horizontal: {
    src: '/images/logo-horizontal.svg',
    width: 430,
    height: 97,
  },
  'horizontal-white': {
    src: '/images/logo-horizontal-white.svg',
    width: 430,
    height: 97,
  },
  rectangular: {
    src: '/images/logo-rectangular.svg',
    width: 237,
    height: 124,
  },
  icon: {
    src: '/images/icon.svg',
    width: 250,
    height: 250,
  },
} as const;

type LogoVariant = keyof typeof VARIANTS;

interface LogoProps {
  variant?: LogoVariant;
  height: number;
  className?: string;
  priority?: boolean;
}

export function Logo({ variant = 'horizontal', height, className, priority }: LogoProps) {
  const config = VARIANTS[variant];
  const aspectRatio = config.width / config.height;
  const width = Math.round(height * aspectRatio);

  return (
    <Image
      src={config.src}
      alt="Apio systems"
      width={width}
      height={height}
      className={cn('h-auto', className)}
      priority={priority}
    />
  );
}
