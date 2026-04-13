'use client';

import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useUploadImage } from '@/hooks/use-upload';
import { resolveImageUrl } from '@/lib/image-url';

interface ImageUploadProps {
  value: string;
  onUpload: (url: string) => void;
  label: string;
}

export function ImageUpload({ value, onUpload, label }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const upload = useUploadImage();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = await upload.mutateAsync(file);
    onUpload(result.url);

    // Reset input so the same file can be re-selected
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {value ? (
        <div className="space-y-2">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={resolveImageUrl(value) ?? value}
              alt={label}
              className="h-32 w-auto rounded-md border object-cover"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => inputRef.current?.click()}
              disabled={upload.isPending}
            >
              Modifier
            </Button>
            <Button type="button" variant="destructive" size="sm" onClick={() => onUpload('')}>
              Supprimer
            </Button>
            {upload.isPending && <span className="text-sm text-muted-foreground">Upload...</span>}
          </div>
          <Input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => void handleChange(e)}
            className="hidden"
          />
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(e) => void handleChange(e)}
            className="max-w-xs"
          />
          {upload.isPending && <span className="text-sm text-muted-foreground">Upload...</span>}
        </div>
      )}
      {upload.isError && <p className="text-sm text-destructive">{upload.error.message}</p>}
    </div>
  );
}
