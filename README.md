# Birra Group — Website

Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion. Bilingual (English / Arabic with RTL). Built to match the real Birra Group design (`Birra Coffee.dc.html`) exported from Claude Design.

Birra Group General Trading PLC is an Ethiopian coffee **export** company (est. 2004, Addis Ababa) — sourcing, grading and shipping coffee from seven origins, with lot-level traceability and an instant quote tool for buyers. Backend (AI chatbot, live quote requests, real lot/QR data) plugs in later.

## Run it locally

Dependencies were **not** installed in the sandbox this was built in (no internet access there). In Terminal, on your machine:

```bash
cd ~/Desktop/birra
npm install
npm run dev
```

Open http://localhost:3000 — it redirects to `/en`. Try `/ar` for the Arabic/RTL version (or use the language switcher in the header/footer).

## Sections built (matches the design)

- **Header** — logo, nav, marquee ticker of trust stats, sticky "Instant Quote" CTA.
- **Hero** — video background, stats row (30 yrs / 7,800t / 406 containers / Top 20 exporter).
- **Our Story** — company history, established/exporting stats, photo collage.
- **Origin & Sourcing** — clickable Ethiopia map (7 regions: Yirgacheffe, Sidamo, Guji, Harrar, Limmu, Jimma, Nekemte) with a live detail panel (altitude, process, varieties, cup profile).
- **The Journey** — 8-stage drag-to-scroll carousel, farm to shipping.
- **Quality & Trust** — 6-item grading/inspection grid.
- **Lot Traceability** — QR demo panel with switchable sample lots (visual QR pattern, not a real scannable code).
- **Live Availability** — filterable table of sample lots.
- **Instant Quote** — working calculator: grade × volume × destination port → estimated FOB unit price, total and lead time.
- **Global Reach** — stylized world-reach map + stats + region ticker.
- **Why Birra Coffee** — 6-item trust grid.
- **Partner CTA** — email + "Ask the AI assistant" (opens a coming-soon panel).
- **Footer** — contact, explore links, language, business lines (Coffee Export · Coffee Roastery · Birra Brew Cafe · Real Estate).
- **Floating AI chat launcher** — bottom-right, persistent across the site.

## Placeholder assets — swap before real launch

Everything below is procedurally generated (forest-green/gold toned), not final brand photography:

- `public/videos/hero.mp4` + `public/images/hero-poster.jpg`
- `public/images/about-main.jpg`, `about-1.jpg`, `about-2.jpg`
- `public/images/origin-yirgacheffe.jpg` (reused for all 7 origin regions — swap for real per-region shots when available)
- `public/images/journey-1.jpg` … `journey-8.jpg`
- `src/app/favicon.ico`
- The Ethiopia map in `Origin.tsx` and the world map in `GlobalReach.tsx` are stylized/schematic illustrations, not survey-accurate geography — fine for a demo, worth swapping for a real map (e.g. `react-simple-maps`) before launch.
- The QR codes in `Traceability.tsx` are a deterministic visual pattern per lot code (`QrPattern.tsx`), not scannable — swap for a real QR library once real lot URLs exist.

Keep the same filenames/aspect ratios and everything updates automatically.

## Content / copy

All English + Arabic copy lives in `src/i18n/dictionaries/en.json` and `ar.json` — one schema, fully mirrored between locales, easy to edit without touching components.

## Next phase (backend)

AI chatbot, live quote requests and real lot/QR data connect via API routes (`src/app/api/...`) once approved. The quote calculator, traceability panel and lots table are already structured to swap in real data with minimal changes.
