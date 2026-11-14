import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/LeadForms";
import { FaqSection } from "@/components/sections";
import { MotionScope } from "@/components/Motion";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact Billy",
  description: "Call or text Billy James at 757-477-4854, or send a note about buying or selling a home in Hampton Roads.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <MotionScope>
      <section className="py-10 lg:pb-28 lg:pt-22">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-24">
          <div className="flex flex-1 flex-col gap-6 lg:gap-8">
            <Eyebrow intro>Contact</Eyebrow>
            <h1 data-split className="font-display text-[44px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[56px] lg:text-hero">
              Let&apos;s <span className="text-primary">talk.</span>
            </h1>
            <p data-intro className="max-w-[520px] text-[17px] leading-[1.55] text-muted md:text-lead">
              Buying, selling, or just have a question? Call, text, or send a note — whatever&apos;s easiest for you.
            </p>
            <a data-intro href={site.phoneHref} className="flex max-w-[520px] items-center gap-4 rounded-md bg-surface p-3.5 transition-colors hover:bg-[#efe9e0] md:gap-5 md:rounded-lg md:p-5">
              <Image
                src="/images/billy/billy-at-home.jpg"
                alt=""
                width={192}
                height={192}
                className="size-16 shrink-0 rounded-xl object-cover object-[30%_30%] md:size-24 md:rounded-md"
              />
              <span className="flex flex-col gap-0.5">
                <span className="text-[13px] text-muted md:text-sm">Call or text Billy</span>
                <span className="text-[22px] font-medium tracking-[-0.02em] text-primary md:text-[28px]">{site.phone}</span>
              </span>
            </a>
            <dl data-intro className="max-w-[520px] border-t border-border">
              <div className="flex gap-6 border-b border-border py-4">
                <dt className="w-[140px] shrink-0 text-sm text-muted">Brokerage</dt>
                <dd className="font-medium">{site.brokerage}</dd>
              </div>
              <div className="flex gap-6 border-b border-border py-4">
                <dt className="w-[140px] shrink-0 text-sm text-muted">Serving</dt>
                <dd className="font-medium">{site.serviceAreas.join(", ")}</dd>
              </div>
              {site.email && (
                <div className="flex gap-6 border-b border-border py-4">
                  <dt className="w-[140px] shrink-0 text-sm text-muted">Email</dt>
                  <dd className="font-medium">
                    <a href={`mailto:${site.email}`} className="text-primary">
                      {site.email}
                    </a>
                  </dd>
                </div>
              )}
              {site.bookingUrl !== "/contact" && (
                <div className="flex gap-6 border-b border-border py-4">
                  <dt className="w-[140px] shrink-0 text-sm text-muted">Prefer to book?</dt>
                  <dd>
                    <Link href={site.bookingUrl} className="font-semibold text-primary">
                      Pick a time for a call →
                    </Link>
                  </dd>
                </div>
              )}
            </dl>
          </div>
          <div data-hero-rise className="lg:w-[600px] lg:shrink-0">
            <ContactForm />
          </div>
        </Container>
      </section>
      <FaqSection tone="sand" />
    </MotionScope>
  );
}
