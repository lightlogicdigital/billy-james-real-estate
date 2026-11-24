import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { home, type HomeTitle } from "@/content/home";
import { formatPrice, getListing } from "@/content/listings";
import { neighborhoods } from "@/content/neighborhoods";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";
import { CityArt } from "./CityArt";
import { ContactForm } from "./LeadForms";
import { ArrowIcon, ButtonLink, Kicker, cn } from "./ui";

/*
 * Homepage sections (2026 redesign, Paper page "Home · Redesign").
 * Calm and mostly monochrome: ink type at weight 400 with one italic word, mist
 * panels, ink/white pills, amber only for the kicker dot, icon circles and the
 * home-value / booking pills.
 */

/** 1120px content column (1200 max minus 40px gutters), matching the design. */
export function Wrap({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[1200px] px-5 md:px-10", className)}>{children}</div>;
}

const titleClass =
  "font-display text-[34px] font-normal leading-[1.15] tracking-[-0.03em] text-balance sm:text-[40px] lg:text-[48px] lg:leading-[56px]";

export function Title({ title, id, className }: { title: HomeTitle; id: string; className?: string }) {
  return (
    <h2 id={id} className={cn(titleClass, className)}>
      {title.lead} <em className="italic">{title.em}</em>
      {title.tail && <> {title.tail}</>}
    </h2>
  );
}

/** Centered kicker + title (+ optional pill), used to open most sections. */
function CenteredHeader({
  kicker,
  title,
  id,
  lead,
  cta,
  ctaVariant = "ink",
}: {
  kicker: string;
  title: HomeTitle;
  id: string;
  lead?: string;
  cta?: { label: string; href: string };
  ctaVariant?: "ink" | "accent";
}) {
  return (
    <div data-reveal-stagger className="flex flex-col items-center gap-5 text-center">
      <Kicker>{kicker}</Kicker>
      <Title title={title} id={id} className="max-w-[760px]" />
      {lead && <p className="max-w-[560px] text-base leading-[26px] text-muted">{lead}</p>}
      {cta && (
        <ButtonLink href={cta.href} variant={ctaVariant} size="pill">
          {cta.label}
        </ButtonLink>
      )}
    </div>
  );
}

/* ---------- Icons for the amber circles (24px grid, ink stroke) ---------- */

const iconPaths = {
  tag: "M3.5 12.5 11.5 4.5h8v8l-8 8ZM15.5 8.5h.01",
  home: "M3 9.5 12 3l9 6.5M5.5 8v12h13V8M10 20v-6h4v6",
  shield: "M12 3 4.5 6v5.5c0 4.5 3.2 8.3 7.5 9.5 4.3-1.2 7.5-5 7.5-9.5V6ZM8.5 12l2.5 2.5 4.5-4.5",
  target: "M12 3v3M12 18v3M3 12h3M18 12h3M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z",
  list: "M4 6h16M4 12h16M4 18h9",
  phone: "M5 4h3l2 5-2.5 1.5a11 11 0 0 0 6 6L15 14l5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2",
  pin: "M12 21s7-6.5 7-11.5a7 7 0 0 0-14 0C5 14.5 12 21 12 21ZM12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
} as const;

function IconCircle({ icon, size = "md" }: { icon: keyof typeof iconPaths; size?: "sm" | "md" }) {
  return (
    <span aria-hidden className={cn("flex shrink-0 items-center justify-center rounded-full bg-accent", size === "md" ? "size-10" : "size-9")}>
      <svg viewBox="0 0 24 24" className={size === "md" ? "size-5" : "size-[18px]"} fill="none" stroke="#13253F" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d={iconPaths[icon]} />
      </svg>
    </span>
  );
}

/* ---------- Hero ---------- */

export function HomeHero() {
  const { hero } = home;
  return (
    <section data-hero aria-labelledby="hero-title" className="px-2 pt-2 sm:px-2.5 sm:pt-2.5">
      {/* Fills the screen at every size (the mobile call bar stays hidden over the hero). */}
      <div className="relative isolate flex h-[calc(100svh-16px)] min-h-[640px] flex-col justify-end overflow-hidden rounded-[24px] bg-[#2e3d2a] sm:h-[calc(100svh-20px)] sm:rounded-[32px]">
        <Image
          src={hero.image.src}
          alt={hero.image.alt}
          fill
          preload
          sizes="(min-width: 1440px) 1420px, 100vw"
          data-hero-media
          className="-z-20 object-cover object-[78%_50%] lg:object-[62%_50%]"
        />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(19,37,63,0.25)_0%,rgba(19,37,63,0)_18%,rgba(19,37,63,0)_32%,rgba(19,37,63,0.62)_56%,rgba(19,37,63,0.9)_100%)] md:bg-[linear-gradient(180deg,rgba(19,37,63,0.18)_0%,rgba(19,37,63,0)_20%,rgba(19,37,63,0)_46%,rgba(19,37,63,0.5)_66%,rgba(19,37,63,0.85)_100%)]"
        />
        <div data-depth="copy">
          {/* From lg up the copy scales with the screen: the Wrap sets one fluid base size
              (capped by height so short, wide windows don't overflow) and everything inside
              is sized in em, so kicker, headline, buttons and stats stay in proportion. */}
          <Wrap className="pb-7 text-white md:pb-12 lg:max-w-none lg:px-[5.5em] lg:pb-[4em] lg:text-[length:clamp(12px,min(1.15vw,1.9svh),26px)]">
            <div className="flex flex-col gap-9 lg:w-fit lg:max-w-[52em] lg:gap-[2.2em]">
              <div className="flex flex-col gap-4 lg:gap-[1.1em]">
                <Kicker tone="light" intro className="lg:text-[max(0.82em,12px)]">
                  <span className="sm:hidden">{hero.kickerShort}</span>
                  <span className="hidden sm:inline">{hero.kicker}</span>
                </Kicker>
                <h1
                  id="hero-title"
                  data-split
                  className="font-display text-[40px] font-normal leading-[1.1] tracking-[-0.045em] [word-spacing:0.015em] text-balance sm:text-[48px] lg:text-[4.4em] lg:leading-[1.08]"
                >
                  {/* Two lines from sm up; one flowing sentence on phones (SplitText always honors <br>). */}
                  <span className="sm:block">{hero.title.line1}</span>{" "}
                  <span className="sm:block">
                    {hero.title.lead} <em className="italic">{hero.title.em}</em>
                  </span>
                </h1>
                <div data-intro className="flex flex-col gap-2.5 pt-2.5 sm:flex-row lg:gap-[0.7em] lg:pt-[0.7em]">
                  <ButtonLink href={hero.primaryCta.href} variant="white" size="pill" className={heroButton}>
                    {hero.primaryCta.label}
                  </ButtonLink>
                  <ButtonLink href={hero.secondaryCta.href} variant="accent" size="pill" className={heroButton}>
                    {hero.secondaryCta.label}
                  </ButtonLink>
                </div>
              </div>
              <HeroStats className="hidden sm:grid sm:grid-cols-3 sm:gap-14 sm:border-t sm:border-white/20 sm:pt-6 lg:flex lg:w-fit lg:gap-[3.4em] lg:pt-[1.5em]" />
            </div>
          </Wrap>
        </div>
      </div>
      {/* On phones the stats sit under the photo so the copy stays clear of Billy's face. */}
      <HeroStats tone="ink" className="grid grid-cols-3 gap-4 px-4 pt-7 sm:hidden" />
    </section>
  );
}

/** Hero pills grow with the hero's fluid base size from lg up (same 15px/22px proportions). */
const heroButton = "lg:px-[1.45em] lg:py-[0.8em] lg:text-[max(1em,15px)]";

function HeroStats({ className, tone = "light" }: { className?: string; tone?: "light" | "ink" }) {
  return (
    <dl data-intro className={className}>
      {home.hero.stats.map((stat) => {
        const star = stat.value.endsWith("★");
        return (
          <div key={stat.label} className="flex flex-col-reverse gap-1.5 lg:gap-[0.4em]">
            <dt className={cn("text-[13px] leading-[18px] sm:text-sm lg:text-[max(0.875em,13px)] lg:leading-[1.3]", tone === "light" ? "text-white/85" : "text-muted")}>{stat.label}</dt>
            <dd className="whitespace-nowrap text-[28px] leading-none tracking-[-0.03em] sm:text-[40px] sm:leading-[44px] lg:text-[2.6em] lg:leading-[1.1]">
              <span data-count>{star ? stat.value.slice(0, -1) : stat.value}</span>
              {star && (
                <>
                  <span aria-hidden>★</span>
                  <span className="sr-only"> stars</span>
                </>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

/* ---------- Meet Billy: two-tone statement + "as seen on" ---------- */

export function MeetBilly() {
  const { meet } = home;
  return (
    <section aria-labelledby="meet-title" className="py-24 lg:pb-28 lg:pt-32">
      <Wrap className="flex flex-col items-center gap-7 text-center">
        <Kicker as="h2" id="meet-title">
          {meet.kicker}
        </Kicker>
        <p data-reveal className="max-w-[880px] font-display text-[26px] leading-[1.3] tracking-[-0.025em] sm:text-[32px] lg:text-[40px] lg:leading-[52px]">
          {meet.statement} <span className="text-quiet">{meet.quiet}</span>
        </p>
        <div data-reveal className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 pt-8 lg:gap-x-[72px] lg:pt-11">
          <p className="w-full text-xs font-medium uppercase tracking-eyebrow text-muted sm:w-auto sm:text-[13px]">{meet.featuredLabel}</p>
          {site.featuredOn.map((logo) => (
            <Image
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              width={logo.width}
              height={logo.height}
              className="h-auto w-[110px] opacity-60 last:w-[72px] lg:w-[130px] lg:last:w-[80px]"
            />
          ))}
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- How I help: buying + selling cards ---------- */

export function HowIHelp() {
  const { help } = home;
  return (
    <section aria-labelledby="help-title" className="pb-24 pt-4 lg:pb-32 lg:pt-10">
      <Wrap className="flex flex-col items-center gap-12 lg:gap-14">
        <CenteredHeader kicker={help.kicker} title={help.title} id="help-title" cta={help.cta} />
        <ul data-reveal-stagger className="grid w-full gap-10 sm:grid-cols-2 sm:gap-4">
          {services.slice(0, 2).map((service) => (
            <li key={service.title}>
              <Link href={service.href ?? "/contact"} className="group flex flex-col gap-5">
                <div className="relative aspect-[552/380] overflow-hidden rounded-[24px] bg-mist">
                  {service.image && (
                    <Image
                      src={service.image.src}
                      alt={service.image.alt}
                      fill
                      sizes="(min-width: 1200px) 552px, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 px-2">
                  <h3 className="text-[22px] leading-7 tracking-[-0.015em]">{service.title}</h3>
                  <p className="text-[15px] leading-6 text-muted">{service.summary}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Wrap>
    </section>
  );
}

/* ---------- For sellers: three points + recently sold banner ---------- */

/** Sold-home pills: mist on the white page (phones), frosted white over the photo (sm+). */
const salePill = "rounded-full bg-mist transition-colors hover:bg-hairline sm:bg-white/95 sm:backdrop-blur-sm sm:hover:bg-white";

export function ForSellers() {
  const { sellers } = home;
  const sale = getListing(sellers.featuredSale);
  return (
    <section aria-labelledby="sellers-title" className="pb-24 pt-4 lg:pb-32 lg:pt-10">
      <Wrap className="flex flex-col items-center gap-12">
        <CenteredHeader kicker={sellers.kicker} title={sellers.title} id="sellers-title" cta={sellers.cta} ctaVariant="accent" />
        <div className="flex w-full flex-col gap-4">
          <ul data-reveal-stagger className="grid gap-4 md:grid-cols-3">
            {sellers.points.map((point) => (
              <li key={point.title} className="flex flex-col gap-7 rounded-[24px] bg-mist p-7">
                <IconCircle icon={point.icon} />
                <div className="flex flex-col gap-2">
                  <h3 className="text-[19px] leading-[26px]">{point.title}</h3>
                  <p className="text-[15px] leading-6 text-muted">{point.body}</p>
                </div>
              </li>
            ))}
          </ul>
          {sale?.image && (
            // Aspect ratios (not fixed heights) keep the whole house in frame at every width:
            // the crop is anchored to the top so the roofline survives the parallax's 1.1 scale.
            // From sm up the pills sit on the lawn; on phones they drop below the photo.
            <div className="relative">
              <div data-parallax-frame className="relative isolate aspect-[4/3] overflow-hidden rounded-[24px] bg-mist sm:aspect-[16/10] lg:aspect-[19/10]">
                <Image
                  src={sale.image.src}
                  alt={sale.image.alt}
                  fill
                  sizes="(min-width: 1200px) 1120px, 100vw"
                  data-parallax-media
                  className="-z-10 object-cover object-[45%_0%]"
                />
              </div>
              <div className="flex flex-wrap items-center gap-2.5 pt-3 sm:absolute sm:inset-x-0 sm:bottom-0 sm:gap-4 sm:p-6">
                <Link
                  href={`/listings/${sale.slug}`}
                  className={cn("flex items-center gap-3 py-2.5 pl-2.5 pr-[18px]", salePill)}
                >
                  <span className="rounded-full bg-foreground px-3 py-1.5 text-xs font-medium uppercase tracking-[0.12em] text-white">Sold</span>
                  <span className="text-[15px]">
                    {sale.street}, {sale.city}
                  </span>
                  <span className="hidden text-[15px] text-muted sm:inline">{formatPrice(sale.soldPrice)}</span>
                </Link>
                <Link href={sellers.allSales.href} className={cn("group flex items-center gap-2 px-[18px] py-2.5 text-[15px]", salePill)}>
                  {sellers.allSales.label}
                  <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- For buyers: points beside Billy's photo ---------- */

export function ForBuyers() {
  const { buyers } = home;
  return (
    <section aria-labelledby="buyers-title" className="pb-24 lg:pb-32">
      <Wrap className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
        <div data-reveal-stagger className="flex flex-col gap-10 lg:w-[480px]">
          <div className="flex flex-col gap-5">
            <Kicker>{buyers.kicker}</Kicker>
            <Title title={buyers.title} id="buyers-title" />
          </div>
          <ul className="flex flex-col gap-6">
            {buyers.points.map((point) => (
              <li key={point.text} className="flex items-start gap-4">
                <IconCircle icon={point.icon} size="sm" />
                <p className="pt-[5px] text-base leading-[26px] text-muted">{point.text}</p>
              </li>
            ))}
          </ul>
          <div>
            <ButtonLink href={buyers.cta.href} variant="ink" size="pill">
              {buyers.cta.label}
            </ButtonLink>
          </div>
        </div>
        <div data-reveal className="relative aspect-[560/680] w-full overflow-hidden rounded-[24px] bg-mist lg:w-[560px] lg:shrink-0">
          {/* The source is a full-length portrait: frame it mid-thigh up, with headroom above
              Billy and his hands fully in frame (shows ~16–86% of the photo's height). */}
          <Image
            src={buyers.image.src}
            alt={buyers.image.alt}
            fill
            sizes="(min-width: 1024px) 728px, 130vw"
            className="origin-[65%_54%] scale-[1.3] object-cover"
          />
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Neighborhoods: mist panel with city cards ---------- */

export function NeighborhoodsPanel() {
  const { neighborhoods: copy } = home;
  return (
    <section aria-labelledby="hoods-title" className="px-2 sm:px-2.5">
      <div className="rounded-[24px] bg-mist py-16 sm:rounded-[32px] lg:py-24">
        <Wrap className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div data-reveal-stagger className="flex flex-col gap-6 lg:w-[400px] lg:shrink-0">
            <Kicker>{copy.kicker}</Kicker>
            <Title title={copy.title} id="hoods-title" />
            <p className="text-base leading-[26px] text-muted">{copy.lead}</p>
            <div className="pt-2">
              <ButtonLink href={copy.cta.href} variant="ink" size="pill">
                {copy.cta.label}
              </ButtonLink>
            </div>
          </div>
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2 lg:w-[640px]">
            {neighborhoods.map((n) => (
              <li key={n.slug}>
                <Link href={`/neighborhoods/${n.slug}`} className="group flex flex-col gap-2">
                  <div className="flex h-[176px] items-center justify-center overflow-hidden rounded-[20px] bg-white sm:h-[196px]">
                    <CityArt slug={n.slug} className="w-[236px] transition-transform duration-500 ease-out group-hover:scale-[1.04]" />
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-2xl bg-white py-3.5 pl-[18px] pr-3.5">
                    <div className="flex flex-col gap-0.5">
                      <h3 className="text-[17px] leading-[22px]">{n.city}</h3>
                      <p className="text-[13px] leading-[18px] text-muted">{copy.cardLines[n.slug] ?? n.nickname}</p>
                    </div>
                    <span aria-hidden className="flex size-[34px] shrink-0 items-center justify-center rounded-full bg-foreground text-white transition-transform group-hover:translate-x-0.5">
                      <ArrowIcon className="size-4" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Wrap>
      </div>
    </section>
  );
}

/* ---------- Reviews: white, mist, ink ---------- */

const reviewTones = [
  { card: "border border-hairline bg-white", avatar: "bg-mist", meta: "text-muted" },
  { card: "bg-mist", avatar: "bg-white", meta: "text-muted" },
  { card: "bg-foreground text-white", avatar: "bg-accent text-foreground", meta: "text-white/75" },
];

/** `tight` drops the big top padding when the section follows another one directly (About page). */
export function Reviews({ tight = false }: { tight?: boolean } = {}) {
  const { reviews } = home;
  return (
    <section aria-labelledby="reviews-title" className={tight ? "pb-10" : "pb-24 pt-24 lg:pb-28 lg:pt-32"}>
      <Wrap className="flex flex-col items-center gap-12 lg:gap-14">
        <CenteredHeader kicker={reviews.kicker} title={reviews.title} id="reviews-title" lead={reviews.lead} />
        <ul data-reveal-stagger className="grid w-full gap-4 md:grid-cols-3">
          {reviews.excerpts.map((excerpt, i) => {
            const source = testimonials.find((t) => t.name === excerpt.name);
            const tone = reviewTones[i % reviewTones.length];
            const initials = excerpt.name.replace(/[^A-Z]/g, "");
            return (
              <li key={excerpt.name}>
                <figure className={cn("flex h-full flex-col justify-between gap-14 rounded-[24px] p-7", tone.card)}>
                  <blockquote className="text-[19px] leading-[29px]">“{excerpt.quote}”</blockquote>
                  <figcaption className="flex items-center gap-3.5">
                    <span aria-hidden className={cn("flex size-11 items-center justify-center rounded-full text-[15px]", tone.avatar)}>
                      {initials}
                    </span>
                    <span className="flex flex-col gap-0.5">
                      <span className="text-[15px] leading-5">{excerpt.name}</span>
                      {source && <span className={cn("text-[13px] leading-[18px]", tone.meta)}>{source.context} with Billy</span>}
                    </span>
                  </figcaption>
                </figure>
              </li>
            );
          })}
        </ul>
      </Wrap>
    </section>
  );
}

/* ---------- Let's talk: one sentence with the booking pill set inline ---------- */

/** Closing sign-off. `title` swaps the first line (e.g. "Thinking about Norfolk?" on city pages). */
export function LetsTalk({ title }: { title?: HomeTitle } = {}) {
  const { talk } = home;
  const line1 = title ?? talk.line1;
  return (
    <section aria-labelledby="talk-title">
      <Wrap>
        <div data-reveal-stagger className="flex flex-col items-center gap-7 border-y border-hairline py-20 text-center lg:pb-24 lg:pt-[104px]">
          <Kicker>{talk.kicker}</Kicker>
          <div className="flex flex-col items-center gap-3 font-display text-[36px] leading-[1.15] tracking-[-0.03em] sm:gap-1.5 sm:text-[48px] lg:text-[64px] lg:leading-[76px]">
            <h2 id="talk-title" className="font-normal">
              {line1.lead} <em className="italic">{line1.em}</em>
            </h2>
            <p className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
              <span>{talk.before}</span>
              <Link
                href={talk.pill.href}
                className="group inline-flex items-center gap-3 rounded-full bg-accent p-1.5 font-sans text-[17px] leading-[22px] tracking-normal text-foreground transition-colors hover:bg-[#efa743] sm:gap-3.5 sm:p-[7px] sm:text-lg"
              >
                <Image
                  src="/images/billy/billy-headshot.png"
                  alt=""
                  width={100}
                  height={100}
                  className="size-11 rounded-full bg-[#e7eef6] object-cover object-[50%_12%] sm:size-[50px]"
                />
                <span className="px-0.5">{talk.pill.label}</span>
                <span aria-hidden className="flex size-11 items-center justify-center rounded-full bg-foreground text-white sm:size-[50px]">
                  <ArrowIcon className="size-5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
              <span>{talk.after}</span>
            </p>
          </div>
          <p className="text-base leading-6 text-muted">
            {talk.note}{" "}
            <a href={site.phoneHref} className="text-foreground underline decoration-quiet underline-offset-4 hover:decoration-foreground">
              {site.phone}
            </a>
          </p>
        </div>
      </Wrap>
    </section>
  );
}

/* ---------- Get in touch: details + dark form ---------- */

export function GetInTouch() {
  const { contact } = home;
  const details = [
    { icon: "phone" as const, content: <a href={site.phoneHref} className="hover:text-primary">Call or text {site.phone}</a> },
    { icon: "pin" as const, content: site.serviceAreas.join(", ").replace(/, ([^,]*)$/, " & $1") },
    { icon: "home" as const, content: site.brokerage },
  ];
  return (
    <section aria-labelledby="contact-title" className="py-24 lg:py-28">
      <Wrap className="flex flex-col gap-12 lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-between gap-10 lg:w-[420px]">
          <div data-reveal-stagger className="flex flex-col gap-5">
            <Kicker>{contact.kicker}</Kicker>
            <Title title={contact.title} id="contact-title" />
            <p className="text-base leading-[26px] text-muted">{contact.body}</p>
          </div>
          <ul data-reveal-stagger className="flex flex-col gap-[18px]">
            {details.map((d) => (
              <li key={d.icon} className="flex items-center gap-3.5 text-base leading-[22px]">
                <IconCircle icon={d.icon} size="sm" />
                {d.content}
              </li>
            ))}
          </ul>
        </div>
        <div data-reveal className="lg:w-[600px] lg:shrink-0">
          <ContactForm dark />
        </div>
      </Wrap>
    </section>
  );
}
