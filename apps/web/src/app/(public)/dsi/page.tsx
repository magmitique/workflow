import type { Metadata } from 'next';
import { getPersonaBySlug } from '@/data/personas';
import { PersonaPage } from '@/components/persona/persona-page';
import { notFound } from 'next/navigation';

const persona = getPersonaBySlug('dsi');

export const metadata: Metadata = persona
  ? {
      title: persona.metaTitle,
      description: persona.metaDescription,
      alternates: { canonical: '/dsi' },
    }
  : {};

export default function DsiPage() {
  if (!persona) notFound();
  return <PersonaPage persona={persona} />;
}
