import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, StickyCallBar } from "@/components/SiteHeader";
import { JsonLd, agentJsonLd } from "@/components/JsonLd";
import { site } from "@/content/site";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  style: ["normal", "italic"], // italic carries the one emphasized word in homepage headlines
  display: "swap",
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Hampton Roads REALTOR®`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "en_US",
    images: [{ url: "/images/local/neighborhood-aerial.jpg", width: 2400, height: 1348, alt: "Aerial view of a Hampton Roads neighborhood" }],
  },
  twitter: { card: "summary_large_image" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#1E4E8C",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds the `motion` class before React hydrates.
    <html lang="en" className={`${jakarta.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(window.matchMedia&&matchMedia('(prefers-reduced-motion: no-preference)').matches){document.documentElement.classList.add('motion')}",
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        <JsonLd data={agentJsonLd()} />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <StickyCallBar />
      </body>
    </html>
  );
}
