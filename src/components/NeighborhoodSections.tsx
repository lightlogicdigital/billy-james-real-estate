import Image from "next/image";
import Link from "next/link";
import { neighborhoods, type Neighborhood } from "@/content/neighborhoods";
import { site } from "@/content/site";
import { CityArt } from "./CityArt";
import { Title, Wrap } from "./HomeSections";
import { ArrowIcon, ButtonLink, Kicker, cn } from "./ui";

/**
 * Shared template for the city guide pages (Paper: "Neighborhoods · Redesign").
 * Every city renders the same six blocks — hero, why people love it, areas,
 * Billy's take, more guides, and the Let's talk sign-off — from its content entry.
 */

/** "Historic streets with a city pulse" → lead + italic last word. */
function splitTagline(text: string) {
  const i = text.lastIndexOf(" ");
  return { lead: text.slice(0, i), em: text.slice(i + 1) };
}

/** The city's landmark: a full photo, or a cut-out on the sky (Virginia Beach's King Neptune). */
function Landmark({
  n,
  sizes,
  cutoutClassName,
  preload = false,
}: {
  n: Neighborhood;
  sizes: string;
  cutoutClassName: string;
  preload?: boolean;
}) {
  if (n.image?.fit === "photo") {
    return (
      <Image
        src={n.image.src}
        alt={n.image.alt}
        fill
        preload={preload}
        sizes={sizes}
        className="-z-10 object-cover"
        style={{ objectPosition: n.image.position }}
      />
    );
  }
  return (
    <>
      <Image src="/images/local/cloud.png" alt="" width={1600} height={1066} className="absolute -left-8 top-[11%] -z-10 w-[46%] opacity-85" />
      {n.image ? (
        <Image
          src={n.image.src}
          alt={n.image.alt}
          width={n.image.width}
          height={n.image.height}
          preload={preload}
          sizes={sizes}
          className={cn("absolute right-0", cutoutClassName)}
        />
      ) : (
        <div className="absolute inset-x-[8%] bottom-[8%] rounded-md bg-white/92 p-6">
          <CityArt slug={n.slug} className="mx-auto h-auto w-full max-w-[360px]" />
        </div>
      )}
    </>
  );
}

const sky = "bg-[linear-gradient(180deg,#2B69AE_0%,#6FA3D8_70%,#BFD9F0_100%)]";

/* ---------- Hero: copy + 4:5 landmark panel ---------- */

export function NeighborhoodHero({ n }: { n: Neighborhood }) {
  const tagline = splitTagline(n.nickname);
  return (
    <section className="pb-16 pt-8 lg:pb-28 lg:pt-[72px]">
      <Wrap className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="flex flex-col gap-7 lg:w-[520px] lg:shrink-0 lg:gap-8">
          <nav aria-label="Breadcrumb" data-intro className="flex items-center gap-2.5 text-sm">
            <Link href="/neighborhoods" className="inline-flex items-center gap-1.5 rounded-full bg-mist py-[7px] pl-3 pr-3.5 transition-colors hover:bg-hairline">
              <ArrowIcon className="size-3.5 rotate-180" />
              Neighborhoods
            </Link>
            <span className="text-muted">{n.city}, VA</span>
          </nav>
          <div className="flex flex-col gap-3.5">
            <h1 data-split className="font-display text-[56px] font-normal leading-[1.04] tracking-[-0.035em] sm:text-[72px] lg:text-[88px] lg:leading-[92px]">
              {n.city}
            </h1>
            <p data-intro className="text-[22px] leading-[1.3] tracking-[-0.02em] text-balance sm:text-[26px] lg:text-[30px] lg:leading-[38px]">
              {tagline.lead} <em className="italic">{tagline.em}.</em>
            </p>
          </div>
          <p data-intro className="max-w-[470px] text-[17px] leading-[1.7] text-muted lg:text-lg lg:leading-[30px]">
            {n.intro}
          </p>
          <div data-intro className="flex flex-col gap-2.5 pt-1 sm:flex-row">
            <ButtonLink href={site.bookingUrl} variant="ink" size="pill">
              Talk about {n.city}
            </ButtonLink>
            <ButtonLink href="/home-value" variant="mist" size="pill">
              What&apos;s my home worth?
            </ButtonLink>
          </div>
        </div>

        <div className="flex flex-col gap-3.5 lg:w-[500px] lg:shrink-0">
          <div data-hero-rise className={cn("relative isolate flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-[24px] p-4 sm:p-5 lg:aspect-[4/5]", sky)}>
            <Landmark n={n} preload sizes="(min-width: 1024px) 500px, 100vw" cutoutClassName="bottom-[-6%] w-[72%] lg:w-[84%]" />
            {n.image && (
              <span className="relative flex items-center gap-2.5 self-start rounded-full bg-white/94 px-3.5 py-2 text-[13px] leading-[18px] sm:px-4 sm:py-2.5 sm:text-sm">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
                {n.image.caption}
              </span>
            )}
          </div>
          {n.image?.credit && (
            <p className="text-xs text-muted">
              Photo:{" "}
              <a href={n.image.credit.source} className="underline decoration-quiet underline-offset-2 hover:text-foreground">
                {n.image.credit.author}
              </a>
              ,{" "}
              <a href={n.image.credit.licenseUrl} className="underline decoration-quiet underline-offset-2 hover:text-foreground">
                {n.image.credit.license}
              </a>
            </p>
          )}
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Why people love it: three numbered mist cards ---------- */

export function WhyLoveIt({ n }: { n: Neighborhood }) {
  return (
    <section aria-labelledby="love-title" className="pb-16 lg:pb-28">
      <Wrap className="flex flex-col gap-8 lg:gap-10">
        <div data-reveal className="flex flex-col gap-5">
          <Kicker>Living in {n.city}</Kicker>
          <Title id="love-title" title={{ lead: "Why people", em: "love", tail: "it here" }} />
        </div>
        <ol data-reveal-stagger className="grid gap-4 md:grid-cols-3">
          {n.why.map((reason, i) => (
            <li key={reason} className="flex flex-col justify-between gap-8 rounded-[24px] bg-mist p-7 md:min-h-[236px] md:gap-12">
              <span aria-hidden className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-[15px] font-medium">
                {i + 1}
              </span>
              <p className="text-[19px] leading-[1.45] tracking-[-0.01em] lg:text-[22px] lg:leading-[30px]">{reason}</p>
            </li>
          ))}
        </ol>
      </Wrap>
    </section>
  );
}

/* ---------- Areas: header beside a 2×2 grid ---------- */

const pinPath = "M12 21C12 21 19 14.5 19 9.5C19 5.6 15.9 2.5 12 2.5C8.1 2.5 5 5.6 5 9.5C5 14.5 12 21 12 21Z M12 12A2.5 2.5 0 1 0 12 7A2.5 2.5 0 1 0 12 12Z";

export function AreasGrid({ n }: { n: Neighborhood }) {
  return (
    <section aria-labelledby="areas-title" className="pb-16 lg:pb-28">
      <Wrap className="flex flex-col gap-8 lg:flex-row lg:justify-between lg:gap-16">
        <div data-reveal className="flex flex-col gap-5 lg:w-[360px] lg:shrink-0 lg:pt-2">
          <Kicker>Where to look</Kicker>
          <Title id="areas-title" title={{ lead: "Areas I know", em: "well" }} />
          <p className="text-base leading-[26px] text-muted">
            Every part of town has its own personality. These are the places I&apos;d start a search — ask me about the streets in between.
          </p>
        </div>
        <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:w-[696px] lg:shrink-0">
          {n.areas.map((area) => (
            <li key={area.name} className="flex flex-col gap-7 rounded-[24px] border border-hairline px-6 pb-7 pt-6 lg:gap-9">
              <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist">
                <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth={1.9} strokeLinecap="round" strokeLinejoin="round">
                  <path d={pinPath} />
                </svg>
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="text-[22px] leading-7 tracking-[-0.01em]">{area.name}</h3>
                <p className="text-[15px] leading-6 text-muted">{area.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/* ---------- Billy's take: the "good to know" tips on ink ---------- */

export function BillysTake({ n }: { n: Neighborhood }) {
  return (
    <section aria-labelledby="take-title">
      <Wrap>
        <div data-reveal className="flex flex-col gap-10 rounded-[28px] bg-foreground p-7 text-white md:p-12 lg:flex-row lg:justify-between lg:gap-16 lg:px-14 lg:pb-[60px] lg:pt-14">
          <div className="flex flex-col gap-6 lg:w-[300px] lg:shrink-0">
            <Image
              src="/images/billy/billy-headshot.png"
              alt=""
              width={144}
              height={144}
              className="size-[72px] rounded-full bg-[#e7eef6] object-cover object-[50%_15%]"
            />
            <div className="flex flex-col gap-3">
              <Kicker as="h2" id="take-title" tone="light">
                Billy&apos;s take
              </Kicker>
              <p className="leading-[26px] text-white/72">Before you buy in {n.city}.</p>
            </div>
          </div>
          <ul className="flex flex-col lg:w-[620px] lg:shrink-0">
            {n.goodToKnow.map((tip, i) => (
              <li key={tip} className={cn("flex gap-4 md:gap-5", i === 0 ? "border-b border-white/14 pb-7" : "pt-7")}>
                <span aria-hidden className="w-6 shrink-0 text-[40px] leading-10 text-accent md:w-7">
                  “
                </span>
                <p className="text-[20px] leading-[1.45] tracking-[-0.015em] md:text-[26px] md:leading-9">{tip}</p>
              </li>
            ))}
          </ul>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- More guides: the other three cities ---------- */

export function MoreGuides({ n }: { n: Neighborhood }) {
  const others = neighborhoods.filter((o) => o.slug !== n.slug);
  return (
    <section aria-labelledby="more-title" className="pb-10 pt-16 lg:pt-28">
      <Wrap className="flex flex-col gap-8 lg:gap-10">
        <div data-reveal className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-5">
            <Kicker>Keep exploring</Kicker>
            <Title id="more-title" title={{ lead: "More neighborhood", em: "guides" }} />
          </div>
          <ButtonLink href="/neighborhoods" variant="mist" size="pill" className="shrink-0 self-start sm:self-auto">
            All neighborhoods
            <ArrowIcon className="size-4" />
          </ButtonLink>
        </div>
        <ul data-reveal-stagger className="grid gap-8 sm:grid-cols-3 sm:gap-4">
          {others.map((o) => (
            <li key={o.slug}>
              <Link href={`/neighborhoods/${o.slug}`} className="group flex flex-col gap-[18px]">
                <div className={cn("relative isolate aspect-[4/3] overflow-hidden rounded-[20px]", sky)}>
                  <Landmark n={o} sizes="(min-width: 640px) 360px, 100vw" cutoutClassName="bottom-[-15%] w-[64%]" />
                </div>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-[22px] leading-7 tracking-[-0.01em]">{o.city}</h3>
                    <p className="text-[15px] leading-[22px] text-muted">{o.nickname}</p>
                  </div>
                  <span aria-hidden className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist transition-colors group-hover:bg-hairline">
                    <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}
