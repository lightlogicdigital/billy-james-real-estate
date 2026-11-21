/**
 * Homepage copy. Matches the "Home — Desktop (Redesign)" artboard in Paper
 * (page "Home · Redesign").
 *
 * Titles use `{ lead, em, tail }`: `em` is the one word set in italic.
 * Lines marked REVIEW in CONTENT_REVIEW.md are new claims Billy should confirm.
 */
export type HomeTitle = { lead: string; em: string; tail?: string };

export const home = {
  hero: {
    kicker: "Hi, I'm Billy — your Hampton Roads REALTOR®",
    kickerShort: "Hi, I'm Billy — your local REALTOR®",
    title: { line1: "Hampton Roads is home.", lead: "Let's get you", em: "moving." },
    image: {
      src: "/images/billy/billy-front-yard.jpg",
      alt: "Billy James smiling in the driveway of a Hampton Roads home",
      width: 1500,
      height: 2000,
    },
    primaryCta: { label: "Book a Consultation", href: "/contact" },
    secondaryCta: { label: "What's my home worth?", href: "/home-value" },
    /** Pairs with `site.stats` (same order). */
    stats: [
      { value: "20+", label: "Years local" },
      { value: "4.9★", label: "Client rating" },
      { value: "$4.4M", label: "In homes closed" },
    ],
  },
  meet: {
    kicker: "Meet Billy",
    statement: "I'm a Hampton Roads native and a military and first-responder veteran.",
    quiet: "I run my business the way I served: show up, tell the truth, and get the job done — first home or fifth.",
    featuredLabel: "As seen on",
  },
  help: {
    kicker: "How I help",
    title: { lead: "Buying, selling, or just", em: "curious?" } satisfies HomeTitle,
    cta: { label: "Book a Consultation", href: "/contact" },
  },
  sellers: {
    kicker: "For sellers",
    title: { lead: "Sell your home with", em: "confidence" } satisfies HomeTitle,
    cta: { label: "What's my home worth?", href: "/home-value" },
    // REVIEW: new copy
    points: [
      {
        icon: "tag",
        title: "Priced right",
        body: "A price backed by what's actually selling on your street — so you don't leave money on the table or sit on the market.",
      },
      {
        icon: "home",
        title: "Launched well",
        body: "A polished listing and a clear plan for showings, so buyers see your home at its best from day one.",
      },
      {
        icon: "shield",
        title: "Negotiated hard",
        body: "Offers, inspections, appraisals, repairs — I stay in your corner and protect your bottom line at every turn.",
      },
    ],
    featuredSale: "1308-meggett-dr-chesapeake-va",
    allSales: { label: "See a few homes I've sold", href: "/listings" },
  },
  buyers: {
    kicker: "For buyers",
    title: { lead: "Find the home that", em: "fits", tail: "your life" } satisfies HomeTitle,
    image: {
      src: "/images/billy/billy-front-yard-2.jpg",
      alt: "Billy James walking up the driveway of a two-story home",
      width: 1500,
      height: 2000,
    },
    // REVIEW: new copy
    points: [
      { icon: "target", text: "First home, bigger home, or downsizing — we start with what matters to you, not what's easiest to sell." },
      { icon: "list", text: "Straight talk about the house, the street, and the price — the same thing I'd tell my own family." },
      { icon: "shield", text: "I negotiate like it's my own money, from the first offer to the closing table." },
    ],
    cta: { label: "Start my home search", href: "/contact" },
  },
  neighborhoods: {
    kicker: "Where I work",
    title: { lead: "Neighborhoods I know", em: "by heart" } satisfies HomeTitle,
    lead: "Twenty-plus years on these streets. Here's my honest take on each city — the best parts, and what to watch for.",
    cta: { label: "Explore neighborhoods", href: "/neighborhoods" },
    /** Shorter card lines than each guide's nickname, so cards stay one line. */
    cardLines: {
      "virginia-beach": "Boardwalk mornings, bay sunsets",
      chesapeake: "Room to grow, close to everything",
      norfolk: "Historic streets with a city pulse",
      suffolk: "Wide-open space, small-town charm",
    } as Record<string, string>,
  },
  reviews: {
    kicker: "Kind words",
    title: { lead: "From neighbors", em: "I've helped" } satisfies HomeTitle,
    lead: "Real words from real clients — buyers and sellers across Hampton Roads.",
    /** Verbatim excerpts from `testimonials` (matched by name). */
    excerpts: [
      { name: "Jacob S.", quote: "He keeps the home buying process enjoyable while also working hard and keeping your best interest in mind." },
      { name: "David C.", quote: "I have never experienced a real estate relationship like this in my YEARS of buying and selling properties." },
      { name: "Bob T.", quote: "His sensitivity to our needs and his willingness to do what we needed to sell our house was second to none." },
    ],
  },
  talk: {
    kicker: "Let's talk",
    line1: { lead: "Ready when", em: "you are." } satisfies HomeTitle,
    before: "Let's",
    pill: { label: "Book a call", href: "/contact" },
    after: "talk it through.",
    note: "No pressure, no obligation — or call/text",
  },
  contact: {
    kicker: "Contact",
    title: { lead: "Get in", em: "touch" } satisfies HomeTitle,
    body: "Buying, selling, or just have a question? Call, text, or send a note — whatever's easiest for you. Happy to help, even if you're a year away from moving.",
  },

  /* Shared with other pages (FaqSection, CtaBand). */
  faq: {
    eyebrow: "FAQs",
    title: { lead: "Questions", muted: "I hear a lot" },
    lead: "Don't see yours? Call or text me — happy to help, even if you're a year away from moving.",
  },
  cta: {
    title: { lead: "Ready when", accent: "you are." },
    body: "Book a quick call and we'll talk through your goals, your timeline, and your options. No pressure — just straight answers.",
    button: { label: "Book a Consultation", href: "/contact" },
  },
} as const;
