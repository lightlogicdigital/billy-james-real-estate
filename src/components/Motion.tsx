"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useRef, type ReactNode } from "react";
import { INTRO_REVEAL_EVENT } from "@/lib/intro";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, DrawSVGPlugin);

/*
 * Site-wide motion, driven by data attributes so pages stay declarative:
 *
 *   data-split            Headline words rise out of a line mask on load.
 *   data-intro            Fades up on load, in DOM order (above-the-fold copy/buttons).
 *   data-hero-rise        Larger, slower rise on load (hero imagery, forms).
 *   data-reveal           Fades up once when scrolled into view.
 *   data-reveal-stagger   Same, for each direct child, staggered.
 *   data-count            Counts its first number up from zero when in view.
 *   data-draw             Line-art SVG draws its strokes in; the amber sun pops last.
 *   data-parallax-frame   Overflow-hidden frame whose [data-parallax-media] drifts on scroll.
 *   data-hero-media       Hero photo settles from a slight zoom on load.
 *   data-polaroid         Snapshot tilts into place.
 *
 * Tone: restrained. Short distances (≤ 28px), soft eases, everything plays once.
 * Nothing runs when the visitor prefers reduced motion.
 */
const EASE = "power3.out";
const REVEAL = { y: 28, duration: 0.9 };

/**
 * Wrap each page's content in this. It must live *inside* the page (not in a layout
 * or template) so it hydrates in the same pass as the elements it animates — GSAP
 * rewrites those elements (SplitText, inline styles), which would otherwise break
 * hydration. Each page mounts its own scope, so motion starts fresh on navigation,
 * and Next's back/forward <Activity> cache replays it when a page is shown again.
 */
export function MotionScope({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      document.documentElement.classList.add("motion-ready");
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        // On the homepage's first load the porch-light intro covers the page (HomeIntro.tsx).
        // Hold every entrance until its panel starts to lift, so the hero plays as it's revealed.
        if (!document.documentElement.classList.contains("intro")) return setup(root);
        let teardown: (() => void) | undefined;
        const start = () => {
          window.removeEventListener(INTRO_REVEAL_EVENT, start);
          window.clearTimeout(fallback);
          if (!teardown) context.add(() => void (teardown = setup(root)));
        };
        window.addEventListener(INTRO_REVEAL_EVENT, start);
        const fallback = window.setTimeout(start, 6500);
        return () => {
          window.removeEventListener(INTRO_REVEAL_EVENT, start);
          window.clearTimeout(fallback);
          teardown?.();
        };

        function setup(root: HTMLDivElement) {
          const all = <T extends Element = HTMLElement>(sel: string) => Array.from(root.querySelectorAll<T & Element>(sel)) as T[];
          const restoreText: Array<() => void> = [];

          /* ---------- On load ---------- */

          all("[data-split]").forEach((el) => {
            SplitText.create(el, {
              type: "lines,words",
              mask: "lines",
              autoSplit: true,
              onSplit(self) {
                gsap.set(el, { autoAlpha: 1 });
                // Line masks clip at the line box; give descenders (g, y) room without moving layout.
                gsap.set(self.masks, { paddingBottom: "0.14em", marginBottom: "-0.14em" });
                return gsap.from(self.words, { yPercent: 110, duration: 1.05, ease: "power4.out", stagger: 0.035 });
              },
            });
          });

          const intro = all("[data-intro]");
          if (intro.length) {
            gsap.fromTo(
              intro,
              { autoAlpha: 0, y: 20 },
              { autoAlpha: 1, y: 0, duration: 0.9, ease: EASE, stagger: 0.08, delay: 0.15, clearProps: "transform" },
            );
          }

          const rise = all("[data-hero-rise]");
          if (rise.length) {
            gsap.fromTo(rise, { autoAlpha: 0, y: 56 }, { autoAlpha: 1, y: 0, duration: 1.4, ease: "power3.out", stagger: 0.15, delay: 0.1 });
          }

          all("[data-hero-media]").forEach((el) => {
            gsap.fromTo(el, { scale: 1.06 }, { scale: 1, duration: 2.2, ease: "power2.out" });
          });

          /* ---------- Hero depth on scroll (homepage) ---------- */

          const hero = root.querySelector<HTMLElement>("[data-hero]");
          if (hero) {
            const st = { trigger: hero, start: "top top", end: "bottom top", scrub: 0.6 };
            const layers: Array<[string, gsap.TweenVars]> = [
              ["near", { yPercent: -12 }],
              ["far", { yPercent: -3 }],
              ["copy", { yPercent: 10, autoAlpha: 0.2 }],
            ];
            for (const [depth, vars] of layers) {
              const targets = hero.querySelectorAll(`[data-depth='${depth}']`);
              if (targets.length) gsap.to(targets, { ...vars, ease: "none", scrollTrigger: st });
            }
          }

          /* ---------- On scroll ---------- */

          // Elements with no box at this breakpoint (e.g. `hidden sm:grid`) get no trigger. A
          // zero-size `once` trigger fires and removes itself while later triggers are being
          // measured, which makes ScrollTrigger read past the end of its list and throw
          // (seen when a page loads already scrolled down). Show those elements as they are.
          const laidOut = (el: Element) => el.getClientRects().length > 0;

          all("[data-reveal]").forEach((el) => {
            if (!laidOut(el)) return void gsap.set(el, { autoAlpha: 1 });
            gsap.fromTo(
              el,
              { autoAlpha: 0, y: REVEAL.y },
              {
                autoAlpha: 1,
                y: 0,
                duration: REVEAL.duration,
                ease: EASE,
                clearProps: "transform",
                scrollTrigger: { trigger: el, start: "top 88%", once: true },
              },
            );
          });

          all("[data-reveal-stagger]").forEach((group) => {
            if (!laidOut(group)) return void gsap.set(group.children, { autoAlpha: 1 });
            gsap.fromTo(
              group.children,
              { autoAlpha: 0, y: REVEAL.y },
              {
                autoAlpha: 1,
                y: 0,
                duration: REVEAL.duration,
                ease: EASE,
                stagger: 0.09,
                clearProps: "transform",
                scrollTrigger: { trigger: group, start: "top 88%", once: true },
              },
            );
          });

          all("[data-polaroid]").forEach((el) => {
            if (!laidOut(el)) return;
            gsap.from(el, {
              rotation: 9,
              y: 40,
              autoAlpha: 0,
              duration: 1.1,
              ease: "back.out(1.4)",
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            });
          });

          all("[data-count]").forEach((el) => {
            if (!laidOut(el)) return;
            const node = Array.from(el.childNodes).find((n) => n.nodeType === Node.TEXT_NODE && /\d/.test(n.nodeValue ?? ""));
            const match = node?.nodeValue?.match(/^(\D*)(\d+(?:\.\d+)?)([\s\S]*)$/);
            if (!node || !match) return;
            const [, pre, num, post] = match;
            const original = node.nodeValue;
            const decimals = num.split(".")[1]?.length ?? 0;
            const counter = { v: 0 };
            const render = () => (node.nodeValue = `${pre}${counter.v.toFixed(decimals)}${post}`);
            render();
            restoreText.push(() => (node.nodeValue = original));
            gsap.to(counter, {
              v: parseFloat(num),
              duration: 1.6,
              ease: "power2.out",
              onUpdate: render,
              scrollTrigger: { trigger: el, start: "top 92%", once: true },
            });
          });

          all<SVGSVGElement>("[data-draw]").forEach((svg) => {
            if (!laidOut(svg)) return;
            // A plain trigger plays a paused timeline. `timeline({ scrollTrigger })` waits a tick
            // before measuring, and an unmeasured trigger hits the same failure described above.
            const tl = gsap.timeline({ paused: true });
            tl.from(svg.querySelectorAll("path"), { drawSVG: "0%", duration: 1.4, ease: "power2.inOut", stagger: 0.05 });
            tl.from(svg.querySelectorAll("circle"), { scale: 0, transformOrigin: "50% 50%", duration: 0.7, ease: "back.out(1.8)" }, "-=0.6");
            ScrollTrigger.create({ trigger: svg, start: "top 90%", once: true, onEnter: () => tl.play() });
          });

          all("[data-parallax-frame]").forEach((frame) => {
            if (!laidOut(frame)) return;
            const media = frame.querySelector("[data-parallax-media]");
            if (!media) return;
            gsap.fromTo(
              media,
              { yPercent: -5, scale: 1.1 },
              { yPercent: 5, scale: 1.1, ease: "none", scrollTrigger: { trigger: frame, start: "top bottom", end: "bottom top", scrub: true } },
            );
          });

          /* ---------- FAQ: ease answers open ---------- */

          const onToggle = (e: Event) => {
            const details = e.target as HTMLDetailsElement;
            if (details.tagName !== "DETAILS" || !details.open) return;
            const body = details.querySelector(":scope > :not(summary)");
            if (body) gsap.fromTo(body, { autoAlpha: 0, y: -8 }, { autoAlpha: 1, y: 0, duration: 0.45, ease: EASE, clearProps: "all" });
          };
          root.addEventListener("toggle", onToggle, true);

          // Images and fonts can shift layout after first paint; re-measure triggers.
          // Also re-measure once now: the site footer (in the layout) keeps its own trigger,
          // which must be recomputed for each page's height after client-side navigation.
          const refresh = () => ScrollTrigger.refresh();
          window.addEventListener("load", refresh);
          document.fonts?.ready.then(refresh);
          const raf = requestAnimationFrame(refresh);

          return () => {
            root.removeEventListener("toggle", onToggle, true);
            window.removeEventListener("load", refresh);
            cancelAnimationFrame(raf);
            restoreText.forEach((fn) => fn());
          };
        }
      });

      return () => mm.revert();
    },
    { scope },
  );

  return (
    <div ref={scope} className="contents">
      {children}
    </div>
  );
}
