import type { Metadata } from 'next'
import FirebaseAnalyticsInit from "@/components/FirebaseAnalyticsInit";
import './globals.css'

export const metadata: Metadata = {
  title: 'SAUVER | The Digital Bouncer for your Inbox',
  description: 'Reclaim your attention with Sauver, the anti AI-slop movement. We neutralize surveillance metadata and deploy active traps to make automated spammers pay.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </head>
      <body>
        <FirebaseAnalyticsInit />
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  )
}
