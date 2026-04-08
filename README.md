# card.oriz.in

**India's Most Comprehensive Card Intelligence Platform**

![Live](https://img.shields.io/badge/Live-card.oriz.in-gold)
![Astro](https://img.shields.io/badge/Astro-6.x-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-4.x-cyan)

Compare 300+ credit, debit & prepaid cards from all Indian banks with AI-powered recommendations, side-by-side comparison, and reward calculators.

**Live URL:** [https://card.oriz.in](https://card.oriz.in)

---

## Features

- **Card Database** — 45+ cards across 15 banks (credit, debit, prepaid) with exhaustive data per card
- **Card Genie** — AI-powered card recommendation using Puter.js (free, browser-based)
- **Side-by-Side Comparison** — Compare up to 4 cards with detailed tables and charts
- **Advanced Filtering** — Filter by network, bank, tier, fee range, category, benefits
- **Full-Text Search** — Powered by Pagefind (static, zero-cost)
- **Calculators** — Interest, rewards value, and fuel savings calculators
- **Blog** — MDX-powered editorial content
- **Glossary** — A-Z card terminology reference
- **Dark/Light Mode** — Premium editorial design with theme toggle
- **SEO Optimized** — JSON-LD, Open Graph, sitemap, static pre-rendering
- **Firebase Auth** — Google + Email sign-in for wishlists and saved comparisons
- **Mobile Responsive** — Full mobile navigation and responsive grids

## Tech Stack

| Tool | Purpose |
|------|---------|
| [Astro](https://astro.build/) | Static site generation |
| [React](https://react.dev/) | Interactive UI islands |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS v4](https://tailwindcss.com/) | Styling |
| [Firebase](https://firebase.google.com/) | Auth + Firestore |
| [Pagefind](https://pagefind.app/) | Static search |
| [Recharts](https://recharts.org/) | Data visualization |
| [Framer Motion](https://www.framer.com/motion/) | Animations |
| [Puter.js](https://puter.com/) | Free AI (Card Genie) |
| [Zod](https://zod.dev/) | Schema validation |
| [Biome](https://biome.dev/) | Linting + formatting |
| [pnpm](https://pnpm.io/) | Package manager |

## Getting Started

```bash
# Clone the repository
git clone https://github.com/chirag127/card-oriz-in.git
cd card-oriz-in

# Install dependencies
pnpm install

# Start development server
pnpm dev
# → http://localhost:4321

# Build for production
pnpm build

# Preview production build
pnpm preview

# Validate all card data
pnpm validate-cards

# Generate index file
pnpm generate:index
```

## Project Structure

```
├── src/
│   ├── components/     # React components + Astro components
│   ├── content/        # Blog posts (MDX) + Glossary entries
│   ├── data/           # Card data files (one per card) + bank data
│   ├── hooks/          # React hooks (auth, theme, wishlist, compare)
│   ├── layouts/        # Astro layout components
│   ├── lib/            # Utilities, formatters, filters, Firebase
│   ├── pages/          # Astro pages (routes)
│   ├── stores/         # Nanostores (theme, wishlist, compare)
│   ├── styles/         # Global CSS, animations, 3D card effects
│   └── types/          # TypeScript interfaces (CardData, BankData)
├── scripts/            # Data pipeline, validation, index generation
├── public/             # Static assets (images, fonts, favicon)
└── tests/              # Unit (Vitest) + E2E (Playwright)
```

## Adding New Cards

1. Create a new file in `src/data/cards/{type}/{bank}/` following the naming convention:
   ```
   {bank}-{card-name}-{type}.ts
   ```

2. Export a `const` of type `CardData` with ALL fields populated:
   ```typescript
   import type { CardData } from "@/types/card";

   export const myNewCard: CardData = {
     id: "bank-card-name-type",
     name: "Bank Card Name",
     // ... all fields
     lastUpdated: "2026-03-27",
   };
   ```

3. Add the import to `src/data/index.ts`

4. Validate: `pnpm validate-cards`

## Data Pipeline

The project includes an AI research agent framework in `scripts/research/` designed to automate card data collection. The pipeline:
- Runs 25+ web searches per card
- Fetches and parses official bank pages
- Extracts structured data using LLM
- Validates against Zod schema
- Writes to the correct file path

Run with: `pnpm research:card`

## Deployment

Deployed to Cloudflare Pages via GitHub Actions on every push to `main`.

- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Custom domain:** `card.oriz.in`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run `pnpm lint` and `pnpm build`
5. Submit a pull request

## License

MIT

---

Built with precision by [chirag127](https://github.com/chirag127)
