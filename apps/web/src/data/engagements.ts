export interface EngagementSection {
  id: string;
  title: string;
  description: string;
  items: { title: string; description: string }[];
}

export const ENGAGEMENTS_SECTIONS: EngagementSection[] = [
  {
    id: 'souverainete',
    title: 'Souveraineté numérique',
    description:
      'Vos données vous appartiennent. On privilégie systématiquement des solutions qui garantissent votre indépendance technologique.',
    items: [
      {
        title: 'Hébergement en France',
        description:
          'Tous les services que nous opérons pour vous sont hébergés en France, chez des hébergeurs soumis au droit français et européen.',
      },
      {
        title: 'Contrôle de vos données',
        description:
          'Vous restez propriétaire de vos données à tout moment. Export, migration, suppression : vous décidez, on exécute.',
      },
      {
        title: 'Conformité RGPD',
        description:
          'Chaque solution déployée respecte le RGPD. Registre des traitements, durées de conservation, sous-traitants identifiés.',
      },
    ],
  },
  {
    id: 'hebergement',
    title: 'Hébergement responsable',
    description:
      "L'impact environnemental du numérique est réel. On choisit nos hébergeurs en fonction de leur engagement écologique.",
    items: [
      {
        title: 'Hébergeurs engagés',
        description:
          'Nos partenaires hébergeurs utilisent des énergies renouvelables et publient leurs bilans carbone. Nous privilégions des datacenters certifiés en France.',
      },
      {
        title: 'Sobriété numérique',
        description:
          "Sites légers, architectures optimisées, ressources dimensionnées au juste besoin. Moins de serveurs, moins d'énergie, moins d'impact.",
      },
      {
        title: 'Transparence carbone',
        description:
          "Notre fichier carbon.txt (accessible via /.well-known/carbon.txt) détaille notre chaîne d'hébergement et nos engagements environnementaux.",
      },
    ],
  },
  {
    id: 'open-source',
    title: 'Open source',
    description:
      'On croit au logiciel libre. On utilise, recommande et contribue à des solutions open source fiables et éprouvées.',
    items: [
      {
        title: 'Solutions éprouvées',
        description:
          'Thunderbird, mailcow, Uptime Kuma, Dolibarr... Des logiciels libres maintenus par des communautés actives, déployés en production.',
      },
      {
        title: 'Pas de vendor lock-in',
        description:
          "Avec l'open source, vous n'êtes jamais enfermé. Vous pouvez changer de prestataire sans perdre vos outils ni vos données.",
      },
      {
        title: 'Contribution communautaire',
        description:
          "Quand on trouve un bug ou qu'on améliore un outil, on contribue en retour. L'open source fonctionne quand chacun participe.",
      },
    ],
  },
  {
    id: 'ntp',
    title: 'Service NTP public',
    description:
      "On opère un serveur NTP stratum 2 ouvert à tous, parce que l'heure exacte est un bien commun.",
    items: [
      {
        title: 'ntp.apio.systems',
        description:
          'Serveur NTP stratum 2 hébergé en France, synchronisé sur des horloges de référence. Disponible gratuitement pour tous.',
      },
      {
        title: 'Statistiques publiques',
        description:
          'Les métriques de notre serveur NTP (précision, nombre de clients, disponibilité) sont consultables publiquement.',
      },
    ],
  },
];

export interface OpenSourceProject {
  name: string;
  url: string;
  description: string;
}

export const OPEN_SOURCE_PROJECTS: OpenSourceProject[] = [
  {
    name: 'Thunderbird',
    url: 'https://www.thunderbird.net',
    description: 'Client email libre et complet, alternative à Outlook.',
  },
  {
    name: 'mailcow',
    url: 'https://mailcow.email',
    description: 'Suite email auto-hébergé avec antispam, webmail et administration.',
  },
  {
    name: 'Uptime Kuma',
    url: 'https://uptime.kuma.pet',
    description: 'Monitoring de disponibilité simple et élégant.',
  },
  {
    name: 'Dolibarr',
    url: 'https://www.dolibarr.org',
    description: 'ERP/CRM open source pour TPE et PME.',
  },
  {
    name: 'Internet.nl',
    url: 'https://internet.nl',
    description: 'Test de conformité aux standards internet modernes.',
  },
];

export const WORDPRESS_PLUGINS: OpenSourceProject[] = [
  {
    name: 'Honeypot for Contact Form 7',
    url: 'https://wordpress.org/plugins/apiosys-honeypot-cf7/',
    description: 'Protection de formulaires sans appels externes et sans captcha manuel pour l\'utilisateur.',
  },
  {
    name: 'Simple Login Log',
    url: 'https://wordpress.org/plugins/simple-login-log/',
    description: 'Journalisation simple des connexions des utilisateurs.',
  }
];
