'use client';

import { cn } from '@/lib/cn';
import { useIntersection } from '@/hooks/use-intersection';

interface AnimateInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateIn({ children, className, delay = 0 }: AnimateInProps) {
  const { ref, isVisible } = useIntersection({ threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
