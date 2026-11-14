import Image from "next/image";
import Link from "next/link";
import { formatPrice, roleLabel, roleTag, type Listing } from "@/content/listings";
import type { Neighborhood } from "@/content/neighborhoods";
import type { Testimonial } from "@/content/testimonials";
import { CityArt } from "./CityArt";
import { HomeArt } from "./HomeArt";
import { ArrowIcon, cn } from "./ui";

/** Short spec strings for whatever details are verified for a deal. */
export function listingSpecs(listing: Listing) {
  return [
    listing.beds != null && `${listing.beds} beds`,
    listing.baths != null && `${listing.baths} baths`,
    listing.sqft != null && `${listing.sqft.toLocaleString("en-US")} sq ft`,
  ].filter(Boolean) as string[];
}

export function ListingCard({ listing, index = 0, className }: { listing: Listing; index?: number; className?: string }) {
  const specs = listingSpecs(listing);
  return (
    <Link href={`/listings/${listing.slug}`} className={cn("group flex flex-col gap-5", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-md">
        {listing.image ? (
          <Image
            src={listing.image.src}
            alt={listing.image.alt}
            fill
            sizes="(min-width: 1024px) 420px, (min-width: 640px) 50vw, 290px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
        ) : (
          <HomeArt variant={index} className="transition-transform duration-700 ease-out group-hover:scale-[1.03]" />
        )}
        <span className="absolute left-4 top-4 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] text-white">
          {roleTag[listing.role]}
        </span>
      </div>
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[19px] font-semibold tracking-[-0.015em] md:text-title">{listing.street}</h3>
          <p className="text-muted">
            {listing.city}, {listing.state}
          </p>
        </div>
        <p className="shrink-0 pt-0.5 text-right text-[19px] font-medium tracking-[-0.015em] text-primary md:text-title">
          {formatPrice(listing.soldPrice)}
        </p>
      </div>
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-3.5 text-sm font-medium" aria-label="Deal details">
        {[...specs, roleLabel[listing.role]].map((item, i) => (
          <li key={item} className={cn("flex items-center gap-3", i === specs.length && "text-muted")}>
            {i > 0 && (
              <span aria-hidden className="text-border">
                |
              </span>
            )}
            {item}
          </li>
        ))}
      </ul>
    </Link>
  );
}

export function NeighborhoodCard({ neighborhood }: { neighborhood: Neighborhood }) {
  return (
    <Link
      href={`/neighborhoods/${neighborhood.slug}`}
      className="group flex w-full flex-col overflow-hidden rounded-md border border-border transition-shadow hover:shadow-[0_16px_40px_rgba(19,37,63,0.10)]"
    >
      <div className="flex h-[200px] items-end justify-center bg-surface">
        <CityArt slug={neighborhood.slug} className="h-[170px] w-[260px] transition-transform duration-500 group-hover:-translate-y-1" />
      </div>
      <div className="flex flex-1 flex-col gap-2 p-6">
        <h3 className="text-title font-semibold">{neighborhood.city}</h3>
        <p className="min-h-11 text-[15px] leading-[22px] text-muted">{neighborhood.nickname}</p>
        <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
          Explore <ArrowIcon className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}

/** Compact row version used on small screens. */
export function NeighborhoodRow({ neighborhood }: { neighborhood: Neighborhood }) {
  return (
    <Link href={`/neighborhoods/${neighborhood.slug}`} className="flex items-center gap-3.5 border-b border-border py-4">
      <span className="flex size-13 shrink-0 items-center justify-center rounded-xl bg-surface">
        <CityArt slug={neighborhood.slug} className="h-8 w-12" draw={false} />
      </span>
      <span className="flex flex-1 flex-col">
        <span className="text-lg font-semibold">{neighborhood.city}</span>
        <span className="text-sm text-muted">{neighborhood.nickname}</span>
      </span>
      <ArrowIcon className="size-5 shrink-0" />
    </Link>
  );
}

function initials(name: string) {
  return name
    .split(/\s+/)
    .map((p) => p[0])
    .join("")
    .replace(/[^A-Z]/gi, "")
    .slice(0, 2)
    .toUpperCase();
}

/**
 * Quote card. `excerpt` must be a verbatim slice of the original testimonial;
 * `highlight` (also verbatim) is colored inside it.
 */
export function TestimonialCard({
  testimonial,
  excerpt,
  highlight,
  featured = false,
}: {
  testimonial: Testimonial;
  excerpt: string;
  highlight?: string;
  featured?: boolean;
}) {
  const [before, after] = highlight ? excerpt.split(highlight) : [excerpt, undefined];
  return (
    <figure
      className={cn(
        "flex h-full flex-col justify-between gap-7 rounded-lg",
        featured ? "bg-primary p-7 text-white md:p-11" : "bg-white p-7 md:p-9",
      )}
    >
      {featured && (
        <span aria-hidden className="text-[64px] font-medium leading-[40px] text-accent">
          “
        </span>
      )}
      <blockquote
        className={cn(
          featured ? "text-xl leading-[1.5] md:text-[28px] md:leading-[40px]" : "text-lg leading-[1.55] md:text-xl",
          "tracking-[-0.01em]",
        )}
      >
        {!featured && "“"}
        {before}
        {highlight && <span className={featured ? "text-accent" : "text-primary"}>{highlight}</span>}
        {after}
        {!featured && "”"}
      </blockquote>
      <figcaption className="flex items-center gap-3.5">
        <span
          aria-hidden
          className={cn(
            "flex size-11 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-foreground",
            featured ? "bg-accent" : "bg-accent-soft",
          )}
        >
          {initials(testimonial.name)}
        </span>
        <span className="flex flex-col">
          <span className="font-semibold">{testimonial.name}</span>
          <span className={cn("text-sm", featured ? "text-white/80" : "text-muted")}>{testimonial.context} with Billy</span>
        </span>
      </figcaption>
    </figure>
  );
}
