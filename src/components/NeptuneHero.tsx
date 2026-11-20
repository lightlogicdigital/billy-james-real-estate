import { ButtonLink, Container } from "./ui";
import { home } from "@/content/home";

/*
 * Homepage hero: a screen-print style King Neptune (the Oceanfront statue) under an
 * amber sun, rising out of scalloped waves. Drawn in Paper ("Hero Explorations · Round 2").
 *
 * Motion hooks (see Motion.tsx): the sun rings bloom in (data-sun), Neptune rises out of
 * the water (data-hero-rise), the wave bands sway (data-drift) and the boat bobs (data-bob).
 */

const INK = "#13253F";
const NAVY = "#1E4E8C";
const DEEP = "#163B6B";
const AMBER = "#F5B65D";

export function NeptuneHero() {
  const { eyebrow, lead, primaryCta, secondaryCta } = home.hero;
  return (
    <section data-hero aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-[#E3EEF9] xl:h-[900px]">
      {/* ---------- Copy ---------- */}
      <div data-depth="copy" className="relative z-10">
        <Container className="flex flex-col gap-5 pt-28 md:gap-7 md:pt-36 xl:pt-[200px]">
          <p data-intro className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.1em] text-primary sm:tracking-eyebrow md:text-sm">
            <span aria-hidden className="hidden h-px w-7 bg-primary sm:block" />
            <span className="sm:hidden">{eyebrow.replace("Virginia Beach", "VA Beach")}</span>
            <span className="hidden sm:inline">{eyebrow}</span>
          </p>
          <h1
            id="hero-title"
            data-split
            className="font-display text-[40px] font-medium leading-[1.1] tracking-[-0.035em] text-balance md:text-[56px] lg:text-hero xl:text-[64px] xl:leading-[70px]"
          >
            {/* Two lines from sm up; one flowing sentence on phones (SplitText always honors <br>). */}
            <span className="sm:block">Hampton Roads is home.</span>{" "}
            <span className="sm:block">
              Let&apos;s get you <span className="text-primary">moving.</span>
            </span>
          </h1>
          <p data-intro className="max-w-[560px] text-[17px] leading-[1.6] text-muted md:text-xl">
            {lead}
          </p>
          <div data-intro className="flex flex-col gap-2.5 pt-1.5 sm:flex-row sm:gap-3.5">
            <ButtonLink href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </ButtonLink>
            <ButtonLink href={secondaryCta.href} variant="accent">
              {secondaryCta.label}
            </ButtonLink>
          </div>
        </Container>
      </div>

      {/* ---------- Illustration (stacks under the copy until xl) ---------- */}
      <div aria-hidden className="pointer-events-none relative h-[400px] sm:h-[480px] md:h-[560px] lg:h-[620px] xl:absolute xl:inset-0 xl:h-auto">
        <div className="absolute bottom-0 right-[-24px] w-[300px] translate-y-[11%] sm:w-[360px] md:right-[4%] md:w-[420px] lg:right-[8%] lg:w-[460px] xl:right-[calc(50%-796px)] xl:w-[min(716px,50vw)]">
          <svg data-sun data-depth="far" viewBox="0 -50 640 890" className="absolute inset-0 h-full w-full">
            <circle cx="320" cy="250" r="295" fill="#F1F6FC" />
            <circle cx="320" cy="250" r="241" fill="#FCEBCF" />
            <circle cx="320" cy="250" r="191" fill={AMBER} />
          </svg>
          <NeptuneFigure />
        </div>

        <Gulls className="absolute hidden md:left-[14%] md:top-12 md:block md:w-[104px] xl:left-[calc(50%-44px)] xl:top-auto xl:bottom-[282px] xl:w-[120px]" />
        <Sailboat className="absolute bottom-[76px] left-5 w-[56px] md:bottom-[118px] md:left-[12%] md:w-[80px] xl:left-[calc(50%-92px)]" />
        <Waves className="absolute bottom-0 left-1/2 h-[96px] w-auto max-w-none -translate-x-1/2 md:h-[150px]" />

        <p className="absolute bottom-3 left-5 hidden text-[11px] font-medium uppercase tracking-[0.16em] text-[#DCE9F7] sm:block md:bottom-6 md:left-10 md:text-xs lg:left-16 xl:left-[max(64px,calc(50%-656px))]">
          King Neptune · 31st Street, Virginia Beach Oceanfront
        </p>
      </div>
    </section>
  );
}

/** King Neptune: crown, closed eyes, flowing beard, trident. Same 0 -50 640 890 box as the sun. */
function NeptuneFigure() {
  return (
    <svg data-hero-rise viewBox="0 -50 640 890" className="relative h-auto w-full" fill="none">
      {/* Trident */}
      <path d="M85 60H99V850H85ZM92 14L114 70L92 58L70 70ZM32 50L52 104L32 92L12 104ZM152 50L172 104L152 92L132 104Z" fill={INK} />
      <path d="M32 96V140Q32 190 92 190Q152 190 152 140V96" stroke={INK} strokeWidth="14" />
      <rect x="78" y="198" width="28" height="14" rx="4" fill={NAVY} />
      {/* Shoulders */}
      <path d="M40 840C44 730 80 660 150 628C196 608 236 590 262 540H378C404 590 444 608 490 628C560 660 596 730 600 840Z" fill={DEEP} />
      <path d="M236 640Q282 660 320 646Q358 660 404 640M320 662V760" stroke="#2C62A8" strokeWidth="4" strokeLinecap="round" />
      {/* Arm + hand on the trident */}
      <path d="M70 800L92 592" stroke={NAVY} strokeWidth="62" strokeLinecap="round" />
      <rect x="56" y="532" width="72" height="70" rx="26" fill={NAVY} />
      <path d="M64 553H120M62 569H122M64 585H120" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      {/* Hair */}
      <path
        d="M250 168C222 162 198 180 200 206C176 214 170 246 186 264C166 282 168 316 188 330C174 352 182 384 204 394C196 420 210 448 236 452C240 476 262 488 280 480L280 168ZM390 168C418 162 442 180 440 206C464 214 470 246 454 264C474 282 472 316 452 330C466 352 458 384 436 394C444 420 430 448 404 452C400 476 378 488 360 480L360 168Z"
        fill={INK}
      />
      {/* Face */}
      <path d="M262 172H378V270C378 322 352 352 320 352C288 352 262 322 262 270Z" fill={NAVY} />
      <path d="M256 174H384V186C378 196 366 196 360 186C354 196 340 196 334 186C328 196 312 196 306 186C300 196 286 196 280 186C274 196 262 196 256 186Z" fill={INK} />
      <path d="M264 220C278 204 300 204 314 218L314 228C300 218 282 218 264 230ZM376 220C362 204 340 204 326 218L326 228C340 218 358 218 376 230Z" fill={INK} />
      <path d="M278 242Q291 249 304 242M336 242Q349 249 362 242" stroke="#CFE3F5" strokeWidth="3" strokeLinecap="round" />
      <path d="M314 222H326L335 274C330 284 310 284 305 274Z" fill="#3A6FB4" />
      {/* Beard + mustache */}
      <path
        d="M246 262C232 300 224 340 230 384C218 404 224 436 242 446C240 474 256 500 276 506C280 534 298 556 314 562C312 584 318 600 326 612C336 598 338 580 332 562C346 554 362 534 366 506C386 498 400 474 398 446C416 436 422 404 410 384C416 340 408 300 394 262L380 300C366 322 344 334 320 334C296 334 274 322 260 300Z"
        fill={INK}
      />
      <path
        d="M320 282C304 274 282 280 268 298C258 310 248 314 238 310C244 328 264 332 280 322C294 313 308 306 320 304C332 306 346 313 360 322C376 332 396 328 402 310C392 314 382 310 372 298C358 280 336 274 320 282Z"
        fill={INK}
      />
      <path d="M308 312Q320 320 332 312Q320 330 308 312Z" fill="#3A6FB4" />
      <path
        d="M320 346C310 392 330 436 320 486C316 510 322 534 326 556M296 340C282 384 304 424 290 470C284 492 292 512 302 526M344 340C358 384 336 424 350 470C356 492 348 512 338 526M272 326C256 366 276 404 262 444C258 458 262 472 268 482M368 326C384 366 364 404 378 444C382 458 378 472 372 482M252 300C242 330 250 356 244 384M388 300C398 330 390 356 396 384M232 196C216 214 218 240 226 254M408 196C424 214 422 240 414 254M216 286C204 304 208 326 218 338M424 286C436 304 432 326 422 338M228 366C218 382 222 404 232 414M412 366C422 382 418 404 408 414M298 294C284 296 272 304 262 314M342 294C356 296 368 304 378 314"
        stroke="#7FAEE0"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Crown */}
      <path d="M238 150L227 82L252 124L274 64L297 118L320 50L343 118L366 64L388 124L413 82L402 150Z" fill={INK} />
      <g fill={INK}>
        <circle cx="227" cy="80" r="7" />
        <circle cx="274" cy="62" r="7" />
        <circle cx="320" cy="48" r="7" />
        <circle cx="366" cy="62" r="7" />
        <circle cx="413" cy="80" r="7" />
      </g>
      <path d="M236 150H404L400 178H240Z" fill={NAVY} />
      <g fill={AMBER}>
        <circle cx="270" cy="164" r="5" />
        <circle cx="320" cy="164" r="5" />
        <circle cx="370" cy="164" r="5" />
      </g>
    </svg>
  );
}

/** One scalloped band: `count` arcs of 120 wide starting at x, closed down to the bottom. */
function scallops(x: number, y: number, count: number, close = true) {
  const arcs = " q60 34 120 0".repeat(count);
  return `M${x} ${y}${arcs}${close ? " V150 H" + x + " Z" : ""}`;
}

/** Three Art Deco wave bands, 3200 wide so they cover any screen while centered. */
function Waves({ className }: { className?: string }) {
  const bands = [
    { x: -60, y: 22, fill: "#4E8BCB", line: "#A9CBEE" },
    { x: -120, y: 64, fill: NAVY, line: "#4E8BCB" },
    { x: -60, y: 106, fill: DEEP, line: "#2C62A8" },
  ];
  return (
    <svg viewBox="0 0 3200 150" preserveAspectRatio="xMidYMax meet" className={className} fill="none">
      {bands.map((b) => (
        <g key={b.y} data-drift>
          <path d={scallops(b.x, b.y, 29)} fill={b.fill} />
          <path d={scallops(b.x, b.y + 14, 29, false)} stroke={b.line} strokeWidth="2.5" />
        </g>
      ))}
    </svg>
  );
}

function Sailboat({ className }: { className?: string }) {
  return (
    <svg data-bob viewBox="586 210 80 112" className={className} fill="none">
      <path d="M588 300H664L652 320H600Z" fill={INK} />
      <path d="M628 222V296H592Z" fill="#FFFFFF" />
      <path d="M634 238L662 296H634Z" fill={AMBER} />
      <path d="M631 214V300" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function Gulls({ className }: { className?: string }) {
  return (
    <svg data-drift viewBox="636 84 120 74" className={className} fill="none">
      <path
        d="M690 96q9-9 18 0q9-9 18 0M724 150q7-7 14 0q7-7 14 0M640 132q6-6 12 0q6-6 12 0"
        stroke={INK}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
