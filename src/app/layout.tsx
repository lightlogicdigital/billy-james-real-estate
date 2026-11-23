import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader, StickyCallBar } from "@/components/SiteHeader";
import { JsonLd, agentJsonLd } from "@/components/JsonLd";
import { ScrollToTop } from "@/components/ScrollToTop";
import { site } from "@/content/site";
import { INTRO_REVEAL_EVENT } from "@/lib/intro";
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

/**
 * Runs before first paint. When motion is allowed it adds `motion` (Motion.tsx), and on the
 * first homepage load of a browser session (not a link to a section) it also adds `intro`
 * for the porch-light intro (HomeIntro.tsx). A safety timer drops the intro if the page's
 * JavaScript never takes over.
 */
const headScript = `(function(){var d=document.documentElement;if(!(window.matchMedia&&matchMedia('(prefers-reduced-motion: no-preference)').matches))return;d.classList.add('motion');try{var b=${JSON.stringify(process.env.NEXT_PUBLIC_BASE_PATH ?? "")},p=location.pathname;if((p===b+'/'||p===b)&&!location.hash&&!sessionStorage.getItem('bj-intro')){sessionStorage.setItem('bj-intro','1');d.classList.add('intro');window.__bjIntroTimer=setTimeout(function(){d.classList.remove('intro');dispatchEvent(new Event(${JSON.stringify(INTRO_REVEAL_EVENT)}))},6000)}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // suppressHydrationWarning: the inline script below adds classes to <html> before React hydrates.
    // data-scroll-behavior: Next switches off the smooth scrolling in globals.css during page changes.
    <html lang="en" data-scroll-behavior="smooth" className={`${jakarta.variable} antialiased`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: headScript }} />
      </head>
      <body className="flex min-h-screen flex-col">
        <ScrollToTop />
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
