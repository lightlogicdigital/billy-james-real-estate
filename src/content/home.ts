/**
 * Homepage copy. Matches the "Home — Desktop" artboard in Paper.
 * `accent` is the phrase rendered in the accent color (same weight as the rest).
 * Lines marked REVIEW in CONTENT_REVIEW.md are new claims Billy should confirm.
 */
export const home = {
  hero: {
    eyebrow: "Virginia Beach · Chesapeake · Norfolk · Suffolk",
    title: { lead: "Hampton Roads is home. Let's get you", accent: "moving." },
    lead: "First home, forever home, or time to sell — I'll give you straight answers, a clear plan, and someone in your corner from first call to closing.",
    primaryCta: { label: "Book a Consultation", href: "/contact" },
    secondaryCta: { label: "What's my home worth?", href: "/home-value" },
  },
  trust: {
    statLabels: ["of local know-how", "average client rating", "in homes closed"],
    featuredLabel: "As seen on",
  },
  meet: {
    eyebrow: "Meet Billy",
    title: { lead: "Hi, I'm Billy —", accent: "your neighbor", tail: "in real estate." },
    body: "I'm a Hampton Roads native and a military and first-responder veteran. I run my business the way I served: show up, tell the truth, get the job done. First home or fifth, you'll always know where you stand.",
    points: [
      "Military and first-responder veteran",
      "I negotiate like it's my own money",
      "Straight answers, first call to closing",
    ],
    signOff: "Proud Hampton Roads native",
    link: { label: "Get to know me", href: "/about" },
    snapshotCaption: "Another one sold!",
  },
  services: {
    eyebrow: "How I help",
    title: { lead: "Buying, selling, or", muted: "just curious?" },
    lead: "Every move is different. Here's how I help — from the first showing to the day you get the keys.",
    photoBadge: "First-time buyers welcome",
  },
  sold: {
    eyebrow: "Recently sold",
    title: { lead: "Your home could be", accent: "next." },
    link: { label: "See every home I've sold", href: "/listings" },
  },
  neighborhoods: {
    eyebrow: "Where I work",
    title: { lead: "Know the neighborhood before you", accent: "move in." },
    lead: "Twenty-plus years on these streets. Here's my honest take on each city — the best parts, and what to watch for.",
  },
  testimonials: {
    eyebrow: "Kind words",
    title: { lead: "From neighbors", muted: "I've helped" },
  },
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
