'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TERMINAL_SEQUENCE = [
  { delay: 600, type: 'cmd', text: '$ sauver scan --inbox' },
  { delay: 400, type: 'info', text: '▸ Connecting to Gmail API... ✓' },
  { delay: 500, type: 'info', text: '▸ Scanning 47 unread messages...' },
  { delay: 800, type: 'sep', text: ' ' },
  { delay: 100, type: 'blocked', text: '⊘ TRACKER BLOCKED' },
  { delay: 100, type: 'detail', text: '  ↳ from: talent@recruitpro.io' },
  { delay: 100, type: 'detail', text: '  ↳ pixel: track.sendgrid.net stripped' },
  { delay: 700, type: 'slop', text: '⚡ SLOP DETECTED  [98.3% confidence]' },
  { delay: 100, type: 'detail', text: '  ↳ "Hi {first_name}, I came across..."' },
  { delay: 100, type: 'detail', text: '  ↳ template hash: 0xA3F8 (mass-sent)' },
  { delay: 400, type: 'trap', text: '⟹  EXPERT TRAP DEPLOYED' },
  { delay: 100, type: 'detail', text: '  ↳ "Explain TCP seq. numbering"' },
  { delay: 100, type: 'detail', text: '  ↳ status: awaiting reply...' },
  { delay: 900, type: 'sep', text: ' ' },
  { delay: 200, type: 'success', text: '✓ Purified. 12 tracked. 8 traps queued.' },
  { delay: 3500, type: 'reset', text: '' },
];

function TerminalDemo() {
  const [lines, setLines] = useState<Array<{ type: string; text: string }>>([]);
  const [cursor, setCursor] = useState(true);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => setCursor(c => !c), 530);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    let idx = 0;
    let tid: ReturnType<typeof setTimeout>;

    const next = () => {
      if (idx >= TERMINAL_SEQUENCE.length) return;
      const item = TERMINAL_SEQUENCE[idx++];
      if (item.type === 'reset') {
        tid = setTimeout(() => { setLines([]); idx = 0; next(); }, item.delay);
        return;
      }
      setLines(prev => [...prev, { type: item.type, text: item.text }]);
      tid = setTimeout(next, item.delay);
    };

    tid = setTimeout(next, 800);
    return () => clearTimeout(tid);
  }, []);

  return (
    <div className="terminal">
      <div className="terminal-header">
        <div className="terminal-dots"><span /><span /><span /></div>
        <span className="terminal-title">sauver — bash</span>
        <span className="terminal-live">● LIVE</span>
      </div>
      <div className="terminal-body" ref={bodyRef}>
        {lines.map((line, i) => (
          <div key={i} className={`t-line t-${line.type}`}>{line.text}</div>
        ))}
        <span className={`t-cursor ${cursor ? 'on' : 'off'}`}>█</span>
      </div>
    </div>
  );
}

const statTargets = { trackers: 10000, accuracy: 99.9, timeSaved: 50, slop: 95 };

const statItems: Array<{ key: keyof typeof statTargets; label: string }> = [
  { key: 'trackers', label: 'Trackers Blocked' },
  { key: 'accuracy', label: 'Detection Accuracy' },
  { key: 'timeSaved', label: 'Time Reclaimed' },
  { key: 'slop', label: 'Slop Reduction' },
];

const steps = [
  { num: '01', title: 'Tracker Shielding', desc: 'Identifies and neutralizes 1×1 tracking pixels and surveillance beacons before they phone home.' },
  { num: '02', title: 'Slop Detection', desc: 'AI classification distinguishes genuine human outreach from machine-generated "job slop" and sales templates.' },
  { num: '03', title: 'Expert-Domain Traps', desc: 'Fires hyper-specific, technically demanding questions at recruiters to shift the cognitive load back to the sender.' },
  { num: '04', title: 'Bouncer Replies', desc: 'Engages generic spammers with absurd, bureaucratic, or confusing automated replies to waste their resources.' },
  { num: '05', title: 'Inbox Triage', desc: 'Categorizes, labels, and archives emails by content and risk level, keeping your focus on what matters.' },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      className={`copy-btn ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

export default function Home() {
  const [activeSection, setActiveSection] = useState('');
  const [statsStarted, setStatsStarted] = useState(false);
  const [stats, setStats] = useState({ trackers: 0, accuracy: 0, timeSaved: 0, slop: 0 });
  const [installTab, setInstallTab] = useState<'gemini' | 'claude'>('gemini');

  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const statsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      let current = '';
      document.querySelectorAll<HTMLElement>('section[id]').forEach(s => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          if (entry.target === statsRef.current) setStatsStarted(true);
        }
      }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && observer.observe(el));
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!statsStarted) return;
    const start = performance.now();
    const animate = (now: number) => {
      const p = Math.min((now - start) / 2000, 1);
      setStats({
        trackers: p * statTargets.trackers,
        accuracy: p * statTargets.accuracy,
        timeSaved: p * statTargets.timeSaved,
        slop: p * statTargets.slop,
      });
      if (p < 1) requestAnimationFrame(animate);
      else setStats(statTargets);
    };
    requestAnimationFrame(animate);
  }, [statsStarted]);

  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  const formatStat = (key: keyof typeof statTargets, val: number) => {
    if (key === 'trackers') return val >= 10000 ? '10K+' : Math.floor(val).toString();
    if (key === 'accuracy') return val >= 99.9 ? '99.9%' : val.toFixed(1) + '%';
    if (key === 'timeSaved') return val >= 50 ? '50h+' : Math.floor(val) + 'h';
    if (key === 'slop') return val >= 95 ? '95%' : val.toFixed(1) + '%';
    return val.toString();
  };

  return (
    <>
      <Navbar activeSection={activeSection} />

      <main>

        {/* ── Hero ───────────────────────────────────────── */}
        <section className="hero">
          <div className="hero-content">
            <div className="hero-eyebrow mono reveal" style={{ transitionDelay: '0.1s' }} ref={addToRefs}>
              <div className="dot-blink" />
              [ AUTONOMOUS INBOX DEFENSE ACTIVE ]
            </div>
            <h1 className="reveal" style={{ transitionDelay: '0.25s' }} ref={addToRefs}>
              RECLAIM YOUR<br />
              <span>ATTENTION.</span>
            </h1>
            <p className="reveal" style={{ transitionDelay: '0.4s' }} ref={addToRefs}>
              Sauver doesn&apos;t just filter spam — it <strong>strikes back</strong>. A cyber-defense
              layer for Gmail that runs inside Claude Code and Gemini CLI. Strips tracking pixels,
              exposes AI-generated slop, and deploys expert-level traps to waste spammers&apos; time.
            </p>
            <div className="hero-btns reveal" style={{ transitionDelay: '0.55s' }} ref={addToRefs}>
              <Link href="#installation" className="btn btn-cta">Get Started &rarr;</Link>
              <Link href="#how-it-works" className="btn btn-outline">See how it works</Link>
            </div>
            <p className="hero-trust mono reveal" style={{ transitionDelay: '0.7s' }} ref={addToRefs}>
              Local-first · Private · MIT Licensed
            </p>
          </div>
          <div className="hero-visual reveal" style={{ transitionDelay: '0.45s' }} ref={addToRefs}>
            <TerminalDemo />
          </div>
        </section>

        {/* ── The Problem (Section2_v3) ───────────────────── */}
        <section className="problem-strip">
          <div className="problem-content">
            <p className="section-label mono reveal" ref={addToRefs}>THE REALITY</p>
            <h2 className="reveal" ref={addToRefs}>
              YOUR INBOX IS A<br /><span>WARZONE.</span>
            </h2>
            <p className="reveal" ref={addToRefs}>
              Every day, automated systems harvest your attention, track your opens, and blast identical
              pitches at thousands of targets — including you. It&apos;s not email. It&apos;s surveillance infrastructure.
            </p>
          </div>
        </section>

        {/* ── Who it is for ──────────────────────────────── */}
        <section id="who-it-is-for" className="section-container">
          <div className="section-header reveal" ref={addToRefs}>
            <div className="section-label mono">WHO IT&apos;S FOR</div>
            <h2>BUILT FOR THE <span>RESISTANCE</span></h2>
          </div>
          <div className="grid-features">
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
              </div>
              <h3>Privacy-Conscious Users</h3>
              <p>Stop hidden tracking pixels from reporting your activity back to senders.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
              </div>
              <h3>The Resistance</h3>
              <p>Actively mirror the tactics of automated predators. Waste the time of those who waste yours.</p>
            </div>
            <div className="feature-card reveal" ref={addToRefs}>
              <div className="feature-icon">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.5">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="3" />
                  <line x1="12" y1="2" x2="12" y2="5" />
                  <line x1="12" y1="19" x2="12" y2="22" />
                  <line x1="2" y1="12" x2="5" y2="12" />
                  <line x1="19" y1="12" x2="22" y2="12" />
                </svg>
              </div>
              <h3>Deep Workers</h3>
              <p>Reclaim your attention from the bombardment of low-quality, automated outreach.</p>
            </div>
          </div>
        </section>

        {/* ── How it works ───────────────────────────────── */}
        <section id="how-it-works" className="how-it-works-section">
          <div className="how-it-works-inner">
            <div>
              <div className="section-header section-header-left reveal" ref={addToRefs}>
                <div className="section-label mono">HOW IT WORKS</div>
                <h2>FIVE LAYERS OF <span>DEFENSE</span></h2>
              </div>
              <div className="steps-timeline">
                {steps.map((step, i) => (
                  <div key={i} className="step-item reveal" style={{ transitionDelay: `${i * 0.1}s` }} ref={addToRefs}>
                    <div className="step-num-badge">{step.num}</div>
                    <div className="step-content">
                      <h3>{step.title}</h3>
                      <p>{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="how-it-works-image reveal" style={{ transitionDelay: '0.2s' }} ref={addToRefs}>
              <Image
                src="/Section6_v5.avif"
                alt="Sauver shield — inbox defense visualization"
                width={500}
                height={500}
                style={{ width: '100%', height: 'auto', borderRadius: '50%', opacity: 0.85 }}
              />
            </div>
          </div>
        </section>

        {/* ── Strike Back (Section4_v3) ───────────────────── */}
        <section className="strike-back-section">
          <div className="strike-inner">
            <div className="section-label mono reveal" ref={addToRefs}>THE BOUNCER REPLY</div>
            <h2 className="reveal" style={{ transitionDelay: '0.1s' }} ref={addToRefs}>
              DON&apos;T JUST FILTER.<br /><span>FIGHT BACK.</span>
            </h2>
            <p className="strike-desc reveal" style={{ transitionDelay: '0.2s' }} ref={addToRefs}>
              When Sauver detects a recruiter mass-blast or sales template, it doesn&apos;t just archive it.
              It deploys an <strong>Expert-Domain Trap</strong> — a hyper-specific technical challenge no
              automated system can answer. The cognitive load shifts permanently back to the sender.
            </p>
            <div className="strike-features reveal" style={{ transitionDelay: '0.3s' }} ref={addToRefs}>
              <div className="strike-feature">
                <div className="strike-feature-icon">⟹</div>
                <h4>Expert-Domain Traps</h4>
                <p>Hyper-specific questions only a real human can answer, customized to the sender&apos;s claimed domain.</p>
              </div>
              <div className="strike-feature">
                <div className="strike-feature-icon">⊘</div>
                <h4>Bouncer Replies</h4>
                <p>Engages generic spammers with absurd, bureaucratic, or confusing automated replies to drain their resources.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Stats ───────────────────────────────────────── */}
        <section className="stats-band" ref={(el) => { statsRef.current = el; }}>
          <div className="stats-shield-bg" aria-hidden="true">
            <Image
              src="/Section6_v5.avif"
              alt=""
              width={600}
              height={600}
              style={{ width: '600px', height: '600px', objectFit: 'contain', opacity: 0.07 }}
            />
          </div>
          <div className="stats-grid">
            {statItems.map(({ key, label }) => (
              <div key={key} className="stat-item">
                <div className="stat-val">{formatStat(key, stats[key])}</div>
                <div className="stat-label">{label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Installation ────────────────────────────────── */}
        <section id="installation" className="section-container">
          <div className="section-header reveal" ref={addToRefs}>
            <div className="section-label mono">INSTALLATION</div>
            <h2>THREE MINUTE <span>SETUP</span></h2>
          </div>

          <div className="installation-content">
            <div className="install-step reveal" ref={addToRefs}>
              <h3><span className="step-n">1</span>One-Command Install</h3>
              <p>Run the automated installer to set up your local environment. Requires Node.js v18+.</p>
              <div className="code-mockup with-copy">
                <div className="code-content">
                  <span className="token-key">curl</span> -fsSL https://sauver.org/install.sh | <span className="token-key">bash</span>
                </div>
                <CopyButton text="curl -fsSL https://sauver.org/install.sh | bash" />
              </div>
            </div>

            <div className="install-step reveal" ref={addToRefs}>
              <h3><span className="step-n">2</span>Deploy the Backend</h3>
              <p>The installer automates the full backend setup via <code>clasp</code> — no manual steps needed:</p>
              <ul className="prereq-list">
                <li><strong>Enable Apps Script API</strong> — a one-time toggle in your Google account settings (the installer will prompt you with the link).</li>
                <li><strong>Authenticate</strong> — the installer opens a browser to securely log in with your Google account.</li>
                <li><strong>Auto-Deploy</strong> — the installer creates, configures, and deploys your Gmail backend automatically.</li>
              </ul>
              <div className="info-box">
                <p><strong>Security:</strong> Your backend is protected by a unique 64-character secret hex key generated locally and stored at <code>~/.sauver/config.json</code>. It never leaves your machine except in HTTPS POSTs to your own Apps Script.</p>
              </div>
            </div>

            <div className="install-step reveal" ref={addToRefs}>
              <h3><span className="step-n">3</span>Connect Your AI Client</h3>
              <p>Sauver now runs a unified MCP server at <code>~/.sauver/mcp-server/</code> that works with both Gemini and Claude.</p>
              
              <div className="client-grid">
                <div className="client-box">
                  <h4>Gemini CLI</h4>
                  <p>The installer registers the MCP server and populates global slash command shims in <code>~/.agent/workflows/</code>. Commands work from any directory:</p>
                  <div className="code-mockup compact">
                    <span className="token-key">/sauver</span>
                  </div>
                </div>
                <div className="client-box">
                  <h4>Claude Code</h4>
                  <p>The installer registers the MCP server in <code>~/.claude/settings.json</code> and writes global slash commands to <code>~/.claude/commands/</code>. Available in every session, from any directory:</p>
                  <div className="code-mockup compact">
                    <span className="token-key">/sauver</span>
                  </div>
                </div>
              </div>
              <div className="info-box">
                <p><strong>Auto-updates:</strong> The MCP server silently checks for skill updates on GitHub once a day at startup. A one-line message appears when an update is applied — just restart your AI client to pick it up.</p>
              </div>
            </div>

            <div className="install-step reveal" ref={addToRefs}>
              <h3><span className="step-n">4</span>Configuration</h3>
              <p>Settings live in <code>~/.sauver/config.json</code> under the <code>preferences</code> key. Edit the file directly, or just ask Claude or Gemini (e.g. &quot;turn on yolo mode&quot;):</p>
              <div className="config-table">
                <div className="config-row config-row-header">
                  <span>Option</span><span>Description</span><span>Default</span>
                </div>
                {[
                  { key: 'auto_draft',                         desc: 'Auto-create draft replies to detected slop',            def: 'true' },
                  { key: 'yolo_mode',                          desc: 'Auto-send replies — bypasses draft review',             def: 'false' },
                  { key: 'treat_job_offers_as_slop',           desc: 'Treat recruiter outreach as slop (Expert-Domain Trap)', def: 'true' },
                  { key: 'treat_unsolicited_investors_as_slop',desc: 'Treat unsolicited investor outreach as slop',           def: 'true' },
                  { key: 'sauver_label',                       desc: 'Gmail label applied when an email is archived',        def: '"Sauver"' },
                ].map(row => (
                  <div key={row.key} className="config-row">
                    <code>{row.key}</code><span>{row.desc}</span><code>{row.def}</code>
                  </div>
                ))}
              </div>
            </div>

            <div className="install-step reveal" ref={addToRefs}>
              <h3><span className="step-n">5</span>Use It</h3>
              <div className="code-mockup">
                <span className="token-comment"># Full triage — strips trackers, classifies intent, drafts counter-measures</span><br />
                <span className="token-key">/sauver</span><br /><br />
                <span className="token-comment"># Strip tracking pixels from a specific email</span><br />
                <span className="token-key">/tracker-shield</span><br /><br />
                <span className="token-comment"># Draft an Expert-Domain Trap for recruiter/sales slop</span><br />
                <span className="token-key">/slop-detector</span><br /><br />
                <span className="token-comment"># Due Diligence Loop for unsolicited investors</span><br />
                <span className="token-key">/investor-trap</span><br /><br />
                <span className="token-comment"># Time-Sink Trap for generic spam</span><br />
                <span className="token-key">/bouncer-reply</span><br /><br />
                <span className="token-comment"># Label and archive a specific thread on demand</span><br />
                <span className="token-key">/archiver</span>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}
