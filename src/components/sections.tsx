import Image from "next/image";
import { faqs } from "@/content/faqs";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { Wrap } from "./HomeSections";
import { ButtonLink, Container, Heading, Kicker } from "./ui";

/**
 * FAQ accordion (contact page), built on <details> so it works without JavaScript. First item open.
 * Skips the "what's my home worth" question, which the Home Value page answers in full.
 */
export function FaqSection() {
  const items = faqs.slice(1, 5);
  return (
    <section aria-labelledby="faq-title">
      <Wrap>
        <div className="flex flex-col gap-10 border-t border-hairline pb-20 pt-16 lg:grid lg:grid-cols-[minmax(0,400px)_minmax(0,620px)] lg:justify-between lg:gap-x-12 lg:pb-[120px] lg:pt-[104px]">
          <div data-reveal-stagger className="flex flex-col items-start gap-5">
            <Kicker>{home.faq.eyebrow}</Kicker>
            <h2 id="faq-title" className="font-display text-[34px] font-normal leading-[1.15] tracking-[-0.03em] sm:text-[40px] lg:text-[48px] lg:leading-[56px]">
              {home.faq.title.lead}
              <br />
              <em className="italic">{home.faq.title.muted}</em>
            </h2>
            <p className="text-[17px] leading-7 text-muted">
              Don&apos;t see yours? Call or text me at{" "}
              <a href={site.phoneHref} className="text-foreground underline decoration-quiet underline-offset-4 hover:decoration-foreground">
                {site.phone}
              </a>{" "}
              — happy to help, even if you are a year away from moving or selling.
            </p>
          </div>
          <div data-reveal-stagger className="border-b border-hairline">
            {items.map((faq, i) => (
              <details key={faq.question} open={i === 0} className="group border-t border-hairline">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[26px] text-[19px] leading-[28px] tracking-[-0.01em] sm:text-[21px] sm:leading-[30px] [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span
                    aria-hidden
                    className="flex size-9 shrink-0 items-center justify-center rounded-full bg-mist transition-colors group-open:bg-foreground group-open:text-white group-hover:bg-hairline group-open:group-hover:bg-foreground"
                  >
                    <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
                      <path d="M3 8h10" />
                      <path d="M8 3v10" className="origin-center transition-transform [transform-box:fill-box] group-open:scale-y-0" />
                    </svg>
                  </span>
                </summary>
                <p className="-mt-3.5 max-w-[540px] pb-[26px] text-base leading-[26px] text-muted">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </Wrap>
    </section>
  );
}

/** Closing call to action over the aerial neighborhood photo. */
export function CtaBand({
  title = home.cta.title,
  body = home.cta.body,
}: {
  title?: { lead: string; accent: string };
  body?: string;
}) {
  return (
    <section className="bg-background pb-16 lg:pb-24">
      <Container>
        <div data-parallax-frame className="relative isolate overflow-hidden rounded-lg bg-[#163B6B] px-6 py-12 md:px-12 lg:px-[72px] lg:py-0">
          <Image
            src="/images/local/neighborhood-aerial.jpg"
            alt=""
            width={2400}
            height={1348}
            sizes="(min-width: 1024px) 820px, 100vw"
            data-parallax-media
            className="absolute inset-y-0 right-0 -z-20 h-full w-full object-cover lg:w-[62%]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(22,59,107,0.92)_0%,rgba(26,68,121,0.8)_100%)] lg:bg-[linear-gradient(90deg,#163B6B_0%,#1A4479_42%,rgba(26,68,121,0.6)_66%,rgba(26,68,121,0.08)_100%)]"
          />
          <div data-reveal-stagger className="flex max-w-[620px] flex-col gap-6 lg:min-h-[420px] lg:justify-center">
            <Heading parts={title} accentColor="accent" className="text-white lg:text-[60px] lg:leading-[1.1]" />
            <p className="text-lg leading-[1.65] text-white/85">{body}</p>
            <div className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href={home.cta.button.href} variant="accent">
                {home.cta.button.label}
              </ButtonLink>
              <a href={site.phoneHref} className="font-medium text-white hover:text-accent">
                or call/text {site.phone}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
