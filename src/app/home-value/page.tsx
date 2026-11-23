import type { Metadata } from "next";
import Image from "next/image";
import { Reviews, Title, Wrap } from "@/components/HomeSections";
import { HomeValueForm } from "@/components/LeadForms";
import { MotionScope } from "@/components/Motion";
import { CheckIcon, Kicker } from "@/components/ui";
import { testimonials } from "@/content/testimonials";

export const metadata: Metadata = {
  title: "What's My Home Worth?",
  description:
    "Get a real home value from a local REALTOR® — not an online guess. Billy James looks at your home and recent Hampton Roads sales and gives you a number you can plan around.",
  alternates: { canonical: "/home-value" },
};

/* Layout matches "Home Value — Desktop (Redesign)" on the Paper page "Home Value & Contact · Redesign". */

const benefits = [
  "A realistic price range from recent nearby sales",
  "What buyers near you are looking for right now",
  "A plan for selling, on your own timeline",
];

const steps = [
  { title: "Tell me about your home", body: "Share the address and your timeline. Updates, quirks, wish lists — it all helps." },
  { title: "I take a look", body: "A quick, no-pressure walkthrough, plus a close look at recent sales on and around your street." },
  { title: "You get a real number", body: "A price range you can trust and a plan for what's next — whether that's listing now or next year." },
];

/** A seller's words beside the form: the opening line of David C.'s review (the Reviews section quotes a different line). */
const sellerQuote = {
  quote: "My family and I could not have sold my house without Billy's expertise.",
  source: testimonials.find((t) => t.name === "David C."),
};

export default function HomeValuePage() {
  return (
    <MotionScope>
      {/* ---------- Hero: the pitch beside the request form ---------- */}
      <section className="pb-20 pt-10 lg:pb-28 lg:pt-[88px]">
        {/* On phones the form follows the lead; on desktop it sits in the right column across both rows. */}
        <Wrap className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,520px)_minmax(0,520px)] lg:grid-rows-[auto_1fr] lg:justify-between lg:gap-x-12 lg:gap-y-7">
          <div className="flex flex-col gap-6 lg:gap-7 lg:pt-6">
            <Kicker intro>Home value</Kicker>
            <h1
              data-intro
              className="font-display text-[44px] font-normal leading-[1.1] tracking-[-0.035em] text-balance sm:text-[60px] lg:text-[76px] lg:leading-[84px]"
            >
              What&apos;s your home <em className="italic">worth?</em>
            </h1>
            <p data-intro className="max-w-[480px] text-[17px] leading-[1.65] text-muted sm:text-[19px] sm:leading-[31px]">
              Online estimates are a guess. I&apos;ll look at your home, pull real sales from your neighborhood, and give you a number you can
              actually plan around.
            </p>
          </div>

          <div data-hero-rise className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <HomeValueForm />
          </div>

          <div data-intro className="flex flex-col gap-7">
            <ul className="max-w-[480px] border-t border-hairline">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-center gap-4 border-b border-hairline py-4 text-[17px] leading-6">
                  <span aria-hidden className="flex size-7 shrink-0 items-center justify-center rounded-full bg-accent">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {benefit}
                </li>
              ))}
            </ul>
            {sellerQuote.source && (
              <figure className="flex max-w-[460px] flex-col gap-3.5 pt-5">
                <blockquote className="text-[19px] italic leading-[30px] tracking-[-0.01em] sm:text-[20px]">“{sellerQuote.quote}”</blockquote>
                <figcaption className="flex items-center gap-2.5 text-sm leading-5 text-muted">
                  <span aria-hidden className="h-px w-[18px] bg-foreground" />
                  {sellerQuote.source.name}, {sellerQuote.source.context.toLowerCase()} with Billy
                </figcaption>
              </figure>
            )}
          </div>
        </Wrap>
      </section>

      {/* ---------- How it works: Billy on a walkthrough beside the three steps ---------- */}
      <section aria-labelledby="how-title" className="pb-20 lg:pb-[120px]">
        <Wrap className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,480px)_minmax(0,560px)] lg:justify-between lg:gap-x-12">
          <div data-reveal className="relative isolate order-last flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[24px] bg-[#e7eef6] p-5 lg:order-none lg:aspect-auto lg:min-h-[640px]">
            <Image
              src="/images/billy/billy-front-yard.jpg"
              alt="Billy James smiling in the driveway of a two-story home"
              fill
              sizes="(min-width: 1024px) 570px, 120vw"
              className="-z-10 origin-[68%_22%] scale-[1.19] object-cover"
            />
            <span className="flex items-center gap-2.5 self-start rounded-full bg-white/94 px-4 py-2.5 text-sm leading-[18px]">
              <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
              The walkthrough
            </span>
          </div>

          <div className="flex flex-col justify-between gap-12 lg:pt-2">
            <div data-reveal-stagger className="flex flex-col items-start gap-5">
              <Kicker>How it works</Kicker>
              <Title id="how-title" title={{ lead: "Three steps,", em: "no pressure." }} />
              <p className="max-w-[500px] text-[17px] leading-7 text-muted">
                You&apos;ll hear from me personally — usually with a few quick questions before I come take a look.
              </p>
            </div>
            <ol data-reveal-stagger className="border-b border-hairline">
              {steps.map((step, i) => (
                <li key={step.title} className="flex items-start gap-5 border-t border-hairline py-7 sm:gap-6">
                  <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-mist text-base">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-2 pt-1.5">
                    <h3 className="text-[22px] leading-[30px] tracking-[-0.02em] sm:text-[24px] sm:leading-8">{step.title}</h3>
                    <p className="text-base leading-[26px] text-muted">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Wrap>
      </section>

      <div className="pb-14 lg:pb-20">
        <Reviews tight />
      </div>
    </MotionScope>
  );
}
