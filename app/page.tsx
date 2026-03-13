'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';

// Stats targets (repurposed for Sauver)
const statTargets = {
  trackers: 10000,
  accuracy: 99.9,
  timeSaved: 50,
  slop: 95
};

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Stats Counters State
  const [statsStarted, setStatsStarted] = useState(false);
  const [stats, setStats] = useState({ trackers: 0, accuracy: 0, timeSaved: 0, slop: 0 });

  // Refs
  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const statsRef = useRef<HTMLElement | null>(null);

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
        }
      });
    }, observerOptions);

    revealRefs.current.forEach(el => {
      if (el) observer.observe(el);
    });
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
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
        trackers: progress * statTargets.trackers,
        accuracy: progress * statTargets.accuracy,
        timeSaved: progress * statTargets.timeSaved,
        slop: progress * statTargets.slop
      });

      if (progress < 1) {
        requestAnimationFrame(animateStats);
      } else {
        setStats(statTargets);
      }
    };
    requestAnimationFrame(animateStats);
  }, [statsStarted]);

  const formatStat = (key: string, val: number) => {
    if (key === 'trackers') return val >= 10000 ? '10K+' : Math.floor(val);
    if (key === 'accuracy') return val >= 99.9 ? '99.9%' : val.toFixed(1) + '%';
    if (key === 'timeSaved') return val >= 50 ? '50h+' : Math.floor(val) + 'h';
    if (key === 'slop') return val >= 95 ? '95%' : val.toFixed(1) + '%';
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
            <Link href="#who-it-is-for" className={activeSection === 'who-it-is-for' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Who it is for</Link>
            <Link href="#how-it-works" className={activeSection === 'how-it-works' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>How it works</Link>
            <Link href="#installation" className={activeSection === 'installation' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Installation</Link>

            <button className="btn btn-cta pulse">Install Now</button>
          </div>
          <button className="hamburger" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
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
            [ AUTONOMOUS INBOX DEFENSE ACTIVE ]
          </div>
          <h1 className="reveal" style={{ transitionDelay: '0.25s' }} ref={addToRefs}>
            RECLAIM YOUR<br />
            <span>ATTENTION.</span>
          </h1>
          <p className="reveal" style={{ transitionDelay: '0.4s' }} ref={addToRefs}>
            Sauver is a Gemini CLI Extension that integrates directly with your digital workspace (specifically Gmail) to perform automated triage and defense.
          </p>
          <div className="hero-btns reveal" style={{ transitionDelay: '0.55s' }} ref={addToRefs}>
            <Link href="#installation" className="btn btn-cta">Get Started &rarr;</Link>
            <Link href="#how-it-works" className="btn btn-outline">How it works</Link>
          </div>
        </section>

        {/* Who it is for */}
        <section id="who-it-is-for" className="section-container">
          <div className="section-header reveal" ref={addToRefs}>
            <h2>WHO IT IS <span>FOR</span></h2>
          </div>
          <div className="grid-features">
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3>Privacy-conscious users</h3>
              <p>People who want to stop hidden tracking pixels from reporting their activity back to senders.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>
              </div>
              <h3>Deep workers</h3>
              <p>Professionals who need to reclaim their attention from a bombardment of low-quality, automated outreach.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <h3>The "Resistance"</h3>
              <p>Those who want to actively mirror the tactics of automated predators by wasting the time of those who waste theirs.</p>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" className="section-container" style={{ background: 'var(--surface-primary)' }}>
          <div className="section-header reveal" ref={addToRefs}>
            <h2>HOW IT <span>WORKS</span></h2>
          </div>
          <div className="grid-features">
            <div className="feature-card reveal" ref={addToRefs}>
              <h3>1. Tracker Shielding</h3>
              <p>It analyzes incoming emails to identify and neutralize tracking pixels and automated intent.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <h3>2. Slop Detection</h3>
              <p>It uses AI to distinguish between genuine human communication and "slop"—machine-generated pitches and mass-marketing noise.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <h3>3. Active Defense (Bouncer Replies)</h3>
              <p>Instead of just deleting spam, it can stage automated "bouncer" replies to engage with and waste the resources of automated senders.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <h3>4. Inbox Triage</h3>
              <p>It automatically categorizes, labels, and archives emails based on their content and risk level, keeping your inbox focused on what matters.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <h3>5. Autonomous Operation</h3>
              <p>Guided by its GEMINI.md mandates, it can perform bulk operations like searching, labeling, and drafting replies without manual confirmation.</p>
            </div>
          </div>
        </section>

        {/* Stats Band */}
        <section className="stats-band" ref={statsRef}>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-val">{formatStat('trackers', stats.trackers)}</div>
              <div className="stat-label">Trackers Blocked</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">{formatStat('accuracy', stats.accuracy)}</div>
              <div className="stat-label">Detection Accuracy</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">{formatStat('timeSaved', stats.timeSaved)}</div>
              <div className="stat-label">Time Reclaimed</div>
            </div>
            <div className="stat-item">
              <div className="stat-val">{formatStat('slop', stats.slop)}</div>
              <div className="stat-label">Slop Reduction</div>
            </div>
          </div>
        </section>

        {/* Installation */}
        <section id="installation" className="section-container">
          <div className="section-header reveal" ref={addToRefs}>
            <h2>QUICK <span>START</span></h2>
          </div>
          <div className="installation-content">
            <div className="install-step reveal" ref={addToRefs}>
              <h3>1. Prerequisites</h3>
              <p>Ensure you have Python 3.10+ and Node.js installed, as Sauver is a Python-based tool designed to run as a Gemini CLI extension.</p>
            </div>
            
            <div className="install-step reveal" ref={addToRefs}>
              <h3>2. Setup and Installation</h3>
              <div className="code-mockup">
                <span className="token-comment"># Clone the repository</span><br />
                <span className="token-key">git clone</span> https://github.com/mszczodrak/sauver.git<br />
                <span className="token-key">cd</span> sauver<br /><br />
                <span className="token-comment"># Run the setup script</span><br />
                <span className="token-key">./scripts/setup.sh</span>
              </div>
            </div>

            <div className="install-step reveal" ref={addToRefs}>
              <h3>3. Configure Credentials</h3>
              <p>Sauver requires access to your Gmail. Provide a <code>credentials.json</code> file (from Google Cloud Console) in the root directory. On first run, it will open a browser to generate a <code>token.json</code>.</p>
            </div>

            <div className="install-step reveal" ref={addToRefs}>
              <h3>4. Install as Gemini CLI Extension</h3>
              <div className="code-mockup">
                <span className="token-key">gemini extension install .</span>
              </div>
            </div>

            <div className="install-step reveal" ref={addToRefs}>
              <h3>5. Running the Tool</h3>
              <p>Via Python:</p>
              <div className="code-mockup">
                <span className="token-comment"># Activate the virtual environment</span><br />
                <span className="token-key">source</span> .venv/bin/activate<br />
                <span className="token-comment"># Run the main script</span><br />
                <span className="token-key">python</span> src/main.py
              </div>
              <p style={{ marginTop: '20px' }}>Via Gemini CLI:</p>
              <div className="code-mockup">
                <span className="token-comment"># Ask the assistant to perform tasks</span><br />
                "Sauver, check my inbox for slop"
              </div>
            </div>

            <div className="install-step reveal" ref={addToRefs}>
              <h3>6. Development & Testing</h3>
              <div className="code-mockup">
                <span className="token-comment"># Run tests using the Makefile</span><br />
                <span className="token-key">make test</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="#" className="logo">
              <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.34-2.98 8.19-7 9.49V12H5V6.3l7-3.11v8.8z" /></svg>
              SAUVER
            </Link>
            <p>The Digital Bouncer for your Workspace. Professional protection against automated outreach.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link href="#who-it-is-for">Who it is for</Link></li>
              <li><Link href="#how-it-works">How it works</Link></li>
              <li><Link href="#installation">Installation</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="https://github.com/mszczodrak/sauver">GitHub</Link></li>
              <li><Link href="#">Documentation</Link></li>
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
          &copy; 2026 Sauver. Join the Resistance. 🛡️
        </div>
      </footer>

      <style jsx>{`
        .installation-content {
          max-width: 800px;
          margin: 0 auto;
        }
        .install-step {
          margin-bottom: 40px;
        }
        .install-step h3 {
          font-family: 'DM Sans', sans-serif;
          font-size: 20px;
          margin-bottom: 12px;
          color: var(--accent-amber);
        }
        .install-step p {
          color: var(--text-secondary);
          margin-bottom: 16px;
        }
        code {
          background: rgba(255,255,255,0.1);
          padding: 2px 6px;
          border-radius: 4px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9em;
        }
      `}</style>
    </>
  );
}
