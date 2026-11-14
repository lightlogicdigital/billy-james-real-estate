"use client";

import Image from "next/image";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRef, useState } from "react";
import type { Service } from "@/content/services";
import { ArrowIcon, cn } from "./ui";

const fallbackImage = { src: "/images/local/neighborhood-aerial.jpg", alt: "Aerial view of a tree-lined Hampton Roads neighborhood" };

/** Editorial list: one service open at a time, photo swaps to match. */
export function ServicesList({ services, badge }: { services: Service[]; badge: string }) {
  const [active, setActive] = useState(0);
  const image = services[active].image ?? fallbackImage;
  const photo = useRef<HTMLDivElement>(null);

  // Soft crossfade when the photo changes (skipped for reduced motion and on first render).
  const first = useRef(true);
  useGSAP(
    () => {
      if (first.current) {
        first.current = false;
        return;
      }
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo("img", { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 0.7, ease: "power2.out" });
      });
    },
    { dependencies: [active], scope: photo },
  );

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-stretch lg:gap-24">
      <ul data-reveal-stagger className="flex-1 border-t border-border">
        {services.map((s, i) => {
          const open = i === active;
          const panelId = `service-panel-${i}`;
          return (
            <li key={s.title} className="border-b border-border">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                className="flex w-full items-center gap-4 py-5 text-left md:gap-6 md:py-7"
              >
                <span className={cn("w-8 shrink-0 text-sm font-medium tabular-nums md:w-10", open ? "text-primary" : "text-muted")}>
                  {s.number}
                </span>
                <span
                  className={cn(
                    "flex-1 text-xl font-medium tracking-[-0.015em] transition-colors md:text-h3",
                    open ? "text-primary" : "text-foreground",
                  )}
                >
                  {s.title}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "flex size-11 shrink-0 items-center justify-center rounded-full transition-colors",
                    open ? "bg-accent text-foreground" : "border border-border",
                  )}
                >
                  <ArrowIcon className="size-4" />
                </span>
              </button>
              <div id={panelId} hidden={!open} className="pb-7 pl-12 pr-4 md:pl-16 md:pr-16">
                <p className="max-w-[520px] leading-[1.65] text-muted">{s.summary}</p>
                {s.href && (
                  <Link href={s.href} className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover">
                    Let&apos;s talk about it <ArrowIcon className="size-3.5" />
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <div ref={photo} data-reveal className="relative hidden aspect-[480/726] w-[480px] shrink-0 overflow-hidden rounded-lg lg:block">
        <Image key={image.src} src={image.src} alt={image.alt} fill sizes="480px" className="object-cover" />
        <span className="absolute bottom-5 left-5 flex items-center gap-2.5 rounded-full bg-white/92 px-4 py-2.5 text-sm font-medium">
          <span aria-hidden className="size-2 rounded-full bg-accent" />
          {badge}
        </span>
      </div>
    </div>
  );
}
