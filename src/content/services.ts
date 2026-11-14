export type Service = {
  number: string;
  title: string;
  /** New copy — the live site shows titles only. Billy should review. */
  summary: string;
  href: string | null;
  image: { src: string; alt: string } | null;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Buying a home",
    summary:
      "I'll help you find the right home in the right neighborhood, then write an offer that wins — without overpaying.",
    href: "/contact",
    image: {
      src: "/images/services/buying.jpg",
      alt: "Bright, modern living room in a Hampton Roads home",
    },
  },
  {
    number: "02",
    title: "Selling your home",
    summary:
      "Smart pricing, a polished launch, and steady updates so your home sells for what it's worth — on your timeline.",
    href: "/home-value",
    image: {
      src: "/images/services/selling.jpg",
      alt: "Beautifully staged living room with a wood stove, ready to list",
    },
  },
  {
    number: "03",
    title: "Negotiating the deal",
    summary:
      "Offers, inspections, appraisals, repairs — I stay in your corner and protect your bottom line at every turn.",
    href: "/contact",
    image: {
      src: "/images/services/negotiation.jpg",
      alt: "Two people sharing a fist bump after a successful deal",
    },
  },
  {
    number: "04",
    title: "Reading the market",
    summary:
      "Twenty-plus years watching these neighborhoods means honest, local advice on where values are headed.",
    href: "/neighborhoods",
    image: null,
  },
];
