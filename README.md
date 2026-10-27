# Marie Performing Arts Academy — website

Next.js 16 + Tailwind CSS 4. Every page is pre-rendered as static HTML.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Where to edit things

| What | File |
| --- | --- |
| Name, contact details, address, social links, donate link, navigation | `src/config/site.ts` |
| Dance / Drama / Music programs, faculty | `src/content/programs.ts` |
| Performances & events | `src/content/events.ts` |
| News stories | `src/content/news.ts` |
| Summer camp sessions, prices, FAQ | `src/content/camp.ts` |
| Colours & fonts | `src/app/globals.css`, `src/app/layout.tsx` |
| Logo files | `public/brand/` |

**Photos** live in `public/images/` (the list of slots and their descriptions is in `src/content/images.ts`).
They're free Pexels stock photos downloaded by `npm run photos`; the photo IDs are in `scripts/fetch-photos.mjs`.
To use the academy's own photos, replace a file with the same name, e.g. `public/images/dance.jpg`, then rebuild.
Any missing photo shows a branded placeholder instead of a broken image.

**Menu:** every page and its sub-sections are listed in `menu` in `src/config/site.ts`.

## Before launch

- Replace the placeholder text, prices, dates, and faculty names.
- Set the real domain in `site.url` and the payment link in `site.donateUrl`.
- Connect the forms. In `src/app/actions.ts`, `deliver()` currently only logs submissions. Send them by email (e.g. Resend) or to a CRM.
- Deploy: push to GitHub and import the repo on Vercel (free tier works).
