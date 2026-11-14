import type { Metadata } from "next";
import { HomeValueForm } from "@/components/LeadForms";
import { MotionScope } from "@/components/Motion";
import { CheckIcon, Container, Eyebrow } from "@/components/ui";

export const metadata: Metadata = {
  title: "What's My Home Worth?",
  description:
    "Get a real home value from a local REALTOR® — not an online guess. Billy James looks at your home and recent Hampton Roads sales and gives you a number you can plan around.",
  alternates: { canonical: "/home-value" },
};

const benefits = [
  "A realistic price range based on recent nearby sales",
  "What buyers in your area are looking for right now",
  "A clear plan to sell on your timeline — if and when you're ready",
];

const steps = [
  { title: "Tell me about your home", body: "Share the address and your timeline. Updates, quirks, wish lists — it all helps." },
  { title: "I take a look", body: "A quick, no-pressure walkthrough, plus a close look at recent sales on and around your street." },
  { title: "You get a real number", body: "A price range you can trust and a plan for what's next — whether that's listing now or next year." },
];

export default function HomeValuePage() {
  return (
    <MotionScope>
      <section className="bg-surface py-12 lg:pb-28 lg:pt-22">
        <Container className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-20">
          <div className="flex flex-1 flex-col gap-6 lg:gap-7 lg:pt-6">
            <Eyebrow intro>Home value</Eyebrow>
            <h1 data-split className="font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[56px] lg:text-hero">
              What&apos;s your home <span className="text-primary">worth?</span>
            </h1>
            <p data-intro className="max-w-[560px] text-lg leading-[1.6] text-muted md:text-lead">
              Online estimates are a guess. I&apos;ll look at your home, pull real sales from your neighborhood, and give you a number you can
              actually plan around.
            </p>
            <ul data-intro className="flex flex-col gap-4 pt-2">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3.5 font-medium md:text-lg">
                  <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-accent">
                    <CheckIcon className="size-3.5" />
                  </span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div data-hero-rise className="lg:w-[520px] lg:shrink-0">
            <HomeValueForm />
          </div>
        </Container>
      </section>

      <section aria-labelledby="how-title" className="py-14 lg:py-28">
        <Container className="flex flex-col gap-10 lg:gap-12">
          <h2 data-reveal id="how-title" className="font-display text-[30px] font-medium leading-[1.2] tracking-[-0.03em] md:text-[40px] lg:text-h2">
            How it <span className="text-muted">works</span>
          </h2>
          <ol data-reveal-stagger className="grid gap-10 border-t border-border pt-10 md:grid-cols-3 md:gap-12">
            {steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3.5">
                <span className="text-[40px] font-medium leading-none tracking-[-0.03em] text-accent">{i + 1}</span>
                <h3 className="text-title font-semibold">{step.title}</h3>
                <p className="leading-[1.65] text-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>
    </MotionScope>
  );
}
