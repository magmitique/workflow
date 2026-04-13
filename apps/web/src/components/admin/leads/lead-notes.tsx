'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useAddLeadNote } from '@/hooks/use-leads';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface Note {
  id: string;
  content: string;
  createdAt: string;
  author: { id: string; name: string };
}

interface LeadNotesProps {
  leadId: string;
  notes: Note[];
}

export function LeadNotes({ leadId, notes }: LeadNotesProps) {
  const [content, setContent] = useState('');
  const addNote = useAddLeadNote();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;

    try {
      await addNote.mutateAsync({ id: leadId, content: content.trim() });
      setContent('');
      toast.success('Note ajoutée');
    } catch {
      toast.error("Erreur lors de l'ajout de la note");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Notes ({notes.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <form onSubmit={handleSubmit} className="space-y-2">
          <Textarea
            placeholder="Ajouter une note..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
          />
          <Button type="submit" size="sm" disabled={addNote.isPending || !content.trim()}>
            {addNote.isPending ? 'Ajout...' : 'Ajouter'}
          </Button>
        </form>

        {notes.length > 0 && (
          <div className="space-y-3">
            {notes.map((note) => (
              <div key={note.id} className="rounded border p-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{note.author.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(note.createdAt).toLocaleString('fr-FR')}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{note.content}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
