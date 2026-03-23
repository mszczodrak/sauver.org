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
          <h4>Product</h4>
          <ul>
            <li><Link href="/#who-it-is-for">Who it's for</Link></li>
            <li><Link href="/#how-it-works">How it works</Link></li>
            <li><Link href="/#installation">Installation</Link></li>
            <li><Link href="/docs">Documentation</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link href="https://github.com/sauver-org/sauver">GitHub</Link></li>
            <li><Link href="https://www.youtube.com/@SauverOrg">YouTube</Link></li>
            <li><Link href="https://bsky.app/profile/sauverorg.bsky.social">Bluesky</Link></li>
            <li><Link href="https://www.reddit.com/user/sauverorg/">Reddit</Link></li>
            <li><Link href="https://www.tiktok.com/@sauverorg">TikTok</Link></li>
            <li><Link href="/llms.txt">llms.txt</Link></li>
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
        &copy; {new Date().getFullYear()} Sauver. Join the Resistance.
      </div>
    </footer>
  );
}
