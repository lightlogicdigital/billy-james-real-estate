import Image from "next/image";
import { faqs } from "@/content/faqs";
import { home } from "@/content/home";
import { site } from "@/content/site";
import { ButtonLink, Container, Eyebrow, Heading, PlusIcon, cn } from "./ui";

/** Accordion built on <details>, so it works without JavaScript. First item open. */
export function FaqSection({ tone = "white" }: { tone?: "white" | "sand" }) {
  const items = faqs.slice(0, 4);
  return (
    <section aria-labelledby="faq-title" className={cn("py-16 lg:py-32", tone === "sand" ? "bg-surface" : "bg-background")}>
      <Container className="flex flex-col gap-10 lg:flex-row lg:gap-24">
        <div data-reveal-stagger className="flex flex-col gap-5 lg:w-[440px] lg:shrink-0">
          <Eyebrow>{home.faq.eyebrow}</Eyebrow>
          <h2 id="faq-title" className="font-display text-[30px] font-medium leading-[1.2] tracking-[-0.03em] md:text-[40px] lg:text-h2">
            {home.faq.title.lead}
            <br />
            <span className="text-muted">{home.faq.title.muted}</span>
          </h2>
          <p className="text-lg leading-[1.65] text-muted">
            Don&apos;t see yours? Call or text me at{" "}
            <a href={site.phoneHref} className="font-semibold text-primary underline-offset-4 hover:underline">
              {site.phone}
            </a>{" "}
            — happy to help, even if you&apos;re a year away from moving.
          </p>
        </div>
        <div data-reveal-stagger className="flex-1 border-t border-border">
          {items.map((faq, i) => (
            <details key={faq.question} open={i === 0} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center gap-6 py-6 text-lg font-medium leading-snug md:py-7 md:text-xl [&::-webkit-details-marker]:hidden">
                <span className="flex-1">{faq.question}</span>
                <span
                  aria-hidden
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border transition-colors group-open:border-primary group-open:bg-primary group-open:text-white"
                >
                  <PlusIcon className="size-4 transition-transform group-open:rotate-45" />
                </span>
              </summary>
              <p className="max-w-[640px] pb-7 leading-[1.65] text-muted">{faq.answer}</p>
            </details>
          ))}
        </div>
      </Container>
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
