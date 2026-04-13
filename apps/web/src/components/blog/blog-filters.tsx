'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useRef, useState, Suspense } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BlogFiltersProps {
  tags: { name: string; slug: string }[];
}

function BlogFiltersInner({ tags }: BlogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeTag = searchParams.get('tag') ?? '';
  const searchQuery = searchParams.get('search') ?? '';

  const [inputValue, setInputValue] = useState(searchQuery);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null);

  const buildUrl = useCallback(
    (overrides: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      // Reset to page 1 on filter change
      params.delete('page');
      for (const [key, value] of Object.entries(overrides)) {
        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
      }
      const qs = params.toString();
      return qs ? `/blog?${qs}` : '/blog';
    },
    [searchParams]
  );

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  function handleSearchChange(value: string) {
    setInputValue(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      router.push(buildUrl({ search: value || null }));
    }, 300);
  }

  function handleTagClick(slug: string) {
    router.push(buildUrl({ tag: slug === activeTag ? null : slug }));
  }

  function resetFilters() {
    setInputValue('');
    router.push('/blog');
  }

  const hasFilters = activeTag || searchQuery;

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Rechercher un article…"
          value={inputValue}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button key={tag.slug} onClick={() => handleTagClick(tag.slug)}>
              <Badge
                variant={tag.slug === activeTag ? 'default' : 'secondary'}
                className="cursor-pointer"
              >
                {tag.name}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {hasFilters && (
        <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1.5">
          <X className="h-3.5 w-3.5" />
          Réinitialiser les filtres
        </Button>
      )}
    </div>
  );
}

export function BlogFilters(props: BlogFiltersProps) {
  return (
    <Suspense>
      <BlogFiltersInner {...props} />
    </Suspense>
  );
}
