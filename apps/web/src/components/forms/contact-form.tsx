'use client';

import { useState, useId } from 'react';
import { contactFormSchema } from '@apio/shared';
import { NEED_TYPES, BUDGET_RANGES, COMPANY_SIZES, TIMELINES } from '@apio/shared';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { H2, P } from '@/components/ui/typography';
import { cn } from '@/lib/cn';
import { ArrowRight, ArrowLeft, CheckCircle, Loader2 } from 'lucide-react';

const STEPS = ['Coordonnées', 'Votre besoin', 'Budget & Délai', 'Entreprise'] as const;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  needType: string;
  message: string;
  budgetRange: string;
  timeline: string;
  company: string;
  companySize: string;
  sector: string;
}

const INITIAL_DATA: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  needType: '',
  message: '',
  budgetRange: '',
  timeline: '',
  company: '',
  companySize: '',
  sector: '',
};

type FieldErrors = Partial<Record<keyof FormData, string>>;

const PHONE_RE = /^(?:(?:\+|00)33[\s.-]?|0)[1-9](?:[\s.-]?\d{2}){4}$/;

function validateStep(step: number, data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (step === 0) {
    if (!data.email) errors.email = "L'email est requis";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) errors.email = 'Email invalide';
    if (data.phone && !PHONE_RE.test(data.phone)) errors.phone = 'Numéro de téléphone invalide';
  }
  return errors;
}

function getJourneyData(): { pagesViewed: string[]; timeOnSite: number; referrer: string } {
  if (typeof window === 'undefined') return { pagesViewed: [], timeOnSite: 0, referrer: '' };

  try {
    const stored = sessionStorage.getItem('apio_journey');
    if (stored) {
      return JSON.parse(stored) as { pagesViewed: string[]; timeOnSite: number; referrer: string };
    }
  } catch {
    // ignore
  }
  return { pagesViewed: [], timeOnSite: 0, referrer: document.referrer };
}

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormData>(INITIAL_DATA);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverError, setServerError] = useState('');

  function updateField(field: keyof FormData, value: string) {
    setData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  function next() {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function prev() {
    setStep((s) => Math.max(s - 1, 0));
  }

  async function submit() {
    const stepErrors = validateStep(step, data);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    setStatus('submitting');
    setServerError('');

    const journey = getJourneyData();
    const params = new URLSearchParams(window.location.search);

    const payload = {
      ...data,
      firstName: data.firstName || undefined,
      lastName: data.lastName || undefined,
      phone: data.phone || undefined,
      company: data.company || undefined,
      companySize: data.companySize || undefined,
      sector: data.sector || undefined,
      needType: data.needType || undefined,
      budgetRange: data.budgetRange || undefined,
      timeline: data.timeline || undefined,
      message: data.message || undefined,
      source: 'contact-form',
      pagesViewed: journey.pagesViewed.length > 0 ? journey.pagesViewed : undefined,
      timeOnSite: journey.timeOnSite || undefined,
      referrer: journey.referrer || undefined,
      utmSource: params.get('utm_source') || undefined,
      utmMedium: params.get('utm_medium') || undefined,
      utmCampaign: params.get('utm_campaign') || undefined,
      utmTerm: params.get('utm_term') || undefined,
      utmContent: params.get('utm_content') || undefined,
    };

    // Validate client-side
    const result = contactFormSchema.safeParse(payload);
    if (!result.success) {
      setStatus('error');
      setServerError('Données invalides. Veuillez vérifier vos informations.');
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000';
      const response = await fetch(`${apiUrl}/api/leads/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error('Erreur serveur');
      }

      setStatus('success');
    } catch {
      setStatus('error');
      setServerError('Une erreur est survenue. Veuillez réessayer ou nous contacter par email.');
    }
  }

  if (status === 'success') {
    return (
      <div className="flex flex-col items-center gap-4 py-12 text-center">
        <CheckCircle className="h-16 w-16 text-primary" />
        <H2 className="text-2xl font-bold">Merci pour votre message !</H2>
        <P className="max-w-md">
          Nous avons bien reçu votre demande et reviendrons vers vous sous 24h ouvrées.
        </P>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-lg">
      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold',
                i <= step ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              )}
            >
              {i + 1}
            </div>
            <span className="hidden text-xs text-muted-foreground sm:block">{label}</span>
          </div>
        ))}
      </div>

      {/* Sliding steps container */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${step * 100}%)` }}
        >
          {/* Step 0: Coordonnées */}
          <div className="w-full shrink-0">
            <div className="space-y-4">
              <H2 className="text-xl font-semibold">Vos coordonnées</H2>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Prénom"
                  value={data.firstName}
                  onChange={(v) => updateField('firstName', v)}
                />
                <Field
                  label="Nom"
                  value={data.lastName}
                  onChange={(v) => updateField('lastName', v)}
                />
              </div>
              <Field
                label="Email"
                value={data.email}
                onChange={(v) => updateField('email', v)}
                error={errors.email}
                type="email"
                required
              />
              <Field
                label="Téléphone"
                value={data.phone}
                onChange={(v) => updateField('phone', v)}
                error={errors.phone}
                type="tel"
              />
            </div>
          </div>

          {/* Step 1: Besoin */}
          <div className="w-full shrink-0">
            <div className="space-y-4">
              <H2 className="text-xl font-semibold">Votre besoin</H2>
              <SelectField
                label="Type de besoin"
                value={data.needType}
                onChange={(v) => updateField('needType', v)}
                options={NEED_TYPES}
              />
              <TextareaField
                label="Décrivez votre situation"
                value={data.message}
                onChange={(v) => updateField('message', v)}
                placeholder="En quelques mots, quel est votre problème ou votre projet ?"
              />
            </div>
          </div>

          {/* Step 2: Budget & Délai */}
          <div className="w-full shrink-0">
            <div className="space-y-4">
              <H2 className="text-xl font-semibold">Budget & Délai</H2>
              <SelectField
                label="Budget envisagé"
                value={data.budgetRange}
                onChange={(v) => updateField('budgetRange', v)}
                options={BUDGET_RANGES}
              />
              <SelectField
                label="Délai souhaité"
                value={data.timeline}
                onChange={(v) => updateField('timeline', v)}
                options={TIMELINES}
              />
            </div>
          </div>

          {/* Step 3: Entreprise */}
          <div className="w-full shrink-0">
            <div className="space-y-4">
              <H2 className="text-xl font-semibold">Votre entreprise</H2>
              <Field
                label="Nom de l'entreprise"
                value={data.company}
                onChange={(v) => updateField('company', v)}
              />
              <SelectField
                label="Taille de l'entreprise"
                value={data.companySize}
                onChange={(v) => updateField('companySize', v)}
                options={COMPANY_SIZES}
              />
              <Field
                label="Secteur d'activité"
                value={data.sector}
                onChange={(v) => updateField('sector', v)}
              />
            </div>
          </div>
        </div>
      </div>

      {serverError && (
        <P className="mt-4 text-sm text-destructive" role="alert">
          {serverError}
        </P>
      )}

      {/* Navigation */}
      <div className="mt-8 flex justify-between">
        {step > 0 ? (
          <Button variant="ghost" onClick={prev} type="button">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Précédent
          </Button>
        ) : (
          <div />
        )}

        {step < STEPS.length - 1 ? (
          <Button onClick={next} type="button">
            Suivant
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={submit} disabled={status === 'submitting'} type="button">
            {status === 'submitting' ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Envoi...
              </>
            ) : (
              'Envoyer'
            )}
          </Button>
        )}
      </div>
    </div>
  );
}

// --- Sub-components ---

function Field({
  label,
  value,
  onChange,
  error,
  type = 'text',
  required,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  required?: boolean;
}) {
  const id = useId();
  const errorId = `${id}-error`;

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        aria-required={required}
      />
      {error && (
        <P id={errorId} className="text-xs text-destructive" role="alert">
          {error}
        </P>
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: readonly string[];
}) {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id={id} className="w-full">
          <SelectValue placeholder="Sélectionnez..." />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  const id = useId();

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
      />
    </div>
  );
}
