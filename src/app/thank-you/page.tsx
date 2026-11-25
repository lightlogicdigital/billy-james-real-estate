import type { Metadata } from "next";
import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { site } from "@/content/site";

/**
 * The old Framer site sent visitors here after its contact form, and its sitemap listed
 * the page, so the URL may still be bookmarked or indexed. Today's forms thank people in
 * place; this keeps the old address from landing on a 404.
 */
export const metadata: Metadata = {
  title: "Thank you",
  robots: { index: false, follow: true },
};

export default function ThankYou() {
  return (
    <section className="py-24 lg:py-40">
      <Container className="flex max-w-[760px] flex-col items-start gap-6">
        <Eyebrow>Thank you</Eyebrow>
        <h1 className="font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[56px]">
          Thanks for reaching out. <span className="text-muted">I&apos;ll be in touch soon.</span>
        </h1>
        <p className="text-lg leading-[1.65] text-muted">
          Need me sooner? Call or text me at{" "}
          <a href={site.phoneHref} className="font-semibold text-primary">
            {site.phone}
          </a>
          .
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/">Back to home</ButtonLink>
          <ButtonLink href="/listings" variant="outline" className="font-medium">
            Properties sold
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
