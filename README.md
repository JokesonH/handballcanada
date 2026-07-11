# Handball Canada — Website

A full rebuild of [handballcanada.ca](https://handballcanada.ca) as a fast, bilingual, statically-generated site. The design follows the visual language of major-club sports sites (psg.fr was the reference): dark navy surfaces, sharp red accents, bold condensed typography, image-led cards.

## Stack

- **Next.js 16** (App Router, SSG) · **React 19** · **TypeScript** · **Tailwind CSS v4**
- No CMS, no database — all content lives as JSON in [`content/`](content/)
- Fully bilingual **EN/FR** with locale-prefixed routes (`/en/...`, `/fr/...`)

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000 (redirects to /en or /fr)
npm run build   # static production build
```

## How content works

Everything an editor would touch is in `content/`:

| File | What it drives |
| --- | --- |
| `content/news/*.json` | News articles (one file per article, EN + FR in the same file) |
| `content/events.json` | "Upcoming events" strip on the homepage & competitions page |
| `content/videos.json` | Handball Canada TV rail (currently links to YouTube channel) |
| `content/teams/*.json` | National team pages (program text, rosters) |
| `content/pages/*.json` | Long-form pages (how to play, about, board, registration, contact…) |
| `content/site.json` | Socials, member federations, partners, registration URL |

UI strings (nav, buttons, labels) live in `dictionaries/en.json` and `dictionaries/fr.json`.

### Adding a news article

Copy any file in `content/news/`, change the `slug` (must match the filename), `date` (`YYYY-MM-DD`), `category` (`national-teams`, `beach`, `federation`, `competitions`, `development`), and write `title` / `excerpt` / `body` (array of paragraphs) under both `en` and `fr`. Set `"featured": true` on the article that should own the homepage hero. The build picks it up automatically.

### Outstanding content TODOs

Some details could not be recovered from the old site (it renders everything client-side) and are flagged inline. Find them all with:

```bash
grep -rn '"todo"' content/
```

Highlights: exact publication dates on migrated news, current board member names, official contact email/address, past national champions, real YouTube video IDs, and website links for the provincial federations.

The senior and beach teams have PSG-style squad pages (`/teams/<slug>/squad`) driven by the `squad` block in their `content/teams/*.json` file. Each entry is a jersey slot — replace `"name": null` with the player's name (and optionally `"club"`) to fill it; cards render "To be announced" until then. Filter groups and position labels are stored per team so the French stays gender-correct.

## i18n

- `proxy.ts` redirects `/` to `/en` or `/fr` based on `Accept-Language`, and honours legacy `?lang=fr-CA` links from the old site.
- Every route lives under `app/[locale]/` and is statically generated for both locales.
- The header switcher swaps locale while preserving the current path.

## Deploying

The site is a standard Next.js app — on [Vercel](https://vercel.com), import the GitHub repo and deploy with defaults (no environment variables needed).
