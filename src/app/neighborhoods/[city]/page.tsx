import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CityArt } from "@/components/CityArt";
import { MotionScope } from "@/components/Motion";
import { CtaBand } from "@/components/sections";
import { ButtonLink, Container } from "@/components/ui";
import { getNeighborhood, neighborhoods } from "@/content/neighborhoods";
import { site } from "@/content/site";

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
      <section className="pb-14 pt-6 lg:pb-28 lg:pt-14">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-16">
          <div className="order-2 flex flex-1 flex-col justify-center gap-6 lg:order-1 lg:gap-7">
            <nav aria-label="Breadcrumb" className="hidden items-center gap-2.5 text-sm lg:flex">
              <Link href="/neighborhoods" className="font-medium text-primary hover:text-primary-hover">
                ← Neighborhoods
              </Link>
              <span aria-hidden className="text-border">
                /
              </span>
              <span className="text-muted">{n.city}</span>
            </nav>
            <div className="flex flex-col gap-2.5">
              <h1 data-split className="font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[56px] lg:text-hero">{n.city}</h1>
              <p data-intro className="text-[19px] font-medium leading-snug tracking-[-0.015em] text-primary md:text-[30px]">{n.nickname}.</p>
            </div>
            <p data-intro className="max-w-[600px] text-base leading-[1.65] text-muted md:text-lg">{n.intro}</p>
            <div data-intro className="flex flex-col gap-3 pt-1.5 sm:flex-row sm:gap-3.5">
              <ButtonLink href={site.bookingUrl}>Talk about {n.city}</ButtonLink>
              <ButtonLink href="/home-value" variant="outline" className="font-medium">
                What&apos;s my home worth?
              </ButtonLink>
            </div>
          </div>
          <div className="order-1 flex flex-col gap-4 lg:order-2">
            <Link href="/neighborhoods" className="text-sm font-medium text-primary lg:hidden">
              ← Neighborhoods
            </Link>
            <div data-hero-rise className="relative isolate aspect-[4/3] w-full overflow-hidden rounded-md bg-[linear-gradient(180deg,#2B69AE_0%,#6FA3D8_70%,#BFD9F0_100%)] lg:aspect-square lg:w-[560px] lg:rounded-lg">
              {n.image?.fit === "photo" ? (
                <Image
                  src={n.image.src}
                  alt={n.image.alt}
                  fill
                  preload
                  sizes="(min-width: 1024px) 560px, 100vw"
                  className="-z-10 object-cover"
                  style={{ objectPosition: n.image.position }}
                />
              ) : (
                <>
                  <Image src="/images/local/cloud.png" alt="" width={1600} height={1066} className="absolute -left-8 top-[11%] -z-10 w-[46%] opacity-85" />
                  {n.image ? (
                    <Image
                      src={n.image.src}
                      alt={n.image.alt}
                      width={n.image.width}
                      height={n.image.height}
                      preload
                      sizes="(min-width: 1024px) 470px, 75vw"
                      className="absolute bottom-[-6%] right-0 w-[72%] lg:w-[84%]"
                    />
                  ) : (
                    <div className="absolute inset-x-[8%] bottom-[8%] rounded-md bg-white/92 p-6">
                      <CityArt slug={n.slug} className="mx-auto h-auto w-full max-w-[360px]" />
                    </div>
                  )}
                </>
              )}
              {n.image && (
                <span className="absolute bottom-5 left-5 hidden items-center gap-2.5 rounded-full bg-white/92 px-4 py-2.5 text-sm font-medium sm:flex">
                  <span aria-hidden className="size-2 rounded-full bg-accent" />
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
        </Container>
      </section>

      <section aria-labelledby="love-title" className="bg-surface py-12 lg:py-28">
        <Container className="flex flex-col gap-8 lg:gap-12">
          <h2 data-reveal id="love-title" className="font-display text-[28px] font-medium leading-[1.2] tracking-[-0.03em] md:text-[40px] lg:text-h2">
            Why people <span className="text-muted">love it here</span>
          </h2>
          <ol data-reveal-stagger className="grid gap-2.5 md:grid-cols-3 md:gap-6">
            {n.why.map((reason, i) => (
              <li key={reason} className="flex gap-3.5 rounded-[14px] bg-white p-5 md:flex-col md:gap-5 md:rounded-md md:p-8">
                <span className="w-6 shrink-0 pt-0.5 text-[13px] font-semibold text-primary md:text-sm">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-medium leading-[1.5] md:text-xl md:leading-[1.5] md:tracking-[-0.01em]">{reason}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section aria-labelledby="areas-title" className="py-12 lg:py-28">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-20">
          <div className="flex flex-1 flex-col gap-6 lg:gap-8">
            <h2 data-reveal id="areas-title" className="font-display text-[28px] font-medium leading-[1.2] tracking-[-0.03em] md:text-[40px] lg:text-h2">
              Areas <span className="text-muted">I know well</span>
            </h2>
            <dl data-reveal-stagger className="border-t border-border">
              {n.areas.map((area) => (
                <div key={area.name} className="flex flex-col gap-1 border-b border-border py-4 md:flex-row md:gap-6 md:py-5">
                  <dt className="text-[17px] font-semibold md:w-[260px] md:shrink-0 md:text-xl md:tracking-[-0.01em]">{area.name}</dt>
                  <dd className="leading-[1.6] text-muted">{area.note}</dd>
                </div>
              ))}
            </dl>
          </div>
          <aside data-reveal aria-label="Good to know" className="flex flex-col gap-5 rounded-md bg-accent-soft p-6 lg:w-[420px] lg:shrink-0 lg:rounded-lg lg:p-9">
            <div className="flex items-center gap-3.5">
              <Image src="/images/billy/billy-headshot.png" alt="" width={96} height={96} className="size-12 rounded-full object-cover object-top" />
              <p className="text-sm font-semibold uppercase tracking-eyebrow">Good to know</p>
            </div>
            {n.goodToKnow.map((tip, i) => (
              <p key={tip} className={i > 0 ? "border-t border-foreground/12 pt-5 font-medium leading-[1.55] md:text-lg" : "font-medium leading-[1.55] md:text-lg"}>
                {tip}
              </p>
            ))}
          </aside>
        </Container>
      </section>

      <CtaBand
        title={{ lead: "Thinking about", accent: `${n.city}?` }}
        body="Tell me what matters to you — schools, commute, water, space — and I'll point you to the streets that fit."
      />
    </MotionScope>
  );
}
