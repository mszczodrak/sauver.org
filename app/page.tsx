'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

// Feed Data
const initialFeedData = [
  { status: 'blocked', email: 'toxic@spamlist.ru', reason: 'Toxicity detected', icon: '✗' },
  { status: 'allowed', email: 'john.doe@acme.com', reason: 'Clean & verified', icon: '✓' },
  { status: 'blocked', email: 'info@phish-domain.xyz', reason: 'Domain flagged', icon: '✗' },
  { status: 'allowed', email: 'sarah@startup.io', reason: 'Deliverable', icon: '✓' },
  { status: 'blocked', email: 'noreply@breachedlist.com', reason: 'Known breach', icon: '✗' },
  { status: 'allowed', email: 'marcus@enterprise.co', reason: 'Valid MX record', icon: '✓' }
];

// Stats targets
const statTargets = {
  teams: 4200,
  accuracy: 99.7,
  speed: 200,
  unknown: 0.3
};

// API Code lines
const codeLines = [
  '<span class="token-comment">// Request</span>',
  '<span class="token-key">POST</span> https://api.sauver.org/v1/verify',
  '',
  '{',
  '  <span class="token-key">"email"</span>: <span class="token-val">"user@domain.com"</span>,',
  '  <span class="token-key">"api_key"</span>: <span class="token-val">"sk_live_••••••••••"</span>',
  '}',
  '',
  '<span class="token-comment">// Response</span>',
  '{',
  '  <span class="token-key">"status"</span>: <span class="token-val">"safe"</span>,',
  '  <span class="token-key">"score"</span>: <span class="token-val">98</span>,',
  '  <span class="token-key">"checks"</span>: {',
  '    <span class="token-key">"syntax"</span>:    <span class="token-val">"✓ pass"</span>,',
  '    <span class="token-key">"domain"</span>:    <span class="token-val">"✓ pass"</span>,',
  '    <span class="token-key">"toxicity"</span>:  <span class="token-val">"✓ clean"</span>',
  '  }',
  '}'
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Live Feed State
  const [feedIndex, setFeedIndex] = useState(4);
  const [liveFeed, setLiveFeed] = useState(initialFeedData.slice(0, 4).reverse());

  // Stats Counters State
  const [statsStarted, setStatsStarted] = useState(false);
  const [stats, setStats] = useState({ teams: 0, accuracy: 0, speed: 0, unknown: 0 });

  // Typewriter State
  const [typewriterStarted, setTypewriterStarted] = useState(false);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);

  // Refs
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const statsRef = useRef<HTMLElement | null>(null);
  const apiRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Scrollspy
    const handleScroll = () => {
      let current = "";
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        if (window.scrollY >= sectionTop - 100) {
          const id = section.getAttribute('id');
          if (id) current = id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Intersection Observer for reveals
    const observerOptions = { threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target.classList.contains('stats-band')) setStatsStarted(true);
          if (entry.target.id === 'api') setTypewriterStarted(true);
        }
      });
    }, observerOptions);

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });
    if (statsRef.current) observer.observe(statsRef.current);
    if (apiRef.current) observer.observe(apiRef.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Live feed interval
    const interval = setInterval(() => {
      setFeedIndex(prev => {
        const nextIdx = prev + 1;
        const newData = initialFeedData[prev % initialFeedData.length];
        setLiveFeed(currentFeed => {
          const updatedFeed = [newData, ...currentFeed];
          if (updatedFeed.length > 8) return updatedFeed.slice(0, 8);
          return updatedFeed;
        });
        return nextIdx;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Stats Animation
    if (!statsStarted) return;
    const duration = 2000;
    const startTime = performance.now();

    const animateStats = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      setStats({
        teams: progress * statTargets.teams,
        accuracy: progress * statTargets.accuracy,
        speed: progress * statTargets.speed,
        unknown: progress * statTargets.unknown
      });

      if (progress < 1) {
        requestAnimationFrame(animateStats);
      } else {
        setStats(statTargets);
      }
    };
    requestAnimationFrame(animateStats);
  }, [statsStarted]);

  useEffect(() => {
    // Typewriter
    if (!typewriterStarted) return;
    let lineIdx = 0;
    const typeLine = () => {
      if (lineIdx < codeLines.length) {
        setDisplayedCode(prev => {
          if (prev.length === lineIdx) {
            return [...prev, codeLines[lineIdx]];
          }
          return prev;
        });
        lineIdx++;
        setTimeout(typeLine, 100);
      }
    };
    typeLine();
  }, [typewriterStarted]);

  const formatStat = (key: string, val: number) => {
    if (key === 'teams') return val >= 4200 ? '4,200+' : Math.floor(val);
    if (key === 'accuracy') return val >= 99.7 ? '99.7%' : val.toFixed(1) + '%';
    if (key === 'speed') return val >= 200 ? '200K' : Math.floor(val) + 'K';
    if (key === 'unknown') return val >= 0.3 ? '< 0.3%' : '< ' + val.toFixed(1) + '%';
    return val;
  };

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) {
      revealRefs.current.push(el);
    }
  };

  return (
    <>
      <nav>
        <div className="nav-container">
          <Link href="#" className="logo">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.34-2.98 8.19-7 9.49V12H5V6.3l7-3.11v8.8z" /></svg>
            SAUVER
          </Link>
          <div className="nav-links" style={{
            display: mobileMenuOpen ? 'flex' : undefined,
            flexDirection: mobileMenuOpen ? 'column' : undefined,
            position: mobileMenuOpen ? 'absolute' : undefined,
            top: mobileMenuOpen ? '80px' : undefined,
            left: mobileMenuOpen ? '0' : undefined,
            width: mobileMenuOpen ? '100%' : undefined,
            background: mobileMenuOpen ? 'var(--bg-deep)' : undefined,
            padding: mobileMenuOpen ? '40px' : undefined,
            borderBottom: mobileMenuOpen ? '1px solid var(--border-amber)' : undefined
          }}>
            <Link href="#features" className={activeSection === 'features' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Features</Link>
            <Link href="#how-it-works" className={activeSection === 'how-it-works' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>How It Works</Link>


            <button className="btn btn-cta pulse">Start Free</button>
          </div>
          <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <main>
        {/* 2. Hero Section */}
        <section className="hero">
          <div className="hero-bg-visual">
            <svg width="100%" height="100%" viewBox="0 0 800 800">
              <circle cx="400" cy="400" r="300" stroke="rgba(245, 166, 35, 0.1)" strokeWidth="0.5" fill="none" />
              <circle cx="400" cy="400" r="200" stroke="rgba(245, 166, 35, 0.05)" strokeWidth="0.5" fill="none" />
              <path d="M100 400 Q400 100 700 400" stroke="rgba(245, 166, 35, 0.1)" fill="none" />
            </svg>
          </div>
          <div className="hero-eyebrow mono reveal" style={{ transitionDelay: '0.1s' }} ref={addToRefs}>
            <div className="dot-blink"></div>
            [ INBOX PROTECTION ACTIVE ]
          </div>
          <h1 className="reveal" style={{ transitionDelay: '0.25s' }} ref={addToRefs}>
            YOUR INBOX HAS<br />
            A NEW <span>BOUNCER.</span>
          </h1>
          <p className="reveal" style={{ transitionDelay: '0.4s' }} ref={addToRefs}>
            Sauver acts as your digital gatekeeper — blocking harmful, invalid, and toxic emails before they ever reach your inbox or damage your sender reputation.
          </p>
          <div className="hero-btns reveal" style={{ transitionDelay: '0.55s' }} ref={addToRefs}>
            <button className="btn btn-cta">Protect My Inbox &rarr;</button>
            <button className="btn btn-outline">See How It Works</button>
          </div>

        </section>

        {/* 3. Live Protection Feed */}
        <section className="live-feed-section">
          <div className="feed-container">
            <div className="feed-title">Live Protection Feed</div>
            <div className="feed-list" id="live-feed">
              {liveFeed.map((data, idx) => (
                <div key={idx} className={`feed-row ${data.status}`}>
                  <span>{data.icon} {data.status.toUpperCase()}</span>
                  <span>{data.email}</span>
                  <span>{data.reason}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Features Section */}
        <section id="features" className="section-container">
          <div className="section-header reveal" ref={addToRefs}>
            <h2>WHAT THE <span>BOUNCER</span> CHECKS</h2>
          </div>
          <div className="grid-features">
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></svg>
              </div>
              <h3>Syntax Validation</h3>
              <p>Instantly rejects malformed addresses before they enter your system with RFC-compliant checks.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
              </div>
              <h3>Domain & MX Verification</h3>
              <p>Confirms the email domain exists and routes to a live mail server in real-time.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
              </div>
              <h3>Toxicity Detection</h3>
              <p>Flags known complainers, litigators, spam traps, and addresses found on breach lists.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-14 8.38 8.38 0 0 1 3.8.9L21 3.5Z" /></svg>
              </div>
              <h3>Catch-All Detection</h3>
              <p>Identifies role-based emails (info@, support@) and throwaway addresses to protect quality.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              </div>
              <h3>Real-Time API Shield</h3>
              <p>Block bad emails at point-of-entry on any web form with zero-latency validation.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
              </div>
              <h3>Reputation Guard</h3>
              <p>Keeps your bounce rate below 2% so your sender reputation remains pristine on all providers.</p>
            </div>
          </div>
        </section>

        {/* 5. How It Works */}
        <section id="how-it-works" className="how-it-works">
          <div className="section-container">
            <div className="section-header reveal" ref={addToRefs}>
              <h2>HOW IT WORKS</h2>
            </div>
            <div className="steps-container">
              <div className="step reveal" ref={addToRefs}>
                <div className="step-num-bg">01</div>
                <h3>SUBMIT</h3>
                <p>Drop your email list or connect via API. CSV, Excel, or real-time webhook — Sauver accepts them all.</p>
              </div>
              <div className="step reveal" style={{ transitionDelay: '0.1s' }} ref={addToRefs}>
                <div className="step-num-bg">02</div>
                <h3>ANALYZE</h3>
                <p>Our engine runs 7 checks per address: syntax, domain, MX, toxicity, disposable, and catch-all detection.</p>
              </div>
              <div className="step reveal" style={{ transitionDelay: '0.2s' }} ref={addToRefs}>
                <div className="step-num-bg">03</div>
                <h3>RESULTS</h3>
                <p>Download a clean, scored list. Every address is labeled: Safe, Risky, or Block. Act on data, not guesses.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6. Stats Band */}
        <section className="stats-band" ref={statsRef}>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-val">{formatStat('teams', stats.teams)}</div>
              <div className="stat-label">Teams Protected</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">{formatStat('accuracy', stats.accuracy)}</div>
              <div className="stat-label">Accuracy Rate</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">{formatStat('speed', stats.speed)}</div>
              <div className="stat-label">Verification Speed</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">{formatStat('unknown', stats.unknown)}</div>
              <div className="stat-label">Unknown Results</div>
            </div>
          </div>
        </section>






      </main>

      {/* 10. Footer */}
      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="#" className="logo">
              <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.34-2.98 8.19-7 9.49V12H5V6.3l7-3.11v8.8z" /></svg>
              SAUVER
            </Link>
            <p>The Digital Bouncer for your Inbox. Professional protection for high-volume senders.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link href="#features">Features</Link></li>


              <li><Link href="#">Changelog</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><Link href="#">About</Link></li>
              <li><Link href="#">Blog</Link></li>
              <li><Link href="#">Press</Link></li>

            </ul>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <ul>
              <li><Link href="#">Privacy Policy</Link></li>
              <li><Link href="#">Terms of Service</Link></li>
              <li><Link href="#">GDPR</Link></li>
              <li><Link href="#">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          &copy; 2025 Sauver. Built with obsession for inbox hygiene. 🛡️
        </div>
      </footer>
    </>
  );
}
