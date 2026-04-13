export interface EcosystemeSection {
  id: string;
  title: string;
  description: string;
  items: { title: string; description: string }[];
}

export const ECOSYSTEME_SECTIONS: EcosystemeSection[] = [
  {
    id: 'education',
    title: 'Éducation & recrutement',
    description:
      "Former la prochaine génération de professionnels IT, c'est investir dans notre territoire.",
    items: [
      {
        title: 'Stages IUT & écoles',
        description:
          'On accueille chaque année des stagiaires en informatique des IUT et écoles de la région. Encadrement réel sur des projets concrets, pas du classement de dossiers.',
      },
      {
        title: 'Engagement éducatif',
        description:
          "Interventions ponctuelles dans les formations locales pour partager notre expérience terrain. On croit que le métier s'apprend aussi au contact des professionnels.",
      },
    ],
  },
  {
    id: 'partenariats',
    title: 'Partenariats locaux',
    description:
      'On travaille avec les acteurs de notre territoire pour créer un écosystème IT solide et accessible.',
    items: [
      {
        title: 'Écosystème Bouches-du-Rhône',
        description:
          "On collabore avec des entreprises locales complémentaires : développeurs, graphistes, experts métier. Chacun son domaine d'excellence, au service de nos clients.",
      },
      {
        title: 'Invitation à collaborer',
        description:
          'Vous êtes un professionnel IT dans la région et vous partagez nos valeurs ? On est toujours ouverts à de nouvelles collaborations.',
      },
    ],
  },
];
