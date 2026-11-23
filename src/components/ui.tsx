import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

/** Full-width section with the site's 1440px content column and responsive gutters. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-content px-5 md:px-10 lg:px-16", className)}>{children}</div>;
}

export function Eyebrow({
  children,
  tone = "primary",
  intro = false,
  className,
}: {
  children: ReactNode;
  tone?: "primary" | "light";
  /** Fade in on page load (see Motion.tsx). */
  intro?: boolean;
  className?: string;
}) {
  return (
    <p
      data-intro={intro || undefined}
      className={cn(
        "flex items-center gap-3 text-[13px] font-medium uppercase tracking-eyebrow md:text-sm",
        tone === "light" ? "text-white" : "text-primary",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-7", tone === "light" ? "bg-white" : "bg-primary")} />
      {children}
    </p>
  );
}

/** Homepage section label: small caps with an amber dot (2026 redesign). */
export function Kicker({
  children,
  as: Tag = "p",
  tone = "ink",
  intro = false,
  className,
  id,
}: {
  children: ReactNode;
  as?: "p" | "h2";
  tone?: "ink" | "light";
  /** Fade in on page load (see Motion.tsx). */
  intro?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      data-intro={intro || undefined}
      className={cn(
        "flex items-center gap-2.5 text-xs font-medium uppercase tracking-eyebrow sm:text-[13px]",
        tone === "light" ? "text-white" : "text-foreground",
        className,
      )}
    >
      <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-accent" />
      {children}
    </Tag>
  );
}

type HeadingParts = { lead: string; accent?: string; muted?: string; tail?: string };

/**
 * Headline with one emphasized phrase. Emphasis is color only — same weight —
 * per the type system ("accent" = navy/amber, "muted" = slate two-tone).
 */
export function Heading({
  as: Tag = "h2",
  parts,
  size = "h2",
  accentColor = "primary",
  split = false,
  className,
}: {
  as?: "h1" | "h2" | "h3";
  /** Animate words in on load (see Motion.tsx). */
  split?: boolean;
  parts: HeadingParts;
  size?: "hero" | "h2" | "h3";
  accentColor?: "primary" | "accent";
  className?: string;
}) {
  const sizes = {
    hero: "text-[40px] leading-[1.1] tracking-[-0.035em] md:text-[56px] lg:text-hero",
    h2: "text-[30px] leading-[1.2] tracking-[-0.03em] md:text-[40px] lg:text-h2",
    h3: "text-2xl leading-tight tracking-[-0.02em] md:text-h3",
  } as const;
  return (
    <Tag data-split={split || undefined} className={cn("font-display font-medium text-balance", sizes[size], className)}>
      {parts.lead}
      {parts.accent && (
        <>
          {" "}
          <span className={accentColor === "accent" ? "text-accent" : "text-primary"}>{parts.accent}</span>
        </>
      )}
      {parts.muted && (
        <>
          {" "}
          <span className="text-muted">{parts.muted}</span>
        </>
      )}
      {parts.tail && <> {parts.tail}</>}
    </Tag>
  );
}

const buttonVariants = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  accent: "bg-accent text-foreground hover:bg-[#efa743]",
  outline: "border border-foreground text-foreground hover:bg-foreground hover:text-white",
  "outline-light": "border border-white/70 bg-white/10 text-white hover:bg-white/20",
  ink: "bg-foreground text-white hover:bg-[#0b1729]",
  white: "bg-white text-foreground hover:bg-mist",
  mist: "bg-mist text-foreground hover:bg-hairline",
} as const;

const buttonSizes = {
  md: "px-7 py-4 text-base font-semibold",
  /** Lighter pill used on the homepage. */
  pill: "px-[22px] py-3 text-[15px] font-normal",
} as const;

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonVariants; size?: keyof typeof buttonSizes }) {
  return (
    <Link
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full transition-colors",
        buttonSizes[size],
        buttonVariants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function TextLink({ className, children, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn("group inline-flex items-center gap-2 font-semibold text-primary hover:text-primary-hover", className)}
      {...props}
    >
      {children}
      <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}

/* ---------- Icons (inline SVG, 24px grid, stroke = currentColor) ---------- */

type IconProps = { className?: string };
const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.9, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export const ArrowIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);
export const ArrowUpRightIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);
export const PhoneIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
export const MenuIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke} strokeWidth={2}>
    <path d="M4 8h16M4 16h16" />
  </svg>
);
export const CloseIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke} strokeWidth={2}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);
export const CheckIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke} strokeWidth={3}>
    <path d="M5 12l5 5L19 7" />
  </svg>
);
export const PlusIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke} strokeWidth={2}>
    <path d="M12 5v14M5 12h14" />
  </svg>
);
export const ShieldIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);
export const TrendIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M4 17l4-4 3 3 7-7" />
    <path d="M14 9h4v4" />
  </svg>
);
export const HeartIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" aria-hidden className={className} {...stroke}>
    <path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z" />
  </svg>
);
