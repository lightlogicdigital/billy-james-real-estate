import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LetsTalk } from "@/components/HomeSections";
import { MotionScope } from "@/components/Motion";
import { AreasGrid, BillysTake, MoreGuides, NeighborhoodHero, SchoolZones, WhyLoveIt } from "@/components/NeighborhoodSections";
import { getNeighborhood, neighborhoods } from "@/content/neighborhoods";

// Static export: only the four cities are built; anything else is the 404 page.
export const dynamicParams = false;

export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ city: n.slug }));
}

export async function generateMetadata({ params }: PageProps<"/neighborhoods/[city]">): Promise<Metadata> {
  const { city } = await params;
  const n = getNeighborhood(city);
  if (!n) return { title: "Neighborhood not found" };
  return {
    title: `${n.city}, VA Neighborhood Guide`,
    description: `${n.nickname}. ${n.intro}`.slice(0, 158),
    alternates: { canonical: `/neighborhoods/${n.slug}` },
  };
}

export default async function NeighborhoodPage({ params }: PageProps<"/neighborhoods/[city]">) {
  const { city } = await params;
  const n = getNeighborhood(city);
  if (!n) notFound();

  return (
    <MotionScope>
      <NeighborhoodHero n={n} />
      <WhyLoveIt n={n} />
      <AreasGrid n={n} />
      <SchoolZones n={n} />
      <BillysTake n={n} />
      <MoreGuides n={n} />
      <div className="pb-16 pt-8 lg:pb-28 lg:pt-[72px]">
        <LetsTalk title={{ lead: "Thinking about", em: `${n.city}?` }} />
      </div>
    </MotionScope>
  );
}
