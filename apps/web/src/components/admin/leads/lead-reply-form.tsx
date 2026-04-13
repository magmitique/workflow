'use client';

import { useState } from 'react';
import { toast } from 'sonner';
import { useSendLeadReply } from '@/hooks/use-leads';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface LeadReplyFormProps {
  leadId: string;
  leadEmail: string;
}

export function LeadReplyForm({ leadId, leadEmail }: LeadReplyFormProps) {
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const sendReply = useSendLeadReply();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;

    try {
      await sendReply.mutateAsync({
        id: leadId,
        subject: subject.trim(),
        body: body.trim(),
      });
      setSubject('');
      setBody('');
      toast.success('Email envoyé');
    } catch {
      toast.error("Erreur lors de l'envoi de l'email");
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Répondre par email</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Destinataire : <span className="font-medium text-foreground">{leadEmail}</span>
          </p>
          <div className="space-y-2">
            <Label htmlFor="reply-subject">Objet</Label>
            <Input
              id="reply-subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Re: Votre demande"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="reply-body">Message</Label>
            <Textarea
              id="reply-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Bonjour,..."
              rows={6}
              required
            />
          </div>
          <Button type="submit" disabled={sendReply.isPending || !subject.trim() || !body.trim()}>
            {sendReply.isPending ? 'Envoi...' : 'Envoyer'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
