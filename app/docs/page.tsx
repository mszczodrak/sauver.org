'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const NAV_SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'installation', label: 'Installation' },
  { id: 'commands', label: 'Commands' },
  { id: 'configuration', label: 'Configuration' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'security', label: 'Security' },
  { id: 'updates', label: 'Auto-Updates' },
  { id: 'faq', label: 'FAQ' },
  { id: 'uninstall', label: 'Uninstallation' },
];

const COMMANDS = [
  {
    cmd: '/sauver',
    desc: 'Full triage — scans inbox, strips trackers, classifies intent, and drafts or sends counter-measures.',
  },
  { cmd: '/tracker-shield', desc: 'Strip tracking pixels and spy-links from a specific email.' },
  {
    cmd: '/slop-detector',
    desc: 'Classify recruiter/sales slop and reply with the Expert-Domain Trap.',
  },
  { cmd: '/investor-trap', desc: 'Classify investor slop and reply with the Due Diligence Loop.' },
  { cmd: '/bouncer-reply', desc: 'Reply to generic spam with the Time-Sink Trap.' },
  { cmd: '/archiver', desc: 'Label and archive a specific thread on demand, without full triage.' },
];

const APPS_SCRIPT_ACTIONS = [
  { action: 'scan_inbox', desc: 'List unread inbox emails' },
  { action: 'search_messages', desc: 'Search with a Gmail query string' },
  { action: 'get_message', desc: 'Fetch full email content by ID' },
  { action: 'create_draft', desc: 'Create a new draft or a reply draft' },
  { action: 'send_message', desc: 'Send a reply immediately' },
  { action: 'archive_thread', desc: 'Remove from Inbox and mark read' },
  { action: 'apply_label', desc: 'Apply a label (creates it if missing)' },
  { action: 'get_profile', desc: "Get the user's email and display name" },
  { action: 'list_labels', desc: 'List all Gmail labels' },
];

const CONFIG_OPTIONS = [
  { key: 'auto_draft', default: 'true', desc: 'Automatically create draft replies to slop' },
  { key: 'yolo_mode', default: 'false', desc: 'Auto-send replies (use with caution)' },
  {
    key: 'treat_job_offers_as_slop',
    default: 'true',
    desc: 'Trigger Expert-Domain Trap for recruiters',
  },
  {
    key: 'treat_unsolicited_investors_as_slop',
    default: 'true',
    desc: 'Trigger Due Diligence Loop for investors',
  },
  { key: 'slop_label', default: '"Sauver/Slop"', desc: 'Gmail label applied to flagged emails when archiving' },
  { key: 'reviewed_label', default: '"Sauver/Reviewed"', desc: 'Gmail label applied to legitimate emails so they are skipped on future scans' },
  {
    key: 'engage_bots',
    default: 'false',
    desc: 'Keep engaging threads flagged as bot-like; if false, silently archive them',
  },
  {
    key: 'bot_reply_threshold_seconds',
    default: '120',
    desc: 'Seconds between replies below which a sender is considered bot-like',
  },
  {
    key: 'max_trap_exchanges',
    default: '3',
    desc: 'Maximum back-and-forth exchanges before escalating to the NDA Trap and disengaging',
  },
  {
    key: 'max_daily_replies',
    default: '100',
    desc: 'Maximum number of replies (sent or drafted) by Sauver in a 24-hour window',
  },
];

const FAQ_ITEMS = [
  {
    q: 'Do I need a Google Cloud project or API keys?',
    a: 'No. Google Apps Script runs inside your Google account for free. The installer requires only a browser and Node.js v18+.',
  },
  {
    q: 'Is my email data sent to Anthropic or Google?',
    a: 'Email content is read by the AI model (Claude or Gemini) running on your machine as part of the conversation. It is subject to the same privacy terms as any other message you send to your AI assistant — not to any additional service.',
  },
  {
    q: 'What does "Who has access: Anyone" mean in the deployment config?',
    a: 'It means the Apps Script Web App URL is publicly reachable — but the secret key acts as a password. Any request without the correct key is immediately rejected. The URL alone is useless without the key.',
  },
  {
    q: 'Can I revoke access?',
    a: 'Yes. In the Apps Script editor, click Deploy → Manage deployments, then delete the deployment. The Web App goes offline instantly.',
  },
  {
    q: 'How is the secret key stored and protected?',
    a: 'The key lives in ~/.sauver/config.json with permissions 600 (readable and writable only by you). It is listed in .gitignore and is transmitted only over HTTPS directly to your own Apps Script — never to Anthropic, Google, or any third party.',
  },
  {
    q: 'What if I lose my secret key?',
    a: 'Run the installer again. It generates a new key, redeploys the backend, and updates your local config automatically.',
  },
  {
    q: 'Does yolo_mode work in Claude Code?',
    a: 'Yes — send_message is fully available in both Claude Code and Gemini CLI.',
  },
  {
    q: 'Can I run this on multiple machines?',
    a: 'Yes. Run the installer on each machine. Use the same Apps Script Web App URL, but generate a new secret key per machine (or re-use the same key by copying ~/.sauver/config.json).',
  },
  {
    q: 'Does this work with Google Workspace (G Suite) accounts?',
    a: 'Yes, as long as your organization allows Apps Script Web Apps. Some Workspace admins restrict external deployments — check with your IT team if the deployment step fails.',
  },
  {
    q: 'How do I update Sauver?',
    a: 'Skill files update automatically — the MCP server checks GitHub once a day at startup and silently installs any newer version. To update the MCP server itself or the Apps Script backend, re-run the installer.',
  },
];

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button
      className={`copy-btn ${copied ? 'copied' : ''}`}
      onClick={handleCopy}
      aria-label="Copy to clipboard"
      title="Copy to clipboard"
    >
      {copied ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

function CodeBlock({ children, copyText }: { children: React.ReactNode; copyText?: string }) {
  return (
    <div className="doc-code-block">
      <div className="doc-code-content">{children}</div>
      {copyText && <CopyButton text={copyText} />}
    </div>
  );
}

export default function Docs() {
  const [activeSection, setActiveSection] = useState('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const revealRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      let current = 'overview';
      document.querySelectorAll<HTMLElement>('.doc-section[id]').forEach((s) => {
        if (window.scrollY >= s.offsetTop - 140) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('active');
        }),
      { threshold: 0.08 },
    );
    revealRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const addToRefs = useCallback((el: HTMLElement | null) => {
    if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileSidebarOpen(false);
  };

  return (
    <>
      <Navbar activeSection="docs" />

      {/* ── Docs Hero Bar ──────────────────────────── */}
      <div className="docs-hero-bar">
        <div className="docs-hero-inner">
          <div className="docs-hero-eyebrow mono">DOCUMENTATION</div>
          <h1 className="docs-hero-title">Sauver Reference</h1>
          <p className="docs-hero-sub">
            Everything you need to install, configure, and use Sauver — the cyber-defense layer for
            your Gmail inbox.
          </p>
        </div>
      </div>

      <div className="docs-layout">
        {/* ── Mobile Sidebar Toggle ──────────────────── */}
        <button
          className="docs-mobile-nav-toggle"
          onClick={() => setMobileSidebarOpen((o) => !o)}
          aria-label="Toggle docs navigation"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="16" y2="12" />
            <line x1="3" y1="18" x2="12" y2="18" />
          </svg>
          <span>On this page</span>
        </button>

        {/* ── Sidebar ────────────────────────────────── */}
        <aside className={`docs-sidebar ${mobileSidebarOpen ? 'open' : ''}`}>
          <div className="docs-sidebar-inner">
            <div className="docs-sidebar-label mono">ON THIS PAGE</div>
            <nav className="docs-sidenav">
              {NAV_SECTIONS.map((s) => (
                <button
                  key={s.id}
                  className={`docs-sidenav-item ${activeSection === s.id ? 'active' : ''}`}
                  onClick={() => scrollTo(s.id)}
                >
                  {s.label}
                </button>
              ))}
            </nav>
            <div className="docs-sidebar-cta">
              <Link
                href="https://github.com/sauver-org/sauver"
                target="_blank"
                className="docs-github-link"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </Link>
            </div>
          </div>
        </aside>

        {/* ── Main Content ───────────────────────────── */}
        <main className="docs-main">
          {/* ── Overview ─────────────────────────────── */}
          <section id="overview" className="doc-section">
            <div className="doc-section-label mono reveal" ref={addToRefs}>
              OVERVIEW
            </div>
            <h2 className="doc-h2 reveal" ref={addToRefs}>
              What Sauver Does
            </h2>
            <p className="doc-p reveal" ref={addToRefs}>
              Sauver is a cyber-defense layer for Gmail. It strips tracking pixels, identifies
              recruiter, sales, and investor &quot;slop,&quot; and wastes spammers&apos; time with
              automated traps. It runs inside <strong>Claude Code</strong> and{' '}
              <strong>Gemini CLI</strong> via a local MCP server — no background daemons, no cloud
              services of its own, no API keys.
            </p>

            <div className="doc-feature-grid reveal" ref={addToRefs}>
              {[
                {
                  icon: '⊘',
                  title: 'Tracker Shield',
                  desc: 'Strips 1×1 tracking pixels and surveillance beacons from HTML emails before they phone home.',
                },
                {
                  icon: '⚡',
                  title: 'Slop Detection',
                  desc: 'AI classification separates genuine human outreach from automated recruiter and sales templates.',
                },
                {
                  icon: '⟹',
                  title: 'Expert-Domain Trap',
                  desc: 'Fires hyper-specific technical questions at recruiter bots to shift the cognitive load back to the sender.',
                },
                {
                  icon: '📋',
                  title: 'Due Diligence Loop',
                  desc: 'Buries unsolicited investors in bureaucratic document requests and compliance questions.',
                },
                {
                  icon: '🚫',
                  title: 'Bouncer Reply',
                  desc: 'Engages generic spammers with absurd, impossible requirements to drain their time and resources.',
                },
                {
                  icon: '📄',
                  title: 'NDA Trap',
                  desc: 'When a sender repeats the same pitch 3+ times, Sauver sends them a Nondisclosure Agreement to sign before any further communication.',
                },
                {
                  icon: '🤖',
                  title: 'Bot Detection',
                  desc: 'Detects near-instant replies across consecutive exchanges and silently archives bot-driven threads (configurable threshold).',
                },
              ].map((f, i) => (
                <div key={i} className="doc-feature-card">
                  <div className="doc-feature-icon">{f.icon}</div>
                  <div>
                    <h3 className="doc-feature-title">{f.title}</h3>
                    <p className="doc-feature-desc">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="doc-divider" />

          {/* ── Installation ─────────────────────────── */}
          <section id="installation" className="doc-section">
            <div className="doc-section-label mono reveal" ref={addToRefs}>
              INSTALLATION
            </div>
            <h2 className="doc-h2 reveal" ref={addToRefs}>
              Three-Minute Setup
            </h2>
            <p className="doc-p reveal" ref={addToRefs}>
              One command is all you need. The installer automates every step — no OAuth setup, no
              API keys, no gcloud. The only prerequisite is <strong>Node.js v18+</strong>.
            </p>

            <div className="doc-step reveal" ref={addToRefs}>
              <div className="doc-step-num">1</div>
              <div className="doc-step-body">
                <h3 className="doc-step-title">Run the installer</h3>
                <CodeBlock copyText="curl -fsSL https://sauver.org/install.sh | bash">
                  <span className="tok-key">curl</span> -fsSL https://sauver.org/install.sh |{' '}
                  <span className="tok-key">bash</span>
                </CodeBlock>
              </div>
            </div>

            <div className="doc-step reveal" ref={addToRefs}>
              <div className="doc-step-num">2</div>
              <div className="doc-step-body">
                <h3 className="doc-step-title">Enable Apps Script API &amp; authenticate</h3>
                <p className="doc-p" style={{ marginTop: 0 }}>
                  The installer will prompt you with a link to enable the Apps Script API in your
                  Google account (a one-time toggle). It then opens a browser window for you to
                  authenticate securely with your Google account.
                </p>
                <div className="doc-info-box">
                  <span className="doc-info-icon">ℹ</span>
                  <p>
                    No third-party OAuth, no service accounts. The Apps Script runs <em>as you</em>{' '}
                    inside your own Google account, using the same Gmail APIs Gmail itself uses.
                  </p>
                </div>
              </div>
            </div>

            <div className="doc-step reveal" ref={addToRefs}>
              <div className="doc-step-num">3</div>
              <div className="doc-step-body">
                <h3 className="doc-step-title">Auto-deploy the backend</h3>
                <p className="doc-p" style={{ marginTop: 0 }}>
                  The installer uses <code>clasp</code> to create, configure, and deploy the Google
                  Apps Script backend automatically. No manual steps in the Apps Script editor.
                </p>
              </div>
            </div>

            <div className="doc-step reveal" ref={addToRefs}>
              <div className="doc-step-num">4</div>
              <div className="doc-step-body">
                <h3 className="doc-step-title">Connect your AI client</h3>
                <p className="doc-p" style={{ marginTop: 0 }}>
                  The installer registers the local MCP server and writes global slash command shims
                  for both Claude Code and Gemini CLI. Commands are available immediately in every
                  session, from any directory.
                </p>
                <div className="doc-client-row">
                  <div className="doc-client-card">
                    <h4 className="doc-client-title">Claude Code</h4>
                    <ul className="doc-client-list">
                      <li>
                        MCP server → <code>~/.claude/settings.json</code>
                      </li>
                      <li>
                        Slash commands → <code>~/.claude/commands/</code>
                      </li>
                    </ul>
                  </div>
                  <div className="doc-client-card">
                    <h4 className="doc-client-title">Gemini CLI</h4>
                    <ul className="doc-client-list">
                      <li>
                        MCP server → <code>~/.gemini/settings.json</code>
                      </li>
                      <li>
                        Slash commands → <code>~/.gemini/skills/</code>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="doc-divider" />

          {/* ── Commands ─────────────────────────────── */}
          <section id="commands" className="doc-section">
            <div className="doc-section-label mono reveal" ref={addToRefs}>
              COMMANDS
            </div>
            <h2 className="doc-h2 reveal" ref={addToRefs}>
              Slash Commands
            </h2>
            <p className="doc-p reveal" ref={addToRefs}>
              All six commands work identically in both Claude Code and Gemini CLI, from any working
              directory. You can also ask in plain English — e.g.{' '}
              <em>&quot;Sauver, triage my last 10 unread emails&quot;</em> or{' '}
              <em>&quot;Archive this thread under the Sauver label&quot;.</em>
            </p>

            <div className="doc-cmd-table reveal" ref={addToRefs}>
              <div className="doc-cmd-header">
                <span>Command</span>
                <span>What it does</span>
              </div>
              {COMMANDS.map((c, i) => (
                <div key={i} className="doc-cmd-row">
                  <code className="doc-cmd-name">{c.cmd}</code>
                  <span className="doc-cmd-desc">{c.desc}</span>
                </div>
              ))}
            </div>

            <div className="doc-info-box reveal" ref={addToRefs} style={{ marginTop: '32px' }}>
              <span className="doc-info-icon">⚡</span>
              <p>
                <strong>/sauver</strong> is the full orchestrator — it runs the complete pipeline.
                Use the individual commands when you want to target a specific email or action
                without running the full inbox scan.
              </p>
            </div>
          </section>

          <div className="doc-divider" />

          {/* ── Configuration ────────────────────────── */}
          <section id="configuration" className="doc-section">
            <div className="doc-section-label mono reveal" ref={addToRefs}>
              CONFIGURATION
            </div>
            <h2 className="doc-h2 reveal" ref={addToRefs}>
              Config Reference
            </h2>
            <p className="doc-p reveal" ref={addToRefs}>
              Settings live in <code>~/.sauver/config.json</code> under the <code>preferences</code>{' '}
              key. You can edit the file directly, or simply ask your AI client — e.g.{' '}
              <em>&quot;turn on yolo mode&quot;</em> or{' '}
              <em>&quot;treat job offers as slop&quot;.</em>
            </p>

            <div className="doc-config-table reveal" ref={addToRefs}>
              <div className="doc-config-header">
                <span>Option</span>
                <span>Default</span>
                <span>Description</span>
              </div>
              {CONFIG_OPTIONS.map((r, i) => (
                <div key={i} className="doc-config-row">
                  <code>{r.key}</code>
                  <code className="doc-config-default">{r.default}</code>
                  <span>{r.desc}</span>
                </div>
              ))}
            </div>

            <div className="doc-warn-box reveal" ref={addToRefs}>
              <span className="doc-warn-icon">⚠</span>
              <p>
                <strong>yolo_mode</strong> automatically sends counter-measure replies without draft
                review. Use only if you&apos;re confident in Sauver&apos;s classifications —
                misclassification of a legitimate email could send an unintended response.
              </p>
            </div>
          </section>

          <div className="doc-divider" />

          {/* ── Architecture ─────────────────────────── */}
          <section id="architecture" className="doc-section">
            <div className="doc-section-label mono reveal" ref={addToRefs}>
              ARCHITECTURE
            </div>
            <h2 className="doc-h2 reveal" ref={addToRefs}>
              How It Works
            </h2>
            <p className="doc-p reveal" ref={addToRefs}>
              Sauver has three layers. The defense logic — tracker detection, slop classification,
              trap generation — runs entirely inside the AI model. The MCP server and Apps Script
              are pure data pipes.
            </p>

            <div className="reveal" ref={addToRefs} style={{ marginBottom: '2rem' }}>
              <Image
                src="/architecture_black.jpg"
                alt="Sauver architecture overview"
                width={900}
                height={600}
                style={{ width: '100%', height: 'auto', borderRadius: '12px' }}
              />
            </div>

            <div className="doc-arch-diagram reveal" ref={addToRefs}>
              <div className="doc-arch-layer doc-arch-l1">
                <div className="doc-arch-layer-label mono">LAYER 1 — CLOUD</div>
                <div className="doc-arch-layer-title">Google Apps Script</div>
                <p className="doc-arch-layer-desc">
                  Deployed to your Google account. Native Gmail access via <code>GmailApp</code> —
                  no OAuth tokens, no service accounts. Exposes 9 Gmail actions over HTTPS.
                </p>
              </div>
              <div className="doc-arch-arrow">
                <div className="doc-arch-arrow-line" />
                <div className="doc-arch-arrow-label mono">HTTPS POST (secret key)</div>
              </div>
              <div className="doc-arch-layer doc-arch-l2">
                <div className="doc-arch-layer-label mono">LAYER 2 — LOCAL</div>
                <div className="doc-arch-layer-title">MCP Server</div>
                <p className="doc-arch-layer-desc">
                  A small Node.js process at <code>~/.sauver/mcp-server/</code>. Translates MCP tool
                  calls → Apps Script HTTPS POSTs. Reads config from{' '}
                  <code>~/.sauver/config.json</code>.
                </p>
              </div>
              <div className="doc-arch-split">
                <div className="doc-arch-split-line" />
                <div className="doc-arch-split-line" />
              </div>
              <div className="doc-arch-clients">
                <div className="doc-arch-layer doc-arch-l3">
                  <div className="doc-arch-layer-label mono">LAYER 3</div>
                  <div className="doc-arch-layer-title">Claude Code</div>
                  <p className="doc-arch-layer-desc">
                    Reads skill files from <code>~/.sauver/skills/</code>. Defense logic runs in the
                    model.
                  </p>
                </div>
                <div className="doc-arch-layer doc-arch-l3">
                  <div className="doc-arch-layer-label mono">LAYER 3</div>
                  <div className="doc-arch-layer-title">Gemini CLI</div>
                  <p className="doc-arch-layer-desc">
                    Reads skill files from <code>~/.sauver/skills/</code>. Defense logic runs in the
                    model.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="doc-h3 reveal" ref={addToRefs} style={{ marginTop: '48px' }}>
              Layer 1 — Google Apps Script
            </h3>
            <p className="doc-p reveal" ref={addToRefs}>
              <code>apps-script/Code.gs</code> is deployed as a Web App inside your own Google
              account. Because it runs as you, it has full native Gmail access — the same APIs Gmail
              itself uses. The Web App accepts HTTPS POST requests and routes them to one of nine
              actions:
            </p>

            <div className="doc-cmd-table reveal" ref={addToRefs}>
              <div className="doc-cmd-header">
                <span>Action</span>
                <span>What it does</span>
              </div>
              {APPS_SCRIPT_ACTIONS.map((a, i) => (
                <div key={i} className="doc-cmd-row">
                  <code className="doc-cmd-name">{a.action}</code>
                  <span className="doc-cmd-desc">{a.desc}</span>
                </div>
              ))}
            </div>

            <h3 className="doc-h3 reveal" ref={addToRefs} style={{ marginTop: '40px' }}>
              Layer 2 — Local MCP Server
            </h3>
            <p className="doc-p reveal" ref={addToRefs}>
              <code>mcp-server/index.js</code> is a small Node.js process that runs on your machine.
              It speaks the Model Context Protocol (MCP) over stdio, which is how Claude Code and
              Gemini CLI discover and call tools.
            </p>
            <p className="doc-p reveal" ref={addToRefs}>
              When Claude or Gemini calls a tool, the MCP server either handles it locally (for{' '}
              <code>get_preferences</code> and <code>set_preference</code>, which read/write{' '}
              <code>~/.sauver/config.json</code>) or forwards it as an HTTPS POST to the Apps Script
              Web App and returns the result.
            </p>

            <h3 className="doc-h3 reveal" ref={addToRefs} style={{ marginTop: '40px' }}>
              Layer 3 — AI Clients
            </h3>
            <p className="doc-p reveal" ref={addToRefs}>
              Both Claude Code and Gemini CLI connect to the same local MCP server and see the same
              11 tools. The defense logic — tracker detection, slop classification, trap generation
              — runs entirely inside the AI model, guided by the skill files installed to{' '}
              <code>~/.sauver/skills/</code>. No defense logic lives in the MCP server or the Apps
              Script; they are pure data pipes.
            </p>
          </section>

          <div className="doc-divider" />

          {/* ── Security ─────────────────────────────── */}
          <section id="security" className="doc-section">
            <div className="doc-section-label mono reveal" ref={addToRefs}>
              SECURITY
            </div>
            <h2 className="doc-h2 reveal" ref={addToRefs}>
              Security Model
            </h2>

            <div className="doc-security-grid reveal" ref={addToRefs}>
              {[
                {
                  icon: '🔑',
                  title: 'Secret Key',
                  desc: 'A 64-character random hex string generated locally during install. It never leaves your machine except in the POST body to your own Apps Script — never sent to Anthropic, Google, or any third party.',
                },
                {
                  icon: '🔒',
                  title: 'File Permissions',
                  desc: 'The config file ~/.sauver/config.json is created with permissions 600 (readable and writable only by you). It is listed in .gitignore so it can never be accidentally committed.',
                },
                {
                  icon: '🛡️',
                  title: 'Apps Script Isolation',
                  desc: 'The Apps Script runs under your Google account and is not accessible to anyone without the secret key. The URL alone is useless without the correct key.',
                },
                {
                  icon: '🔏',
                  title: 'Email Privacy',
                  desc: 'Email content is read by the AI model on your local machine. It is not stored or sent anywhere beyond what your AI client (Claude/Gemini) already handles.',
                },
              ].map((s, i) => (
                <div key={i} className="doc-security-card">
                  <div className="doc-security-icon">{s.icon}</div>
                  <h3 className="doc-security-title">{s.title}</h3>
                  <p className="doc-security-desc">{s.desc}</p>
                </div>
              ))}
            </div>

            <div className="doc-info-box reveal" ref={addToRefs} style={{ marginTop: '32px' }}>
              <span className="doc-info-icon">ℹ</span>
              <p>
                To revoke access at any time: In the Apps Script editor, click{' '}
                <strong>Deploy → Manage deployments</strong>, then delete the deployment. The Web
                App goes offline instantly. Or run the uninstaller.
              </p>
            </div>
          </section>

          <div className="doc-divider" />

          {/* ── Auto-Updates ─────────────────────────── */}
          <section id="updates" className="doc-section">
            <div className="doc-section-label mono reveal" ref={addToRefs}>
              AUTO-UPDATES
            </div>
            <h2 className="doc-h2 reveal" ref={addToRefs}>
              Skill Auto-Updates
            </h2>
            <p className="doc-p reveal" ref={addToRefs}>
              The MCP server checks for updates automatically in the background on each startup, at
              most once per day. If a newer version is available, it silently downloads the updated
              skill files to <code>~/.sauver/skills/</code> and rewrites the command shims, then
              prints a one-line message to restart your AI client.
            </p>
            <p className="doc-p reveal" ref={addToRefs}>
              The check is fire-and-forget — it never delays MCP server startup, and any network
              failure is silently ignored.
            </p>
            <div className="doc-info-box reveal" ref={addToRefs}>
              <span className="doc-info-icon">↻</span>
              <p>
                Skill auto-updates cover the skill files and command shims only. To update the{' '}
                <strong>MCP server itself</strong> or the <strong>Apps Script backend</strong>,
                re-run the installer:
              </p>
            </div>
            <CodeBlock copyText="curl -fsSL https://sauver.org/install.sh | bash">
              <span className="tok-key">curl</span> -fsSL https://sauver.org/install.sh |{' '}
              <span className="tok-key">bash</span>
            </CodeBlock>
          </section>

          <div className="doc-divider" />

          {/* ── FAQ ──────────────────────────────────── */}
          <section id="faq" className="doc-section">
            <div className="doc-section-label mono reveal" ref={addToRefs}>
              FAQ
            </div>
            <h2 className="doc-h2 reveal" ref={addToRefs}>
              Frequently Asked Questions
            </h2>

            <div className="doc-faq reveal" ref={addToRefs}>
              {FAQ_ITEMS.map((item, i) => (
                <div key={i} className={`doc-faq-item ${openFaq === i ? 'open' : ''}`}>
                  <button
                    className="doc-faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{item.q}</span>
                    <svg
                      className="doc-faq-chevron"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  <div className="doc-faq-answer">
                    <p>{item.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <div className="doc-divider" />

          {/* ── Uninstall ────────────────────────────── */}
          <section id="uninstall" className="doc-section">
            <div className="doc-section-label mono reveal" ref={addToRefs}>
              UNINSTALLATION
            </div>
            <h2 className="doc-h2 reveal" ref={addToRefs}>
              Remove Sauver
            </h2>
            <p className="doc-p reveal" ref={addToRefs}>
              Run the uninstaller to cleanly remove everything Sauver added to your machine:
            </p>

            <CodeBlock copyText="curl -fsSL https://sauver.org/uninstall.sh | bash">
              <span className="tok-key">curl</span> -fsSL https://sauver.org/uninstall.sh |{' '}
              <span className="tok-key">bash</span>
            </CodeBlock>

            <p className="doc-p reveal" ref={addToRefs} style={{ marginTop: '24px' }}>
              The uninstaller removes:
            </p>

            <div className="doc-file-list reveal" ref={addToRefs}>
              {[
                { path: '~/.sauver/', desc: 'Config, MCP server, and skill files' },
                { path: '~/.claude/commands/', desc: 'Claude Code slash command shims' },
                { path: '~/.gemini/skills/', desc: 'Gemini CLI slash command shims' },
                {
                  path: '~/.claude/settings.json',
                  desc: 'Sauver MCP entry (other settings untouched)',
                },
                {
                  path: '~/.gemini/settings.json',
                  desc: 'Sauver MCP entry (other settings untouched)',
                },
              ].map((f, i) => (
                <div key={i} className="doc-file-row">
                  <code>{f.path}</code>
                  <span>{f.desc}</span>
                </div>
              ))}
            </div>

            <div className="doc-info-box reveal" ref={addToRefs} style={{ marginTop: '24px' }}>
              <span className="doc-info-icon">ℹ</span>
              <p>
                Your other AI settings and MCP servers are left completely untouched. The
                uninstaller only removes entries that Sauver originally added.
              </p>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
