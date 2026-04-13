'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'apio_analytics';

declare global {
  interface Window {
    _paq?: Array<unknown[]>;
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === 'optout') {
      window._paq?.push(['optUserOut']);
      return;
    }

    if (!stored) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function optOut() {
    localStorage.setItem(STORAGE_KEY, 'optout');
    window._paq?.push(['optUserOut']);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Bandeau cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-background p-4 shadow-lg md:flex md:items-center md:justify-between md:gap-4 md:px-8"
    >
      <p className="text-sm text-muted-foreground">
        Ce site utilise Matomo pour mesurer l&apos;audience de manière anonyme, sans cookie et dans
        le respect de votre vie privée.{' '}
        <Link href="/charte-confidentialite#cookies" className="underline hover:text-foreground">
          En savoir plus
        </Link>
      </p>
      <div className="mt-3 flex gap-2 md:mt-0 md:shrink-0">
        <Button size="sm" variant="ghost" onClick={optOut}>
          Se désinscrire
        </Button>
        <Button size="sm" onClick={accept}>
          Continuer
        </Button>
      </div>
    </div>
  );
}
