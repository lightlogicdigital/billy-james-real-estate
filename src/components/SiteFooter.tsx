import Image from "next/image";
import Link from "next/link";
import { neighborhoods } from "@/content/neighborhoods";
import { site } from "@/content/site";
import { CurrentYear } from "./CurrentYear";
import { FooterScene, FooterWater } from "./FooterScene";
import { Container } from "./ui";

/** Night sky with the lighthouse up top; links and fine print on the dark shore below. */
export function SiteFooter() {
  return (
    <footer className="bg-[#0F1D33] text-white">
      {/* ---------- Sky: sign-off in the lighthouse beam ---------- */}
      <div className="relative isolate overflow-hidden bg-foreground">
        <FooterScene className="absolute bottom-0 right-0 -z-10 h-[260px] w-auto max-w-none sm:h-[340px] lg:h-[440px]" />
        <Container className="flex flex-col gap-5 pb-[240px] pt-12 sm:pb-[300px] lg:gap-7 lg:pb-36 lg:pt-[132px] xl:pb-32">
          <Image src="/images/brand/logo-white.png" alt={site.name} width={1144} height={263} className="h-7 w-auto self-start lg:h-10" />
          <p className="font-display text-[28px] font-medium leading-[1.2] tracking-[-0.03em] text-balance sm:text-[36px] lg:text-[40px] xl:text-[48px] xl:leading-[56px]">
            Real estate help from a neighbor
            <br className="hidden lg:block" /> who knows <span className="text-accent">Hampton Roads.</span>
          </p>
        </Container>
      </div>

      {/* ---------- Shore: links ---------- */}
      <div className="relative overflow-hidden">
        <FooterWater className="absolute left-0 top-0 h-[48px] w-auto max-w-none lg:h-[80px]" />
        <Container className="grid grid-cols-2 gap-x-8 gap-y-10 pb-12 pt-16 sm:grid-cols-4 lg:flex lg:gap-24 lg:pb-14 lg:pt-24">
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
            <Link href={site.bookingUrl} className="text-[15px] font-medium text-accent hover:text-white">
              Book a Call →
            </Link>
          </FooterColumn>
          <FooterColumn title="Brokered by">
            <Image src="/images/partners/atlantic-connection-white.png" alt={site.brokerage} width={975} height={533} className="h-[52px] w-auto self-start" />
          </FooterColumn>
        </Container>
      </div>

      {/* ---------- Fine print ---------- */}
      <div className="border-t border-white/12">
        <Container className="flex flex-col gap-3 pb-28 pt-7 text-[13px] text-white/70 lg:flex-row lg:items-center lg:justify-between lg:pb-8">
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
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="text-[13px] font-medium uppercase tracking-eyebrow text-white/60">{title}</p>
      {children}
    </div>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-[15px] hover:text-accent">
      {children}
    </Link>
  );
}
