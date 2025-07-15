# Keynote Components

A Next.js application for creating and managing keynote events with AI-powered topic and speaker recommendations.

## Features

- Event creation and management
- AI-powered topic generation
- Smart speaker recommendations
- Event agenda building

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env.local` and add your API keys:
   ```bash
   cp .env.example .env.local
   ```

4. Add your API keys to `.env.local`:
   - `OPENROUTER_KEY`: Your OpenRouter API key
   - `SERPAPI_KEY`: Your SerpAPI key

5. Run the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
keynote-components/
├── package.json
├── tsconfig.json
├── .env.example
├── public/              # Static assets
├── src/
│   ├── pages/           # Next.js pages
│   │   ├── index.tsx    # Home page
│   │   ├── topics.tsx   # Topics page
│   │   ├── speakers.tsx # Speakers page
│   │   ├── final.tsx    # Final agenda page
│   │   └── api/         # API routes
│   ├── lib/             # Utilities and API wrappers
│   └── styles/          # Global styles
└── README.md
```

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run linter