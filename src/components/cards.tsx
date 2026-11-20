import Image from "next/image";
import Link from "next/link";
import { formatPrice, roleTag, type Listing } from "@/content/listings";
import type { Neighborhood } from "@/content/neighborhoods";
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
      {specs.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-3.5 text-sm font-medium" aria-label="Home details">
          {specs.map((item, i) => (
            <li key={item} className="flex items-center gap-3">
              {i > 0 && (
                <span aria-hidden className="text-border">
                  |
                </span>
              )}
              {item}
            </li>
          ))}
        </ul>
      )}
      {listing.image?.credit && <p className="-mt-2 text-xs text-muted">Listing courtesy of {listing.image.credit}</p>}
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
