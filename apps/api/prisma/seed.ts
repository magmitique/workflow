/// <reference types="node" />
import { PrismaClient } from '../generated/prisma/index.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // --- Admin user ---
  const admin = await prisma.user.upsert({
    where: { email: 'ping@apio.systems' },
    update: {},
    create: {
      email: 'ping@apio.systems',
      // bcrypt hash of "changeme123" - replace in production
      password: '$2a$12$kysnuwfzKwEzqqfnT/2JCeQfthGBacTwHlItxn04QihTOKRx/Osx6',
      name: 'Admin Apio',
      role: 'ADMIN',
    },
  });
  console.log(`Admin user: ${admin.email}`);

  // --- Tags ---
  const tagNames = [
    'Infogérance',
    'Cloud',
    'Sécurité',
    'Open Source',
    'TPE',
    'PME',
    'Migration',
    'Sauvegarde',
  ];
  const tags: Record<string, { id: string }> = {};
  for (const name of tagNames) {
    const slug = name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\s+/g, '-');
    const tag = await prisma.tag.upsert({
      where: { slug },
      update: {},
      create: { name, slug },
    });
    tags[name] = tag;
  }
  console.log(`Tags: ${Object.keys(tags).length} created`);

  // --- Articles ---
  const articles = [
    {
      title: "5 signes que votre infrastructure IT a besoin d'un audit",
      slug: '5-signes-audit-infrastructure-it',
      excerpt:
        "Votre réseau rame, les pannes se multiplient, les mises à jour s'accumulent… Voici les 5 signaux d'alerte qui indiquent qu'il est temps de faire auditer votre infrastructure.",
      content: `# 5 signes que votre infrastructure IT a besoin d'un audit

Beaucoup de dirigeants de TPE/PME repoussent l'audit de leur infrastructure IT jusqu'à ce qu'une panne majeure survienne. Pourtant, plusieurs signaux d'alerte permettent d'anticiper les problèmes.

## 1. Les pannes deviennent récurrentes

Si vos collaborateurs signalent régulièrement des lenteurs, des déconnexions ou des indisponibilités de service, c'est le signe d'une infrastructure vieillissante ou mal dimensionnée.

## 2. Vos sauvegardes n'ont jamais été testées

Avoir un système de sauvegarde ne suffit pas. Si vous n'avez jamais vérifié que la restauration fonctionne, vous prenez un risque majeur en cas de sinistre.

## 3. Les mises à jour de sécurité sont en retard

Des postes avec des mises à jour en retard, un firewall avec des règles obsolètes, des mots de passe jamais changés… Autant de failles exploitables.

## 4. Personne ne sait exactement ce qui tourne sur le réseau

Pas d'inventaire à jour du parc, des logiciels installés sans validation, des accès non révoqués d'anciens collaborateurs : le shadow IT est un risque réel.

## 5. Votre prestataire actuel est aux abonnés absents

Un temps de réponse de 48h pour un serveur en panne, aucune proactivité, pas de reporting : il est peut-être temps de changer d'approche.

## Conclusion

Un audit IT n'est pas une dépense, c'est un investissement. Il permet d'identifier les risques, de prioriser les actions et de construire une feuille de route réaliste pour moderniser votre SI.

**Contactez-nous pour un pré-audit gratuit de 30 minutes.**`,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2025-01-15'),
      metaTitle: "5 signes que votre infrastructure IT a besoin d'un audit - Apio systems",
      metaDescription:
        "Pannes récurrentes, sauvegardes non testées, mises à jour en retard… Découvrez les 5 signaux qui indiquent qu'il est temps d'auditer votre IT.",
      tagNames: ['Infogérance', 'Sécurité', 'TPE'],
    },
    {
      title: 'Migrer vers Nextcloud : guide pratique pour les PME',
      slug: 'migration-nextcloud-guide-pme',
      excerpt:
        "Nextcloud est l'alternative souveraine et open source aux suites cloud propriétaires. Voici les étapes clés pour réussir votre migration sans perturber l'activité.",
      content: `# Migrer vers Nextcloud : guide pratique pour les PME

De plus en plus de PME choisissent Nextcloud pour reprendre le contrôle de leurs données. Hébergé en France, open source, souverain : c'est une alternative crédible aux solutions propriétaires américaines. Encore faut-il bien préparer la migration.

## Étape 1 : Auditer l'existant

Avant toute migration, il faut cartographier l'environnement actuel : stockage de fichiers (NAS, partages réseau, Google Drive…), messagerie, agendas partagés, habitudes des utilisateurs.

## Étape 2 : Choisir l'hébergement

Nextcloud peut être auto-hébergé sur un serveur dédié ou un VPS, ou via un hébergeur spécialisé (Hetzner, OVH, Scaleway). Le choix dépend de votre volumétrie, de vos exigences de disponibilité et de vos contraintes RGPD.

## Étape 3 : Planifier la migration des données

Fichiers, contacts, calendriers : chaque type de donnée nécessite une stratégie de migration spécifique. L'outil de synchronisation Nextcloud Desktop facilite la transition. Prévoyez une coexistence temporaire entre l'ancien et le nouveau système.

## Étape 4 : Former les utilisateurs

Le déploiement technique ne représente que 50 % du projet. L'adoption par les utilisateurs est tout aussi importante. Prévoyez des sessions de formation courtes et ciblées sur le client de synchronisation et l'interface web.

## Étape 5 : Sécuriser l'environnement

Activez l'authentification à deux facteurs (TOTP), configurez le chiffrement côté serveur, paramétrez les politiques de partage et les quotas de stockage par utilisateur.

## Conclusion

Une migration Nextcloud bien menée redonne à votre PME la maîtrise de ses données, tout en réduisant les coûts de licence. L'essentiel est de ne pas brûler les étapes et de s'entourer d'un partenaire expérimenté.`,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2025-02-20'),
      metaTitle: 'Migration Nextcloud : guide complet pour PME - Apio systems',
      metaDescription:
        'Réussissez votre migration vers Nextcloud en 5 étapes. Guide pratique open source et souverain pour les PME.',
      tagNames: ['Open Source', 'Migration', 'PME'],
    },
    {
      title: "Sauvegarde 3-2-1 : la règle d'or pour protéger vos données",
      slug: 'sauvegarde-3-2-1-regle-or-protection-donnees',
      excerpt:
        "La règle 3-2-1 est le standard de référence en matière de sauvegarde. Découvrez comment l'appliquer concrètement dans votre entreprise.",
      content: `# Sauvegarde 3-2-1 : la règle d'or pour protéger vos données

Ransomware, panne matérielle, erreur humaine, incendie : les causes de perte de données sont nombreuses. La règle 3-2-1 est la méthode la plus fiable pour s'en prémunir.

## Le principe

- **3** copies de vos données (l'original + 2 sauvegardes)
- **2** supports différents (ex : NAS local + cloud)
- **1** copie hors site (ex : datacenter distant ou cloud)

## En pratique pour une TPE

1. **Sauvegarde locale** : un NAS Synology ou QNAP avec des snapshots automatiques quotidiens
2. **Sauvegarde cloud** : réplication chiffrée vers un stockage objet (Wasabi, Backblaze, S3 compatible)
3. **Test de restauration** : au moins une fois par trimestre, vérifiez que vous pouvez restaurer un fichier et un serveur complet

## Les erreurs courantes

- Sauvegarder uniquement sur un disque USB posé à côté du serveur
- Ne jamais tester la restauration
- Oublier de sauvegarder les boîtes mail et les données SaaS (Nextcloud, messagerie hébergée)
- Garder les sauvegardes accessibles depuis le réseau (risque ransomware)

## Le coût

Pour une TPE de 10 postes, comptez environ 100-200 €/mois pour une solution 3-2-1 complète avec monitoring et alertes. C'est dérisoire comparé au coût d'une perte de données.

## Conclusion

La question n'est pas *si* vous aurez un incident, mais *quand*. Avec une stratégie 3-2-1, vous êtes prêt.`,
      status: 'PUBLISHED' as const,
      publishedAt: new Date('2025-03-10'),
      metaTitle: 'Règle de sauvegarde 3-2-1 : guide pratique - Apio systems',
      metaDescription:
        'Appliquez la règle de sauvegarde 3-2-1 pour protéger les données de votre entreprise. Guide concret pour TPE/PME.',
      tagNames: ['Sauvegarde', 'Sécurité', 'TPE'],
    },
  ];

  for (const { tagNames: articleTagNames, ...articleData } of articles) {
    const article = await prisma.article.upsert({
      where: { slug: articleData.slug },
      update: {},
      create: {
        ...articleData,
        authorId: admin.id,
      },
    });

    // Link tags
    for (const tagName of articleTagNames) {
      const tag = tags[tagName];
      if (tag) {
        await prisma.articleTag.upsert({
          where: { articleId_tagId: { articleId: article.id, tagId: tag.id } },
          update: {},
          create: { articleId: article.id, tagId: tag.id },
        });
      }
    }
  }
  console.log(`Articles: ${articles.length} created`);

  // --- Case Studies ---
  const caseStudies = [
    {
      title: 'Migration cloud complète pour un cabinet comptable',
      slug: 'migration-cloud-cabinet-comptable',
      clientName: 'Cabinet Martin & Associés',
      clientAnonymous: false,
      sector: 'Comptabilité',
      techStack: ['Nextcloud', 'Proxmox', 'Keycloak', 'Veeam', 'Stalwart Mail'],
      context:
        'Cabinet de 25 collaborateurs répartis sur 2 sites, fonctionnant avec un vieux serveur de fichiers et une messagerie chez un hébergeur mutualisé peu fiable. Les collaborateurs en télétravail rencontraient des lenteurs importantes via le VPN.',
      challenge:
        "Migrer l'ensemble de l'infrastructure vers une solution souveraine et auto-hébergée sans interruption de service, en pleine période fiscale. Les contraintes réglementaires du secteur comptable imposaient un chiffrement de bout en bout et une traçabilité complète des accès.",
      solution:
        'Migration progressive sur 6 semaines : déploiement Nextcloud sur un serveur Proxmox hébergé en France, authentification centralisée via Keycloak, migration des boîtes mail vers Stalwart Mail par lots de 5 utilisateurs le week-end, transfert des fichiers avec conservation des permissions. Formation des équipes en 3 sessions de 2h.',
      testimonialQuote:
        "Nos collaborateurs en télétravail ont gagné un confort de travail incroyable. La migration s'est faite en douceur, sans aucune perte de données.",
      testimonialAuthor: 'Jean Martin',
      testimonialRole: 'Associé fondateur',
      featured: true,
      status: 'PUBLISHED' as const,
      results: [
        { metric: "Temps d'accès aux fichiers (télétravail)", before: '12 sec', after: '< 1 sec' },
        { metric: 'Tickets support / mois', before: '35', after: '5' },
        { metric: 'Disponibilité messagerie', before: '96%', after: '99.9%' },
        { metric: 'Coût infrastructure / mois', before: '2 800 €', after: '1 900 €' },
      ],
    },
    {
      title: "Sécurisation du SI d'une PME industrielle",
      slug: 'securisation-si-pme-industrielle',
      clientName: 'Précision Métal',
      clientAnonymous: false,
      sector: 'Industrie',
      techStack: ['OPNsense', 'Proxmox Backup Server', 'Debian', 'LLDAP', 'WireGuard'],
      context:
        "PME de 45 salariés spécialisée dans l'usinage de précision. Après une tentative de ransomware bloquée de justesse par l'antivirus, la direction a décidé de renforcer la sécurité de l'ensemble du SI.",
      challenge:
        "Sécuriser l'infrastructure sans perturber la production (machines CNC connectées au réseau) et sans budget illimité. Le parc était hétérogène : postes sous Linux et Windows, serveurs vieillissants, réseau à plat sans segmentation.",
      solution:
        "Audit complet du SI en 1 semaine, puis plan d'action en 3 phases sur 2 mois. Phase 1 : segmentation réseau (VLAN production / bureautique / invités) avec firewall OPNsense. Phase 2 : migration des serveurs vers Debian 12 sur Proxmox, annuaire centralisé LLDAP, VPN WireGuard pour les accès distants, déploiement MFA sur tous les comptes. Phase 3 : sauvegarde 3-2-1 avec Proxmox Backup Server + réplication cloud, tests de restauration trimestriels.",
      testimonialQuote:
        "L'audit a révélé des failles dont nous n'avions pas conscience. Aujourd'hui, nous dormons tranquilles.",
      testimonialAuthor: 'Sophie Durand',
      testimonialRole: 'Directrice générale',
      featured: true,
      status: 'PUBLISHED' as const,
      results: [
        { metric: 'Score sécurité (audit)', before: '32/100', after: '87/100' },
        { metric: 'Temps de restauration serveur', before: '> 24h', after: '45 min' },
        { metric: 'Incidents sécurité / trimestre', before: '8', after: '0' },
      ],
    },
    {
      title: 'Infogérance complète pour un réseau de franchises',
      slug: 'infogerance-reseau-franchises',
      clientName: 'Réseau confidentiel',
      clientAnonymous: true,
      sector: 'Retail',
      techStack: ['NinjaOne', 'Nextcloud', 'Ubiquiti UniFi', 'Stalwart Mail'],
      context:
        'Réseau de 12 points de vente répartis dans le Grand Est, sans service IT interne. Chaque site avait été équipé indépendamment par des prestataires différents, créant un parc totalement hétérogène et ingérable.',
      challenge:
        "Standardiser et superviser l'ensemble du parc informatique (60 postes, 12 routeurs, 4 serveurs) avec un budget maîtrisé, tout en assurant un support réactif pour les équipes en magasin.",
      solution:
        "Déploiement d'un agent de supervision (RMM NinjaOne) sur l'ensemble du parc, standardisation progressive du matériel réseau (Ubiquiti UniFi), migration de toutes les boîtes mail vers Stalwart Mail auto-hébergé, partage de fichiers via Nextcloud, mise en place d'un helpdesk avec SLA garanti (réponse < 1h, résolution < 4h).",
      featured: false,
      status: 'PUBLISHED' as const,
      results: [
        { metric: 'Temps moyen de résolution', before: '> 48h', after: '3h' },
        { metric: 'Pannes réseau / mois', before: '6', after: '< 1' },
        { metric: 'Satisfaction utilisateurs', before: '2.1/5', after: '4.6/5' },
        { metric: 'Coût IT / point de vente / mois', before: '850 €', after: '420 €' },
      ],
    },
  ];

  for (const { results, ...csData } of caseStudies) {
    const cs = await prisma.caseStudy.upsert({
      where: { slug: csData.slug },
      update: {},
      create: csData,
    });

    // Delete existing results before re-creating (idempotent seed)
    await prisma.caseStudyResult.deleteMany({ where: { caseStudyId: cs.id } });
    if (results.length > 0) {
      await prisma.caseStudyResult.createMany({
        data: results.map((r) => ({
          caseStudyId: cs.id,
          ...r,
        })),
      });
    }
  }
  console.log(`Case studies: ${caseStudies.length} created`);

  console.log('Seeding complete.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
