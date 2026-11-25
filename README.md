# Billy James Real Estate

Marketing site for Billy James, Hampton Roads REALTOR® (Atlantic Connection Real Estate).
Next.js 16 (App Router, Cache Components) · React 19 · Tailwind CSS v4 · TypeScript.

Designs live in the Paper file **"Billy James Real Estate"** (pages: Design System, Desktop, Mobile).
The current homepage (and the rounded lighthouse footer) is on the **"Home · Redesign"** page; the King Neptune
illustration from earlier explorations is on **"Hero Explorations · Round 2"**.
Design tokens in `src/app/globals.css` were exported from that file.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out (every page is plain HTML)
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
`data-split`, `data-intro`, `data-reveal`, `data-reveal-stagger`, `data-count`, `data-draw`, `data-parallax-frame`,
`data-hero-media` —
documented at the top of `src/components/Motion.tsx`. Each page wraps its content in `<MotionScope>`
(it must be inside the page so it hydrates with what it animates). The footer lives in the layout,
so `FooterScene.tsx` animates its own lighthouse beam and stars. Everything is skipped for
visitors who prefer reduced motion.

## Lead forms

The Contact and Home Value forms validate in the browser (Zod + honeypot, `src/lib/leads.ts`), then POST the
lead as JSON to a small Cloudflare Worker in `forms-worker/`. The Worker accepts posts only from the site's
own pages, checks what was sent, and emails the lead to Billy through [Resend](https://resend.com) with the
visitor's email as reply-to. Both free tiers cover far more than this site needs (Workers: 100,000 requests
a day; Resend: 100 emails a day, 3,000 a month).

The site finds the Worker through `NEXT_PUBLIC_FORM_ENDPOINT`, set from the repo variable `FORM_ENDPOINT`
at build time. Until it's set, the live forms ask visitors to call or text.

### One-time setup

1. **Resend** (free account): Domains → add `billyjamesrealestate.com`, then add the DNS records it lists at
   Hover. They live on their own names (`resend._domainkey`, `send`), so Billy's Hover email isn't touched.
   Once the domain shows as verified, create an API key with sending access.
2. **Cloudflare** (free account), from `forms-worker/`:
   ```bash
   npm install
   npx wrangler login
   npm run deploy                          # prints the Worker's URL
   npx wrangler secret put LEAD_TO         # the inbox that should get leads
   npx wrangler secret put RESEND_API_KEY  # the key from step 1
   ```
3. **GitHub**: set the repo variable `FORM_ENDPOINT` to the Worker's URL, then re-run the deploy workflow.

Allowed origins and the sender address are in `forms-worker/wrangler.jsonc`. To watch live requests and any
Resend errors: `npx wrangler tail` in `forms-worker/`.

### Testing locally

`cp forms-worker/.dev.vars.example forms-worker/.dev.vars`, run `npm run dev` in `forms-worker/` (port 8787),
and set `NEXT_PUBLIC_FORM_ENDPOINT=http://localhost:8787` in `.env.local`. With `DRY_RUN=1` (the default in
the example), the Worker prints each email to its terminal instead of sending it.

## Deploy (GitHub Pages)

The site is a static export (`output: "export"` in `next.config.ts`), published by
`.github/workflows/deploy.yml` on every push to `main`:

1. Repo **Settings → Pages → Source: GitHub Actions** (one time).
2. Push to `main`; the workflow builds `./out` and deploys it.

While the site lives at `https://<user>.github.io/<repo>/`, the workflow sets `PAGES_BASE_PATH=/<repo>`.
With a custom domain (Settings → Pages → Custom domain), it's empty automatically.
Static hosting means no server: images are served as-is (`src/lib/image-loader.ts`), and the old
`/listings/1308-megette-dr` URL forwards with a meta refresh (`src/app/listings/1308-megette-dr`).
