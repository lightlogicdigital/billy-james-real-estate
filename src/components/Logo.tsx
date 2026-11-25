import { cn } from "./ui";

/**
 * Billy James logo — "The Badge" system (Paper: Logo · Explorations → "Concept A — Refined system").
 * Everything is sized from the badge: corner radius 23%, the B 63% (Plus Jakarta Sans 500),
 * the amber porch light 11% sitting on the B's baseline, the wordmark half the badge, the gap a quarter.
 * Rendered as live text so it stays crisp at any size and uses the site's own font.
 */

type Tone = "ink" | "light";
/**
 * "square" is the badge itself (23% corners). "circle" is for when it sits inside a pill:
 * evenly inset in a fully rounded bar, only a circle follows the bar's curve (the nav uses it).
 */
type Shape = "square" | "circle";

/** The badge on its own: navy square with a white B (`ink`), or the reverse for dark grounds (`light`). */
export function LogoBadge({
  size,
  tone = "ink",
  shape = "square",
  className,
}: {
  size: number;
  tone?: Tone;
  shape?: Shape;
  className?: string;
}) {
  const dot = Math.max(2, Math.round(size * 0.11));
  return (
    <span
      aria-hidden
      className={cn("flex shrink-0 items-center justify-center", tone === "ink" ? "bg-foreground text-white" : "bg-white text-foreground", className)}
      style={{ width: size, height: size, borderRadius: shape === "circle" ? "50%" : size * 0.23 }}
    >
      <span className="flex items-baseline" style={{ paddingLeft: size * 0.09, gap: size * 0.025 }}>
        <span className="font-display font-medium" style={{ fontSize: size * 0.63, lineHeight: 1, letterSpacing: "-0.02em" }}>
          B
        </span>
        <span className="rounded-full bg-accent" style={{ width: dot, height: dot }} />
      </span>
    </span>
  );
}

/**
 * Horizontal lockup. "Real Estate" only shows at 40px badges and up (the system's minimum);
 * pass `descriptor={false}` to drop it at any size.
 */
export function Logo({
  badge,
  tone = "ink",
  shape = "square",
  descriptor = badge >= 40,
  className,
}: {
  badge: number;
  tone?: Tone;
  shape?: Shape;
  descriptor?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center", className)} style={{ gap: badge * 0.25 }}>
      <LogoBadge size={badge} tone={tone} shape={shape} />
      <span className="flex flex-col" style={{ gap: badge * 0.07 }}>
        <span
          className={cn("whitespace-nowrap font-display font-medium", tone === "ink" ? "text-foreground" : "text-white")}
          style={{ fontSize: badge * 0.5, lineHeight: 1.05, letterSpacing: "-0.025em" }}
        >
          Billy James
        </span>
        {descriptor && (
          <span
            className={cn("whitespace-nowrap font-semibold uppercase", tone === "ink" ? "text-muted" : "text-white/72")}
            style={{ fontSize: Math.max(8, badge * 0.15), lineHeight: 1.2, letterSpacing: "0.26em" }}
          >
            Real Estate
          </span>
        )}
      </span>
    </span>
  );
}
