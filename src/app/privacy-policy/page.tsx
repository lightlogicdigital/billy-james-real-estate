import type { Metadata } from "next";
import { MotionScope } from "@/components/Motion";
import { Container, Eyebrow } from "@/components/ui";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Billy James Real Estate collects, uses, and protects your information.",
  alternates: { canonical: "/privacy-policy" },
};

// Policy text carried over verbatim from the current site (last updated February 2026).
const sections: { heading: string; body?: string[]; list?: string[]; after?: string[] }[] = [
  {
    heading: "Information we collect",
    body: ["When you contact us, schedule a consultation, or use features on this website, we may collect personal information including:"],
    list: ["Name", "Email address", "Phone number", "Property preferences", "Any additional information you voluntarily provide"],
    after: ["We may also collect limited non-personal information such as browser type, device information, and site usage data to improve website performance."],
  },
  {
    heading: "How we use your information",
    body: ["We use the information collected to:"],
    list: ["Respond to inquiries", "Schedule consultations", "Provide real estate services", "Share relevant listings or market updates", "Improve our website and client experience"],
    after: ["We do not sell, rent, or trade your personal information to third parties for marketing purposes."],
  },
  {
    heading: "Information sharing",
    body: ["Your information may be shared only when necessary to:"],
    list: [
      "Facilitate a real estate transaction",
      "Work with trusted service providers (e.g., title companies, lenders, inspectors)",
      "Comply with legal obligations or lawful requests",
    ],
    after: ["All third parties are expected to maintain appropriate confidentiality and data protection standards."],
  },
  {
    heading: "Data security",
    body: [
      "We implement reasonable security measures designed to protect your personal information from unauthorized access, misuse, or disclosure. While no online transmission is completely secure, we take appropriate steps to safeguard the data we collect.",
    ],
  },
  {
    heading: "Your rights",
    body: ["You may request to:"],
    list: [
      "Access the personal information we have about you",
      "Update or correct your information",
      "Request deletion of your personal data",
      "Opt out of marketing communications at any time",
    ],
    after: ["To make a request, please contact us using the information below."],
  },
  {
    heading: "Cookies & tracking",
    body: [
      "This website may use cookies or similar technologies to enhance your browsing experience and gather website analytics. You can adjust your browser settings to decline cookies if preferred.",
    ],
  },
  {
    heading: "Third-party links",
    body: ["This website may contain links to third-party websites. We are not responsible for the privacy practices or content of external sites."],
  },
  {
    heading: "Updates to this policy",
    body: ["We may update this Privacy Policy periodically. Any changes will be posted on this page with the updated effective date."],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <MotionScope>
    <section className="py-12 lg:py-24">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-5">
          <Eyebrow intro>Last updated: February 2026</Eyebrow>
          <h1 data-split className="font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] md:text-[56px]">Privacy policy</h1>
        </div>
        <div className="flex max-w-[720px] flex-col gap-10 text-lg leading-[1.7] text-muted">
          <p>
            Billy James Real Estate (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your
            personal information. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website or
            communicate with us.
          </p>
          {sections.map((s) => (
            <div key={s.heading} className="flex flex-col gap-3">
              <h2 className="text-title font-semibold text-foreground">{s.heading}</h2>
              {s.body?.map((p) => <p key={p}>{p}</p>)}
              {s.list && (
                <ul className="flex list-disc flex-col gap-1.5 pl-6 marker:text-accent">
                  {s.list.map((li) => (
                    <li key={li}>{li}</li>
                  ))}
                </ul>
              )}
              {s.after?.map((p) => <p key={p}>{p}</p>)}
            </div>
          ))}
          <div className="flex flex-col gap-3">
            <h2 className="text-title font-semibold text-foreground">Contact information</h2>
            <p>If you have questions about this Privacy Policy or how your information is handled, please contact:</p>
            <p className="text-foreground">
              {site.name}
              <br />
              <a href={site.phoneHref} className="font-medium text-primary">
                {site.phone}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
    </MotionScope>
  );
}
