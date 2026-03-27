# 🛡️ SAULVER.ORG 
> **The Front Line of the Email Resistance.**

This repository contains the source code for [sauver.org](https://sauver.org), the official landing page, waitlist, and early-access portal for the Saulver project.

## 📡 THE MISSION
Saulver is an open-source, agentic defense layer for your inbox. It uses **Model Context Protocol (MCP)** to identify and "sauté" AI-generated email slop before it ever reaches your attention.

## 🏗️ SITE ARCHITECTURE
This is a lightweight, high-performance web interface built to handle the "Early Adopter" influx.

* **Framework:** Next.js 15 (App Router)
* **Styling:** Tailwind CSS (Custom "Terminal/Hacker" Theme)
* **Database:** Cloud Firestore (Standard Edition)
* **Security:** Firebase App Check (Enforced) + reCAPTCHA v3
* **Deployment:** Firebase App Hosting

## 🚀 GETTING STARTED (LOCAL DEV)

### 1. Clone the Frontend
```bash
git clone [https://github.com/sauver-org/sauver.org.git](https://github.com/sauver-org/sauver.org.git)
cd sauver.org
```

### 2. Configure Environment
Create a .env.local file with your Firebase configuration:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=sauver-org.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=sauver-org
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=sauver-org.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 3. Install & Run

```bash
npm install
npm run dev
```

## 🔗 PROJECT ECOSYSTEM
Saulver is split into two distinct repositories to maintain a strict separation of concerns:

sauver.org: (This Repo) The marketing site, documentation, and waitlist capture.

sauver: The core AI Engine, MCP Server, and Gmail integration logic. Go here to contribute to the actual filtering logic.

## 🤝 CONTRIBUTING
We welcome PRs for UI improvements, accessibility audits, or documentation updates. For core feature requests regarding the AI bouncer, please head over to the Engine Repo.

---
> Looking for the core AI engine? Visit the [Saulver Engine Repository](https://github.com/sauver-org/sauver).

*Built by [Refract Systems](https://refractsystems.com).*