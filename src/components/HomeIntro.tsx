"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef } from "react";
import { INTRO_REVEAL_EVENT } from "@/lib/intro";

declare global {
  interface Window {
    /** Safety timer from the <head> script: drops the intro if this component never runs. */
    __bjIntroTimer?: number;
  }
}

/** The logo's CSS entrance finishes about this long after navigation starts (ms). */
const MIN_SHOW = 1500;
/** Never hold the page longer than this waiting for the hero photo (ms after navigation start). */
const MAX_HOLD = 3200;
/** Keys that would scroll the page; they skip the intro instead. */
const SCROLL_KEYS = new Set([" ", "PageDown", "PageUp", "ArrowDown", "ArrowUp", "Home", "End"]);

/**
 * Homepage intro, "porch light": the Badge on a navy panel, its amber dot switching on
 * with a warm glow, the name rising in beside it. The panel then lifts away to reveal
 * the hero, whose own entrance (Motion.tsx) starts as it goes.
 *
 * It plays once per browser session, only when the homepage is the first page loaded,
 * and never for reduced motion. The <head> script in layout.tsx decides that and adds
 * `intro` to <html>; CSS in globals.css shows this panel and plays the logo entrance from
 * first paint, so it works as a real loading screen before JavaScript arrives. This
 * component only handles the exit: once the logo has played and the hero photo has
 * loaded (or MAX_HOLD passes), the panel lifts. Clicking, scrolling or pressing a key
 * lifts it right away.
 */
export function HomeIntro() {
  const panel = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const html = document.documentElement;
    const el = panel.current;
    if (!el || !html.classList.contains("intro")) return;
    window.clearTimeout(window.__bjIntroTimer);

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      window.dispatchEvent(new Event(INTRO_REVEAL_EVENT));
    };
    const finish = () => {
      html.classList.remove("intro");
      reveal();
      detach();
    };

    const lift = gsap
      .timeline({ paused: true, onComplete: finish })
      .to(el.querySelector("[data-intro-lockup]"), { y: -36, autoAlpha: 0, duration: 0.5, ease: "power2.in" }, 0)
      .call(reveal, [], 0.2)
      .to(el, { yPercent: -100, duration: 1, ease: "power4.inOut" }, 0.1)
      .to(el, { borderBottomLeftRadius: 40, borderBottomRightRadius: 40, duration: 0.6, ease: "power2.out" }, 0.1);

    let lifted = false;
    let cancelled = false;
    const go = () => {
      if (lifted || cancelled) return;
      lifted = true;
      window.clearTimeout(hardStop);
      lift.play();
    };

    // Lift once the logo has played and the hero photo is in — whichever comes later.
    const elapsed = performance.now();
    const img = document.querySelector<HTMLImageElement>("[data-hero] img");
    const photo =
      !img || (img.complete && img.naturalWidth > 0)
        ? Promise.resolve()
        : new Promise<void>((done) => {
            img.addEventListener("load", () => done(), { once: true });
            img.addEventListener("error", () => done(), { once: true });
          });
    const logo = new Promise((done) => window.setTimeout(done, Math.max(0, MIN_SHOW - elapsed)));
    Promise.all([photo, logo]).then(go);
    const hardStop = window.setTimeout(go, Math.max(0, MIN_SHOW - elapsed, MAX_HOLD - elapsed));

    // Any attempt to move on skips ahead (and doesn't scroll the page under the panel).
    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && !SCROLL_KEYS.has(e.key)) {
        go();
        return;
      }
      if (e.cancelable) e.preventDefault();
      go();
      lift.timeScale(1.6);
    };
    const opts = { passive: false } as const;
    window.addEventListener("wheel", skip, opts);
    window.addEventListener("touchmove", skip, opts);
    window.addEventListener("keydown", skip);
    el.addEventListener("click", skip);
    function detach() {
      window.removeEventListener("wheel", skip);
      window.removeEventListener("touchmove", skip);
      window.removeEventListener("keydown", skip);
      el?.removeEventListener("click", skip);
    }

    return () => {
      cancelled = true;
      window.clearTimeout(hardStop);
      detach();
      // React may run this effect twice in development without removing the panel. Only clean
      // up for real when the panel is gone or hidden (the visitor navigated away mid-intro).
      window.setTimeout(() => {
        if (html.classList.contains("intro") && !(el.isConnected && el.getClientRects().length)) finish();
      });
    };
  });

  return (
    <div ref={panel} data-home-intro aria-hidden className="fixed inset-0 z-[60] items-center justify-center overflow-hidden bg-foreground text-white">
      {/* Sized from one badge measurement (--b), with the Logo's proportions (Logo.tsx). */}
      <div data-intro-lockup className="flex items-center gap-[calc(var(--b)*0.25)] [--b:64px] sm:[--b:88px]">
        <span className="relative isolate">
          <span
            data-intro-glow
            className="absolute left-[66%] top-[66%] -z-10 -ml-[160px] -mt-[160px] size-[320px] rounded-full bg-[radial-gradient(circle,rgba(245,182,93,0.44)_0%,rgba(245,182,93,0.14)_36%,rgba(245,182,93,0)_68%)]"
          />
          <span data-intro-badge className="flex size-(--b) items-center justify-center rounded-[calc(var(--b)*0.23)] bg-white text-foreground">
            <span className="flex items-baseline gap-[calc(var(--b)*0.025)] pl-[calc(var(--b)*0.09)]">
              <span className="font-display text-[calc(var(--b)*0.63)] font-medium leading-none tracking-[-0.02em]">B</span>
              <span data-intro-dot className="size-[calc(var(--b)*0.11)] rounded-full bg-accent" />
            </span>
          </span>
        </span>
        <span className="flex flex-col gap-[calc(var(--b)*0.07)]">
          <span className="-mb-[0.14em] block overflow-hidden pb-[0.14em]">
            <span data-intro-word="1" className="block whitespace-nowrap font-display text-[calc(var(--b)*0.5)] font-medium leading-[1.05] tracking-[-0.025em]">
              Billy James
            </span>
          </span>
          <span className="block overflow-hidden">
            <span data-intro-word="2" className="block whitespace-nowrap text-[calc(var(--b)*0.15)] font-semibold uppercase leading-[1.2] tracking-[0.26em] text-white/72">
              Real Estate
            </span>
          </span>
        </span>
      </div>
    </div>
  );
}
