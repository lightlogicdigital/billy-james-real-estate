/**
 * Billy's closed deals, from his public Homes.com agent profile
 * (https://www.homes.com/real-estate-agents/william-james/rrn2jj3/), checked Nov 2026.
 * Homes.com reports 10 closed sales ($4.4M) over the prior 5 years; these are the
 * deals it lists by address. Specs/dates are only filled in where verified.
 *
 * To add a deal: append an entry, then (optionally) drop a photo in
 * public/images/listings/ and set `image`. Deals without a photo get an illustrated card.
 * Photos from another brokerage's listing (buyer-side deals) carry `credit`, shown
 * with the photo per MLS (REIN) display rules; Billy confirmed he has the rights.
 */
export type DealRole = "seller" | "buyer" | "both";

export type Listing = {
  slug: string;
  street: string;
  city: string;
  state: "VA";
  zip?: string;
  /** Who Billy represented. */
  role: DealRole;
  soldPrice: number;
  listPrice?: number;
  /** ISO date (YYYY-MM-DD). */
  soldDate?: string;
  beds?: number;
  baths?: number;
  sqft?: number;
  yearBuilt?: number;
  floors?: number;
  description: string | null;
  image: {
    src: string;
    alt: string;
    width: number;
    height: number;
    /** Listing brokerage, for photos from another agent's listing. */
    credit?: string;
    /** Google Street View capture; keep Google's watermark in the image. */
    streetView?: boolean;
  } | null;
};

export const HOMES_PROFILE_URL = "https://www.homes.com/real-estate-agents/william-james/rrn2jj3/";

export const listings: Listing[] = [
  {
    slug: "1308-meggett-dr-chesapeake-va",
    street: "1308 Meggett Dr",
    city: "Chesapeake",
    state: "VA",
    zip: "23322",
    role: "seller",
    soldPrice: 634900,
    listPrice: 649900,
    soldDate: "2026-05-05",
    beds: 4,
    baths: 2.5,
    sqft: 3050,
    yearBuilt: 2000,
    floors: 2,
    description:
      "This beautifully updated 4-bed, 2.5-bath home offers the perfect blend of modern living and outdoor fun! Inside, enjoy the charm of wood floors and built-in shelves surrounding the cozy gas fireplace, creating a warm and inviting atmosphere.",
    image: {
      src: "/images/listings/1308-meggett-dr.jpg",
      alt: "Two-story brick colonial home with a two-car garage at 1308 Meggett Dr in Chesapeake, Virginia",
      width: 2361,
      height: 1667,
    },
  },
  {
    slug: "919-johnstown-rd-chesapeake-va",
    street: "919 Johnstown Rd",
    city: "Chesapeake",
    state: "VA",
    zip: "23322",
    role: "both",
    soldPrice: 460000,
    soldDate: "2025-12-08",
    beds: 4,
    baths: 2,
    sqft: 2200,
    yearBuilt: 1999,
    floors: 1,
    // TODO(Billy): the live listing has no description — add one if you'd like.
    description: null,
    image: {
      src: "/images/listings/919-johnstown-rd.jpg",
      alt: "Single-story brick ranch home with an attached garage at 919 Johnstown Rd in Chesapeake, Virginia",
      width: 1024,
      height: 768,
    },
  },
  // Rollingview Ct: sale price and month from public records on Homes.com (the day isn't
  // published, so it's set to the 1st; only month and year are shown).
  {
    slug: "2468-rollingview-ct-virginia-beach-va",
    street: "2468 Rollingview Ct",
    city: "Virginia Beach",
    state: "VA",
    zip: "23456",
    role: "seller",
    soldPrice: 465000,
    soldDate: "2024-10-01",
    beds: 4,
    baths: 3,
    sqft: 2304,
    description: null,
    image: {
      src: "/images/listings/2468-rollingview-ct.jpg",
      alt: "Two-story white home with a covered front porch, a dormer, and a two-car garage at 2468 Rollingview Court in Virginia Beach, Virginia",
      width: 1000,
      height: 700,
      streetView: true,
    },
  },
  {
    slug: "2472-rollingview-ct-virginia-beach-va",
    street: "2472 Rollingview Ct",
    city: "Virginia Beach",
    state: "VA",
    zip: "23456",
    role: "seller",
    soldPrice: 500000,
    soldDate: "2024-05-01",
    beds: 4,
    baths: 3,
    sqft: 2552,
    description: null,
    image: {
      src: "/images/listings/2472-rollingview-ct.jpg",
      alt: "Two-story brick colonial with an arched front entry, black shutters, and an attached garage at 2472 Rollingview Court in Virginia Beach, Virginia",
      width: 1000,
      height: 700,
      streetView: true,
    },
  },
  {
    slug: "1857-palomino-trl-suffolk-va",
    street: "1857 Palomino Trail",
    city: "Suffolk",
    state: "VA",
    role: "buyer",
    soldPrice: 535000,
    beds: 6,
    baths: 3.5,
    sqft: 3990,
    yearBuilt: 1994,
    floors: 2,
    description:
      "This private retreat offers 6 bedrooms, an office, a bonus room over the garage, and an open-concept layout perfect for modern living. The first-floor media room, complete with a built-in screen, full bar, and full bath, opens to the back deck for seamless entertaining. The primary suite features double walk-in closets and a double-sided fireplace, creating a true owner's retreat. Enjoy outdoor living with a wrap-around front porch, second-floor balcony, and oversized detached garage on a serene wooded lot. Conveniently located near the new Riverside Hospital, downtown Smithfield, and the up-and-coming Carrollton area, this home combines space, privacy, and accessibility.",
    image: {
      src: "/images/listings/1857-palomino-trl.jpg",
      alt: "White farmhouse with a wrap-around porch and fountain on a wooded lot at 1857 Palomino Trail in Suffolk, Virginia",
      width: 1024,
      height: 681,
    },
  },
  {
    slug: "525-queenswood-ter-chesapeake-va",
    street: "525 Queenswood Terrace",
    city: "Chesapeake",
    state: "VA",
    role: "buyer",
    soldPrice: 500000,
    beds: 4,
    baths: 2,
    sqft: 2258,
    yearBuilt: 1987,
    description: null,
    image: {
      src: "/images/listings/525-queenswood-ter.jpg",
      alt: "Brick ranch with a two-car garage, bonus room above, and a wide front lawn at 525 Queenswood Terrace in Chesapeake, Virginia",
      width: 1024,
      height: 680,
      credit: "Howard Hanna Real Estate Services",
    },
  },
  {
    slug: "925-johnstown-rd-chesapeake-va",
    street: "925 Johnstown Rd",
    city: "Chesapeake",
    state: "VA",
    role: "buyer",
    soldPrice: 445000,
    beds: 4,
    baths: 2,
    sqft: 1612,
    description: null,
    image: {
      src: "/images/listings/925-johnstown-rd.jpg",
      alt: "White ranch home with a red front door, black shutters, and a one-car garage at 925 Johnstown Road in Chesapeake, Virginia",
      width: 1024,
      height: 681,
      credit: "BHHS RW Towne Realty",
    },
  },
  {
    slug: "4916-apricot-way-chesapeake-va",
    street: "4916 Apricot Way",
    city: "Chesapeake",
    state: "VA",
    role: "buyer",
    soldPrice: 392900,
    beds: 3,
    baths: 2.5,
    sqft: 1642,
    description: null,
    image: {
      src: "/images/listings/4916-apricot-way.jpg",
      alt: "New two-story townhome with charcoal siding and a white garage door at 4916 Apricot Way in Chesapeake, Virginia",
      width: 768,
      height: 768,
      credit: "Corinth Realty LLC",
    },
  },
];

export const getListing = (slug: string) => listings.find((l) => l.slug === slug);

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(n);

/** Caption under a photo that isn't Billy's own. */
export const photoCredit = (image: Listing["image"]) =>
  image?.streetView ? "Image: Google Street View" : image?.credit ? `Listing courtesy of ${image.credit}` : null;

/** Short tag shown on the photo. */
export const roleTag: Record<DealRole, string> = { seller: "Sold", buyer: "Bought", both: "Sold" };

export const formatSoldDate = (iso?: string) =>
  iso ? new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${iso}T00:00:00Z`)) : null;
