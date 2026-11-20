"use client";

import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/*
 * Footer night scene: a striped lighthouse on the dune, its amber beam reaching left
 * across the sign-off line. Drawn in Paper ("Footer — Guiding light").
 *
 * The footer lives in the root layout, so it animates itself (MotionScope only covers
 * page content): the beam sweeps out once when the footer comes into view, then
 * breathes slowly; a few stars twinkle. Nothing moves for reduced-motion visitors.
 */

const STARS: Array<[number, number, number]> = [
  [97, 40, 1.5], [262, 92, 2], [471, 30, 1.5], [702, 70, 2], [843, 34, 1.5], [961, 120, 1.5],
  [1052, 46, 2], [1321, 40, 1.5], [1392, 230, 2], [1291, 290, 1.5], [1011, 260, 1.5],
  [761, 340, 1.5], [602, 380, 2], [881, 400, 1.5],
];

export function FooterScene({ className }: { className?: string }) {
  const svg = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const q = gsap.utils.selector(svg);
        // A plain trigger that plays a paused timeline (rather than `timeline({ scrollTrigger })`,
        // which defers its setup a tick and can leave a half-built trigger behind when the
        // layout's effects re-run, breaking the page's own triggers).
        const tl = gsap.timeline({ paused: true });
        ScrollTrigger.create({ trigger: svg.current, start: "top 85%", once: true, onEnter: () => tl.play() });
        tl.from(q("[data-beam='left']"), { scaleX: 0, transformOrigin: "100% 50%", duration: 1.8, ease: "power2.out" })
          .from(q("[data-beam='right']"), { scaleX: 0, transformOrigin: "0% 50%", duration: 1.2, ease: "power2.out" }, "<0.1")
          .from(q("[data-halo]"), { scale: 0.4, autoAlpha: 0, transformOrigin: "50% 50%", duration: 1.2, ease: "power2.out", stagger: 0.1 }, "<")
          .add(() => {
            gsap.to(q("[data-beam]"), { opacity: 0.7, duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
            gsap.to(q("[data-halo]"), { scale: 1.08, transformOrigin: "50% 50%", duration: 3.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
          });

        q("[data-star]").forEach((star, i) => {
          if (i % 3 === 0) return; // leave some stars steady
          gsap.to(star, {
            opacity: 0.25,
            duration: gsap.utils.random(1.6, 3.4),
            delay: gsap.utils.random(0, 3),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
          });
        });
      });
    },
    { scope: svg },
  );

  return (
    <svg ref={svg} aria-hidden viewBox="0 0 1440 440" fill="none" className={className}>
      <defs>
        <linearGradient id="footer-beam-left" x1="1180" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5B65D" stopOpacity="0.5" />
          <stop offset="0.3" stopColor="#F5B65D" stopOpacity="0.18" />
          <stop offset="0.65" stopColor="#F5B65D" stopOpacity="0.07" />
          <stop offset="1" stopColor="#F5B65D" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="footer-beam-right" x1="1196" y1="0" x2="1440" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F5B65D" stopOpacity="0.45" />
          <stop offset="1" stopColor="#F5B65D" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <path data-beam="left" d="M1178 124L-40 16V300L1178 138Z" fill="url(#footer-beam-left)" />
      <path data-beam="right" d="M1196 124L1480 70V190L1196 138Z" fill="url(#footer-beam-right)" />
      <circle data-halo cx="1187" cy="131" r="80" fill="#F5B65D" fillOpacity="0.08" />
      <circle data-halo cx="1187" cy="131" r="44" fill="#F5B65D" fillOpacity="0.2" />

      <g fill="#AFC3E0">
        {STARS.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} data-star cx={cx} cy={cy} r={r} />
        ))}
      </g>
      <path
        d="M920 186L922.5 193.5L930 196L922.5 198.5L920 206L917.5 198.5L910 196L917.5 193.5ZM1360 140L1362 146L1368 148L1362 150L1360 156L1358 150L1352 148L1358 146Z"
        fill="#DCE6F4"
      />

      {/* Dune (same color as the footer below, so it flows into it) */}
      <path d="M860 440C960 410 1060 396 1160 392C1260 388 1360 396 1440 410V440Z" fill="#0F1D33" />

      {/* Lighthouse + keeper's cottage */}
      <g transform="translate(323.2 -137.3) scale(0.72)">
        <path d="M1284 776V742H1346V776Z" fill="#1E3A63" />
        <path d="M1276 744L1315 714L1354 744ZM1334 726V712H1342V732Z" fill="#1E4E8C" />
        <path d="M1322 750H1336V764H1322Z" fill="#F5B65D" />
        <path d="M1294 776V754H1306V776Z" fill="#0F1D33" />
        <path d="M1154 774L1172 404H1208L1226 774Z" fill="#EEF2F8" />
        <path d="M1167.3 500H1212.7L1215.6 560H1164.4ZM1160 650H1220L1223 710H1157Z" fill="#1E4E8C" />
        <path d="M1190 404H1208L1226 774H1190Z" fill="#13253F" fillOpacity="0.14" />
        <path d="M1182 774V746a8 8 0 0 1 16 0V774ZM1186 596a4 4 0 0 1 8 0V612H1186ZM1186 446a4 4 0 0 1 8 0V460H1186Z" fill="#13253F" />
        <path d="M1176 350H1204V396H1176Z" fill="#F5B65D" />
        <path d="M1185.5 350V396M1194.5 350V396" stroke="#13253F" strokeWidth="1.5" />
        <path d="M1160 394H1220V404H1160ZM1170 350H1210L1190 322Z" fill="#1E4E8C" />
        <path d="M1162 394V382H1218V394M1176 382V394M1204 382V394M1190 322V310" stroke="#EEF2F8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <path
        d="M1000 414l-5-13M1000 414l1-15M1000 414l7-12M1100 400l-5-13M1100 400l1-15M1100 400l7-12M1350 398l-5-13M1350 398l1-15M1350 398l7-12M920 430l-5-13M920 430l1-15M920 430l7-12"
        stroke="#3B5A84"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Night water along the top of the footer's lower band, with the beam's reflection. */
export function FooterWater({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 440 900 80" fill="none" className={className}>
      <path
        d="M40 462q22-10 44 0t44 0t44 0M300 456q22-10 44 0t44 0t44 0t44 0M620 466q22-10 44 0t44 0t44 0M150 494q22-10 44 0t44 0t44 0t44 0M470 498q22-10 44 0t44 0t44 0M740 492q22-10 44 0t44 0"
        stroke="#22406B"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M520 470h34M586 482h22M438 476h18M700 478h26" stroke="#F5B65D" strokeOpacity="0.45" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
