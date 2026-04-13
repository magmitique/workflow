import type { Metadata } from 'next';
import { ObfuscatedEmail } from '@/components/ui/obfuscated-email';
import { Section } from '@/components/ui/section';
import { H1, H2, P } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description:
    'Mentions légales du site Apio systems : éditeur, crédits photos, contenu du site, hébergement et conception.',
  robots: { index: false },
  alternates: { canonical: '/mentions-legales' },
};

export default function MentionsLegalesPage() {
  return (
    <Section className="py-16">
      <H1 className="text-3xl font-bold">Mentions légales</H1>

      <div>
      <P className="mt-2">Dernière modification : mars 2026</P>
      </div>

      <div className="mt-10 max-w-3xl space-y-8 text-muted-foreground">
        <div>
          <H2 className="text-xl font-semibold text-foreground">Éditeur du site</H2>
          <P className="mt-2">
	    Le présent site est la propriété de la société Apio systems. L’utilisateur reconnaît avoir pris
            connaissance de la présente notice légale et s’engage à la respecter.
	  </P>
          <P className="mt-2">
	    Le directeur de la publication du site Web est M Joris Le Blansch, en qualité de gérant de la
            société Apio systems.
	  </P>
          <P className="mt-2">
	    Apio systems | Joris Le Blansch<br />
	    26, chemin du Moulin d’Eau – 13105 Mimet<br />
            Entrepreneur Individuel<br />
	    SIRET : 529 919 540 00029<br />
            SIREN : 529 919 540<br />
            Code APE : 6202A<br />
            Immatriculé le 15/12/2010, modifié le 02/01/2015.<br />
            Email : <ObfuscatedEmail user="ping" domain="apio.systems" />
          </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Crédits photos</H2>
          <P className="mt-2">
	    Toute reproduction ou utilisation de documents photographiques dont Apio systems possède les
            droits est interdite quel que soit le type de publication (papier, internet ou autre) sans
            l’autorisation préalable d’Apio systems et ne peut être effectuée qu’en vue de l’utilisation qui
            aura été acceptée par Apio systems et ce pour une seule fois.
	  </P>
          <P className="mt-2">
	    Toute réutilisation devra recevoir l’accord préalable d’Apio systems.
	  </P>
          <P className="mt-2">
	    Toute modification d’une photographie créditée, ou de la légende qui l’accompagne, devra faire
            l’objet d’un accord écrit préalable d’Apio systems.
	  </P>
          <P className="mt-2">
	    Aucune photographie ne peut être utilisée à des fins publicitaires sans autorisation.
	  </P>
          <P className="mt-2">
	    Si vous effectuez une manipulation sur l’image, vous créez une œuvre « dérivée ». Selon la loi
            sur les droits d’auteur en vigueur, le créateur de l’œuvre originale est considéré comme
            propriétaire des droits d’auteur. En conséquence, vous n’êtes pas détenteur des droits d’auteur
            de l’œuvre dérivée dans la mesure où vous n’êtes pas propriétaire de l’œuvre originale.
	  </P>
          <P className="mt-2">
	    Crédit Photos : Unsplash.com, Pexels.com, Apio systems, Yolanda Stam, Joris Le Blansch.
	  </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Le contenu du site</H2>
          <P className="mt-2">
	    Pour des raisons de maintenance ou toute autre raison qu’elle estime justifiée, la société Apio
            systems pourra interrompre l’accès à son site et s’efforcera d’en avertir préalablement les
            utilisateurs. La société Apio systems met tout en œuvre pour offrir aux utilisateurs des
            informations et/ou des outils disponibles et vérifiés, mais ne saurait être tenue pour
            responsable des erreurs, d’une absence de disponibilité des informations.
          </P>
          <P className="mt-2">
	    Les informations fournies par la société Apio systems le sont à titre indicatif. La société Apio
            systems ne saurait garantir l’exactitude, la complétude, l’actualité des informations diffusées
            sur son site. En conséquence, l’utilisateur reconnaît utiliser ces informations sous sa 
	    responsabilité exclusive.
          </P>
          <P className="mt-2">
	    La structure générale, ainsi que les textes, images animées ou non et tous les autres éléments
            composant ce site Web et notamment les services et produits sont la propriété exclusive de la
            société Apio systems et/ou des éléments sur lesquels la société Apio systems dispose de droits
            notamment d’exploitation permettant leur diffusion et communication.
          </P>
          <P className="mt-2">
	    Les produits et marques d’Apio systems, ainsi que les logos figurant sur le site sont des marques
            déposées par leurs titulaires respectifs.<br />
            Toute reproduction totale ou partielle de ces produits, marques ou de ces logos, ainsi que de
            ces partenaires, effectuée à partir des éléments du site sans l’autorisation expresse d’Apio
            systems est donc prohibée, au sens de l’article L.713-2 du Code de la propriété intellectuelle.
            De manière générale les marques commerciales et/ou déposées sont la propriété de leurs 
            dépositaires respectifs.
          </P>
          <P className="mt-2">
	    Enfin, le contenu du site apio.systems est soumis à la loi française, tant en ce qui concerne les
            règles de fond que les règles de forme.
	  </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Hébergement</H2>
          <P className="mt-2">
            Le site apio.systems est hébergé sur des matériels informatiques appartenant à OVH, lesquels sont
            hébergés et administrés par la société SAS OVH, dont le siège social est situé : 
	    2 rue Kellermann BP 80157 – 59100 Roubaix.
          </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Conception, réalisation du Site</H2>
          <P className="mt-2">
	    La réalisation est effectuée par la société <a href="https://datarooster.io" target="_blank">Data Rooster</a>,
            entreprise domiciliée au 3 Square du Ciste - 135980 La Fare-les-Oliviers.
          </P>
        </div>

      </div>
    </Section>
  );
}
