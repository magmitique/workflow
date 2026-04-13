export interface NavItem {
  label: string;
  href: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Dirigeant', href: '/dirigeant' },
  { label: 'Présence en ligne', href: '/presence' },
  { label: 'DSI externalisé', href: '/dsi' },
  { label: 'Infogérance', href: '/infogerance' },
  { label: 'Email', href: '/delivrabilite-email' },
  { label: 'Support', href: '/support' },
  { label: 'Tarifs', href: '/tarifs' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Blog', href: '/blog' },
];

export const FOOTER_NAV: NavGroup[] = [
  {
    label: 'Vos problématiques',
    items: [
      { label: 'Dirigeant TPE/PME', href: '/dirigeant' },
      { label: 'Présence en ligne', href: '/presence' },
      { label: 'DSI externalisé', href: '/dsi' },
      { label: 'Infogérance', href: '/infogerance' },
      { label: 'Délivrabilité email', href: '/delivrabilite-email' },
      { label: 'Budget IT', href: '/budget-it' },
    ],
  },
  {
    label: 'Notre philosophie',
    items: [
      { label: 'Nos engagements', href: '/engagements' },
      { label: 'Écosystème local', href: '/ecosysteme' },
    ],
  },
  {
    label: 'Apio systems',
    items: [
      { label: 'Tarifs', href: '/tarifs' },
      { label: 'Support', href: '/support' },
      { label: 'Blog', href: '/blog' },
      { label: 'Cas clients', href: '/cas-clients' },
      { label: 'À propos', href: '/a-propos' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    label: 'Légal',
    items: [
      { label: 'Mentions légales', href: '/mentions-legales' },
      { label: 'Charte de confidentialité', href: '/charte-confidentialite' },
      { label: 'Conditions générales de vente', href: '/cgv' },
      { label: 'Gestion des cookies', href: '/charte-confidentialite#cookies' },
    ],
  },
];
