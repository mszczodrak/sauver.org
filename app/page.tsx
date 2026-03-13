'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

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

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [statsStarted, setStatsStarted] = useState(false);
  const [stats, setStats] = useState({ trackers: 0, accuracy: 0, timeSaved: 0, slop: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [installTab, setInstallTab] = useState<'gemini' | 'claude'>('gemini');

  const revealRefs = useRef<(HTMLElement | null)[]>([]);
  const statsRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
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
      <nav className={scrolled ? 'scrolled' : ''}>
        <div className="nav-container">
          <Link href="#" className="logo">
            <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.34-2.98 8.19-7 9.49V12H5V6.3l7-3.11v8.8z" /></svg>
            SAUVER
          </Link>
          <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
            <Link href="#who-it-is-for" className={activeSection === 'who-it-is-for' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Who it&apos;s for</Link>
            <Link href="#how-it-works" className={activeSection === 'how-it-works' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>How it works</Link>
            <Link href="#installation" className={activeSection === 'installation' ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Installation</Link>
            <Link href="#installation" className="btn btn-cta pulse" onClick={() => setMobileMenuOpen(false)}>Install Now</Link>
          </div>
          <button className={`hamburger ${mobileMenuOpen ? 'open' : ''}`} aria-label="Toggle menu" onClick={() => setMobileMenuOpen(o => !o)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>

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
              Sauver doesn&apos;t just filter spam — it <strong>strikes back</strong>. A Gemini CLI
              Extension that strips tracking pixels, exposes AI-generated slop, and deploys
              expert-level traps to waste spammers&apos; time.
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
            <h2>QUICK <span>START</span></h2>
          </div>

          {/* Tab bar */}
          <div className="tab-bar reveal" ref={addToRefs}>
            <button className={`tab-btn ${installTab === 'gemini' ? 'active' : ''}`} onClick={() => setInstallTab('gemini')}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z"/></svg>
              Gemini CLI
            </button>
            <button className={`tab-btn ${installTab === 'claude' ? 'active' : ''}`} onClick={() => setInstallTab('claude')}>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M9.75 3.5a.75.75 0 0 1 .75.75v1.5h3V4.25a.75.75 0 0 1 1.5 0v1.5h1.25A2.25 2.25 0 0 1 18.5 8v1.25H20a.75.75 0 0 1 0 1.5h-1.5V14H20a.75.75 0 0 1 0 1.5h-1.5V17a2.25 2.25 0 0 1-2.25 2.25H7.75A2.25 2.25 0 0 1 5.5 17v-1.5H4a.75.75 0 0 1 0-1.5h1.5v-3.25H4a.75.75 0 0 1 0-1.5h1.5V8A2.25 2.25 0 0 1 7.75 5.75H9V4.25a.75.75 0 0 1 .75-.75z"/></svg>
              Claude Code
            </button>
          </div>

          {/* ── Gemini CLI tab ── */}
          {installTab === 'gemini' && (
            <div className="installation-content">
              <div className="install-step">
                <h3><span className="step-n">1</span>Prerequisites</h3>
                <p>Ensure you have Python 3.10+ and the <a href="https://github.com/google-gemini/gemini-cli" className="inline-link">Gemini CLI</a> installed.</p>
              </div>
              <div className="install-step">
                <h3><span className="step-n">2</span>One-Line Install</h3>
                <div className="code-mockup">
                  <span className="token-key">gemini extensions install</span>{' '}
                  https://github.com/mszczodrak/sauver{' '}
                  <span className="token-comment">--consent</span>
                </div>
              </div>
              <div className="install-step">
                <h3><span className="step-n">3</span>Configure Gmail Access</h3>
                <p>Provide a <code>credentials.json</code> from Google Cloud Console. On first run, a browser window opens to authorize access and generate <code>token.json</code>.</p>
              </div>
              <div className="install-step">
                <h3><span className="step-n">4</span>Configuration</h3>
                <p>Sauver stores preferences in a local <code>.sauver-config.json</code>. Manage it via the Gemini CLI:</p>
                <div className="code-mockup" style={{ marginTop: '16px' }}>
                  <span className="token-comment"># View current config</span><br />
                  <span className="token-key">get_sauver_config</span><br /><br />
                  <span className="token-comment"># Enable YOLO mode (auto-send traps)</span><br />
                  <span className="token-key">set_sauver_config</span>(<span className="token-val">updates=&#123;&quot;yolo_mode&quot;: true&#125;</span>)<br /><br />
                  <span className="token-comment"># Run interactive setup wizard</span><br />
                  <span className="token-key">start_sauver_config_wizard</span>
                </div>
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
              <div className="install-step">
                <h3><span className="step-n">5</span>Use It</h3>
                <div className="code-mockup">
                  <span className="token-comment"># Full inbox triage</span><br />
                  <span className="token-val">&quot;Use the sauver-inbox-assistant to triage my last 10 unread emails&quot;</span><br /><br />
                  <span className="token-comment"># Disable job filter (if actively job searching)</span><br />
                  <span className="token-val">&quot;Update my config to not treat job offers as slop&quot;</span><br /><br />
                  <span className="token-comment"># Target a specific email</span><br />
                  <span className="token-val">&quot;Use slop-detector on this email: [paste subject]&quot;</span>
                </div>
              </div>
            </div>
          )}

          {/* ── Claude Code tab ── */}
          {installTab === 'claude' && (
            <div className="installation-content">
              <div className="install-step">
                <h3><span className="step-n">1</span>Prerequisites</h3>
                <p>Two things are required before Sauver&apos;s skills load in Claude Code:</p>
                <ul className="prereq-list">
                  <li>
                    <strong>Gmail MCP Server</strong> — Sauver uses <code>mcp__claude_ai_Gmail__*</code> tools.
                    Follow the <a href="https://github.com/anthropics/claude-code/tree/main/mcp" className="inline-link">Gmail MCP setup guide</a> to connect your Google account.
                  </li>
                  <li>
                    <strong>Clone the repo</strong> — the Sauver MCP server is registered at the project level
                    via <code>.claude/settings.json</code>. Claude Code must be opened from inside the repository.
                  </li>
                </ul>
                <div className="code-mockup" style={{ marginTop: '16px' }}>
                  <span className="token-key">git clone</span> https://github.com/mszczodrak/sauver.git<br />
                  <span className="token-key">cd</span> sauver<br />
                  <span className="token-key">claude</span> <span className="token-comment"># open Claude Code from inside the repo</span>
                </div>
              </div>
              <div className="install-step">
                <h3><span className="step-n">2</span>Available Slash Commands</h3>
                <p>Once Claude Code is open inside the repo, these commands are available:</p>
                <div className="cmd-table">
                  {[
                    { cmd: '/sauver',         desc: 'Full inbox triage — scans unread emails, strips trackers, classifies intent, and drafts a counter-measure for each slop email' },
                    { cmd: '/tracker-shield', desc: 'Strips tracking pixels and spy-links from a specific email' },
                    { cmd: '/slop-detector',  desc: 'Analyzes an email for recruiter/sales slop and drafts an Expert-Domain Trap reply' },
                    { cmd: '/investor-trap',  desc: 'Analyzes an email for investor slop and drafts a Due Diligence Loop reply' },
                    { cmd: '/bouncer-reply',  desc: 'Drafts a Time-Sink Trap reply for general spam or marketing email' },
                  ].map(row => (
                    <div key={row.cmd} className="cmd-row">
                      <code className="cmd-name">{row.cmd}</code>
                      <span className="cmd-desc">{row.desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="install-step">
                <h3><span className="step-n">3</span>Example Usage</h3>
                <div className="code-mockup">
                  <span className="token-comment"># Triage everything unread</span><br />
                  <span className="token-key">/sauver</span><br /><br />
                  <span className="token-comment"># Target a specific email</span><br />
                  <span className="token-key">/slop-detector</span> <span className="token-val">&quot;We&apos;d love to connect about an exciting opportunity&quot;</span><br />
                  <span className="token-key">/tracker-shield</span><br />
                  <span className="token-key">/bouncer-reply</span>
                </div>
              </div>
              <div className="install-step">
                <h3><span className="step-n">4</span>Limitations vs. Gemini CLI</h3>
                <div className="limitation-box">
                  <p>The Gmail MCP server available in Claude Code does not currently expose <code>gmail_modify</code> or <code>gmail_send</code>, so:</p>
                  <ul className="prereq-list" style={{ marginTop: '12px' }}>
                    <li><strong>Archiving</strong> — applying the <code>Sauver</code> label and removing from INBOX must be done manually after review.</li>
                    <li><strong>YOLO mode</strong> — has no effect. All replies are saved as drafts regardless of the <code>yolo_mode</code> setting.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </section>

      </main>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <Link href="#" className="logo">
              <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.47 4.34-2.98 8.19-7 9.49V12H5V6.3l7-3.11v8.8z" /></svg>
              SAUVER
            </Link>
            <p>The Digital Bouncer for your Inbox. Professional protection against automated outreach.</p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <ul>
              <li><Link href="#who-it-is-for">Who it&apos;s for</Link></li>
              <li><Link href="#how-it-works">How it works</Link></li>
              <li><Link href="#installation">Installation</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link href="https://github.com/mszczodrak/sauver">GitHub</Link></li>
              <li><Link href="#">Documentation</Link></li>
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
          &copy; 2026 Sauver. Join the Resistance.
        </div>
      </footer>
    </>
  );
}
