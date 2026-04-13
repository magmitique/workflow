import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { MatomoScript } from '@/components/layout/matomo';
import { CookieBanner } from '@/components/layout/cookie-banner';
import { Providers } from '@/lib/providers';
import { cn } from '@/lib/cn';
import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  title: {
    default: 'Apio systems - DSI externalisé pour TPE/PME',
    template: '%s | Apio systems',
  },
  description:
    'Votre DSI externalisé : audit IT, infogérance, présence en ligne, délivrabilité email. Accompagnement sur-mesure pour TPE et PME.',
  metadataBase: new URL(process.env.SITE_URL ?? 'https://www.apio.systems'),
  icons: {
    icon: [
      { url: '/images/favicon.ico', sizes: 'any' },
      { url: '/images/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  openGraph: {
    siteName: 'Apio systems',
    locale: 'fr_FR',
    type: 'website',
    images: [{ url: '/images/og-default.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  alternates: {
    canonical: '/',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className={cn(poppins.variable, 'min-h-screen')}>
        <Providers>{children}</Providers>
        <MatomoScript />
        <CookieBanner />
      </body>
    </html>
  );
}
