import Image from "next/image";
import { ListingCard, NeighborhoodCard, NeighborhoodRow, TestimonialCard } from "@/components/cards";
import { MotionScope } from "@/components/Motion";
import { NeptuneHero } from "@/components/NeptuneHero";
import { CtaBand, FaqSection, SectionHeader } from "@/components/sections";
import { ServicesList } from "@/components/ServicesList";
import { Container, Eyebrow, Heading, TextLink } from "@/components/ui";
import { about } from "@/content/about";
import { home } from "@/content/home";
import { listings } from "@/content/listings";
import { neighborhoods } from "@/content/neighborhoods";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { testimonials } from "@/content/testimonials";

export default function HomePage() {
  const [jacob, david, bob] = testimonials;
  return (
    <MotionScope>
      <NeptuneHero />

      {/* ---------- Trust strip ---------- */}
      <section aria-label="Track record" className="border-b border-border">
        <Container className="flex flex-col gap-6 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-14">
          <dl data-reveal-stagger className="flex justify-between gap-4 sm:justify-start sm:gap-12">
            {site.stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col-reverse gap-1 sm:border-l sm:border-border sm:pl-12 sm:first:border-0 sm:first:pl-0">
                <dt className="text-[13px] leading-snug text-muted md:text-base">{home.trust.statLabels[i]}</dt>
                <dd data-count className="whitespace-nowrap text-[28px] font-medium leading-none tracking-[-0.03em] text-primary md:text-5xl">
                  {stat.value === "20+ years" ? "20+ yrs" : stat.value}
                  {stat.value === "4.9" && (
                    <span aria-label="stars" className="ml-1 align-middle text-lg text-accent md:text-2xl">
                      ★
                    </span>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <div data-reveal className="flex items-center justify-between gap-6 border-t border-border pt-4 sm:justify-start sm:gap-8 lg:border-0 lg:pt-0">
            <p className="hidden text-sm font-medium uppercase tracking-eyebrow text-muted sm:block">{home.trust.featuredLabel}</p>
            {site.featuredOn.map((logo) => (
              <Image key={logo.name} src={logo.src} alt={logo.name} width={logo.width} height={logo.height} className="h-auto w-[92px] lg:w-[110px] last:w-[60px] lg:last:w-[72px]" />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Meet Billy ---------- */}
      <section aria-labelledby="meet-title" className="bg-surface py-14 lg:py-32">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-24">
          <div className="relative h-[380px] w-full max-w-[540px] shrink-0 sm:h-[560px] lg:h-[640px]">
            <Image
              src={about.photos.atHome.src}
              alt={about.photos.atHome.alt}
              width={about.photos.atHome.width}
              height={about.photos.atHome.height}
              sizes="(min-width: 1024px) 460px, 75vw"
              data-reveal
              className="h-[340px] w-[76%] rounded-md object-cover sm:h-[500px] lg:h-[580px] lg:w-[460px] lg:rounded-lg"
            />
            <figure data-polaroid className="absolute bottom-0 right-0 flex w-[140px] rotate-[4deg] flex-col gap-1.5 rounded-[6px] bg-white p-[7px] pb-2.5 shadow-[0_18px_40px_rgba(19,37,63,0.18)] sm:w-[210px] sm:gap-2.5 sm:p-2.5 sm:pb-3.5 lg:right-0">
              <Image src={about.photos.sign.src} alt={about.photos.sign.alt} width={720} height={960} sizes="210px" className="aspect-[190/220] w-full rounded-[3px] object-cover" />
              <figcaption className="text-center text-[11px] font-semibold sm:text-sm">{home.meet.snapshotCaption}</figcaption>
            </figure>
          </div>
          <div data-reveal-stagger className="flex flex-col gap-6 lg:max-w-[660px] lg:gap-7">
            <Eyebrow>{home.meet.eyebrow}</Eyebrow>
            <h2 id="meet-title" className="font-display text-[30px] font-medium leading-[1.2] tracking-[-0.03em] md:text-[40px] lg:text-h2">
              {home.meet.title.lead}
              <br className="hidden sm:block" /> <span className="text-primary">{home.meet.title.accent}</span> {home.meet.title.tail}
            </h2>
            <p className="text-base leading-[1.65] text-muted md:text-lg">{home.meet.body}</p>
            <ul className="border-t border-border">
              {home.meet.points.map((point) => (
                <li key={point} className="flex items-center gap-4 border-b border-border py-4 font-medium">
                  <span aria-hidden className="size-2 shrink-0 rounded-full bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="flex items-end justify-between gap-6 pt-2">
              <div className="flex flex-col gap-1.5">
                <Image src="/images/brand/signature.png" alt="Billy James signature" width={1092} height={381} className="h-[52px] w-auto lg:h-[77px]" />
                <span className="text-sm text-muted">{home.meet.signOff}</span>
              </div>
              <TextLink href={home.meet.link.href} className="pb-1">
                {home.meet.link.label}
              </TextLink>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- How I help ---------- */}
      <section aria-labelledby="services-title" className="py-14 lg:py-32">
        <Container className="flex flex-col gap-10 lg:gap-12">
          <div data-reveal-stagger className="flex flex-col gap-5">
            <Eyebrow>{home.services.eyebrow}</Eyebrow>
            <div id="services-title">
              <Heading parts={home.services.title} />
            </div>
            <p className="max-w-[560px] text-lg leading-[1.65] text-muted">{home.services.lead}</p>
          </div>
          <ServicesList services={services} badge={home.services.photoBadge} />
        </Container>
      </section>

      {/* ---------- Recently sold ---------- */}
      <section aria-labelledby="sold-title" className="bg-surface py-14 lg:py-32">
        <Container className="flex flex-col gap-10 lg:gap-14">
          <SectionHeader
            id="sold-title"
            eyebrow={home.sold.eyebrow}
            title={home.sold.title}
            aside={<TextLink href={home.sold.link.href}>{home.sold.link.label}</TextLink>}
          />
          <div data-reveal-stagger className="-mr-5 flex snap-x snap-mandatory gap-3.5 overflow-x-auto pb-2 pr-5 [scrollbar-width:none] sm:mr-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:pr-0 lg:grid-cols-3">
            {listings.slice(0, 3).map((listing, i) => (
              <ListingCard key={listing.slug} listing={listing} index={i} className="w-[290px] shrink-0 snap-start sm:w-auto" />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Neighborhoods ---------- */}
      <section aria-labelledby="hoods-title" className="py-14 lg:py-32">
        <Container className="flex flex-col gap-8 lg:gap-14">
          <SectionHeader id="hoods-title" eyebrow={home.neighborhoods.eyebrow} title={home.neighborhoods.title} aside={home.neighborhoods.lead} />
          <div data-reveal-stagger className="hidden gap-5 sm:grid sm:grid-cols-2 lg:grid-cols-4">
            {neighborhoods.map((n) => (
              <NeighborhoodCard key={n.slug} neighborhood={n} />
            ))}
          </div>
          <div data-reveal-stagger className="border-t border-border sm:hidden">
            {neighborhoods.map((n) => (
              <NeighborhoodRow key={n.slug} neighborhood={n} />
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Testimonials (verbatim excerpts) ---------- */}
      <section aria-labelledby="kind-words-title" className="bg-surface py-14 lg:py-32">
        <Container className="flex flex-col gap-10 lg:gap-14">
          <SectionHeader id="kind-words-title" eyebrow={home.testimonials.eyebrow} title={home.testimonials.title} />
          <div data-reveal-stagger className="flex flex-col gap-5 lg:flex-row">
            <div className="lg:flex-[1.5]">
              <TestimonialCard
                featured
                testimonial={bob}
                excerpt="When it came to selling our home, his sensitivity to our needs and his willingness to do what we needed to sell our house was second to none."
                highlight="second to none."
              />
            </div>
            <div className="flex flex-col gap-5 lg:flex-1">
              <TestimonialCard
                testimonial={jacob}
                excerpt="He keeps the home buying process enjoyable while also working hard and keeping your best interest in mind."
                highlight="enjoyable"
              />
              <TestimonialCard
                testimonial={david}
                excerpt="I have never experienced a real estate relationship like this in my YEARS of buying and selling properties."
                highlight="YEARS"
              />
            </div>
          </div>
        </Container>
      </section>

      <FaqSection />
      <CtaBand />
    </MotionScope>
  );
}
