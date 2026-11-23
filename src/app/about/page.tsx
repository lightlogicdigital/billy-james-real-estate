import type { Metadata } from "next";
import Image from "next/image";
import { LetsTalk, Reviews, Title, Wrap } from "@/components/HomeSections";
import { MotionScope } from "@/components/Motion";
import { ButtonLink, HeartIcon, Kicker, ShieldIcon, TrendIcon } from "@/components/ui";
import { about } from "@/content/about";
import { home } from "@/content/home";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Billy",
  description:
    "Meet Billy James — a Hampton Roads native, military and first-responder veteran, and REALTOR® helping families buy and sell in Virginia Beach, Chesapeake, Norfolk, and Suffolk.",
  alternates: { canonical: "/about" },
};

/* Layout matches the "About · Redesign" page in Paper. */

const valueIcons = [ShieldIcon, TrendIcon, HeartIcon];

/** The homepage hero stats plus the veteran note from Billy's values. */
const stats = [...home.hero.stats, { value: "Veteran", label: "Military & first responder" }];

/** Billy's face, cropped into a pill that sits inside the headline. */
function PhotoPill({ className }: { className?: string }) {
  return (
    <span aria-hidden className={`relative h-[44px] w-[92px] shrink-0 overflow-hidden rounded-full bg-[#e7eef6] sm:h-16 sm:w-[134px] lg:h-20 lg:w-[168px] ${className ?? ""}`}>
      <Image
        src={about.photos.headshot.src}
        alt=""
        width={about.photos.headshot.width}
        height={about.photos.headshot.height}
        preload
        sizes="320px"
        className="absolute left-1/2 top-[-48%] w-[190%] max-w-none -translate-x-1/2"
      />
    </span>
  );
}

const photoDuo = [
  { photo: about.photos.sign, caption: "On the job", position: "50% 40%" },
  { photo: about.photos.atHome, caption: "At home", position: "50% 30%" },
];

export default function AboutPage() {
  return (
    <MotionScope>
      {/* ---------- Hero: centered, with Billy in the headline ---------- */}
      <section className="pb-12 pt-10 lg:pb-[72px] lg:pt-24">
        <Wrap className="flex flex-col items-center gap-7 text-center">
          <Kicker intro>About Billy</Kicker>
          <h1
            data-intro
            className="flex flex-col items-center gap-1 font-display text-[40px] font-normal leading-[1.15] tracking-[-0.035em] sm:text-[64px] lg:text-[84px] lg:leading-[92px]"
          >
            <span className="flex items-center gap-3">
              Rooted in
              <PhotoPill className="inline-block sm:hidden" />
            </span>
            <span className="flex items-center gap-[22px]">
              <PhotoPill className="hidden sm:inline-block" />
              <span>
                Hampton <em className="italic">Roads.</em>
              </span>
            </span>
          </h1>
          <p data-intro className="max-w-[640px] pt-1 text-[17px] leading-[1.65] text-muted sm:text-[19px] sm:leading-[31px]">
            {about.hero.lead}
          </p>
          <div data-intro className="flex flex-col gap-2.5 pt-1 sm:flex-row">
            <ButtonLink href={site.bookingUrl} variant="ink" size="pill">
              Book a Consultation
            </ButtonLink>
            <ButtonLink href={site.phoneHref} variant="mist" size="pill">
              Call or text {site.phone}
            </ButtonLink>
          </div>
        </Wrap>
      </section>

      {/* ---------- On the job / At home ---------- */}
      <section aria-label="Photos of Billy">
        <Wrap>
          <ul data-reveal-stagger className="grid gap-4 sm:grid-cols-2">
            {photoDuo.map(({ photo, caption, position }) => (
              <li key={caption} className="relative isolate flex h-[420px] flex-col justify-end overflow-hidden rounded-[24px] bg-[#e7eef6] p-5 sm:h-[480px] lg:h-[600px]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(min-width: 1200px) 552px, (min-width: 640px) 50vw, 100vw"
                  className="-z-10 object-cover"
                  style={{ objectPosition: position }}
                />
                <span className="flex items-center gap-2.5 self-start rounded-full bg-white/94 px-4 py-2.5 text-sm leading-[18px]">
                  <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
                  {caption}
                </span>
              </li>
            ))}
          </ul>
        </Wrap>
      </section>

      {/* ---------- Stats ---------- */}
      <section aria-label="Billy at a glance" className="pt-8">
        <Wrap>
          <dl data-reveal-stagger className="grid grid-cols-2 gap-x-6 gap-y-7 border-b border-hairline pb-[30px] pt-7 lg:flex lg:justify-between">
            {stats.map((stat) => {
              const star = stat.value.endsWith("★");
              const numeric = /\d/.test(stat.value);
              return (
                <div key={stat.label} className="flex flex-col-reverse gap-1.5 lg:w-[250px]">
                  <dt className="text-[15px] leading-[22px] text-muted">{stat.label}</dt>
                  <dd className="whitespace-nowrap text-[32px] leading-none tracking-[-0.03em] sm:text-[44px] sm:leading-[48px]">
                    <span data-count={numeric || undefined}>{star ? stat.value.slice(0, -1) : stat.value}</span>
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
        </Wrap>
      </section>

      {/* ---------- A letter from Billy ---------- */}
      <section aria-labelledby="why-title" className="py-16 lg:py-28">
        <Wrap>
          <div data-reveal className="flex justify-center rounded-[28px] bg-mist px-6 py-12 sm:px-12 sm:py-16 lg:px-0 lg:pb-20 lg:pt-[88px]">
            <div className="flex w-full max-w-[640px] flex-col gap-7">
              <div className="flex flex-col gap-5 pb-2">
                <Kicker>{about.why.eyebrow}</Kicker>
                <Title id="why-title" title={{ lead: "Simple. I want to", em: "help you." }} />
              </div>
              <div className="flex flex-col gap-5 text-[17px] leading-[1.7] lg:text-lg lg:leading-[30px]">
                {[...about.why.paragraphs, about.meet.body].map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <div className="mt-1 flex items-center justify-between gap-6 border-t border-hairline pt-4">
                <div className="flex flex-col gap-1.5">
                  <Image src="/images/brand/signature.png" alt="Billy James signature" width={1092} height={381} className="h-[70px] w-auto self-start" />
                  <p className="text-sm leading-5 text-muted">
                    Billy James · REALTOR®, {site.brokerage}
                  </p>
                </div>
                <Image
                  src={about.photos.headshot.src}
                  alt=""
                  width={128}
                  height={128}
                  className="size-16 shrink-0 rounded-full bg-[#e7eef6] object-cover object-[50%_15%]"
                />
              </div>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------- Values as editorial rows ---------- */}
      <section aria-labelledby="values-title" className="pb-16 lg:pb-28">
        <Wrap className="flex flex-col gap-10">
          <div data-reveal className="flex flex-col gap-5">
            <Kicker>What I bring</Kicker>
            <Title id="values-title" title={{ lead: "What you can", em: "count on" }} />
          </div>
          <ul data-reveal-stagger className="border-b border-hairline">
            {about.values.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <li key={value.title} className="flex flex-col gap-4 border-t border-hairline py-8 lg:flex-row lg:items-start lg:justify-between lg:gap-10 lg:py-9">
                  <div className="flex items-start gap-5 lg:w-[560px] lg:shrink-0 lg:gap-6">
                    <span aria-hidden className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-foreground">
                      <Icon className="size-[22px]" />
                    </span>
                    <h3 className="pt-1.5 text-[24px] leading-[1.3] tracking-[-0.02em] lg:pt-1 lg:text-[30px] lg:leading-[38px]">{value.title}</h3>
                  </div>
                  <p className="pl-[68px] text-[17px] leading-7 text-muted lg:w-[440px] lg:shrink-0 lg:pl-0 lg:pt-2">{value.body}</p>
                </li>
              );
            })}
          </ul>
        </Wrap>
      </section>

      <Reviews tight />

      <div className="pb-16 pt-8 lg:pb-28 lg:pt-[72px]">
        <LetsTalk />
      </div>
    </MotionScope>
  );
}
