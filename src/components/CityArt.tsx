/**
 * Line-drawn landmark for each city (navy strokes + one amber "porch light" sun).
 * Drawn for the neighborhood cards in Paper; 260×170 artboard.
 */
const NAVY = "#1E4E8C";
const AMBER = "#F5B65D";

export function CityArt({ slug, className, draw = true }: { slug: string; className?: string; draw?: boolean }) {
  const common = { stroke: NAVY, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 260 170" fill="none" aria-hidden className={className} data-draw={draw || undefined}>
      {slug === "virginia-beach" && (
        <>
          <circle cx="198" cy="50" r="18" fill={AMBER} />
          <path d="M112 150 L118 52 L142 52 L148 150 Z" strokeWidth="2.5" {...common} />
          <path d="M115 98 L145 98 M116 74 L144 74 M114 122 L146 122" strokeWidth="2.5" {...common} />
          <path d="M114 52 L146 52 L146 46 L114 46 Z" strokeWidth="2.5" {...common} />
          <path d="M120 46 L120 32 L140 32 L140 46 M117 32 L130 20 L143 32" strokeWidth="2.5" {...common} />
          <path d="M92 36 L112 40 M168 36 L148 40" stroke={AMBER} strokeWidth="2.5" strokeLinecap="round" />
          <path d="M20 152 Q40 142 60 152 T100 152 T140 152 T180 152 T220 152 T260 152" strokeWidth="2.5" {...common} />
          <path d="M0 164 Q20 156 40 164 T80 164 T120 164 T160 164 T200 164 T240 164" strokeWidth="2" opacity="0.5" {...common} />
        </>
      )}
      {slug === "chesapeake" && (
        <>
          <circle cx="62" cy="48" r="18" fill={AMBER} />
          <path d="M10 112 L250 112" strokeWidth="2.5" {...common} />
          <path d="M10 112 Q70 60 130 112 Q190 60 250 112" strokeWidth="2.5" {...common} />
          <path d="M40 112 L40 92 M70 112 L70 82 M100 112 L100 92 M160 112 L160 92 M190 112 L190 82 M220 112 L220 92" strokeWidth="2" {...common} />
          <path d="M130 112 L130 150 M128 112 L128 150" strokeWidth="2.5" {...common} />
          <path d="M20 140 Q45 132 70 140 T120 140 M140 140 Q165 132 190 140 T240 140" strokeWidth="2" opacity="0.5" {...common} />
          <path d="M18 162 L22 146 M26 162 L26 142 M34 162 L30 148 M226 162 L230 146 M234 162 L234 142 M242 162 L238 148" strokeWidth="2" {...common} />
        </>
      )}
      {slug === "norfolk" && (
        <>
          <circle cx="210" cy="40" r="18" fill={AMBER} />
          <path d="M30 120 L30 84 L52 84 L52 120 M52 120 L52 60 L76 60 L76 120 M76 120 L76 92 L96 92 L96 120 M96 120 L96 40 L106 30 L116 40 L116 120 M116 120 L116 72 L140 72 L140 120 M140 120 L140 90 L160 90 L160 120" strokeWidth="2.5" {...common} />
          <path d="M58 70 L70 70 M58 82 L70 82 M58 94 L70 94 M102 50 L110 50 M102 62 L110 62 M102 74 L110 74 M122 82 L134 82 M122 94 L134 94" strokeWidth="2" {...common} />
          <path d="M10 120 L250 120" strokeWidth="2.5" {...common} />
          <path d="M188 116 L230 116 L222 128 L194 128 Z" strokeWidth="2.5" {...common} />
          <path d="M209 116 L209 76 L230 108 L209 108" strokeWidth="2.5" {...common} />
          <path d="M20 142 Q45 134 70 142 T120 142 T170 142 T220 142 M40 160 Q65 152 90 160 T140 160 T190 160 T240 160" strokeWidth="2" opacity="0.5" {...common} />
        </>
      )}
      {slug === "suffolk" && (
        <>
          <circle cx="58" cy="44" r="18" fill={AMBER} />
          <path d="M96 124 L96 88 L130 62 L164 88 L164 124 Z" strokeWidth="2.5" {...common} />
          <path d="M90 92 L130 58 L170 92" strokeWidth="2.5" {...common} />
          <path d="M122 124 L122 102 L138 102 L138 124 M104 96 L116 96 L116 106 L104 106 Z M144 96 L156 96 L156 106 L144 106 Z" strokeWidth="2" {...common} />
          <path d="M90 124 L170 124 M84 110 L96 110 M164 110 L176 110" strokeWidth="2.5" {...common} />
          <path d="M206 124 L206 100 M206 100 C190 100 186 78 196 70 C192 56 210 48 216 60 C230 58 232 78 222 84 C226 96 216 102 206 100" strokeWidth="2.5" {...common} />
          <path d="M36 124 L36 104 M36 104 C26 104 24 90 30 84 C28 74 42 70 44 80 C52 80 54 94 46 98 C48 104 40 106 36 104" strokeWidth="2.5" {...common} />
          <path d="M10 124 L250 124" strokeWidth="2.5" {...common} />
          <path d="M20 140 L240 140 M40 152 L220 152 M60 164 L200 164" strokeWidth="2" opacity="0.5" {...common} />
        </>
      )}
    </svg>
  );
}
