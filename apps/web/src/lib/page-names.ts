const PAGE_NAMES: Record<string, string> = {
  '/': 'Accueil',
  '/dirigeant': 'Dirigeant',
  '/presence': 'Presence en ligne',
  '/dsi': 'DSI externalisé',
  '/infogerance': 'Infogérance',
  '/delivrabilite-email': 'Email',
  '/support': 'Support',
  '/tarifs': 'Tarifs',
  '/a-propos': 'À propos',
  '/contact': 'Contact',
  '/blog': 'Blog',
  '/cas-clients': 'Cas clients',
  '/mentions-legales': 'Mentions légales',
  '/charte-confidentialite': 'Charte de confidentialité',
  '/cgv': 'Conditions générales de vente',
  '/engagements': 'Engagements',
  '/ecosysteme': 'Écosystème',
  '/budget-it': 'Budget IT',
};

function slugToLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getPageName(url: string): string {
  const exact = PAGE_NAMES[url];
  if (exact) return exact;

  if (url.startsWith('/blog/')) {
    const slug = url.replace('/blog/', '');
    return `Blog : ${slugToLabel(slug)}`;
  }

  if (url.startsWith('/cas-clients/')) {
    const slug = url.replace('/cas-clients/', '');
    return `Cas client : ${slugToLabel(slug)}`;
  }

  return url;
}
