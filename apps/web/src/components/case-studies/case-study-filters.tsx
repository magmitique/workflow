'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, Suspense } from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface CaseStudyFiltersProps {
  sectors: string[];
}

function CaseStudyFiltersInner({ sectors }: CaseStudyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeSector = searchParams.get('sector') ?? '';

  const buildUrl = useCallback(
    (overrides: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete('page');
      for (const [key, value] of Object.entries(overrides)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      const qs = params.toString();
      return qs ? `/cas-clients?${qs}` : '/cas-clients';
    },
    [searchParams]
  );

  function handleSectorClick(sector: string) {
    router.push(buildUrl({ sector: sector === activeSector ? null : sector }));
  }

  function resetFilters() {
    router.push('/cas-clients');
  }

  return (
    <div className="space-y-4">
      {sectors.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {sectors.map((sector) => (
            <button key={sector} onClick={() => handleSectorClick(sector)}>
              <Badge
                variant={sector === activeSector ? 'default' : 'secondary'}
                className="cursor-pointer"
              >
                {sector}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {activeSector && (
        <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5">
          <X className="h-3.5 w-3.5" />
          Réinitialiser le filtre
        </Button>
      )}
    </div>
  );
}

export function CaseStudyFilters(props: CaseStudyFiltersProps) {
  return (
    <Suspense>
      <CaseStudyFiltersInner {...props} />
    </Suspense>
  );
}
