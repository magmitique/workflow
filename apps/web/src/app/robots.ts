import type { MetadataRoute } from 'next';

const baseUrl = process.env.SITE_URL ?? 'https://www.apio.systems';

export default function robots(): MetadataRoute.Robots {
  if (process.env.DISALLOW_ROBOTS === 'true') {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin', '/api', '/login'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
