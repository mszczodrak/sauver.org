import type { Metadata } from 'next'

import './globals.css'



export const metadata: Metadata = {
  title: 'SAUVER | The Digital Bouncer for your Inbox',
  description: 'The Digital Bouncer for your Inbox',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:ital,wght@0,400;0,500;1,400&family=JetBrains+Mono&display=swap" rel="stylesheet" />
      </head>
      <body>
        <div className="noise-overlay"></div>
        {children}
      </body>
    </html>
  )
}
