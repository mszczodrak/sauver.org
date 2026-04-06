# Sauver Project Goals & Information

## Core Value Proposition

**"The Digital Bouncer for your Inbox"**
Sauver is a local-first, AI-powered defense layer for Gmail. It doesn't just filter spam; it actively neutralizes surveillance (tracking pixels) and "strikes back" at automated outreach by wasting the sender's time or forcing them to prove their legitimacy through technical challenges.

## Key Features

- **Purification (Anti-Surveillance):** Automatically identifies and strips 1x1 tracking pixels and surveillance beacons from HTML emails.
- **Slop Detection:** Uses AI to classify email intent, distinguishing between genuine human outreach and automated "job slop" or sales templates.
- **Expert-Domain Traps:** Targets recruiters and sales reps by generating hyper-specific, technically demanding questions to shift the cognitive load back to the sender.
- **Bouncer Replies:** Engages generic spammers with absurd, bureaucratic, or confusing automated replies to waste their resources.
- **Local-First & Private:** Operates as a Gemini CLI extension; data processing happens within the user's controlled environment.
- **YOLO Mode:** Optional setting for automatically sending "trap" replies instead of saving them as drafts.

## Target Audience

- **Software Engineers & Tech Professionals:** Targeted by automated recruiter "slop" and generic sales pitches.
- **Privacy Advocates:** Concerned about tracking pixels and email surveillance.
- **Power Users:** CLI enthusiasts (specifically Gemini CLI) who want to automate inbox management.
- **Founders & Executives:** Receiving high volumes of unsolicited outreach.

## Technical Details

- **Stack:** Python, Shell, FastMCP.
- **Integration:** Gemini CLI Extension.
- **Installation:** `gemini extensions install https://github.com/sauver-org/sauver --consent`
- **Configuration:** Local `.sauver-config.json` via interactive terminal wizard.
- **License:** MIT.

## Landing Page Strategy

- **Visual Hook:** "Bouncer" or "Shield" metaphor.
- **Primary Contrast:** "Messy/Tracked Inbox" vs. "Purified/Sauver-Protected Inbox."
- **USP:** The "Strike Back" angle—Expert-Domain Traps.
- **Trust Pillar:** "Local-First AI" (Privacy-focused).
- **Primary CTA:** One-line installation command.
