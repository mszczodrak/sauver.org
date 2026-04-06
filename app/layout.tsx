import type { Metadata } from 'next';
import FirebaseAnalyticsInit from '@/components/FirebaseAnalyticsInit';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://sauver.org'),
  title: 'SAUVER | The anti AI-slop resistance',
  description:
    'Reclaim your attention with Sauver, the anti AI-slop resistance. We neutralize surveillance metadata and deploy active traps to make automated spammers pay.',
  openGraph: {
    title: 'Sauver: The anti AI-slop resistance',
    description:
      'Reclaim your attention with Sauver, the anti AI-slop resistance. We neutralize surveillance metadata and deploy active traps to make automated spammers pay.',
    url: 'https://sauver.org',
    siteName: 'Sauver',
    images: [
      {
        url: 'https://sauver.org/og-image.jpg',
        width: 1264,
        height: 630,
        alt: 'Sauver — Anti AI-slop resistance',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sauver: The anti AI-slop resistance',
    description:
      'Reclaim your attention with Sauver, the anti AI-slop resistance. We neutralize surveillance metadata and deploy active traps to make automated spammers pay.',
    creator: '@mszczodrak',
    images: ['https://sauver.org/og-image.jpg'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <FirebaseAnalyticsInit />
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  );
}
