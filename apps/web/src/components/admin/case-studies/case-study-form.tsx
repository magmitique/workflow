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
import { ImageUpload } from '@/components/admin/image-upload';
import { SlugInput } from '@/components/admin/slug-input';
import type { CaseStudyCreateInput, CaseStudyResultInput, ContentStatus } from '@apio/shared';
import { Plus, Trash2 } from 'lucide-react';

interface CaseStudyFormProps {
  initialData?: {
    title: string;
    slug: string;
    clientName: string;
    clientAnonymous: boolean;
    sector: string | null;
    status: ContentStatus;
    featured: boolean;
    context: string | null;
    challenge: string | null;
    solution: string | null;
    testimonialQuote: string | null;
    testimonialAuthor: string | null;
    testimonialRole: string | null;
    coverImage: string | null;
    architectureDiagram: string | null;
    techStack: string[] | null;
    results: CaseStudyResultInput[];
  };
  onSubmit: (data: CaseStudyCreateInput) => void;
  isPending: boolean;
  submitLabel: string;
}

export function CaseStudyForm({
  initialData,
  onSubmit,
  isPending,
  submitLabel,
}: CaseStudyFormProps) {
  const [title, setTitle] = useState(initialData?.title ?? '');
  const [slug, setSlug] = useState(initialData?.slug ?? '');
  const [clientName, setClientName] = useState(initialData?.clientName ?? '');
  const [clientAnonymous, setClientAnonymous] = useState(initialData?.clientAnonymous ?? false);
  const [sector, setSector] = useState(initialData?.sector ?? '');
  const [status, setStatus] = useState<ContentStatus>(initialData?.status ?? 'DRAFT');
  const [featured, setFeatured] = useState(initialData?.featured ?? false);
  const [context, setContext] = useState(initialData?.context ?? '');
  const [challenge, setChallenge] = useState(initialData?.challenge ?? '');
  const [solution, setSolution] = useState(initialData?.solution ?? '');
  const [testimonialQuote, setTestimonialQuote] = useState(initialData?.testimonialQuote ?? '');
  const [testimonialAuthor, setTestimonialAuthor] = useState(initialData?.testimonialAuthor ?? '');
  const [testimonialRole, setTestimonialRole] = useState(initialData?.testimonialRole ?? '');
  const [coverImage, setCoverImage] = useState(initialData?.coverImage ?? '');
  const [architectureDiagram, setArchitectureDiagram] = useState(
    initialData?.architectureDiagram ?? ''
  );
  const [techStackStr, setTechStackStr] = useState(initialData?.techStack?.join(', ') ?? '');
  const [results, setResults] = useState<CaseStudyResultInput[]>(initialData?.results ?? []);

  const addResult = () => {
    setResults([...results, { metric: '', before: '', after: '' }]);
  };

  const removeResult = (index: number) => {
    setResults(results.filter((_, i) => i !== index));
  };

  const updateResult = (index: number, field: keyof CaseStudyResultInput, value: string) => {
    setResults(results.map((r, i) => (i === index ? { ...r, [field]: value } : r)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const techStack = techStackStr
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const validResults = results.filter((r) => r.metric && r.before && r.after);

    onSubmit({
      title,
      slug,
      clientName,
      clientAnonymous,
      sector: sector || undefined,
      status,
      featured,
      context: context || undefined,
      challenge: challenge || undefined,
      solution: solution || undefined,
      testimonialQuote: testimonialQuote || undefined,
      testimonialAuthor: testimonialAuthor || undefined,
      testimonialRole: testimonialRole || undefined,
      coverImage: initialData ? coverImage : coverImage || undefined,
      architectureDiagram: initialData ? architectureDiagram : architectureDiagram || undefined,
      techStack: techStack.length > 0 ? techStack : undefined,
      results: validResults.length > 0 ? validResults : undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Général */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Général</legend>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">Titre</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Titre du cas client"
              required
            />
          </div>
          <SlugInput value={slug} onChange={setSlug} title={title} autoGenerate={!initialData} />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="clientName">Nom du client</Label>
            <Input
              id="clientName"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="Nom de l'entreprise"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="sector">Secteur</Label>
            <Input
              id="sector"
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              placeholder="Ex: Industrie, SaaS, E-commerce..."
            />
          </div>
        </div>

        <div className="flex items-center gap-6">
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={clientAnonymous}
              onChange={(e) => setClientAnonymous(e.target.checked)}
              className="rounded border-gray-300"
            />
            Client anonyme
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="rounded border-gray-300"
            />
            Mis en avant
          </label>
        </div>

        <div className="w-48">
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
      </fieldset>

      {/* Contenu */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Contenu</legend>
        <div className="space-y-2">
          <Label htmlFor="context">Contexte</Label>
          <Textarea
            id="context"
            value={context}
            onChange={(e) => setContext(e.target.value)}
            placeholder="Décrivez le contexte du projet..."
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="challenge">Challenge</Label>
          <Textarea
            id="challenge"
            value={challenge}
            onChange={(e) => setChallenge(e.target.value)}
            placeholder="Décrivez le challenge..."
            className="min-h-[100px]"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="solution">Solution</Label>
          <Textarea
            id="solution"
            value={solution}
            onChange={(e) => setSolution(e.target.value)}
            placeholder="Décrivez la solution apportée..."
            className="min-h-[100px]"
          />
        </div>
      </fieldset>

      {/* Résultats */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Résultats</legend>
        {results.map((result, index) => (
          <div key={index} className="flex items-end gap-2">
            <div className="flex-1 space-y-1">
              <Label>Indicateur</Label>
              <Input
                value={result.metric}
                onChange={(e) => updateResult(index, 'metric', e.target.value)}
                placeholder="Ex: Temps de réponse"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Label>Avant</Label>
              <Input
                value={result.before}
                onChange={(e) => updateResult(index, 'before', e.target.value)}
                placeholder="Ex: 3s"
              />
            </div>
            <div className="flex-1 space-y-1">
              <Label>Après</Label>
              <Input
                value={result.after}
                onChange={(e) => updateResult(index, 'after', e.target.value)}
                placeholder="Ex: 200ms"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => removeResult(index)}
              className="text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={addResult}>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter un résultat
        </Button>
      </fieldset>

      {/* Témoignage */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Témoignage</legend>
        <div className="space-y-2">
          <Label htmlFor="testimonialQuote">Citation</Label>
          <Textarea
            id="testimonialQuote"
            value={testimonialQuote}
            onChange={(e) => setTestimonialQuote(e.target.value)}
            placeholder="Citation du client..."
            className="min-h-[80px]"
          />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="testimonialAuthor">Auteur</Label>
            <Input
              id="testimonialAuthor"
              value={testimonialAuthor}
              onChange={(e) => setTestimonialAuthor(e.target.value)}
              placeholder="Nom de l'auteur"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="testimonialRole">Rôle</Label>
            <Input
              id="testimonialRole"
              value={testimonialRole}
              onChange={(e) => setTestimonialRole(e.target.value)}
              placeholder="CTO, CEO..."
            />
          </div>
        </div>
      </fieldset>

      {/* Médias */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold">Médias</legend>
        <ImageUpload value={coverImage} onUpload={setCoverImage} label="Image de couverture" />
        <ImageUpload
          value={architectureDiagram}
          onUpload={setArchitectureDiagram}
          label="Diagramme d'architecture"
        />
      </fieldset>

      {/* Tech stack */}
      <div className="space-y-2">
        <Label htmlFor="techStack">Stack technique (séparée par des virgules)</Label>
        <Input
          id="techStack"
          value={techStackStr}
          onChange={(e) => setTechStackStr(e.target.value)}
          placeholder="React, Node.js, PostgreSQL..."
        />
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isPending}>
          {isPending ? 'Enregistrement...' : submitLabel}
        </Button>
      </div>
    </form>
  );
}
