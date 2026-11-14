"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { CloseIcon, MenuIcon, PhoneIcon, cn } from "./ui";

/**
 * On the homepage the header floats over the sky hero (white text).
 * Everywhere else it sits on white with a hairline border.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const overlay = pathname === "/";
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);

  // Menu links settle in one after another.
  useGSAP(
    () => {
      if (!open) return;
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(menu.current, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "power1.out" });
        gsap.fromTo("[data-menu-item]", { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: 0.55, ease: "power3.out", stagger: 0.05, delay: 0.08 });
      });
    },
    { dependencies: [open], scope: menu },
  );

  // (Every link inside the menu closes it on click, so no route-change effect is needed.)

  // Lock scroll + close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "z-30 w-full",
        overlay ? "absolute inset-x-0 top-0 text-white" : "relative border-b border-border bg-background text-foreground",
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-background focus:px-4 focus:py-2 focus:text-foreground"
      >
        Skip to content
      </a>
      <div className="mx-auto flex max-w-content items-center justify-between gap-6 px-5 py-4 md:px-10 lg:px-16 lg:py-6">
        <Link href="/" aria-label={`${site.name} — home`} className="shrink-0">
          <Image
            src={overlay ? "/images/brand/logo-white.png" : "/images/brand/logo-dark.png"}
            alt={site.name}
            width={1144}
            height={263}
            loading="eager"
            className="h-7 w-auto lg:h-[34px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-9">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "text-[15px] font-medium transition-colors",
                    overlay ? "hover:text-accent" : "hover:text-primary",
                    !overlay && isActive(item.href) && "text-primary",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={site.phoneHref}
            className={cn("text-[15px] font-medium", overlay ? "text-white hover:text-accent" : "text-primary hover:text-primary-hover")}
          >
            {site.phone}
          </a>
          <Link
            href={site.bookingUrl}
            className="rounded-full bg-accent px-5 py-3 text-[15px] font-semibold text-foreground transition-colors hover:bg-[#efa743]"
          >
            Book a Call
          </Link>
        </div>

        <button
          ref={menuButton}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className={cn(
            "flex size-11 items-center justify-center rounded-full lg:hidden",
            overlay ? "bg-white/15 text-white" : "bg-surface text-foreground",
          )}
        >
          <MenuIcon className="size-5" />
          <span className="sr-only">Open menu</span>
        </button>
      </div>

      {open && (
        <div
          ref={menu}
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-50 flex flex-col bg-foreground px-5 pb-8 pt-4 text-white lg:hidden"
        >
          <div className="flex items-center justify-between">
            <Image src="/images/brand/logo-white.png" alt={site.name} width={1144} height={263} className="h-7 w-auto" />
            <button
              type="button"
              autoFocus
              onClick={() => {
                setOpen(false);
                menuButton.current?.focus();
              }}
              className="flex size-11 items-center justify-center rounded-full bg-white/10"
            >
              <CloseIcon className="size-5" />
              <span className="sr-only">Close menu</span>
            </button>
          </div>
          <nav aria-label="Mobile" className="mt-10">
            <ul className="flex flex-col">
              {[{ label: "Home", href: "/" }, ...site.nav].map((item) => (
                <li key={item.href} data-menu-item className="border-b border-white/12">
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-4 text-[28px] font-medium tracking-[-0.025em]",
                      item.href === "/home-value" && "text-accent",
                    )}
                  >
                    {item.label}
                    <span aria-hidden className="text-xl text-white/50">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div data-menu-item className="mt-auto flex flex-col gap-4">
            <a href={site.phoneHref} className="flex items-center gap-3.5">
              <Image
                src="/images/billy/billy-headshot.png"
                alt=""
                width={104}
                height={104}
                className="size-13 rounded-full object-cover object-top"
              />
              <span className="flex flex-col">
                <span className="text-[13px] text-white/70">Call or text Billy</span>
                <span className="text-[22px] font-medium tracking-[-0.02em]">{site.phone}</span>
              </span>
            </a>
            <Link
              href={site.bookingUrl}
              onClick={() => setOpen(false)}
              className="flex justify-center rounded-full bg-accent px-6 py-4 font-semibold text-foreground"
            >
              Book a Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

/** Mobile-only floating bar so Billy is always one tap away. */
export function StickyCallBar() {
  return (
    <aside
      aria-label="Quick contact"
      className="fixed inset-x-3 bottom-4 z-20 flex gap-2 rounded-full bg-white p-2 shadow-[0_12px_32px_rgba(19,37,63,0.22)] lg:hidden"
    >
      <a
        href={site.phoneHref}
        className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border py-3 text-[15px] font-semibold text-primary"
      >
        <PhoneIcon className="size-4" />
        Call / text
      </a>
      <Link
        href={site.bookingUrl}
        className="flex flex-1 items-center justify-center rounded-full bg-accent py-3 text-[15px] font-semibold text-foreground"
      >
        Book a call
      </Link>
    </aside>
  );
}
