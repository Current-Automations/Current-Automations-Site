# Current Automations Design System — "Editorial Industrial" (2026-06 overhaul)

## Art direction
Premium trade-journal meets job board. High contrast, ink-dark inverted sections,
oversized Fraunces display type, hairline editorial rules instead of card soup,
and a motion system that reacts to the cursor and the scroll. Nothing glows,
nothing floats in purple. The page feels custom because the *structure* is
editorial (numbered sections, full-bleed rows, giant numerals) and the *motion*
is physical (sweeps, counters, tilt, drawn lines) rather than ambient blobs.

- Feel: confident, mechanical, built by someone who answers the phone
- References: print trade journals, dispatch boards, Stripe-level interaction polish
- Anti-references: purple-gradient SaaS, glowing blobs, center-everything templates

## Color Palette & Roles
- Ink (dark canvas): #04091a / #07111d — most sections are dark now; light sections punctuate
- Canvas (light): #f4f7fb · Surface: #ffffff
- Text primary: #07111d · Text secondary: #62748b
- Accent: #4fd0ad (teal) · Accent strong: #149676
- Signal amber: #f4d6a5 (sparingly: timestamps, "live" markers)
- Hairlines: rgba(15,27,44,0.12) light / rgba(255,255,255,0.1) dark
- Accent appears as *lines and numerals*, not washes. Max 3 teal moments per viewport.

## Typography — pushed hard
- Display: Fraunces 600, optical sizing auto, -0.02em
  - `.display-hero`: clamp(2.75rem, 7.5vw, 6.5rem), line-height 0.98 — homepage h1
  - `.display-giant`: clamp(6rem, 18vw, 15rem) — pull-stats (21×, $7,200, phone number)
  - Section h2: clamp(2.25rem, 4.5vw, 3.75rem)
- Body: Manrope 400, 1rem/1.75
- Kickers: Manrope 600 uppercase 0.72rem tracking 0.28em, paired with a section index numeral ("01 — Sound familiar?")
- Headings use text-wrap: balance

## Section grammar
Every major section carries an index numeral + kicker rule line (hairline that
draws in on reveal). Alternate dark/light deliberately; dark sections dominate.
Rows > cards: lists render as full-width hairline rows with hover sweep, not
floating rounded cards. Cards survive only where they earn it (pricing tiers,
SMS mock, video frames) and then they tilt.

## Motion system (CSS + IntersectionObserver, no animation library)
- `Reveal` (components/Reveal.tsx): IO-triggered, variants `up | fade | clip | left | scale`,
  optional `delay`. Content always visible by default; animation only enhances.
- `CountUp` (components/motion/CountUp.tsx): IO-triggered numeric counters
  (eased, ~1.4s) for $7,200, 18 jobs, 21×, 78%, 4×, response-decay labels.
- `TiltCard` (components/motion/TiltCard.tsx): pointer-tracking tilt (max ~5deg)
  + moving glare highlight via CSS vars. Used on SMS mock, system cards, video frames.
- `CursorField` (components/motion/CursorField.tsx): writes --mx/--my (px) and
  --par-x/--par-y (-1..1) on a container. Hero uses it for a cursor spotlight
  (`.cursor-spotlight`) and layered parallax (`.par-1`/`.par-2`/`.par-3`).
- Button shimmer: `.btn-primary` / `.btn-shimmer` sweep a light band across on hover.
- Row sweep: `.row-sweep` slides a teal-tinted wash in from the left on hover.
- Bars: `.bar-fill` scaleX 0→1 (800ms expo) once an ancestor has `.reveal-in`.
- Rule draw: `.rule-draw` hairline scaleX 0→1 on reveal.
- Ticker: `.ticker-track` infinite marquee (trade names strip under hero), 36s linear.
- Live pulse: `.pulse-dot` for the demo line / SMS "Live" badge.
- EVERYTHING gated behind prefers-reduced-motion: reduce → static, visible, no transforms.

## Component stylings
- Buttons primary: rounded-full, teal gradient, ink text, shimmer sweep, -2px lift on hover
- Buttons secondary: rounded-full bordered ghost
- Pill labels: replaced by index kickers (numeral + tracked uppercase + rule)
- Inputs: unchanged (rounded-[1.15rem], teal focus ring)

## Layout
- Max width 1280px (`container-shell`); dark sections run full-bleed with the
  shell inside; generous asymmetry (60/40 splits, sticky columns)
- Section spacing: py-24 sm:py-28 lg:py-36 for hero-adjacent, py-20 default

## Hard rules (unchanged)
- Primary CTA always "Book Free Audit" → Google Calendar URL (CLAUDE.md), target _blank + rel
- Phone +1 (365) 513-7474 · Demo line 1-365-601-7474
- Copy voice: 45-year-old trades owner, concrete, no jargon, "AI" never the lead,
  no emojis, no em dashes, no fabricated testimonials
- $7,200 / 18-jobs stat phrased as "one contractor reported", no client name
- WCAG AA contrast; all interactive elements get :focus-visible 2px teal outline
- Mobile: single column at 375px, tap-to-call numbers, sticky CTA bar
- Don't use "& Systems"; service area Durham Region + GTA, remote across Ontario
