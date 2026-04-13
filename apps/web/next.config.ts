import type { NextConfig } from 'next';

const siteUrl = process.env.SITE_URL;
const siteHostname = siteUrl ? new URL(siteUrl).hostname : null;

const nextConfig: NextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@apio/shared'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.apio.systems',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '4000',
        pathname: '/uploads/**',
      },
      ...(siteHostname && siteHostname !== 'www.apio.systems'
        ? [
            {
              protocol: 'https' as const,
              hostname: siteHostname,
              pathname: '/uploads/**',
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
