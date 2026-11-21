import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { neighborhoods } from "@/content/neighborhoods";
import { site } from "@/content/site";
import { CurrentYear } from "./CurrentYear";
import { FooterScene, FooterWater } from "./FooterScene";
import { ArrowIcon } from "./ui";

/** Same 1120px column as the homepage sections. */
function Wrap({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-[1200px] px-5 md:px-10 ${className ?? ""}`}>{children}</div>;
}

/**
 * Rounded night panel inset from the page edge: lighthouse sky with the sign-off,
 * links on the dark shore, fine print, then a giant wordmark cropped at the bottom.
 */
export function SiteFooter() {
  return (
    <footer className="px-2 pb-24 sm:px-2.5 lg:pb-2.5">
      <div className="overflow-hidden rounded-[24px] bg-[#0f1d33] text-white sm:rounded-[32px]">
        {/* ---------- Sky: sign-off in the lighthouse beam ---------- */}
        <div className="relative isolate overflow-hidden bg-foreground">
          <FooterScene className="absolute bottom-0 right-0 -z-10 h-[260px] w-auto max-w-none sm:h-[340px] lg:h-[440px]" />
          <Wrap className="flex flex-col gap-5 pb-[240px] pt-12 sm:pb-[300px] lg:gap-[26px] lg:pb-36 lg:pt-[120px]">
            <Image src="/images/brand/logo-white.png" alt={site.name} width={949} height={205} className="h-[22px] w-auto self-start lg:h-7" />
            <p className="font-display text-[28px] leading-[1.2] tracking-[-0.03em] text-balance sm:text-[36px] lg:text-[40px] xl:text-[48px] xl:leading-[56px]">
              Real estate help from a neighbor
              <br className="hidden lg:block" /> who knows <em className="italic text-accent">Hampton Roads.</em>
            </p>
          </Wrap>
        </div>

        {/* ---------- Shore: links ---------- */}
        <div className="relative overflow-hidden">
          <FooterWater className="absolute left-0 top-0 h-[48px] w-auto max-w-none lg:h-[80px]" />
          <Wrap className="grid grid-cols-2 gap-x-8 gap-y-10 pb-12 pt-16 sm:grid-cols-4 lg:flex lg:gap-24 lg:pt-24">
            <FooterColumn title="Explore">
              {site.nav
                .filter((n) => n.href !== "/neighborhoods")
                .map((n) => (
                  <FooterLink key={n.href} href={n.href}>
                    {n.label}
                  </FooterLink>
                ))}
            </FooterColumn>
            <FooterColumn title="Neighborhoods">
              {neighborhoods.map((n) => (
                <FooterLink key={n.slug} href={`/neighborhoods/${n.slug}`}>
                  {n.city}
                </FooterLink>
              ))}
            </FooterColumn>
            <FooterColumn title="Say hello">
              <a href={site.phoneHref} className="text-[15px] hover:text-accent">
                {site.phone}
              </a>
              <Link href={site.bookingUrl} className="group inline-flex items-center gap-1.5 text-[15px] text-accent hover:text-white">
                Book a Call
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </FooterColumn>
            <FooterColumn title="Brokered by">
              <Image src="/images/partners/atlantic-connection-white.png" alt={site.brokerage} width={975} height={533} className="h-[52px] w-auto self-start" />
            </FooterColumn>
          </Wrap>
        </div>

        {/* ---------- Fine print ---------- */}
        <div className="border-t border-white/12">
          <Wrap className="flex flex-col gap-3 py-6 text-[13px] text-white/70 lg:flex-row lg:items-center lg:justify-between">
            <p>
              © <CurrentYear /> {site.name} · Brokered by {site.brokerage} · Equal Housing Opportunity
            </p>
            <p>
              <Link href="/privacy-policy" className="hover:text-white">
                Privacy policy
              </Link>{" "}
              · Made with purpose by{" "}
              <a href={site.credit.href} className="hover:text-white">
                {site.credit.label}
              </a>
            </p>
          </Wrap>
        </div>

        {/* ---------- Giant wordmark, cropped at the panel's bottom edge ---------- */}
        <div aria-hidden className="overflow-hidden px-3 pt-2 text-center">
          <p className="translate-y-[5%] whitespace-nowrap font-display text-[clamp(56px,15.2vw,212px)] leading-[0.82] tracking-[-0.05em]">
            Billy James
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-[13px] font-medium uppercase tracking-eyebrow text-white/60">{title}</p>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} className="text-[15px] hover:text-accent">
      {children}
    </Link>
  );
}
