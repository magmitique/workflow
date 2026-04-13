import type { Metadata } from 'next';
import { Section } from '@/components/ui/section';
import { H1, H2, P } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'Conditions générales de vente',
  description:
    'Conditions générales de vente : généralités, modalités de commande, réalisation des prestations, modalités de facturation, modalités et délais de paiement, garantie et limitation de responsabilité, clause de confidentialité, droit applicaple et juridictions compétentes.',
  robots: { index: false },
  alternates: { canonical: '/cgv' },
};

export default function ConditionsGeneralesPage() {
  return (
    <Section className="py-16">
      <H1 className="text-3xl font-bold">Conditions générales de vente</H1>

      <div>
      <P className="mt-2">Dernière modification : mars 2026</P>
      </div>

      <div className="mt-10 max-w-3xl space-y-8 text-muted-foreground">
        <div>
          <H2 className="text-xl font-semibold text-foreground">Généralités</H2>
          <P className="mt-2">
	    Apio systems (26 chemin du Moulin d’Eau, 13105 Mimet – SIRET 529 919 540 00029), est une société
            de services informatique, et fournit à ce titre des prestations de développement de programmes
            informatiques, d’audit et de conseil, de support, d’assistance et de formation.
	  </P>
          <P className="mt-2">
            Les présentes Conditions de Vente précisent les termes du contrat passé entre le Client et Apio
            systems, et expriment l’intégralité des obligations et des droits des deux parties. Toutes les
            prestations effectuées par Apio systems sont soumises aux présentes Conditions de Vente. Elles
            peuvent éventuellement être complétées et/ou modifiées par des clauses particulières.
	  </P>
          <P className="mt-2">
            Les Conditions de Vente sont consultables en permanence sur le site Internet d’Apio systems.
            Elles sont susceptibles d’être modifiées à tout moment et sans préavis. Les Conditions de Vente
            applicables sont celles en vigueur sur le site à la date de la demande du Client (date du devis,
            ou date de la commande en cas de prestation sans devis). Elles sont identifiables par la date de
            rédaction.
	  </P>
          <P className="mt-2">
            Dès lors qu’il adresse une commande à Apio systems, le Client déclare avoir la pleine capacité
            juridique lui permettant de s’engager, et déclare adhérer sans restriction ni réserve aux
            présentes Conditions de Vente.
          </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Modalités de commande</H2>
          <P className="mt-2">
	    Le Client peut soit émettre une commande, soit signifier son accord sur tout devis présenté par
            Apio systems.
	  </P>
          <P className="mt-2">
            Ces actes peuvent être exécutés par mail, via un site Internet ou encore par courrier.
	  </P>
          <P className="mt-2">
            Tout devis présenté par Apio systems et signé par le Client prend force contractuelle. De même,
            tout commande reçue par Apio systems, datée et signée, est ferme et définitive et prend force
            contractuelle. Si un acompte avait été demandée, la commande n’est reçue valablement qu’avec
            l’acompte correspondant.
	  </P>
          <P className="mt-2">
	    Dans le cas des commandes prises par Internet, ces commandes sont fermes et définitives à
            réception du mail correspondant, reçu par Apio systems et en copie par le demandeur. Le paiement
            est exigible dans tous les cas, sauf non-réalisation de l’opération demandée. Dans ce dernier
            cas, il appartient au Client de le signaler immédiatement à Apio systems.
	  </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Réalisation des prestations</H2>
          <P className="mt-2">
	   Apio systems s’engage à mener à bien, et conformément aux règles de l’art, la prestation
           commandée par le Client. Toute prestation non prévue au contrat, ou toute modification à
           l’engagement initial, effectuée à la demande du Client, fera l’objet d’un avenant au
           contrat.
	  </P>
          <P className="mt-2">
	   La réalisation de la prestation met fin au contrat liant le Client et Apio systems, sauf
           notification expresse de réserves par le Client dans un délai de 14 jours ouvrés après la
           notification de fin de mission. Apio systems n’est pas tenu de conserver quelque élément que ce
           soit concernant le Client et/ou la prestation réalisée.
	  </P>
          <P className="mt-2">
           La propriété intellectuelle de la réalisation effectuée dans le cadre de la prestation commandée,
           reste acquise à Apio systems, le Client en ayant acquis seulement le droit d’usage. Apio systems
           peut cependant, dans certains cas, transférer au Client tout ou partie de ses droits sur l’œuvre
           précitée : droit de reproduction, de représentation, de commercialisation, de détention,
           d’adaptation, de traduction, et plus généralement, tous droits d’exploitation. Ce transfert fait
           l’objet d’un accord écrit entre les parties.
	  </P>
          <P className="mt-2">
           Dans le cas particulier des noms de domaine achetés par Apio systems pour le compte de ses
           Clients, Apio systems renonce expressément à se prévaloir de tout privilège de propriété lié à
           cet achat pour compte. Le transfert de propriété de nom de domaine est effectuée sur simple
           demande auprès de tout tiers désigné par le Client, sur simple demande de ce dernier.
          </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Modalités de facturation</H2>
          <P className="mt-2">
	   Apio systems réalise des prestations soit au forfait, soit en régie, journalière ou horaire. Dans
           tous les cas, un accord sur tarif a été passé préalablement avec le Client.
	  </P>
          <P className="mt-2">
           Dans le cas où le personnel Apio systems serait amené à se déplacer chez le Client afin de
           réaliser une prestation pour ce dernier, les frais engagés lors des déplacements pourront être
           facturés au Client sur la base d’un tarif au kilomètre, auquel seraient ajoutés les éventuels
           frais de séjour et d’hébergement, sur la base des dépenses réelles.
	  </P>
          <P className="mt-2">
           Dans le cas d’accords pluriannuel, les tarifs sont révisés de droit en fonction de l’évolution de
           l’indice publié par le SYNTEC. Le détail des tarifs pour toute prestation est disponible sur
           simple demande auprès d’Apio systems.
          </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Modalités et délais de paiement</H2>
          <P className="mt-2">
	   Le tarif des prestations est indiqué, sauf dispositions contraires, pour un paiement comptant et
           sans escompte.
	  </P>
          <P className="mt-2">
           Le règlement devra parvenir à Apio systems dans les quinze jours après la réception de la facture.
           Toute somme non payée dans les trente jours est susceptible de porter intérêts à un taux égal à
           12% avec un montant minimum de 40 euros (décret 2012-115 du 2/10/2012).
          </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Garantie et limitation de responsabilité</H2>
          <P className="mt-2">
	   Apio systems garantit que sa prestation est fournie avec toute la diligence et la compétence
           raisonnablement requise, et exclut toute autre garantie, expresse ou implicite, non stipulée
           explicitement.
	  </P>
          <P className="mt-2">
	   Tout logiciel édité par Apio systems est garanti pendant une durée d’un an à compter de sa date
           de livraison contre tout dysfonctionnement.
	  </P>
          <P className="mt-2">
           Apio systems ne donne aucune garantie complémentaire en ce qui concerne les fournitures qui ne
           font pas partie de sa prestation, comme par exemple les prestations et fournitures de tierces
           parties.
	  </P>
          <P className="mt-2">
           Apio systems ne saurait voir sa responsabilité engagée en cas de dommages de quelque nature que
           ce soit subis par l’utilisateur ou des tiers et résultant directement ou indirectement d’une de
           ses prestations ou l’utilisation d’un de ses logiciels, notamment la perte de données ou toute
           perte financière résultant de son utilisation ou de l’impossibilité de l’utiliser, et ceci même
           si Apio systems a été prévenu de la possibilité de tels dommages.
	  </P>
          <P className="mt-2">
           Apio systems ne peut être tenu pour responsable d’infraction aux lois françaises et
           internationales de protection de la propriété intellectuelle, pour tous travaux, modifications et 
           réalisations effectués à partir de tout élément de toutes sortes fournis par le Client tels que
           textes, photographies, logos, images, graphisme dont il n’aurait pas la propriété exclusive.
	  </P>
          <P className="mt-2">
           Dans le cas où la responsabilité d’Apio systems se trouverait engagée par suite d’un défaut de
           respect de ses obligations, que ce soit sur une base contractuelle, extracontractuelle, ou pour
           toute autre raison, sa responsabilité est limitée aux dommages directs subis par le Client. Les
           frais d’expertise éventuels seront supportés par moitié entre le Client et Apio systems.
	  </P>
          <P className="mt-2">
           Apio systems ne sera en aucun cas tenu d’indemniser d’éventuels dommages, de quelque nature que
           ce soit, résultant :<br />
	   &middot; de tout dysfonctionnement d’un fourniture d’une tierce partie,<br />
	   &middot; d’une utilisation non-conforme au but de tout logiciel, service, ou prestation,<br />
	   &middot; de tout cas de force majeure comme la foudre ou la rupture de la fourniture d’énergie,<br />
	   &middot; de tout fait qui peut être démontré comme se situant hors du champs des responsabilités
	   d’Apio systems.
          </P>
        </div>

	<div>
          <H2 className="text-xl font-semibold text-foreground">Clause de confidentialité</H2>
          <P className="mt-2">
	   En aucun cas, aucune information et/ou données concernant le Client ne peut être transmise,
           communiquée, revendue, totalement ou partiellement, à quelque tiers que ce soit. Apio systems
           s’engage à assurer une totale confidentialité de toutes les informations et/ou données traitées
           dans le cadre des prestations qui lui sont commandées, sauf obligation légale ou judiciaire.
	  </P>
          <P className="mt-2">
           Le Client dispose d’un droit d’accès, de modification, de rectification et de suppression de
           toute donnée personnelle qui le concerne, conformément à l’article 34 de la loi Informatique et
           libertés.
          </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Droit applicable et juridictions compétentes</H2>
          <P className="mt-2">
	   Pour l’exécution des prestations commandées par le Client, les parties font élection de domicile
           chacune à l’adresse de son siège social ou de son établissement.
	  </P>
          <P className="mt-2">
           Les présentes Conditions de Vente sont soumises au droit français. En cas de contestation
           portant sur l’application ou l’interprétation de ces Conditions de Vente, les parties
           conviennent de rechercher une solution amiable. A défaut, les tribunaux du siège social d’Apio
           systems seront seuls compétents.
          </P>
        </div>

      </div>
    </Section>
  );
}
