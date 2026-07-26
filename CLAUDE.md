# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Important: Next.js version

This project runs **Next.js 16.2.1**, which contains breaking changes relative to earlier versions. Before writing any Next.js-specific code, consult `node_modules/next/dist/docs/` for the correct API. Heed deprecation warnings.

## Commands

**On Windows/PowerShell**, `npm` is blocked by execution policy. Use node directly:

```powershell
# Dev server
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev

# Build
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build

# Lint
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint
```

Add `$env:PATH = "C:\Program Files\nodejs;" + $env:PATH` before calling node if `eslint` can't find its own `node` binary.

There is **no test suite**.

## Lint status

One error in app source: `components/Navbar.tsx` calls `setState` synchronously inside an effect (`react-hooks/set-state-in-effect`). Pre-existing, not a regression.

The unescaped-apostrophe errors previously documented in `app/privacy/page.tsx` and `app/terms/page.tsx` were fixed in the 2026-06 refresh.

Lint also walks `public/` and `.claude/worktrees/`, so a bare `npm run lint` reports issues in `public/video/product-overview/*.jsx` and in any stale worktrees. Neither is part of the Next.js app. To lint only app source: `node ./node_modules/eslint/bin/eslint.js app components data`.

## Architecture

**Stack:** Next.js 16.2.1 App Router · TypeScript · React 19 · Tailwind CSS v4 · Stripe Checkout

**Fonts are two systems.** `app/layout.tsx` loads Manrope + Fraunces for global chrome (Navbar, Footer, StickyCTA) and exposes them as `--font-manrope` / `--font-fraunces`, consumed in `app/globals.css`. The Job Sheet system loads Barlow, Barlow Condensed and IBM Plex Mono in `components/jobsheet/fonts.ts`, applied by wrapping a page in `jobsheetFonts`. Both are live; do not remove either assuming it is dead.

`app/layout.tsx` wraps every page with `<Navbar>`, `<main>`, and `<Footer>`. It also holds the global `metadata` object (title template `"%s | Current Automations"`). Pages that need a title bypassing the template use `title: { absolute: "..." }`.

### Shared components

The site runs on the "Job Sheet" system (`components/jobsheet/`, see `DESIGN.md`), paper/ticket paperwork styling, not the earlier dark-gradient "Section/Hero" system.

- **`JobSheetSection`**: the primary content wrapper. Props: `id`, `code`, `label` (rendered as a `FormTab`), `title`, `description`, `children`, `tone` (`"paper"` | `"carbon"` | `"ink"`).
- **`JobSheetHero`** / **`JobSheetPageHero`**: homepage vs. interior-page hero variants.
- **`JobSheetCTA`**: full-width CTA band. All copy (code, label, title, description, button labels) is passed as props.
- **`JobSheetFAQ`**: accordion FAQ. Takes `items: FAQItem[]`, `code`, `label`, `title`, `description`, `tone`.
- **`TicketCard`**: the signature card surface (punch hole, ticket-ref corner label).
- **`Stamp`**: rubber-stamp badge (`tone: "rust" | "teal"`).
- **`PunchButton`**: the in-page CTA (`variant: "solid" | "ghost"`, `onDark`).
- **`Navbar`** / **`Footer`**: site-wide chrome, outside the Job Sheet system. CTA links point to the Google Calendar booking URL (see CTA convention below).

### Shared data

`data/siteContent.ts` is the single source of truth for:
- `siteContact`: primary public email (`info@currentautomations.ca`), phone display/href, and notes. Used in the Footer and anywhere a single contact appears.
- `siteContacts`: all inboxes by role.
  - `general` (`info@currentautomations.ca`): front door, site contact form, warm inbound
  - `support` (`support@currentautomations.ca`): existing client issues and change requests
  - `billing` (`billing@currentautomations.ca`): invoices, refunds, card changes, billing questions
  - `noReply` (`no-reply@currentautomations.ca`): automated one-way sends (receipts, confirmations); never monitored
  - `admin@currentautomations.ca`: internal only (domain/registrar/account admin). Never appears on the public site, and that includes static files under `public/`, which are served at the site root.
- `faqItems`: homepage FAQ entries
- `FAQItem` type

Import `siteContact` for the single-email use case. Import `siteContacts` for the contact page or anywhere inbox-specific routing matters. Never hardcode email addresses.

### Demo videos

Seven self-contained HTML animations in `public/demos/` (`video1.html` to `video7.html`), embedded through `components/HomeDemoVideo.tsx`. Each is a fixed 1600x900 stage scaled to its container, with fonts served from `public/demos/fonts/` so nothing is fetched at runtime.

Three rules when editing them:

1. **Timing changes must be scripted, not hand-edited.** Every animation delay is absolute from page load, so shortening one scene means shifting every delay after it, plus `TOTAL` (or the `setInterval` loop in `video1`/`video2`/`video3`) and the progress bar. Parse the animation shorthand paren-aware and treat the second time token in each comma-separated segment as the delay. Watch for `calc(Xs + var(--i)*1s)` staggers where only the base should move, and bare `animation-delay:` properties.
2. **Derived values must stay derived.** Playbar totals compute from `TOTAL`; scene comments and header durations are regenerated from the scene CSS. They were hardcoded once and silently drifted.
3. **`heroGrow` and `setupDim` use `forwards`, never `both`.** With `both`, the backwards fill applies from t=0 and pins the hero at `scale(1)` through its slam entrance, killing the overshoot.

The scene-1 pattern is shared across all seven: setup lines fade up and stay, dimming to 42% while the hook line lands on `slam` and grows 15% across its hold.

The playbar overlays roughly the bottom 80px of the frame, so geometric centering still reads as crowded. Leave about 95px of clearance below the last line of text.

`HomeDemoVideo` restarts a demo when it scrolls into view, since they loop from page load and a below-fold embed would otherwise be mid-scene. Its Expand button uses the Fullscreen API with a modal fallback for browsers that refuse (notably iOS Safari, which allows fullscreen on `<video>` but not arbitrary elements). Iframe `allow` is semicolon-separated: `allow="autoplay; fullscreen"`.

### CTA convention

All primary CTAs across the site link to:

```
https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb
```

with the label **"Book Free Audit"**. Always add `target="_blank" rel="noopener noreferrer"` since it opens an external page. Maintain this consistency when adding or editing CTA buttons. "Discovery call" may be used in descriptive body copy (e.g. "a free 30-minute discovery call") but is never a button label. Do not use "Revenue Leak Audit" phrasing anywhere.
