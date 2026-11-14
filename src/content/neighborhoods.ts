/**
 * Neighborhood guide copy is new and intentionally qualitative (no invented
 * market stats). Billy should review every entry before launch.
 * Photos: only Virginia Beach has a local photo today — see PHOTOS_NEEDED.md.
 */
export type Neighborhood = {
  slug: string;
  city: string;
  nickname: string;
  intro: string;
  why: string[];
  areas: { name: string; note: string }[];
  goodToKnow: string[];
  image: { src: string; alt: string } | null;
};

export const neighborhoods: Neighborhood[] = [
  {
    slug: "virginia-beach",
    city: "Virginia Beach",
    nickname: "Boardwalk mornings and bay-side sunsets",
    intro:
      "From the Oceanfront boardwalk to the quiet streets of Kempsville, Virginia Beach has a neighborhood for every stage of life — whether you want to hear the waves or just be a short drive from them.",
    why: [
      "Miles of ocean and Chesapeake Bay beaches, plus First Landing State Park",
      "Strong mix of established neighborhoods and newer construction",
      "Close to NAS Oceana and Joint Expeditionary Base Little Creek–Fort Story",
    ],
    areas: [
      { name: "North End & Oceanfront", note: "Walk-to-the-beach living near the boardwalk and King Neptune." },
      { name: "Great Neck & Lynnhaven", note: "Waterfront and wooded lots close to the bay." },
      { name: "Kempsville", note: "Established, central neighborhoods with easy access to Town Center." },
      { name: "Red Mill & Sandbridge", note: "Family-friendly south-end living and a quieter beach." },
    ],
    goodToKnow: [
      "Flood zones vary block to block — I'll help you check before you fall in love.",
      "Summer traffic near the Oceanfront is real; I'll show you the back roads.",
    ],
    image: {
      src: "/images/local/king-neptune.png",
      alt: "The King Neptune statue at the Virginia Beach Oceanfront",
    },
  },
  {
    slug: "chesapeake",
    city: "Chesapeake",
    nickname: "Room to grow, close to everything",
    intro:
      "Chesapeake blends suburban comfort with a surprising amount of open space. Bigger lots, well-loved schools, and quick access to the rest of Hampton Roads make it a favorite for growing families.",
    why: [
      "Larger lots and more space for the money than many nearby cities",
      "Parks, trails, and the Dismal Swamp Canal Trail close to home",
      "Central location with easy access to Virginia Beach, Norfolk, and Suffolk",
    ],
    areas: [
      { name: "Great Bridge", note: "Historic heart of the city with a true hometown feel." },
      { name: "Greenbrier", note: "Shopping, dining, and commuter-friendly neighborhoods." },
      { name: "Hickory", note: "Rural character, larger acreage, and newer homes." },
      { name: "Western Branch", note: "Established neighborhoods near the Elizabeth River." },
    ],
    goodToKnow: [
      "School zones matter here — I'll map them for every home we see.",
      "Some areas have well and septic; I'll flag what to inspect.",
    ],
    image: null,
  },
  {
    slug: "norfolk",
    city: "Norfolk",
    nickname: "Historic streets with a city pulse",
    intro:
      "Norfolk is where Hampton Roads feels most like a city — tree-lined historic districts, a lively downtown, and water around nearly every corner.",
    why: [
      "Walkable historic neighborhoods with real character",
      "Home to Naval Station Norfolk, the world's largest naval base",
      "Museums, dining, and waterfront parks along the Elizabeth River",
    ],
    areas: [
      { name: "Ghent", note: "Brick sidewalks, historic homes, and local restaurants." },
      { name: "Larchmont & Colonial Place", note: "Classic homes near the water and ODU." },
      { name: "Ocean View & East Beach", note: "Bay-front living with sandy beaches." },
      { name: "Downtown", note: "Condos and lofts close to Waterside and the arts district." },
    ],
    goodToKnow: [
      "Older homes have charm — and older systems. I'll help you plan for both.",
      "Tidal flooding affects some streets; we'll check history before you offer.",
    ],
    image: null,
  },
  {
    slug: "suffolk",
    city: "Suffolk",
    nickname: "Wide-open space with small-town charm",
    intro:
      "Virginia's largest city by land area still feels like a small town. Suffolk offers wooded lots, riverfront living, and a historic downtown — with Chesapeake and Norfolk an easy drive away.",
    why: [
      "Generous acreage and private, wooded lots",
      "Charming historic downtown and a growing North Suffolk",
      "Access to the Nansemond River and the Great Dismal Swamp",
    ],
    areas: [
      { name: "Harbour View", note: "Newer neighborhoods close to the Monitor-Merrimac bridge." },
      { name: "Downtown Suffolk", note: "Historic homes and a walkable main street." },
      { name: "Driver & Chuckatuck", note: "Country living with room to spread out." },
      { name: "Western Suffolk", note: "Rural properties with acreage and privacy." },
    ],
    goodToKnow: [
      "Many homes sit on larger lots — I'll help you weigh upkeep against space.",
      "Commute times vary a lot by side of town; we'll test-drive yours.",
    ],
    image: null,
  },
];

export const getNeighborhood = (slug: string) => neighborhoods.find((n) => n.slug === slug);
