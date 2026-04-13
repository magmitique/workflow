export interface PricingTier {
  id: string;
  name: string;
  description: string;
  price: string;
  period: string;
  featured: boolean;
  features: string[];
  cta: string;
}

export const PRICING_DATA: PricingTier[] = [
  {
    id: 'essentiel',
    name: 'Essentiel Artisan',
    description: 'Vos outils avec votre nom de domaine infogérés',
    price: 'À partir de 52,68 €',
    period: '/mois HT',
    featured: false,
    features: [
      'Hébergement site vitrine',
      'Messagerie collaborative',
      'Gestion nom de domaine et DNS',
      'Sauvegardes automatisées et vérifiées',
      'Support email pendant les heures ouvrées',
    ],
    cta: 'Choisir Essentiel Artisan',
  },
  {
    id: 'serenite',
    name: 'Pack TPE',
    description: 'Outillage complet pour gérer votre TPE sereinement',
    price: 'À partir de 89,19 €',
    period: '/mois HT',
    featured: true,
    features: [
      'Tout le pack Essentiel',
      'Hébergement CRM',
      'Hébergement Nextcloud',
      'Support illimité (téléphone + email)',
      'Monitoring proactif 24/7',
    ],
    cta: 'Choisir Pack TPE',
  },
  {
    id: 'premium',
    name: 'À la carte',
    description: 'Un accompagnement sur mesure avec astreinte et passages sur site',
    price: 'Sur mesure',
    period: '',
    featured: false,
    features: [
      'Passages sur site planifiés',
      'Audits de sécurité',
      'Comité IT mensuel (stratégie, budget, roadmap)',
      'Pilotage de projets IT (ERP, migration, etc.)',
      'Politique de sécurité (PRA/PCA, RGPD)',
    ],
    cta: 'Nous contacter',
  },
];

export interface SupportPack {
  id: string;
  name: string;
  description: string;
  responseTime: string;
  features: string[];
}

export const SUPPORT_PACKS: SupportPack[] = [
  {
    id: 'ponctuel',
    name: 'Support ponctuel',
    description: 'Pour les besoins ponctuels sans engagement',
    responseTime: 'Sous 24h ouvrées',
    features: [
      'Assistance à distance',
      'Facturation au temps passé',
      'Accès au support par email',
      "Rapport d'intervention",
    ],
  },
  {
    id: 'standard',
    name: 'Support standard',
    description: 'Pour un accompagnement régulier et prévisible',
    responseTime: 'Sous 4h ouvrées',
    features: [
      "Carnet d'heures prépayé",
      'Support téléphonique + email',
      'Maintenance préventive incluse',
      'Rapports mensuels',
      'Tarif horaire réduit',
    ],
  },
  {
    id: 'premium',
    name: 'Support premium',
    description: 'Pour les environnements critiques',
    responseTime: 'Sous 1h (critique)',
    features: [
      'Heures illimitées (forfait mensuel)',
      'Monitoring proactif 24/7',
      'Interlocuteur dédié',
      'Astreinte week-end et jours fériés',
      'PRA/PCA inclus',
      'Revue trimestrielle',
    ],
  },
];
