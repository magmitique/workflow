'use client';

import { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { markdownToHtml } from '@/lib/markdown';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Button
          type="button"
          variant={showPreview ? 'outline' : 'default'}
          size="sm"
          onClick={() => setShowPreview(false)}
        >
          Éditeur
        </Button>
        <Button
          type="button"
          variant={showPreview ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowPreview(true)}
        >
          Aperçu
        </Button>
      </div>

      {showPreview ? (
        <div
          className="prose prose-sm max-w-none rounded-md border p-4"
          dangerouslySetInnerHTML={{ __html: markdownToHtml(value || '') }}
        />
      ) : (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="min-h-[300px] font-mono text-sm"
        />
      )}
    </div>
  );
}
