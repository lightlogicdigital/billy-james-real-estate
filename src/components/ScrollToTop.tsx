"use client";

import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Every link to another page lands at the very top of that page.
 *
 * Next.js only scrolls on navigation when the new page is fully out of view, so a
 * click from far down a long page (a footer link, say) used to leave the visitor
 * partway down the next one. Back/forward keep the browser's own scroll restoration,
 * and links with a #hash still jump to their target.
 */
export function ScrollToTop() {
  const pathname = usePathname();
  const firstRender = useRef(true);
  // Set when the browser's back/forward button moves to a page, so we leave that scroll alone.
  const poppedTo = useRef<string | null>(null);

  useEffect(() => {
    const onPopState = () => {
      poppedTo.current = window.location.pathname;
    };
    // A click on a link to the page you're already on doesn't change the path, so scroll here.
    const onClick = (e: MouseEvent) => {
      poppedTo.current = null;
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash) return;
      if (url.pathname === window.location.pathname && url.search === window.location.search) {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    };
    window.addEventListener("popstate", onPopState);
    window.addEventListener("click", onClick, true);
    return () => {
      window.removeEventListener("popstate", onPopState);
      window.removeEventListener("click", onClick, true);
    };
  }, []);

  // Layout effect: runs in the same commit as the new page, before it paints.
  useLayoutEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (poppedTo.current === window.location.pathname) {
      poppedTo.current = null;
      return;
    }
    if (window.location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
