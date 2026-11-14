import type { Metadata } from "next";
import Image from "next/image";
import { MotionScope } from "@/components/Motion";
import { CtaBand } from "@/components/sections";
import { ButtonLink, Container, Eyebrow, HeartIcon, ShieldIcon, TrendIcon } from "@/components/ui";
import { about } from "@/content/about";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About Billy",
  description:
    "Meet Billy James — a Hampton Roads native, military and first-responder veteran, and REALTOR® helping families buy and sell in Virginia Beach, Chesapeake, Norfolk, and Suffolk.",
  alternates: { canonical: "/about" },
};

const valueIcons = [ShieldIcon, TrendIcon, HeartIcon];

export default function AboutPage() {
  return (
    <MotionScope>
      <section className="py-12 lg:pb-28 lg:pt-24">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-end lg:gap-20">
          <div className="flex flex-1 flex-col gap-6 lg:gap-7 lg:pb-6">
            <Eyebrow intro>{about.hero.eyebrow} Billy</Eyebrow>
            <h1 data-split className="font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[56px] lg:text-hero">
              Rooted in
              <br />
              <span className="text-primary">Hampton Roads.</span>
            </h1>
            <p data-intro className="max-w-[640px] text-lg leading-[1.6] text-muted md:text-lead">
              Real estate isn&apos;t just paperwork — it&apos;s timing, leverage, and trust. As a Hampton Roads native, I bring local insight,
              steady guidance, and sharp negotiation to every family I help.
            </p>
            <div data-intro className="flex flex-col gap-4 pt-2 sm:flex-row sm:items-center sm:gap-6">
              <ButtonLink href={site.bookingUrl}>Book a Consultation</ButtonLink>
              <a href={site.phoneHref} className="font-medium text-primary hover:text-primary-hover">
                or call/text {site.phone}
              </a>
            </div>
          </div>
          <Image
            src={about.photos.headshot.src}
            alt={about.photos.headshot.alt}
            width={about.photos.headshot.width}
            height={about.photos.headshot.height}
            preload
            sizes="(min-width: 1024px) 480px, 90vw"
            data-hero-rise
            className="w-full max-w-[480px] self-center lg:self-end"
          />
        </Container>
      </section>

      <section aria-labelledby="why-title" className="bg-surface py-14 lg:py-32">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-24">
          <Image
            src={about.photos.sign.src}
            alt={about.photos.sign.alt}
            width={about.photos.sign.width}
            height={about.photos.sign.height}
            sizes="(min-width: 1024px) 480px, 90vw"
            data-reveal
            className="aspect-[4/5] w-full max-w-[480px] rounded-lg object-cover"
          />
          <div data-reveal-stagger className="flex flex-1 flex-col gap-6 lg:gap-7">
            <Eyebrow>{about.why.eyebrow}</Eyebrow>
            <h2 id="why-title" className="font-display text-[30px] font-medium leading-[1.2] tracking-[-0.03em] md:text-[40px] lg:text-h2">
              Simple. I want to <span className="text-primary">help you.</span>
            </h2>
            <p className="text-lg leading-[1.65] text-muted">
              I&apos;ve lived and worked in Hampton Roads for years. I&apos;ve watched neighborhoods grow, markets shift, and families build
              their futures here.
            </p>
            <p className="text-lg leading-[1.65] text-muted">
              Helping people make smart, confident decisions — whether it&apos;s a first home or selling a place they&apos;ve loved for
              decades — is something I take personally.
            </p>
            <Image src="/images/brand/signature.png" alt="Billy James signature" width={1092} height={381} className="h-[70px] w-auto self-start" />
          </div>
        </Container>
      </section>

      <section aria-labelledby="values-title" className="py-14 lg:py-32">
        <Container className="flex flex-col gap-10 lg:gap-14">
          <div data-reveal-stagger className="flex flex-col gap-5">
            <Eyebrow>What I bring</Eyebrow>
            <h2 id="values-title" className="font-display text-[30px] font-medium leading-[1.2] tracking-[-0.03em] md:text-[40px] lg:text-h2">
              What you can <span className="text-muted">count on</span>
            </h2>
          </div>
          <ul data-reveal-stagger className="grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-12 lg:pt-12">
            {about.values.map((value, i) => {
              const Icon = valueIcons[i];
              return (
                <li key={value.title} className="flex flex-col gap-4">
                  <span className="flex size-13 items-center justify-center rounded-full bg-accent-soft text-primary">
                    <Icon className="size-6" />
                  </span>
                  <h3 className="text-title font-semibold">{value.title}</h3>
                  <p className="leading-[1.65] text-muted">{value.body}</p>
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <CtaBand />
    </MotionScope>
  );
}
