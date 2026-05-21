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

## Known pre-existing lint errors

`app/privacy/page.tsx` (2 errors) and `app/terms/page.tsx` (6 errors) have unescaped apostrophe lint errors that pre-date this project. They are not regressions. Ignore them when verifying that new changes are clean.

## Architecture

**Stack:** Next.js 16.2.1 App Router · TypeScript · React 19 · Tailwind CSS v4 · Google Fonts (Manrope + Fraunces)

### Route structure

| Route | File | Notes |
|-------|------|-------|
| `/` | `app/page.tsx` | Homepage |
| `/about` | `app/about/page.tsx` | |
| `/how-it-works` | `app/how-it-works/page.tsx` | |
| `/demo` | `app/demo/page.tsx` | |
| `/pricing` | `app/pricing/page.tsx` | |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | |
| `/privacy` | `app/privacy/page.tsx` | Legacy — pre-existing lint errors |
| `/terms` | `app/terms/page.tsx` | Pre-existing lint errors |
| `/book-a-demo` | `app/book-a-demo/page.tsx` | Server-side `redirect()` to Calendly |

`app/layout.tsx` wraps every page with `<Navbar>`, `<main>`, and `<Footer>`. It also holds the global `metadata` object (title template `"%s | Current Automations"`). Pages that need a title bypassing the template use `title: { absolute: "..." }`.

### Shared components

- **`Section`** — the primary content wrapper. Props: `id`, `eyebrow`, `title`, `description`, `children`, `tone` (`"light"` | `"muted"` | `"dark"`), `align` (`"left"` | `"center"`). Controls background color and heading color automatically.
- **`Hero`** — dark-gradient hero. Accepts `primaryCta`, `secondaryCta`, optional `children` (right column). When `children` is omitted the layout collapses to single-column — the grid and right `<div>` are conditionally rendered.
- **`CTASection`** — full-width dark CTA band. All copy (eyebrow, title, description, button labels) is passed as props — nothing is hardcoded in the component.
- **`FAQSection`** — accordion FAQ. Takes `items: FAQItem[]`, `tone`, `title`, `description`.
- **`Navbar`** / **`Footer`** — site-wide chrome. CTA links point to the Google Calendar booking URL (see CTA convention below).

### Design tokens (globals.css)

All color values are CSS custom properties. Use them by name in Tailwind arbitrary values:

| Token | Value |
|-------|-------|
| `--color-ink` | `#07111d` (near-black) |
| `--color-brand` | `#4fd0ad` (teal) |
| `--color-brand-strong` | `#149676` (dark teal) |
| `--color-muted` | `#62748b` |
| `--color-line` | `rgba(15,27,44,0.12)` |

Key utility classes defined in `@layer components`:
- `.surface-card` — frosted white card with soft shadow
- `.dark-card` — dark gradient card with teal radial glow
- `.btn-primary` — teal gradient pill button
- `.btn-secondary` — bordered ghost pill button
- `.pill-label` — small teal-tinted eyebrow badge (use `bg-white/[0.08] text-white/70` overrides when on a dark background)
- `.container-shell` — max-w-7xl centered wrapper
- `.section-spacing` — standard vertical padding

### Shared data

`data/siteContent.ts` is the single source of truth for:
- `siteContact` — email (`admin@currentautomations.ca`), phone display/href, notes
- `faqItems` — homepage FAQ entries
- `FAQItem` type

Import `siteContact` anywhere contact details appear rather than hardcoding them.

### CTA convention

All primary CTAs across the site link to:

```
https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb
```

with the label **"Book Free Audit"**. Always add `target="_blank" rel="noopener noreferrer"` since it opens an external page. Maintain this consistency when adding or editing CTA buttons. "Discovery call" may be used in descriptive body copy (e.g. "a free 30-minute discovery call") but is never a button label. Do not use "Revenue Leak Audit" phrasing anywhere.
