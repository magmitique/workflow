'use client';

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersection({
  threshold = 0.1,
  rootMargin = '0px',
}: UseIntersectionOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(element);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
