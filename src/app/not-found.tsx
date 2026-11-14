import { ButtonLink, Container, Eyebrow } from "@/components/ui";
import { site } from "@/content/site";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="py-24 lg:py-40">
      <Container className="flex max-w-[760px] flex-col items-start gap-6">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[56px]">
          This address <span className="text-muted">doesn&apos;t exist.</span>
        </h1>
        <p className="text-lg leading-[1.65] text-muted">
          The page you&apos;re looking for may have moved. Head home, browse homes I&apos;ve sold, or call or text me at{" "}
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
