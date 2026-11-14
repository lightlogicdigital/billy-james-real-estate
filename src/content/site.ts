export const site = {
  name: "Billy James Real Estate",
  agent: "Billy James",
  tagline: "Real estate help from a neighbor who knows Hampton Roads.",
  description:
    "Hampton Roads REALTOR® with 20+ years of local experience helping buyers and sellers in Virginia Beach, Chesapeake, Norfolk, and Suffolk.",
  url: "https://billyjamesrealestate.com",
  phone: "757-477-4854",
  phoneHref: "tel:+17574774854",
  // TODO(Billy): confirm a public email address — the current site doesn't list one.
  email: null as string | null,
  brokerage: "Atlantic Connection Real Estate",
  region: "Hampton Roads, Virginia",
  serviceAreas: ["Virginia Beach", "Chesapeake", "Norfolk", "Suffolk"],
  // "Book a Call" goes to the contact page today. Swap in a Calendly (or similar) URL here later.
  bookingUrl: "/contact",
  nav: [
    { label: "About", href: "/about" },
    { label: "Neighborhoods", href: "/neighborhoods" },
    { label: "Properties Sold", href: "/listings" },
    { label: "Home Value", href: "/home-value" },
    { label: "Contact", href: "/contact" },
  ],
  stats: [
    { value: "20+ years", label: "Of local experience" },
    { value: "4.9", label: "Client rating" },
    { value: "$4.4M", label: "In closed sales" }, // Homes.com, prior 5 years
  ],
  featuredOn: [
    { name: "realtor.com", src: "/images/partners/realtor-com.svg", width: 177, height: 24 },
    { name: "Homes.com", src: "/images/partners/homes-com.png", width: 479, height: 114 },
    { name: "Atlantic Connection Real Estate", src: "/images/partners/atlantic-connection.png", width: 975, height: 533 },
  ],
  credit: { label: "Light + Logic Digital", href: "https://lightlogicdigital.com" },
} as const;

export type Site = typeof site;
