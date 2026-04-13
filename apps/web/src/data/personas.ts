export interface PersonaData {
  id: string;
  slug: string;
  label: string;
  heroTitle: string;
  heroSubtitle: string;
  heroQuestion: string;
  heroImage: string;
  heroImagePosition?: string;
  painPoints: {
    title: string;
    description: string;
    icon: string;
  }[];
  solutions: {
    title: string;
    description: string;
  }[];
  results: {
    metric: string;
    description: string;
  }[];
  ctaTitle: string;
  ctaDescription: string;
  metaTitle: string;
  metaDescription: string;
}

export const PERSONAS_DATA: PersonaData[] = [
  {
    id: 'dirigeant',
    slug: 'dirigeant',
    label: 'Dirigeant TPE/PME',
    heroTitle: 'Votre IT vous freine au lieu de vous propulser ?',
    heroSubtitle: 'Dirigeant TPE/PME',
    heroImage: '/images/heroes/dirigeant.jpg',
    heroImagePosition: 'center 20%',
    heroQuestion:
      'Pannes répétées, prestataires qui ne répondent plus, factures incompréhensibles... Vous méritez un IT qui travaille pour vous, pas contre vous.',
    painPoints: [
      {
        title: 'Pannes à répétition',
        description:
          "Serveur en panne le lundi matin, emails bloqués, logiciel métier inaccessible. Chaque incident vous coûte du temps et de l'argent.",
        icon: 'AlertTriangle',
      },
      {
        title: 'Factures opaques',
        description:
          'Votre prestataire facture des heures que vous ne comprenez pas. Impossible de savoir si vous payez le juste prix.',
        icon: 'Receipt',
      },
      {
        title: 'Aucune vision stratégique',
        description:
          "Personne ne vous conseille sur les bons choix technologiques. Vous accumulez les solutions au fil de l'eau sans cohérence.",
        icon: 'Compass',
      },
      {
        title: 'Dépendance au prestataire',
        description:
          "Tout repose sur un seul interlocuteur. S'il part, vous perdez toute la connaissance de votre SI.",
        icon: 'Lock',
      },
    ],
    solutions: [
      {
        title: 'Audit IT complet',
        description:
          "On cartographie votre existant, identifie les risques et propose un plan d'action priorisé avec un budget clair.",
      },
      {
        title: 'Pilotage stratégique',
        description:
          'Un DSI externalisé qui définit votre feuille de route IT alignée sur vos objectifs business.',
      },
      {
        title: 'Infogérance transparente',
        description:
          'Maintenance proactive, rapports mensuels, SLA clairs. Vous savez exactement ce qui est fait et pourquoi.',
      },
      {
        title: 'Documentation complète',
        description: 'Votre SI est documenté. Plus de dépendance à un prestataire unique.',
      },
    ],
    results: [
      { metric: '-60%', description: 'de tickets incidents en 6 mois' },
      { metric: '4h', description: 'temps de réponse moyen garanti' },
      { metric: '100%', description: 'de votre SI documenté' },
    ],
    ctaTitle: 'Reprenez le contrôle de votre IT',
    ctaDescription: 'Un diagnostic gratuit de 30 minutes pour identifier vos priorités.',
    metaTitle: 'Dirigeant TPE/PME - Votre IT vous freine ?',
    metaDescription:
      'Pannes, factures opaques, aucune vision stratégique ? Apio systems accompagne les dirigeants TPE/PME avec un IT fiable et transparent.',
  },
  {
    id: 'presence',
    slug: 'presence',
    label: 'Présence en ligne',
    heroTitle: 'Vos clients vous cherchent en ligne et ne vous trouvent pas ?',
    heroSubtitle: 'Présence en ligne',
    heroImage: '/images/heroes/presence.jpg',
    heroQuestion:
      "Pas de site web, un email en @gmail.com, aucune fiche Google... Aujourd'hui, un artisan ou un indépendant sans présence en ligne perd des clients chaque jour sans le savoir.",
    painPoints: [
      {
        title: 'Email pas professionnel',
        description:
          'Vous envoyez vos devis depuis une adresse @gmail.com ou @orange.fr. Vos prospects doutent de votre sérieux avant même de vous rencontrer.',
        icon: 'Mail',
      },
      {
        title: 'Aucun site web',
        description:
          'Votre seule vitrine est une page Facebook ou un profil Pages Jaunes. Vos concurrents avec un site captent les clients qui vous cherchent.',
        icon: 'Globe',
      },
      {
        title: 'Introuvable sur Google',
        description:
          "Quand un prospect tape votre métier + votre ville, il tombe sur vos concurrents. Vous n'existez pas sur Google Maps ni dans les résultats.",
        icon: 'Search',
      },
      {
        title: 'Pas de maîtrise de votre image',
        description:
          "Vous n'avez aucun contrôle sur ce que les gens trouvent quand ils cherchent votre entreprise. Avis, photos, coordonnées : tout est dispersé.",
        icon: 'Eye',
      },
    ],
    solutions: [
      {
        title: 'Email professionnel à votre nom',
        description:
          'Une adresse contact@votre-entreprise.fr qui inspire confiance. Configuration complète avec accès sur téléphone et ordinateur.',
      },
      {
        title: 'Site vitrine clé en main',
        description:
          'Un site simple, rapide, adapté au mobile qui présente votre activité, vos réalisations et permet de vous contacter facilement.',
      },
      {
        title: 'Fiche Google Business optimisée',
        description:
          'Création et optimisation de votre fiche Google pour apparaître sur Maps et dans les recherches locales. Photos, horaires, avis.',
      },
      {
        title: 'Nom de domaine et hébergement',
        description:
          "On réserve votre nom de domaine, on gère l'hébergement et la maintenance. Vous n'avez rien de technique à faire.",
      },
    ],
    results: [
      { metric: '+70%', description: 'de demandes de devis via le site' },
      { metric: 'J+1', description: 'apparition sur Google Maps' },
      { metric: '0€/mois', description: 'de compétences techniques requises' },
    ],
    ctaTitle: 'Existez enfin sur Internet',
    ctaDescription:
      "On s'occupe de tout : domaine, email pro, site et fiche Google. Vous n'avez qu'à exercer votre métier.",
    metaTitle: 'Présence en ligne pour artisans et indépendants',
    metaDescription:
      'Email professionnel, site vitrine, fiche Google : Apio systems crée votre présence en ligne clé en main. Idéal pour artisans, commerçants et indépendants.',
  },
  {
    id: 'dsi',
    slug: 'dsi',
    label: 'DSI externalisé',
    heroTitle: "Besoin d'un regard expert sans recruter un DSI ?",
    heroSubtitle: 'DSI externalisé',
    heroImage: '/images/heroes/dsi.jpg',
    heroQuestion:
      'Un DSI à temps plein coûte 80 à 120k€/an. Un DSI externalisé vous apporte la même expertise stratégique pour une fraction du coût.',
    painPoints: [
      {
        title: "Décisions IT à l'aveugle",
        description:
          'Cloud ou on-premise ? Quel ERP ? Quel prestataire ? Sans expert, chaque décision est un pari.',
        icon: 'HelpCircle',
      },
      {
        title: 'Budget IT incontrôlé',
        description:
          'Licences inutilisées, doublons, contrats renouvelés par habitude. Votre budget IT fuit de partout.',
        icon: 'TrendingDown',
      },
      {
        title: 'Projets IT en échec',
        description:
          "Migration ratée, déploiement ERP qui s'éternise, prestataire qui ne livre pas. Sans pilotage, les projets dérivent.",
        icon: 'XCircle',
      },
      {
        title: 'Sécurité négligée',
        description:
          'Pas de politique de sauvegarde, mots de passe faibles, aucun plan de continuité. Un ransomware peut tout arrêter.',
        icon: 'ShieldAlert',
      },
    ],
    solutions: [
      {
        title: 'Comité IT mensuel',
        description:
          'Revue de votre SI, indicateurs clés, décisions éclairées. Comme un DSI, mais à temps partiel.',
      },
      {
        title: 'Schéma directeur IT',
        description:
          'Feuille de route à 3 ans alignée sur votre stratégie business. Priorisation des investissements.',
      },
      {
        title: 'Pilotage de projets',
        description:
          'Cahier des charges, sélection prestataires, suivi de réalisation. Vos projets IT sont livrés dans les temps et le budget.',
      },
      {
        title: 'Politique de sécurité',
        description:
          'PRA/PCA, sauvegardes, sensibilisation équipes, conformité RGPD. Votre SI est protégé.',
      },
    ],
    results: [
      { metric: '-30%', description: 'sur le budget IT annuel' },
      { metric: '100%', description: 'des projets livrés dans le budget' },
      { metric: '0', description: "jour d'arrêt non planifié" },
    ],
    ctaTitle: 'Votre DSI, sans le recruter',
    ctaDescription: 'Découvrez comment un DSI externalisé peut transformer votre IT en 30 minutes.',
    metaTitle: 'DSI externalisé - Expertise IT sans recruter',
    metaDescription:
      "Un DSI externalisé pour TPE/PME : stratégie IT, pilotage projets, sécurité, budget. L'expertise d'un DSI pour une fraction du coût.",
  },
  {
    id: 'infogerance',
    slug: 'infogerance',
    label: 'Infogérance',
    heroTitle: 'Votre prestataire IT ne répond plus ?',
    heroSubtitle: 'Infogérance',
    heroImage: '/images/heroes/infogerance.jpg',
    heroQuestion:
      'Temps de réponse interminable, interventions opaques, problèmes récurrents jamais résolus. Il est temps de changer.',
    painPoints: [
      {
        title: 'Temps de réponse inacceptable',
        description:
          'Ticket ouvert depuis 3 jours, aucune nouvelle. Vos collaborateurs compensent avec des solutions de fortune.',
        icon: 'Clock',
      },
      {
        title: 'Interventions opaques',
        description:
          'Vous ne savez pas ce qui a été fait, ni pourquoi. Impossible de vérifier si le travail est correctement réalisé.',
        icon: 'EyeOff',
      },
      {
        title: 'Problèmes récurrents',
        description:
          'Les mêmes pannes reviennent chaque mois. On traite les symptômes, jamais les causes.',
        icon: 'RefreshCw',
      },
      {
        title: 'Aucune proactivité',
        description:
          'Votre prestataire attend que ça casse pour intervenir. Aucune maintenance préventive, aucune veille.',
        icon: 'BellOff',
      },
    ],
    solutions: [
      {
        title: 'SLA contractuels',
        description:
          'Temps de réponse garantis par contrat : 1h en critique, 4h en standard. Avec pénalités.',
      },
      {
        title: 'Rapports mensuels',
        description:
          'Dashboard avec tous les tickets, temps de résolution, actions préventives. Transparence totale.',
      },
      {
        title: 'Maintenance proactive',
        description:
          "Monitoring 24/7, mises à jour planifiées, alertes anticipées. On résout les problèmes avant qu'ils n'impactent vos équipes.",
      },
      {
        title: 'Interlocuteur dédié',
        description:
          'Un référent technique qui connaît votre environnement. Pas de ticket anonyme traité par un inconnu.',
      },
    ],
    results: [
      { metric: '1h', description: 'temps de réponse garanti (critique)' },
      { metric: '-75%', description: "d'incidents récurrents" },
      { metric: '99.9%', description: 'de disponibilité serveurs' },
    ],
    ctaTitle: 'Une infogérance qui répond vraiment',
    ctaDescription: "Audit gratuit de votre contrat d'infogérance actuel et recommandations.",
    metaTitle: 'Infogérance - Votre prestataire IT ne répond plus ?',
    metaDescription:
      "Temps de réponse garantis, maintenance proactive, rapports transparents. Apio systems réinvente l'infogérance pour les TPE/PME.",
  },
  {
    id: 'delivrabilite-email',
    slug: 'delivrabilite-email',
    label: 'Délivrabilité email',
    heroTitle: 'Vos emails finissent en spam ?',
    heroSubtitle: 'Délivrabilité email',
    heroImage: '/images/heroes/delivrabilite-email.jpg',
    heroQuestion:
      "Devis non reçus, relances ignorées, newsletters qui n'arrivent jamais. Un problème de délivrabilité coûte des clients chaque jour.",
    painPoints: [
      {
        title: 'Emails en spam',
        description:
          'Vos emails importants (devis, factures, confirmations) atterrissent dans les spams de vos clients.',
        icon: 'MailX',
      },
      {
        title: 'Réputation dégradée',
        description:
          'Votre domaine est blacklisté ou mal configuré. Les serveurs destinataires rejettent vos emails.',
        icon: 'ThumbsDown',
      },
      {
        title: 'Configuration DNS absente',
        description:
          'SPF, DKIM, DMARC... Ces acronymes vous sont inconnus, mais sans eux vos emails sont suspects.',
        icon: 'FileWarning',
      },
      {
        title: 'Pas de monitoring',
        description:
          "Vous ne savez même pas que vos emails n'arrivent pas. Vos clients pensent que vous les ignorez.",
        icon: 'EyeOff',
      },
    ],
    solutions: [
      {
        title: 'Audit délivrabilité complet',
        description:
          'Analyse SPF, DKIM, DMARC, réputation IP, blacklists, en-têtes. Diagnostic précis de la situation.',
      },
      {
        title: 'Configuration DNS',
        description:
          'Mise en place de SPF, DKIM et DMARC avec politique progressive. Vos emails sont authentifiés.',
      },
      {
        title: 'Nettoyage de réputation',
        description:
          "Demandes de retrait des blacklists, échauffement progressif, bonnes pratiques d'envoi.",
      },
      {
        title: 'Monitoring continu',
        description:
          'Alertes en cas de dégradation, rapports DMARC automatisés, veille sur la réputation.',
      },
    ],
    results: [
      { metric: '98%', description: 'de taux de délivrabilité inbox' },
      { metric: '0', description: 'blacklist active' },
      { metric: '48h', description: 'pour corriger une configuration DNS' },
    ],
    ctaTitle: "Vos emails méritent d'arriver à destination",
    ctaDescription: 'Test gratuit de délivrabilité de votre domaine avec rapport détaillé.',
    metaTitle: 'Délivrabilité email - Vos emails finissent en spam ?',
    metaDescription:
      'SPF, DKIM, DMARC, réputation, blacklists. Apio systems diagnostique et corrige vos problèmes de délivrabilité email.',
  },
  {
    id: 'budget-it',
    slug: 'budget-it',
    label: 'Budget IT',
    heroTitle: 'Votre budget IT vous échappe ?',
    heroSubtitle: 'Budget IT',
    heroImage: '/images/heroes/budget-it.jpg',
    heroQuestion:
      "Factures surprises, abonnements oubliés, licences inutilisées, coûts cachés... Vous dépensez sans savoir où va l'argent et sans pouvoir anticiper.",
    painPoints: [
      {
        title: 'Factures surprises',
        description:
          'Chaque mois apporte son lot de factures imprévues. Dépassements, frais cachés, options activées sans votre accord.',
        icon: 'Receipt',
      },
      {
        title: 'Abonnements incontrôlés',
        description:
          'SaaS empilés au fil des années, doublons entre services, licences payées pour des collaborateurs partis depuis longtemps.',
        icon: 'TrendingDown',
      },
      {
        title: 'Aucune visibilité budgétaire',
        description:
          'Impossible de répondre à "combien coûte notre IT ?". Pas de budget prévisionnel, pas de suivi, pas de comparaison.',
        icon: 'EyeOff',
      },
      {
        title: 'Coûts cachés',
        description:
          'Maintenance non planifiée, dette technique, contrats auto-renouvelés. Le vrai coût de votre IT est bien supérieur à ce que vous pensez.',
        icon: 'AlertTriangle',
      },
    ],
    solutions: [
      {
        title: 'Audit financier IT',
        description:
          'Inventaire complet de vos dépenses IT : licences, abonnements, contrats, matériel. On identifie chaque euro dépensé.',
      },
      {
        title: 'Rationalisation des coûts',
        description:
          'Suppression des doublons, renégociation des contrats, migration vers des alternatives plus économiques. Des économies concrètes.',
      },
      {
        title: 'Budget prévisionnel',
        description:
          'Un budget IT annuel structuré avec suivi mensuel. Vous savez exactement ce que vous dépensez et ce qui est prévu.',
      },
      {
        title: 'Tarification transparente',
        description:
          'Nos interventions sont forfaitisées. Pas de surprise, pas de dépassement. Vous validez avant, vous payez après.',
      },
    ],
    results: [
      { metric: '-35%', description: 'sur le budget IT annuel' },
      { metric: '0', description: 'facture surprise' },
      { metric: '100%', description: 'de visibilité sur vos coûts IT' },
    ],
    ctaTitle: 'Reprenez le contrôle de votre budget IT',
    ctaDescription: 'Un audit gratuit de vos dépenses IT pour identifier les économies immédiates.',
    metaTitle: 'Budget IT - Vos dépenses IT vous échappent ?',
    metaDescription:
      'Factures surprises, abonnements inutiles, aucune visibilité. Apio systems audite et optimise votre budget IT pour des économies concrètes.',
  },
];

export function getPersonaBySlug(slug: string): PersonaData | undefined {
  return PERSONAS_DATA.find((p) => p.slug === slug);
}
