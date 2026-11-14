import type { Metadata } from "next";
import { NeighborhoodCard } from "@/components/cards";
import { CtaBand } from "@/components/sections";
import { MotionScope } from "@/components/Motion";
import { Container, Eyebrow } from "@/components/ui";
import { neighborhoods } from "@/content/neighborhoods";

export const metadata: Metadata = {
  title: "Neighborhood Guides",
  description: "Billy James's local take on Virginia Beach, Chesapeake, Norfolk, and Suffolk — what people love, areas to know, and what to watch for.",
  alternates: { canonical: "/neighborhoods" },
};

export default function NeighborhoodsPage() {
  return (
    <MotionScope>
      <section className="pb-12 pt-12 lg:pb-16 lg:pt-24">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="flex flex-col gap-6">
            <Eyebrow intro>Neighborhoods</Eyebrow>
            <h1 data-split className="max-w-[820px] font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[56px] lg:text-hero">
              Know the neighborhood before you <span className="text-primary">move in.</span>
            </h1>
          </div>
          <p data-intro className="text-lg leading-[1.65] text-muted lg:max-w-[420px] lg:pb-2.5">
            Twenty-plus years on these streets. Here&apos;s my honest take on each city — the best parts, and what to watch for.
          </p>
        </Container>
      </section>
      <section aria-labelledby="cities-title" className="pb-16 lg:pb-28">
        <Container>
          <h2 id="cities-title" className="sr-only">
            Cities I serve
          </h2>
          <ul data-reveal-stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {neighborhoods.map((n) => (
              <li key={n.slug} className="flex">
                <NeighborhoodCard neighborhood={n} />
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand />
    </MotionScope>
  );
}
