export const LEAD_STATUSES = ['NEW', 'CONTACTED', 'MEETING', 'PROPOSAL', 'WON', 'LOST'] as const;

export const LEAD_STATUS_LABELS: Record<(typeof LEAD_STATUSES)[number], string> = {
  NEW: 'Nouveau',
  CONTACTED: 'Contacté',
  MEETING: 'Rendez-vous',
  PROPOSAL: 'Proposition',
  WON: 'Gagné',
  LOST: 'Perdu',
};

export const CONTENT_STATUSES = ['DRAFT', 'PUBLISHED'] as const;

export const CONTENT_STATUS_LABELS: Record<(typeof CONTENT_STATUSES)[number], string> = {
  DRAFT: 'Brouillon',
  PUBLISHED: 'Publié',
};

export const USER_ROLES = ['ADMIN', 'SUPER_ADMIN'] as const;

export const PERSONAS = [
  {
    id: 'dirigeant',
    label: 'Dirigeant TPE/PME',
    slug: 'dirigeant',
    description: 'Votre IT vous freine au lieu de vous propulser ?',
  },
  {
    id: 'presence',
    label: 'Présence en ligne',
    slug: 'presence',
    description: 'Vos clients vous cherchent en ligne et ne vous trouvent pas ?',
  },
  {
    id: 'dsi',
    label: 'DSI externalisé',
    slug: 'dsi',
    description: "Besoin d'un regard expert sans recruter un DSI ?",
  },
  {
    id: 'infogerance',
    label: 'Infogérance',
    slug: 'infogerance',
    description: 'Votre prestataire IT ne répond plus ?',
  },
  {
    id: 'delivrabilite-email',
    label: 'Délivrabilité email',
    slug: 'delivrabilite-email',
    description: 'Vos emails finissent en spam ?',
  },
] as const;

export const PRICING_TIERS = [
  {
    id: 'essentiel',
    name: 'Essentiel',
    description: 'Pour démarrer avec un accompagnement ponctuel',
    featured: false,
  },
  {
    id: 'professionnel',
    name: 'Professionnel',
    description: 'Pour structurer et sécuriser votre IT',
    featured: true,
  },
  {
    id: 'entreprise',
    name: 'Entreprise',
    description: 'Un DSI externalisé à temps partiel',
    featured: false,
  },
] as const;

export const NEED_TYPES = [
  'Audit IT',
  'Site web / Présence en ligne',
  'Infogérance',
  'DSI externalisé',
  'Délivrabilité email',
  'Support technique',
  'Autre',
] as const;

export const BUDGET_RANGES = [
  'Moins de 1 000 €',
  '1 000 € - 5 000 €',
  '5 000 € - 15 000 €',
  '15 000 € - 50 000 €',
  'Plus de 50 000 €',
  'À définir',
] as const;

export const COMPANY_SIZES = [
  '1-5 employés',
  '6-20 employés',
  '21-50 employés',
  '51-200 employés',
  '200+ employés',
] as const;

export const TIMELINES = [
  'Urgent (< 2 semaines)',
  'Court terme (1-3 mois)',
  'Moyen terme (3-6 mois)',
  'Long terme (6+ mois)',
  'Pas de deadline',
] as const;
