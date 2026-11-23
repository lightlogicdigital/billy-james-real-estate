import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Wrap } from "@/components/HomeSections";
import { ContactForm } from "@/components/LeadForms";
import { MotionScope } from "@/components/Motion";
import { FaqSection } from "@/components/sections";
import { Kicker, PhoneIcon } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Billy",
  description: "Call or text Billy James at 757-477-4854, or send a note about buying or selling a home in Hampton Roads.",
  alternates: { canonical: "/contact" },
};

/* Layout matches "Contact — Desktop (Redesign)" on the Paper page "Home Value & Contact · Redesign". */

const serving = site.serviceAreas.join(", ").replace(/, ([^,]*)$/, " & $1");

export default function ContactPage() {
  const details = [
    { term: "Brokerage", detail: site.brokerage },
    { term: "Serving", detail: serving },
    ...(site.email
      ? [
          {
            term: "Email",
            detail: (
              <a href={`mailto:${site.email}`} className="underline decoration-quiet underline-offset-4 hover:decoration-foreground">
                {site.email}
              </a>
            ),
          },
        ]
      : []),
    {
      term: "Selling soon?",
      detail: (
        <Link href="/home-value" className="group inline-flex items-center gap-1.5 hover:underline hover:decoration-quiet hover:underline-offset-4">
          Get a real home value
          <span aria-hidden className="text-muted transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      ),
    },
  ];

  return (
    <MotionScope>
      {/* ---------- Hero: big hello, with the phone number right beside it ---------- */}
      <section>
        <Wrap>
          <div className="flex flex-col gap-8 border-b border-hairline pb-12 pt-10 lg:flex-row lg:items-end lg:justify-between lg:gap-10 lg:pb-16 lg:pt-24">
            <div className="flex flex-col gap-5 lg:gap-6">
              <Kicker intro>Contact</Kicker>
              <h1
                data-intro
                className="font-display text-[68px] font-normal leading-none tracking-[-0.045em] sm:text-[96px] lg:text-[120px] lg:leading-[120px]"
              >
                Let&apos;s <em className="italic">talk.</em>
              </h1>
            </div>
            <div data-intro className="flex flex-col gap-6 lg:w-[430px] lg:shrink-0 lg:pb-2">
              <p className="text-[17px] leading-[1.65] text-muted sm:text-[19px] sm:leading-[31px]">
                Buying, selling, or just have a question? Call, text, or send a note — whatever&apos;s easiest for you.
              </p>
              <a href={site.phoneHref} className="group flex items-center gap-3.5 self-start">
                <span aria-hidden className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent transition-colors group-hover:bg-[#efa743]">
                  <PhoneIcon className="size-5" />
                </span>
                <span className="flex flex-col gap-0.5">
                  <span className="text-[13px] leading-[18px] text-muted">Call or text Billy</span>
                  <span className="text-[24px] leading-[30px] tracking-[-0.02em] underline-offset-4 group-hover:underline group-hover:decoration-quiet">
                    {site.phone}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </Wrap>
      </section>

      {/* ---------- The note form, with Billy and the essentials beside it ---------- */}
      <section aria-label="Send Billy a note" className="pb-20 pt-12 lg:pb-[120px] lg:pt-16">
        <Wrap className="flex flex-col gap-14 lg:grid lg:grid-cols-[minmax(0,620px)_minmax(0,400px)] lg:items-start lg:justify-between lg:gap-x-12">
          <div data-hero-rise>
            <ContactForm />
          </div>
          <aside aria-label="About Billy" data-reveal className="flex flex-col gap-7">
            <div className="relative isolate flex h-[360px] flex-col justify-end overflow-hidden rounded-[24px] bg-[#e7eef6] p-5 sm:h-[420px]">
              <Image
                src="/images/billy/billy-at-home.jpg"
                alt="Billy James relaxing at home with his dog"
                fill
                preload
                sizes="(min-width: 1024px) 400px, 100vw"
                className="-z-10 object-cover object-[50%_30%]"
              />
              <span className="flex items-center gap-2.5 self-start rounded-full bg-white/94 px-4 py-2.5 text-sm leading-[18px]">
                <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
                Talk soon
              </span>
            </div>
            <dl className="border-t border-hairline">
              {details.map(({ term, detail }) => (
                <div key={term} className="flex flex-col gap-1.5 border-b border-hairline py-[18px]">
                  <dt className="text-xs font-medium uppercase leading-4 tracking-[0.14em] text-muted">{term}</dt>
                  <dd className="text-[17px] leading-6">{detail}</dd>
                </div>
              ))}
            </dl>
          </aside>
        </Wrap>
      </section>

      <FaqSection />
    </MotionScope>
  );
}
