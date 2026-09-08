# AI Business Plan Generator

An AI-powered web app that turns a few structured inputs about a business idea into a complete, investor-ready business plan — generated section by section, with computed financials and one-click PDF export.

🔗 **[Live Demo]([https://your-app.vercel.app](https://ai-business-plan-generator-six.vercel.app/dashboard))** · Built with React, Firebase, and the Anthropic API.

---

## What it does

Fill out a short guided wizard about a business (industry, market, operations, financials), and the app generates a full nine-section business plan:

- Executive Summary
- Company Description
- Market Analysis
- Organization & Management
- Product / Service
- Marketing & Sales Strategy
- Financial Plan
- Funding Request
- Risk Analysis

It also computes key financial metrics (monthly revenue, profit, runway, break-even) from the user's inputs and exports the entire plan as a formatted PDF.

---

## Features

- **Multi-step input wizard** with shared state across steps
- **AI-generated content** — each section grounded in the user's actual business data via structured prompts
- **"Generate Full Plan"** — produces all nine sections sequentially
- **Computed financials** — revenue, profit, runway, and break-even calculated in-app (not by the AI)
- **PDF export** — clean, formatted, downloadable business plan
- **Authentication** — email/password and Google sign-in via Firebase Auth
- **Persistent storage** — plans saved to and loaded from Firestore
- **Demo mode** — a public showcase of pre-generated example plans (see Architecture below)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React (Vite), React Router, Tailwind CSS |
| Backend | Node.js, Express |
| AI | Anthropic API (Claude) |
| Auth & Database | Firebase Authentication, Cloud Firestore |
| PDF | jsPDF + jsPDF-AutoTable |
| Deployment | Vercel |

---

## Architecture Decisions

A few deliberate engineering choices worth highlighting:

### 1. API key never touches the frontend
The Anthropic API is called through a small **Express proxy server**, not from the browser. The API key lives server-side in environment variables and is never exposed to the client. This avoids the common mistake of embedding a secret key in frontend code where anyone could read it.

### 2. Demo mode for safe, cost-free public hosting
A public AI demo poses two problems: exposing the API key, and racking up costs when anyone clicks "generate." This app solves both with a **demo-mode toggle** (`VITE_DEMO_MODE`). In demo mode, the deployed site serves pre-generated example plans instead of calling the API — meaning the public demo is fully functional, costs nothing, and ships no API key to production. The complete live-generation code remains in the repo and runs locally.

### 3. AI generates prose, not math
Financial figures (revenue, runway, break-even) are computed in application code from the user's inputs — the AI only writes the *narrative* around those numbers. This keeps the financial output accurate and trustworthy rather than relying on the model to do arithmetic.

### 4. Data-driven section generation
All nine plan sections are described as a single configuration array, with one generation handler driving them all. Adding or modifying a section is a one-line change rather than a new copy-pasted function.

---

## Running Locally

### Prerequisites
- Node.js 22+
- A Firebase project (Auth + Firestore enabled)
- An Anthropic API key

### Setup

1. Clone and install:
```bash
   git clone https://github.com/YOUR-USERNAME/ai-business-plan-generator.git
   cd ai-business-plan-generator
   npm install
```

2. Create a `.env` file in the root (see `.env.example`):

3. Add your Firebase config to `src/firebase/config.js`.

4. Run the app (starts both the Vite frontend and the Express proxy):
```bash
   npm run dev:all
```

The app runs at `http://localhost:5173`.

---

## Project Structure
src/
├── firebase/ # Firebase config + Firestore helpers
├── contexts/ # Auth context
├── routes/ # Protected route wrapper
├── pages/ # Login, Signup, Dashboard, NewPlan, PlanView
├── components/ # Form wizard + steps
├── utils/ # Prompt builders, API client, financials, PDF export
└── demo/ # Demo-mode example plans + toggle logic

server.js # Express proxy for the Anthropic API


---

## License

MIT
   
