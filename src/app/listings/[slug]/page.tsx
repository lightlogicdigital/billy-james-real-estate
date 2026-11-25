import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ListingCard, listingSpecs } from "@/components/cards";
import { HomeArt } from "@/components/HomeArt";
import { JsonLd, listingJsonLd } from "@/components/JsonLd";
import { MotionScope } from "@/components/Motion";
import { ButtonLink, Container } from "@/components/ui";
import { HOMES_PROFILE_URL, formatPrice, formatSoldDate, getListing, listings, photoCredit, roleTag } from "@/content/listings";
import { site } from "@/content/site";

// Static export: only the listed sales are built; anything else is the 404 page.
export const dynamicParams = false;

export async function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps<"/listings/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) return { title: "Listing not found" };
  const specs = listingSpecs(listing).join(", ");
  return {
    title: `${listing.street}, ${listing.city}, ${listing.state}`,
    description: `Sold for ${formatPrice(listing.soldPrice)}${specs ? ` — ${specs}` : ""} in ${listing.city}, VA, with Billy James.`,
    alternates: { canonical: `/listings/${listing.slug}` },
    ...(listing.image && {
      openGraph: { images: [{ url: listing.image.src, width: listing.image.width, height: listing.image.height, alt: listing.image.alt }] },
    }),
  };
}

export default async function ListingPage({ params }: PageProps<"/listings/[slug]">) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  const index = listings.indexOf(listing);
  const specs = [
    { label: "Bedrooms", value: listing.beds },
    { label: "Bathrooms", value: listing.baths },
    { label: "Living space", value: listing.sqft != null ? `${listing.sqft.toLocaleString("en-US")} sq ft` : undefined },
    { label: "Built", value: listing.yearBuilt },
    { label: "Floors", value: listing.floors },
  ].filter((s) => s.value != null);
  const soldOn = formatSoldDate(listing.soldDate);
  const others = listings.filter((l) => l.slug !== listing.slug).slice(0, 3);

  return (
    <MotionScope>
      <JsonLd data={listingJsonLd(listing)} />
      <section className="pt-8 lg:pt-10">
        <Container className="flex flex-col gap-7">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2.5 text-sm">
            <Link href="/listings" className="font-medium text-primary hover:text-primary-hover">
              ← Properties sold
            </Link>
            <span aria-hidden className="text-border">
              /
            </span>
            <span className="text-muted">{listing.city}</span>
          </nav>
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between" data-reveal>
            <div className="flex flex-col gap-3.5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
                  {roleTag[listing.role]}
                </span>
                <span className="text-muted">
                  {listing.city}, {listing.state} {listing.zip}
                </span>
              </div>
              <h1 className="font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[60px]">{listing.street}</h1>
            </div>
            <div className="flex flex-col gap-1 md:items-end md:pb-1.5">
              <span className="text-sm text-muted">Sold for{soldOn && ` · ${soldOn}`}</span>
              <span className="text-[30px] font-medium tracking-[-0.02em] text-primary md:text-4xl">{formatPrice(listing.soldPrice)}</span>
              {listing.listPrice && listing.listPrice !== listing.soldPrice && (
                <span className="text-sm text-muted">Listed at {formatPrice(listing.listPrice)}</span>
              )}
            </div>
          </div>
          {listing.image ? (
            // The frame takes the photo's own shape, so the whole house is always shown (never
            // cropped). Its height is capped so the photo fits on screen below the title (which
            // ends about 300px down on desktop), and a narrower photo sits centered on a light panel.
            <div className="flex justify-center overflow-hidden rounded-lg bg-mist">
              <div
                className="relative"
                style={{
                  aspectRatio: `${listing.image.width} / ${listing.image.height}`,
                  width: `min(100%, calc(clamp(360px, 100svh - 332px, 760px) * ${listing.image.width / listing.image.height}))`,
                }}
              >
                <Image
                  src={listing.image.src}
                  alt={listing.image.alt}
                  fill
                  preload
                  sizes="(min-width: 1440px) 1140px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ) : (
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg md:aspect-[1312/620]">
              <HomeArt variant={index} label="Photo coming soon" />
            </div>
          )}
          {photoCredit(listing.image) && <p className="-mt-4 text-xs text-muted">{photoCredit(listing.image)}</p>}
        </Container>
      </section>

      <section className="py-12 lg:pb-28 lg:pt-16">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
          <div className="flex flex-1 flex-col gap-10">
            <div className="flex flex-col gap-4" data-reveal>
              <h2 className="text-sm font-medium uppercase tracking-eyebrow text-primary">About this sale</h2>
              <p className="text-lg leading-[1.6] md:text-lead">
                {listing.description ?? `A ${listing.city} home that sold for ${formatPrice(listing.soldPrice)}${soldOn ? ` in ${soldOn}` : ""}.`}
              </p>
              <p className="text-sm text-muted">
                Sale data from{" "}
                <a href={HOMES_PROFILE_URL} className="underline underline-offset-4 hover:text-foreground">
                  Homes.com
                </a>
              </p>
            </div>
            {specs.length > 0 && (
              <dl className="grid grid-cols-2 border-y border-border sm:grid-cols-3 lg:grid-cols-5" data-reveal-stagger>
                {specs.map((spec, i) => (
                  <div key={spec.label} className={i === 0 ? "flex flex-col gap-1.5 py-6" : "flex flex-col gap-1.5 py-6 pl-6 lg:border-l lg:border-border"}>
                    <dt className="text-sm text-muted">{spec.label}</dt>
                    <dd className="text-2xl font-medium tracking-[-0.02em] md:text-[26px]">{String(spec.value)}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
          <aside className="flex flex-col gap-5 rounded-lg bg-surface p-7 lg:w-[400px] lg:shrink-0 lg:p-8" data-reveal>
            <div className="flex items-center gap-4">
              <Image src="/images/billy/billy-headshot.png" alt="" width={128} height={128} className="size-16 rounded-full object-cover object-top" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">Billy James</span>
                <span className="text-sm text-muted">REALTOR® · Atlantic Connection</span>
              </div>
            </div>
            <h2 className="text-2xl font-medium tracking-[-0.02em]">
              {listing.role === "buyer" ? "Looking for a home like this?" : "Thinking about selling nearby?"}
            </h2>
            <p className="leading-[1.65] text-muted">
              {listing.role === "buyer"
                ? `I know ${listing.city} well. Tell me what you're looking for and I'll help you find it.`
                : "Homes like this one get attention. I'll tell you what yours could sell for — no pressure."}
            </p>
            {listing.role === "buyer" ? (
              <ButtonLink href={site.bookingUrl} variant="accent">
                Start my home search
              </ButtonLink>
            ) : (
              <ButtonLink href="/home-value" variant="accent">
                What&apos;s my home worth?
              </ButtonLink>
            )}
            <a
              href={site.phoneHref}
              className="flex justify-center rounded-full border border-foreground px-6 py-3.5 font-medium transition-colors hover:bg-foreground hover:text-white"
            >
              Call or text {site.phone}
            </a>
          </aside>
        </Container>
      </section>

      {others.length > 0 && (
        <section aria-labelledby="more-title" className="bg-surface py-14 lg:py-24">
          <Container className="flex flex-col gap-10">
            <h2 id="more-title" className="font-display text-[30px] font-medium tracking-[-0.03em] md:text-[40px]" data-reveal>
              More homes <span className="text-muted">I&apos;ve helped close</span>
            </h2>
            <ul className="grid gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" data-reveal-stagger>
              {others.map((l) => (
                <li key={l.slug}>
                  <ListingCard listing={l} index={listings.indexOf(l)} />
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}
    </MotionScope>
  );
}
