import Image from "next/image";
import Link from "next/link";
import { neighborhoods } from "@/content/neighborhoods";
import { site } from "@/content/site";
import { CurrentYear } from "./CurrentYear";
import { Container } from "./ui";

export function SiteFooter() {
  return (
    <footer className="bg-foreground pb-28 pt-12 text-white lg:pb-10 lg:pt-20">
      <Container className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex max-w-[380px] flex-col gap-5">
            <Image src="/images/brand/logo-white.png" alt={site.name} width={1144} height={263} className="h-8 w-auto self-start lg:h-10" />
            <p className="text-lg leading-[1.55] lg:text-xl">{site.tagline}</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:flex lg:gap-20">
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
              <FooterLink href={site.bookingUrl}>Book a Call</FooterLink>
              <Image
                src="/images/partners/atlantic-connection-white.png"
                alt={site.brokerage}
                width={975}
                height={533}
                className="mt-1.5 h-[52px] w-auto self-start"
              />
            </FooterColumn>
          </div>
        </div>
        <div className="flex flex-col gap-3 border-t border-white/15 pt-7 text-[13px] text-white/70 lg:flex-row lg:items-center lg:justify-between">
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
        </div>
      </Container>
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
