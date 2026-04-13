import type { Metadata } from 'next';
import { getPersonaBySlug } from '@/data/personas';
import { PersonaPage } from '@/components/persona/persona-page';
import { notFound } from 'next/navigation';

const persona = getPersonaBySlug('infogerance');

export const metadata: Metadata = persona
  ? {
      title: persona.metaTitle,
      description: persona.metaDescription,
      alternates: { canonical: '/infogerance' },
    }
  : {};

export default function InfogerancePage() {
  if (!persona) notFound();
  return <PersonaPage persona={persona} />;
}
