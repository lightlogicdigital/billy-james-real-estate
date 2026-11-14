# Billy James Real Estate

Marketing site for Billy James, Hampton Roads REALTOR® (Atlantic Connection Real Estate).
Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS v4 · TypeScript.

Designs live in the Paper file **"Billy James Real Estate"** (pages: Design System, Desktop, Mobile).
Design tokens in `src/app/globals.css` were exported from that file.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all pages prerender as static)
npx eslint .       # lint (next build no longer lints)
```

## Edit content

All copy and data are typed files in `src/content/` — no CMS needed:

| File | What's in it |
|---|---|
| `site.ts` | Name, phone, brokerage, nav, stats, booking URL |
| `home.ts` | Homepage section copy |
| `about.ts` | About page copy and photos |
| `listings.ts` | Sold homes (slugs match the old site's URLs) |
| `neighborhoods.ts` | City guides |
| `services.ts`, `faqs.ts`, `testimonials.ts` | Shared sections |

To add a sold home: add an entry to `listings.ts` (data comes from Billy's Homes.com profile — the link is in the file).
Set `role` to who Billy represented. A photo in `public/images/listings/` is optional; without one the card is illustrated.
To use a Calendly (or similar) link for every "Book a Call" button: set `bookingUrl` in `site.ts`.

`CONTENT_REVIEW.md` lists new copy Billy should confirm before launch.

## Motion

Animations use GSAP (ScrollTrigger, SplitText, DrawSVG) and are declared with data attributes —
`data-split`, `data-intro`, `data-reveal`, `data-reveal-stagger`, `data-count`, `data-draw`, `data-parallax-frame` —
documented at the top of `src/components/Motion.tsx`. Each page wraps its content in `<MotionScope>`
(it must be inside the page so it hydrates with what it animates). Everything is skipped for
visitors who prefer reduced motion.

## Lead forms

The Contact and Home Value forms post to server actions in `src/app/actions.ts` (Zod validation + honeypot).
Copy `.env.example` to `.env.local` and set `RESEND_API_KEY` and `LEAD_TO_EMAIL` to email leads via Resend.
Without those variables, leads are logged to the server console and visitors still see a success message.
