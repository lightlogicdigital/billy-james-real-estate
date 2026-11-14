import { cn } from "./ui";

/**
 * Illustrated stand-in for deals without a photo (Billy represented the buyer,
 * so the listing photos belong to another agent). Same line style as CityArt.
 * `variant` nudges the sun and roofline so neighbouring cards don't look identical.
 */
export function HomeArt({ variant = 0, label, className }: { variant?: number; label?: string; className?: string }) {
  const v = variant % 3;
  const sunX = [196, 70, 206][v];
  const sunY = [46, 52, 40][v];
  return (
    <div className={cn("relative flex h-full w-full items-end justify-center overflow-hidden bg-surface", className)}>
      <svg viewBox="0 0 300 190" fill="none" aria-hidden className="h-[78%] w-auto max-w-[86%]" data-draw>
        <circle cx={sunX} cy={sunY} r="18" fill="#F5B65D" />
        <g stroke="#1E4E8C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          {v === 1 ? (
            <>
              {/* Two-story colonial */}
              <path d="M92 156 V88 H208 V156" />
              <path d="M84 92 L150 50 L216 92" />
              <path d="M104 104 h20 v18 h-20 z M176 104 h20 v18 h-20 z M104 132 h20 v16 h-20 z M176 132 h20 v16 h-20 z" />
              <path d="M140 156 V128 H160 V156" />
              <path d="M142 74 h16" />
            </>
          ) : v === 2 ? (
            <>
              {/* Ranch with garage */}
              <path d="M70 156 V112 H178 V156" />
              <path d="M60 116 L124 82 L188 116" />
              <path d="M178 156 V120 H236 V156" />
              <path d="M172 120 L207 100 L242 120" />
              <path d="M186 156 V132 H228 V156 M186 140 H228 M186 148 H228" />
              <path d="M86 126 h22 v16 h-22 z M140 126 h22 v16 h-22 z" />
              <path d="M114 156 V134 H132 V156" />
            </>
          ) : (
            <>
              {/* Cottage with porch */}
              <path d="M88 156 V100 H212 V156" />
              <path d="M78 104 L150 60 L222 104" />
              <path d="M100 156 V128 M200 156 V128 M94 128 H206" />
              <path d="M140 156 V132 H160 V156" />
              <path d="M110 108 h18 v14 h-18 z M172 108 h18 v14 h-18 z" />
              <path d="M144 84 h12 v12 h-12 z" />
            </>
          )}
          <path d="M20 156 H280" />
          <path d="M40 172 H260 M70 184 H230" opacity="0.45" strokeWidth="2" />
          <path d="M36 156 V138 M36 138 C26 138 24 124 30 118 C28 108 42 104 44 114 C52 114 54 128 46 132 C48 138 40 140 36 138" />
          <path d="M262 156 V136 M262 136 C250 136 248 120 256 114 C254 102 270 98 272 110 C282 110 284 126 274 130 C276 138 268 140 262 136" />
        </g>
      </svg>
      {label && (
        <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-muted">{label}</span>
      )}
    </div>
  );
}
