import type { Metadata } from 'next';
import { ObfuscatedEmail } from '@/components/ui/obfuscated-email';
import { Section } from '@/components/ui/section';
import { H1, H2, P } from '@/components/ui/typography';

export const metadata: Metadata = {
  title: 'Charte de confidentialité',
  description:
    'Charte de confidentialité du site Apio systems : données personnelles, collecte et utilisation des données, cookies et mesure d&apos;audience.',
  robots: { index: false },
  alternates: { canonical: '/charte-confidentialite' },
};

export default function CharteConfidentialitePage() {
  return (
    <Section className="py-16">
      <H1 className="text-3xl font-bold">Charte de confidentialité</H1>

      <div>
      <P className="mt-2">Dernière modification : mars 2026</P>
      </div>

      <div className="mt-10 max-w-3xl space-y-8 text-muted-foreground">
        <div>
          <H2 className="text-xl font-semibold text-foreground">Données personnelles</H2>
          <P className="mt-2">
	    Les traitements des données personnelles mis en œuvre dans le cadre du site apio.systems 
            sont soumis au décret n° 2019-536 du 29 mai 2019 pris pour l&apos;application de la loi n° 78-17 
            du 6 janvier 1978 relative à l&apos;informatique, aux fichiers et aux libertés.
	  </P>
        </div>

        <div>
          <H2 className="text-xl font-semibold text-foreground">Protection des données personnelles</H2>
          <P className="mt-2">
            Conformément au Règlement Général sur la Protection des Données (RGPD), vous disposez
            d&apos;un droit d&apos;accès, de rectification, de suppression et d&apos;opposition
            concernant vos données personnelles. Pour exercer ces droits, contactez-nous à
            l&apos;adresse : <ObfuscatedEmail user="dpo" domain="apio.systems" link />.
          </P>
          <P className="mt-2">
            Les données collectées via le formulaire de contact (nom, email, téléphone, message)
            sont traitées sur la base légale de l&apos;intérêt légitime (article 6.1.f du RGPD) afin
            de répondre à votre demande. Ces données ne sont jamais transmises à des tiers.
          </P>
          <P className="mt-2">
            Les données de contact sont conservées pendant une durée maximale de 3 ans à compter du
            dernier échange, conformément aux recommandations de la CNIL en matière de prospection
            commerciale. Au-delà de cette durée, les données sont supprimées.
          </P>
        </div>

        <div id="cookies">
          <H2 className="text-xl font-semibold text-foreground">
            Cookies et mesure d&apos;audience
          </H2>
          <P className="mt-2">
            Ce site n&apos;utilise aucun cookie tiers. Aucun cookie publicitaire, de traçage ou de
            réseau social n&apos;est déposé sur votre navigateur.
          </P>
          <P className="mt-2">
            La mesure d&apos;audience est réalisée par Matomo, une solution auto-hébergée et
            respectueuse de la vie privée. Matomo est configuré en mode sans cookie (méthode{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">disableCookies()</code>), ce qui
            le rend exempté de consentement conformément aux recommandations de la CNIL
            (délibération n°2020-091). Aucune donnée personnelle n&apos;est collectée à des fins de
            mesure d&apos;audience.
          </P>
          <P className="mt-2">
            Vous pouvez à tout moment vous désinscrire de la mesure d&apos;audience via le bandeau
            affiché lors de votre première visite, ou en supprimant la clé{' '}
            <code className="rounded bg-muted px-1 py-0.5 text-sm">apio_analytics</code> de votre
            stockage local (localStorage).
          </P>
        </div>
      </div>
    </Section>
  );
}
