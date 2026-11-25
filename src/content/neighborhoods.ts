/**
 * Neighborhood guide copy is new and intentionally qualitative (no invented
 * market stats). Billy should review every entry before launch.
 * Photos: Virginia Beach's King Neptune is a cut-out (transparent background) from the old
 * site that sits on the sky panel. The other three are open-licensed Wikimedia Commons photos
 * shown full-bleed in the panel, so they carry a `credit` (CC BY / CC BY-SA require it).
 * Full-size originals are kept in the git-ignored originals/ folder.
 */
export type NeighborhoodImage = {
  /** "cutout": transparent PNG on the sky panel; "photo": fills the panel (object-cover). */
  fit: "cutout" | "photo";
  /** Crop focus for photos (CSS object-position). */
  position?: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Short label on the photo panel ("King Neptune · 31st St Oceanfront"). */
  caption: string;
  /** Attribution for open-licensed photos. */
  credit?: { author: string; source: string; license: string; licenseUrl: string };
};

export type Neighborhood = {
  slug: string;
  city: string;
  nickname: string;
  intro: string;
  why: string[];
  areas: { name: string; note: string }[];
  /**
   * The city's school division and its official look-up for which schools serve an address.
   * Zones are set by address and change, so the page links out instead of naming schools
   * (and never rates them; fair housing rules discourage steering by school).
   */
  schools: { district: string; lookupUrl: string };
  goodToKnow: string[];
  image: NeighborhoodImage | null;
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
      { name: "Glenwood", note: "A large planned community near Salem, mostly late-'80s and '90s homes, with its own community association." },
      { name: "Red Mill & Sandbridge", note: "Family-friendly south-end living and a quieter beach." },
    ],
    schools: { district: "Virginia Beach City Public Schools", lookupUrl: "https://www.vbschools.com/families/registration/schoollocator" },
    goodToKnow: [
      "Flood zones vary block to block — I'll help you check before you fall in love.",
      "Summer traffic near the Oceanfront is real; I'll show you the back roads.",
    ],
    image: {
      fit: "cutout",
      src: "/images/local/king-neptune.png",
      alt: "The King Neptune statue at the Virginia Beach Oceanfront",
      width: 1080,
      height: 1350,
      caption: "King Neptune · 31st St Oceanfront",
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
    schools: { district: "Chesapeake Public Schools", lookupUrl: "https://www.cpschools.com/o/cps/page/school-zones-enrollment" },
    goodToKnow: [
      "School zones matter here — I'll map them for every home we see.",
      "Some areas have well and septic; I'll flag what to inspect.",
    ],
    image: {
      fit: "photo",
      position: "41% 50%",
      src: "/images/local/chesapeake-great-bridge-monument.jpg",
      alt: "The Battle of Great Bridge monument, a granite obelisk in Chesapeake's Great Bridge Battlefield park",
      width: 2000,
      height: 1178,
      caption: "Battle of Great Bridge Monument",
      credit: {
        author: "Tere Rottink",
        source: "https://commons.wikimedia.org/wiki/File:Great_Bridge_monument.jpg",
        license: "CC BY-SA 3.0",
        licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      },
    },
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
    schools: { district: "Norfolk Public Schools", lookupUrl: "https://norfolkjs.gisllcmaps.com/" },
    goodToKnow: [
      "Older homes have charm — and older systems. I'll help you plan for both.",
      "Tidal flooding affects some streets; we'll check history before you offer.",
    ],
    image: {
      fit: "photo",
      position: "50% 30%",
      src: "/images/local/norfolk-uss-wisconsin.jpg",
      alt: "The bow of the battleship USS Wisconsin, berthed at Nauticus in downtown Norfolk",
      width: 1201,
      height: 1800,
      caption: "USS Wisconsin · Nauticus, Downtown",
      credit: {
        author: "Tony Alter",
        source: "https://commons.wikimedia.org/wiki/File:USS_Wisconsin_BB-64_(7760354398).jpg",
        license: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      },
    },
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
    schools: { district: "Suffolk Public Schools", lookupUrl: "https://locate.spsk12.net/" },
    goodToKnow: [
      "Many homes sit on larger lots — I'll help you weigh upkeep against space.",
      "Commute times vary a lot by side of town; we'll test-drive yours.",
    ],
    image: {
      fit: "photo",
      position: "50% 62%",
      src: "/images/local/suffolk-dismal-swamp-cypress.jpg",
      alt: "The buttressed trunk of a bald cypress standing in the water of the Great Dismal Swamp",
      width: 1199,
      height: 1800,
      caption: "Bald cypress · Great Dismal Swamp",
      credit: {
        author: "U.S. Fish and Wildlife Service",
        source: "https://commons.wikimedia.org/wiki/File:Bald_cypress_at_the_Great_Dismal_Swamp_National_Wildlife_Refuge,_Va.jpg",
        license: "CC BY 2.0",
        licenseUrl: "https://creativecommons.org/licenses/by/2.0/",
      },
    },
  },
];

export const getNeighborhood = (slug: string) => neighborhoods.find((n) => n.slug === slug);
