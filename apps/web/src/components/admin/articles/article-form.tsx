'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { MarkdownEditor } from '@/components/admin/markdown-editor';
import { ImageUpload } from '@/components/admin/image-upload';
import { SlugInput } from '@/components/admin/slug-input';
import type { ArticleCreateInput, ContentStatus } from '@apio/shared';

interface ArticleFormProps {
  initialData?: {
    title: string;
    slug: string;
    content: string;
    excerpt: string | null;
    coverImage: string | null;
    status: ContentStatus;
    metaTitle: string | null;
    metaDescription: string | null;
    tags: { name: string }[];
  };
  onSubmit: (data: ArticleCreateInput) => void;
  isPending: boolean;
  submitLabel: string;
}

export function ArticleForm({ initialData, onSubmit, isPending, submitLabel }: ArticleFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [content, setContent] = useState(initialData?.content ?? '');
  const [excerpt, setExcerpt] = useState(initialData?.excerpt ?? '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? '');
  const [status, setStatus] = useState<ContentStatus>(initialData?.status ?? 'DRAFT');
  const [metaTitle, setMetaTitle] = useState(initialData?.metaTitle ?? '');
  const [metaDescription, setMetaDescription] = useState(initialData?.metaDescription ?? '');
  const [tagsStr, setTagsStr] = useState(initialData?.tags.map((t) => t.name).join(', ') ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = tagsStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    onSubmit({
      title,
      slug,
      content,
      excerpt: excerpt || undefined,
      coverImage: initialData ? coverImage : coverImage || undefined,
      status,
      metaTitle: metaTitle || undefined,
      metaDescription: metaDescription || undefined,
      tags: tags.length > 0 ? tags : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="title">Titre</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre de l'article"
            required
          />
        </div>

        <SlugInput value={slug} onChange={setSlug} title={title} autoGenerate={!initialData} />
      </div>

      <div className="space-y-2">
        <Label>Contenu (Markdown)</Label>
        <MarkdownEditor
          value={content}
          onChange={setContent}
          placeholder="Rédigez votre article en markdown..."
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="excerpt">Extrait</Label>
        <Textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          placeholder="Résumé court de l'article (max 500 car.)"
          maxLength={500}
          className="h-20"
        />
      </div>

      <ImageUpload value={coverImage} onUpload={setCoverImage} label="Image de couverture" />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (séparés par des virgules)</Label>
          <Input
            id="tags"
            value={tagsStr}
            onChange={(e) => setTagsStr(e.target.value)}
            placeholder="React, TypeScript, Node.js"
          />
        </div>

        <div className="space-y-2">
          <Label>Statut</Label>
          <Select value={status} onValueChange={(v) => setStatus(v as ContentStatus)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DRAFT">Brouillon</SelectItem>
              <SelectItem value="PUBLISHED">Publié</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="metaTitle">Meta title (SEO)</Label>
          <Input
            id="metaTitle"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            placeholder="Titre pour les moteurs de recherche"
            maxLength={70}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="metaDescription">Meta description (SEO)</Label>
          <Input
            id="metaDescription"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder="Description pour les moteurs de recherche"
            maxLength={160}
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Enregistrement...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
