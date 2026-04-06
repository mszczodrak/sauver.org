'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar({ activeSection }: { activeSection?: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <Link href="/" className="logo" onClick={closeMenu}>
          <Image src="/sauver-shield-simple-color.svg" alt="Sauver shield" width={24} height={24} />
          SAUVER
        </Link>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <Link
            href="/#who-it-is-for"
            className={activeSection === 'who-it-is-for' ? 'active' : ''}
            onClick={closeMenu}
          >
            Who it's for
          </Link>
          <Link
            href="/#how-it-works"
            className={activeSection === 'how-it-works' ? 'active' : ''}
            onClick={closeMenu}
          >
            How it works
          </Link>
          <Link
            href="/#installation"
            className={activeSection === 'installation' ? 'active' : ''}
            onClick={closeMenu}
          >
            Installation
          </Link>
          <Link
            href="/docs"
            className={activeSection === 'docs' ? 'active' : ''}
            onClick={closeMenu}
          >
            Docs
          </Link>
          <Link href="/#installation" className="btn btn-cta" onClick={closeMenu}>
            Install Now
          </Link>
        </div>

        <button
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
          aria-label="Toggle menu"
          onClick={() => setMobileMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
}
