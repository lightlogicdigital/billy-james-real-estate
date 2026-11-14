import type { Metadata } from "next";
import Image from "next/image";
import { ListingCard } from "@/components/cards";
import { MotionScope } from "@/components/Motion";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { HOMES_PROFILE_URL, listings } from "@/content/listings";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Properties Sold",
  description: "Homes Billy James has helped buyers and sellers close across Hampton Roads — Chesapeake, Suffolk, Virginia Beach, and Norfolk.",
  alternates: { canonical: "/listings" },
};

export default function ListingsPage() {
  return (
    <MotionScope>
      <section className="pb-12 pt-12 lg:pb-14 lg:pt-24">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow intro>Properties sold</Eyebrow>
            <h1 data-split className="max-w-[820px] font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[56px] lg:text-hero">
              Homes I&apos;ve helped close <span className="text-primary">across Hampton Roads.</span>
            </h1>
          </div>
          <p className="text-lg leading-[1.65] text-muted lg:max-w-[380px] lg:pb-2.5" data-intro>
            Every one of these started with a conversation — whether I was helping a family sell or helping them find their next home.
          </p>
        </Container>
        <Container className="mt-10 lg:mt-14">
          <dl className="grid grid-cols-2 gap-y-6 border-y border-border py-6 md:grid-cols-4 md:py-8" data-reveal-stagger>
            {[
              { value: "10", label: "homes closed" },
              { value: "$4.4M", label: "in sales" },
              { value: "5", label: "for sellers" },
              { value: "5", label: "for buyers" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col-reverse gap-1">
                <dt className="text-sm text-muted md:text-base">{s.label}</dt>
                <dd className="text-[30px] font-medium leading-none tracking-[-0.03em] text-primary md:text-[40px]" data-count>
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-3 text-sm text-muted">
            Prior 5 years, per{" "}
            <a href={HOMES_PROFILE_URL} className="underline underline-offset-4 hover:text-foreground">
              Billy&apos;s Homes.com profile
            </a>
            .
          </p>
        </Container>
      </section>

      <section aria-labelledby="sold-list-title" className="pb-14 lg:pb-28">
        <Container>
          <h2 id="sold-list-title" className="sr-only">
            Sold homes
          </h2>
          <ul className="grid gap-10 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3" data-reveal-stagger>
            {listings.map((listing, i) => (
              <li key={listing.slug}>
                <ListingCard listing={listing} index={i} />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="off-market-title" className="pb-16 lg:pb-28">
        <Container>
          <div data-reveal className="flex flex-col gap-8 rounded-lg bg-surface p-7 md:p-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16 lg:px-16 lg:py-14">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-7">
              <Image
                src="/images/billy/billy-headshot.png"
                alt=""
                width={192}
                height={192}
                className="size-20 shrink-0 rounded-full object-cover object-top md:size-24"
              />
              <div className="flex max-w-[640px] flex-col gap-2.5">
                <h2 id="off-market-title" className="text-2xl font-medium tracking-[-0.025em] md:text-3xl">
                  Not seeing what you&apos;re looking for?
                </h2>
                <p className="text-lg leading-[1.65] text-muted">
                  Some of the best homes never hit the market. Tell me what you need and I&apos;ll help you find it — on-market or off.
                </p>
              </div>
            </div>
            <ButtonLink href={site.bookingUrl} className="shrink-0 self-start lg:self-auto">
              Schedule a Call
            </ButtonLink>
          </div>
        </Container>
      </section>
    </MotionScope>
  );
}
