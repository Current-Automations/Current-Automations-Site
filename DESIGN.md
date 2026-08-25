# Current Automations Design System: "Job Sheet" (2026-07 overhaul)

## Art direction

Manila-folder paperwork meets a dispatcher's desk. Cream/paper light sections
punctuated by carbon-copy and ink-dark dark sections, cut-stock ticket cards
with punch holes and perforated edges, rubber-stamp badges, and work-order
form codes instead of numbered kickers. The page feels custom because the
*structure* is paperwork (form codes, ticket refs, ledger rows, dashed
dividers) and the *material* is tactile (paper texture, carbon texture,
stamp slam, peel-in reveals) rather than a generic SaaS shell.

- Feel: hands-on, a little worn-in, built by someone who runs a dispatch board
- References: manila folders, invoice pads, punch-card tickets, work orders
- Anti-references: purple-gradient SaaS, glowing blobs, glossy card grids

Demo videos (`public/demos/video1.html`–`video7.html`) are the one deliberate
exception: they render inside a mounted dark "screen," legible against paper
the way a phone or monitor on a desk would be. They use the same three
typefaces as the rest of the site (see Typography) so the screen reads as
part of the same system, just switched on.

## Color Palette & Roles

- Paper (light canvas): `#f3ede1` · Paper deep: `#e9e0cd` · Card: `#faf7ee`
- Carbon (muted mid): `#ded5c2` with a repeating hairline texture
- Ink (dark canvas): `--color-ink` `#04091a` / `--color-ink-soft` `#0b1828`
- Ink text: `#201c16` · Ink soft (muted): `#58524a`
- Rust (secondary accent, stamps/lane markers): `#a8452f`
- Teal (primary accent): `--color-brand` `#4fd0ad` · Teal strong: `#149676`
- Hairlines: `rgba(28,36,48,0.16)` light / `rgba(255,255,255,0.1)` dark
- Teal appears as stamps, rule lines, focus states, and the CTA pill, sparingly, the way a highlighter would on paper.

## Typography

- Display: Barlow Condensed 600/700, uppercase, `-0.01em`, section titles, ticket headings, stamp labels
- Body: Barlow 400/500/600, paragraph copy, labels
- Mono: IBM Plex Mono 400/500/600, ticket refs, timestamps, form codes, phone numbers
- Loaded via `next/font/google` in `components/jobsheet/fonts.ts`, exposed as `--font-sheet-display` / `--font-sheet-body` / `--font-sheet-mono`
- The demo videos self-host the same three families as static `woff2` files under `public/demos/fonts/` (see Demo videos below) since `next/font`'s content-hashed output can't be referenced from a static HTML file in `/public`.

## Component system (`components/jobsheet/`)

- **`JobSheetSection`**: the primary content wrapper for lane pages. Props: `id`, `code`, `label` (rendered together as a `FormTab`), `title`, `description`, `tone` (`"paper"` | `"carbon"` | `"ink"`), `children`.
- **`JobSheetHero`** / **`JobSheetPageHero`**: homepage vs. interior-page hero variants, both built from the same paper/ticket vocabulary.
- **`JobSheetCTA`**: full-width CTA band, same form-code convention as `JobSheetSection`.
- **`JobSheetFAQ`**: accordion FAQ styled as a filed form.
- **`TicketCard`**: the signature card, punch hole, ticket-ref corner label, `jobsheet.ticket` surface. Used for lane cards, case studies, proof blocks.
- **`Stamp`**: rubber-stamp badge (`tone: "rust" | "teal"`) that slams into place on scroll via IntersectionObserver, honoring `prefers-reduced-motion`.
- **`PunchButton`**: the in-page CTA (`variant: "solid" | "ghost"`, `onDark`), distinct from the sitewide navbar/footer pill.
- **`FormTab`**: the manila-folder tab label (code + label) used as a section identifier instead of a numbered kicker.
- **`DispatchLog`**, **`PricingTicket`**, **`JobSheetLegalClause`**: page-specific ticket variants (dispatch simulation, pricing tiers, legal-clause index).
- All of the above are scoped via `jobsheet.module.css` (`components/jobsheet/jobsheet.module.css`) and never touch `globals.css` class names or shared chrome (`Navbar`/`Footer`/`StickyCTA`).

## Section grammar

Every `JobSheetSection` carries a form code + label (e.g. `CA-02, What we
automate`) instead of a numbered index kicker. Alternate paper/carbon/ink
tone deliberately. Cards read as cut ticket stock (punch hole, dashed
perforation, corner ref) rather than floating rounded cards or full-width
hairline rows.

## Motion system (CSS + IntersectionObserver, no animation library)

- `Reveal` (`components/Reveal.tsx`): IO-triggered, variants `up | fade | clip | left | scale`, optional `delay`. Content always visible by default; animation only enhances.
- `.peel` (`jobsheet.module.css`): the Job Sheet reveal, a slight rotate-in "peeled off the pad" motion, hooks into `Reveal`'s `.reveal-in` class.
- `Stamp`'s slam-in animation, gated the same way.
- Ledger rows (`.ledgerRow`) get a teal-tinted hover wash.
- EVERYTHING gated behind `prefers-reduced-motion: reduce` → static, visible, no transforms (see `jobsheet.module.css` and `globals.css` reduced-motion blocks).

## Demo videos (`public/demos/video1.html`–`video7.html`)

Each is a fully self-contained HTML file (own `<style>`/`<script>`, no
framework) authored on a fixed 1600×900 stage and uniformly downscaled to
fit its embed via `transform: scale()`. Shared conventions across all seven:

- **Fonts**: self-hosted Barlow / Barlow Condensed / IBM Plex Mono `woff2` files under `public/demos/fonts/`, `@font-face`'d at the top of each file. Keeps the demos on the same typeface system as the rest of the site.
- **Legibility floor**: `fitStage()` clamps the stage scale to a floor (`K_FLOOR = 0.5`) rather than shrinking indefinitely at small embed widths, and exposes the raw and clamped scale as `--stagek` / the content wrapper's `--boost` CSS custom properties. Small/meta text (timestamps, labels) uses `font-size: max(<original>, calc(<floor>px / (var(--stagek) * var(--boost))))` so it never renders below a legible floor regardless of embed size.
- **Hook hold**: scene 1's punchline gets a multi-second hold with a subtle `holdGlow` text-shadow pulse before it fades, instead of flashing and disappearing almost immediately.
- **Reduced motion**: every file freezes on one fully composed, legible proof frame (`@media (prefers-reduced-motion: reduce)`), scoped with a blanket `animation:none!important` on the frozen scene's descendants (including `::before`/`::after`) plus explicit final-state overrides, not a partial list of hand-picked selectors, which silently misses nested infinite/one-shot animations.
- **Playback**: `requestAnimationFrame`-driven scrubber, paired with `document.visibilitychange` so the CSS timeline and the JS clock pause together on a hidden tab. `restart()` clones `#stage` into a fresh `live` reference (never a stale closed-over node).
- **View-triggered play**: each file listens for `window.postMessage({type:'ca-demo-play'})` and restarts on receipt; `HomeDemoVideo.tsx` sends it once via IntersectionObserver when the embed scrolls into view, so a video isn't caught mid-scene or in its dead tail the first time anyone sees it.
- **Status/outcome swaps** (e.g. `video3`/`video4`'s OVERDUE→PAID pill): two real DOM elements crossfaded via opacity, with `aria-hidden` toggled by a scheduled `setTimeout`, never an animated CSS `content` swap, which isn't selectable or screen-reader-visible.
- **Teal**: `--teal: #4fd0ad`, matching `--color-brand` in `globals.css`.

## Layout

- Max width 1280px (`container-shell`); dark sections run full-bleed with the shell inside
- Section spacing: `py-20 sm:py-24 lg:py-28` (`JobSheetSection` default)

## Hard rules (unchanged)

- Primary CTA always "Book Free Audit" → Google Calendar URL (see `CLAUDE.md`), `target="_blank"` + `rel="noopener noreferrer"`
- Phone +1 (365) 513-7474 · Demo line 1-365-299-3366
- Copy voice: 45-year-old trades owner, concrete, no jargon, "AI" never the lead, no emojis, no em dashes, no fabricated testimonials
- $7,200 / 18-jobs stat phrased as "one contractor reported", no client name
- WCAG AA contrast; all interactive elements get `:focus-visible` 2px teal outline
- Mobile: single column at 375px, tap-to-call numbers, sticky CTA bar
- Don't use "& Systems"; service area Durham Region + GTA, remote across Ontario
