# OAGITECH website (Next.js)

Rebuild of oagitech.com from the Claude Design redesign — Next.js 15 (App Router), TypeScript, plain CSS. 58 pages, all statically generated.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Node 18.18+ (20 LTS recommended). Deploys to Vercel as-is.

## Where things live

| Path | What |
|---|---|
| `app/page.tsx` | Home (cinematic hero, pillars, industries, training teaser, FAQ) |
| `app/ndt/page.tsx` | NDT menu page (method cards + method selector table) |
| `app/training/page.tsx` | Training menu + filterable course catalogue |
| `app/contact/page.tsx` | Contact + 3-step quote form → `app/api/quote/route.ts` |
| `app/verify/page.tsx` | Certificate verification → `app/api/verify/route.ts` |
| `app/[...slug]/page.tsx` | Every other page (52 service / course / product / about pages) rendered from content |
| `content/pages.json` | Content for those 52 pages (title, intro, facts, sections, related links, image) |
| `lib/content.ts` | Content types + Ultrasonic Testing page |
| `lib/nav.ts` | Navbar menus and every dropdown sub-menu, contact details |
| `components/SiteHeader.tsx` | Sticky header with hover/click dropdowns and mobile menu |
| `app/globals.css` | Design tokens (colours, type) and all styles |
| `public/images/` | 66 page images (AI-generated placeholders — replace with real site photos) |
| `next.config.mjs` | 301 redirects from every old WordPress URL to its new route |

### Editing content
Edit `content/pages.json` — each page has `sections` with a `kind` of `index`, `list`, `grid`, `steps`, `chips` or `report`. Values in `[brackets]` are placeholders the client must supply (stats, accreditation numbers, dates).

## Before launch
- [ ] Replace `[bracketed]` placeholders (years, counts, accreditation names/numbers, course dates)
- [ ] Replace placeholder logo in `components/Logo.tsx`
- [ ] Wire `app/api/quote/route.ts` to email (Resend/SMTP) or a CRM
- [ ] Wire `app/api/verify/route.ts` to the real certificate database
- [ ] Swap AI images for real photography where available
- [ ] Arabic (RTL) version — header link is in place, translations needed
