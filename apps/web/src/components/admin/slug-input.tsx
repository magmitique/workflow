'use client';

import { useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { slugify } from '@apio/shared';

interface SlugInputProps {
  value: string;
  onChange: (value: string) => void;
  title: string;
  autoGenerate?: boolean;
}

export function SlugInput({ value, onChange, title, autoGenerate = true }: SlugInputProps) {
  const touchedRef = useRef(false);

  useEffect(() => {
    if (!autoGenerate || touchedRef.current) return;
    const generated = slugify(title);
    onChange(generated);
  }, [title, autoGenerate, onChange]);

  return (
    <div className="space-y-2">
      <Label>Slug</Label>
      <div className="flex gap-2">
        <Input
          value={value}
          onChange={(e) => {
            touchedRef.current = true;
            onChange(e.target.value);
          }}
          placeholder="mon-article"
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => {
            touchedRef.current = false;
            onChange(slugify(title));
          }}
          disabled={!title.trim()}
        >
          Générer
        </Button>
      </div>
    </div>
  );
}
