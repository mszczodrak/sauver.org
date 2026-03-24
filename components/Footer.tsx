'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.34-2.98 8.19-7 9.49V12H5V6.3l7-3.11v8.8z" /></svg>
            SAUVER
          </Link>
          <p>The Digital Bouncer for your Inbox. Professional protection against automated outreach.</p>
        </div>
        <div className="footer-col">
          <h4>Platform</h4>
          <ul>
            <li><Link href="/#who-it-is-for">Solutions</Link></li>
            <li><Link href="/#how-it-works">Features</Link></li>
            <li><Link href="/#installation">Get Started</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Developers</h4>
          <ul>
            <li><Link href="https://github.com/sauver-org/sauver">GitHub</Link></li>
            <li><Link href="/docs">Documentation</Link></li>
            <li><Link href="/llms.txt">llms.txt</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Community</h4>
          <ul>
            <li>
              <Link href="https://www.youtube.com/@SauverOrg">
                <svg viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                YouTube
              </Link>
            </li>
            <li>
              <Link href="https://bsky.app/profile/sauverorg.bsky.social">
                <svg viewBox="0 0 24 24"><path d="M12 10.8c-1.32-2.4-5.28-2.4-6.6 0-1.32 2.4 1.32 7.2 6.6 9.6 5.28-2.4 7.92-7.2 6.6-9.6-1.32-2.4-5.28-2.4-6.6 0z"/></svg>
                Bluesky
              </Link>
            </li>
            <li>
              <Link href="https://www.reddit.com/user/sauverorg/">
                <svg viewBox="0 0 24 24"><path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.05l-2.454-.546-.547 2.474c1.542.07 3.006.522 4.168 1.27.3-.186.653-.293 1.03-.293a1.25 1.25 0 0 1 0 2.5c-.03 0-.056-.009-.085-.012.07.394.108.798.108 1.21 0 2.907-3.418 5.263-7.637 5.263-4.218 0-7.635-2.356-7.635-5.263 0-.412.04-.816.11-1.21-.03.001-.056.012-.085.012a1.25 1.25 0 1 1 0-2.5c.378 0 .733.107 1.03.293 1.162-.748 2.626-1.201 4.168-1.27l.547-2.474 2.454.546a1.25 1.25 0 0 1 1.25-.05c-.015-.09-.022-.18-.022-.27zM7 11.249c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm10 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm-5 4.08c1.78 0 3.32-.8 3.96-1.95.12-.24.04-.54-.2-.66-.24-.12-.54-.04-.66.2-.44.8-1.54 1.37-3.1 1.37s-2.66-.57-3.1-1.37c-.12-.24-.42-.32-.66-.2-.24.12-.32.42-.2.66.64 1.15 2.18 1.95 3.96 1.95z"/></svg>
                Reddit
              </Link>
            </li>
            <li>
              <Link href="https://www.tiktok.com/@sauverorg">
                <svg viewBox="0 0 24 24"><path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.03-1.03-2.28-1.39-3.41-4.21-2.75-6.78.36-2.03 1.95-3.83 3.96-4.37 1.4-.41 2.94-.2 4.2.53.02-1.01.01-2.03.01-3.04-1.74-.54-3.64-.53-5.32.14-2.3 2.16-2.63 5.92-1.06 8.7 1.13 2.16 3.6 3.49 6.01 3.23 2.22-.16 4.18-1.58 4.97-3.67.34-.84.44-1.75.42-2.65-.01-5.11-.01-10.22 0-15.33z"/></svg>
                TikTok
              </Link>
            </li>
            <li>
              <Link href="https://substack.com/@sauver">
                <svg viewBox="0 0 24 24"><path d="M22.539 8.242H1.46V5.406h21.078v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.078V0z"/></svg>
                Substack
              </Link>
            </li>
            <li>
              <Link href="https://www.linkedin.com/company/sauverorg/">
                <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link href="#">Privacy Policy</Link></li>
            <li><Link href="#">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Sauver Organization. All rights reserved.
      </div>
    </footer>
  );
}
