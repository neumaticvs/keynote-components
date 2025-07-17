# Keynote Components

A Next.js application for creating and managing keynote events with AI-powered topic and speaker recommendations.

## Features

- Event creation and management
- AI-powered topic generation
- Smart speaker recommendations
- Event agenda building

# Keynote Components

> **Event Brainstorm & Speaker Finder**

An internal web app to help your content team quickly brainstorm conference panels and identify top speakers using AI-powered research. Built as a Next.js (or Vite+React) project wired together in a Codex-enabled code editor.

---

## 📋 Product Requirements Document (PRD)

### 1. Overview

- **Problem:** Crafting event agendas and finding relevant speakers is time-consuming and requires manual research across news sources and professional networks.
- **Solution:** An AI-driven workflow that, given a main theme and context, generates panel topics and suggests top speakers automatically.

### 2. Key Features

1. **Event Creation**: Form to capture Event Name, Main Topic, Context/Objectives, and desired number of panels.
2. **Panel Topic Generation**: Leverages NewsAPI (via SerpAPI) + LLM (OpenRouter) to propose panel topics with rationales.
3. **Speaker Research & Ranking**: Uses People Data API (LinkedIn-style) + LLM to fetch and rank speaker candidates with mini-bios.
4. **Interactive UI**: Confirm, regenerate, or remove content at each step.
5. **Final Agenda**: Exportable summary (CSV/Excel) of confirmed panels and speakers.

### 3. User Flow

1. **New Event**: User fills out the event form.
2. **Generate Topics**: Click `Generate` → API calls fetch news + LLM → returns panel topics.
3. **Review Topics**: User confirms or regenerates individual topics.
4. **Generate Speakers**: For each confirmed topic, call speaker API → LLM → returns candidates.
5. **Review Speakers**: Confirm, remove, or regenerate speakers per panel.
6. **Finalize**: View `Event Agenda` page + download summary.

### 4. Success Metrics

- **Time-to-Agenda**: Reduce time to draft agenda by ≥ 70%.
- **Accuracy**: ≥ 85% of first-pass panel topics accepted by users.
- **Adoption**: ≥ 50% of content team using the tool weekly.

---

## 🛠️ Tech Stack & Integrations

- **Framework**: Next.js (React) or Vite + React (TypeScript optional).
- **AI Services**:
  - **OpenRouter**: LLM calls for topic & speaker generation.
  - **SerpAPI**: News/web research.
  - **People Data API**: Professional profile lookup (LinkedIn-style).
- **Data Storage**: Supabase (Postgres) or Airtable (no-code).
- **Dev Environment**: Node.js (v18+), npm/yarn, Git, VS Code with OpenAI/Codex extension.

---

## 🗂️ Repository Structure

```
keynote-components/
├── package.json        # dependencies & scripts
├── tsconfig.json       # (if TS)
├── .env.example        # example env vars
├── public/             # static assets
│
├── src/
│   ├── components/     # reusable UI pieces
│   │   ├── EventCreator.tsx
│   │   ├── EventPanelTopics.tsx
│   │   ├── SpeakerRecommendations.tsx
│   │   └── EventAgenda.tsx
│   │
│   ├── pages/          # Next.js pages or Vite entry points
│   │   ├── index.tsx         # EventCreator wiring
│   │   ├── topics.tsx        # Panel suggestions
│   │   ├── speakers.tsx      # Speaker listings
│   │   └── final.tsx         # Final agenda
│   │
│   ├── pages/api/      # serverless endpoints
│   │   ├── generate-topics.ts
│   │   ├── regenerate-topic.ts
│   │   ├── generate-speakers.ts
│   │   └── regenerate-speaker.ts
│   │
│   ├── lib/            # API wrappers & parsers
│   │   ├── serp.ts          # SerpAPI helper
│   │   ├── openrouter.ts    # OpenRouter LLM wrapper
│   │   ├── people.ts        # People Data API helper
│   │   └── parse.ts         # parseTopics / parseSpeakers
│   │
│   └── styles/         # global CSS / Tailwind config
│       └── globals.css
│
└── README.md           # (this file)
```

---

## ⚙️ Setup & Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/neumaticvs/keynote-components.git
   cd keynote-components
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or yarn install
   ```

3. **Configure Environment**

   - Copy and edit `.env.example` → `.env.local`
   - Add your API keys:
     ```env
     OPENROUTER_API_KEY=sk-...
     SERPER_API_KEY=...
     OPENROUTER_MODEL=moonshotai/kimi-k2:free
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     SUPABASE_KEY=your_supabase_key
     ```

4. **Run the development server**

   ```bash
   npm run dev
   # visit http://localhost:3000
   ```

---

## ✅ Running Tests

*(Add tests if you scaffolded them)*

```bash
npm run test
```

---

## 🚀 Deployment

- **Vercel**: Connect GitHub repo, set environment variables in the dashboard, and deploy.
- **Supabase**: Ensure your DB migrations are applied (`supabase db push`).

