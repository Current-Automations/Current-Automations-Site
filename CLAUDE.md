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

The lint run is fully clean. The previously documented unescaped-apostrophe errors in `app/privacy/page.tsx` and `app/terms/page.tsx` were fixed in the 2026-06 refresh.

## Architecture

**Stack:** Next.js 16.2.1 App Router · TypeScript · React 19 · Tailwind CSS v4 · Google Fonts (Manrope + Fraunces)

`app/layout.tsx` wraps every page with `<Navbar>`, `<main>`, and `<Footer>`. It also holds the global `metadata` object (title template `"%s | Current Automations"`). Pages that need a title bypassing the template use `title: { absolute: "..." }`.

### Shared components

The site runs on the "Job Sheet" system (`components/jobsheet/`, see `DESIGN.md`) — paper/ticket paperwork styling, not the earlier dark-gradient "Section/Hero" system.

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
- `siteContact`: primary public email (`info@currentautomations.ca`), phone display/href, notes — used in Footer and anywhere a single contact appears
- `siteContacts`: all inboxes by role:
  - `general` — `info@currentautomations.ca` — front door, site contact form, warm inbound
  - `support` — `support@currentautomations.ca` — existing client issues and change requests
  - `billing` — `billing@currentautomations.ca` — invoices, refunds, card changes, billing questions
  - `noReply` — `no-reply@currentautomations.ca` — automated one-way sends (receipts, confirmations); never monitored
  - `admin@currentautomations.ca` — internal only (domain/registrar/account admin); never appears on the public site
- `faqItems`: homepage FAQ entries
- `FAQItem` type

Import `siteContact` for the single-email use case. Import `siteContacts` for the contact page or anywhere inbox-specific routing matters. Never hardcode email addresses.

### CTA convention

All primary CTAs across the site link to:

```
https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb
```

with the label **"Book Free Audit"**. Always add `target="_blank" rel="noopener noreferrer"` since it opens an external page. Maintain this consistency when adding or editing CTA buttons. "Discovery call" may be used in descriptive body copy (e.g. "a free 30-minute discovery call") but is never a button label. Do not use "Revenue Leak Audit" phrasing anywhere.
