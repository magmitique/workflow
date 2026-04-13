import Script from 'next/script';

const MATOMO_URL = process.env.NEXT_PUBLIC_MATOMO_URL;
const MATOMO_SITE_ID = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;

export function MatomoScript() {
  if (!MATOMO_URL || !MATOMO_SITE_ID) return null;

  return (
    <Script
      id="matomo"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _paq = window._paq = window._paq || [];
          _paq.push(['disableCookies']);
          _paq.push(['trackPageView']);
          _paq.push(['enableLinkTracking']);
          (function() {
            var u="${MATOMO_URL}/";
            _paq.push(['setTrackerUrl', u+'matomo.php']);
            _paq.push(['setSiteId', '${MATOMO_SITE_ID}']);
            var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
            g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
          })();
        `,
      }}
    />
  );
}
