# Redesign Brief: Two Contenders (July 2026)

> **Status: closed, kept for context.** This brief drove the July 2026 redesign pass. The
> winning direction shipped as the "Job Sheet" system, which `DESIGN.md` now documents as
> the live system. Read `DESIGN.md` first; this file records what was open at the time and
> why, not what the site does today. The `wt-contender-a` / `wt-contender-b` worktrees it
> refers to are dead and safe to delete.

Source: grill-me session, `Atlas/Brainstorms/2026-07-04-current-automations-site-redesign.md`.
Both contenders build from this brief. It supersedes nothing in `DESIGN.md` / `PRODUCT.md`, read those first for full context, but the sections below are what's actually open for this pass.

## Why this exists

Fable 5 access lapses (or goes paid) July 7, 2026. This is a use-it-while-free window to see the best possible version of the site, not a response to something broken. The current site works fine. The one real complaint: **despite the June 2026 "editorial industrial" overhaul, it still reads as generic/templated**, not distinct from other SaaS/agency sites. Note: `DESIGN.md`'s own anti-references already banned "generic AI-agency landing pages" and "SaaS hero-metric template", that attempt didn't land. Whatever these two contenders do, don't just repeat the same anti-generic intent with a different skin; find an actually different way to be distinct.

## Audience (unchanged from PRODUCT.md)

Owner-operated trades and local service businesses broadly (not narrowed to the 4 currently-built voice agents: electrical/HVAC/plumbing/roofing). The persona in `PRODUCT.md`, a 45-year-old owner who answers his own phone, skeptical of tech, decides in seconds if this is real, still holds.

## Target feeling

**"These people get my business."** The site should read as built specifically for someone who's lost jobs to a missed call, not as generic tech-startup polish. This is the bar for "distinct", distinctiveness in service of speaking to this person's reality, not novelty for its own sake.

## Locked (do not touch)

- **Brand color**: teal `#4fd0ad` (`--color-brand`), strong teal `#149676` (`--color-brand-strong`), ink `#07111d`/`#04091a`. These come from the logo, changing them is a brand redesign, not a website redesign, and is out of scope this week.
- **Logo**, untouched.
- **Facts**:
  - Primary CTA target: Google Calendar booking link (see `site/CLAUDE.md` CTA convention), button label stays **"Book Free Audit"**.
  - Demo line: **+1 365 299 3366** (missed-call automation demo, calls go to voicemail, triggers a text within 60s).
  - Business phone: **+1 (365) 513-7474**.
  - Pricing tiers (Starter $197, Pro $297, Growth $397, Elite $597/mo) and Stripe `priceId`s must match `app/pricing/page.tsx`, don't invent new prices. **All one-time fees, AI voice minute allowances, and the overage rate live in `data/pricing.ts` and are the single source of truth.** Read them from there rather than restating them here, which is what let the old flat "$150 setup fee" line in this brief go stale.
  - Contact inboxes (`data/siteContent.ts` → `siteContacts`), never hardcode emails.
  - Legal page **copy** (privacy/terms) is fixed content, a redesign pass isn't rewriting privacy/terms text, just how it's presented if that page is touched at all (it's out of scope this round, see Pages below).

## Open (free to reinvent)

- Typography, Fraunces/Manrope is not mandated; propose whatever serves the direction.
- Layout, section grammar, motion system, component styling, all of `DESIGN.md`'s current system is a reference point, not a constraint.
- Headlines, positioning copy, microcopy, open to rewrite as long as the facts above stay accurate and the copy voice principles in `PRODUCT.md` hold (plain language, concrete numbers, no jargon, never leads with "AI," no fabricated testimonials, "write for the truck not the boardroom").
- How the locked teal is *used* (as a wash, an accent, a line, whatever), only the hex values and the logo are fixed, not the application.

## Pages in scope

**Homepage + Pricing page only**, per contender. Not a full site rebuild, building two complete sites would burn more context/usage than this pass warrants. Reuse `data/siteContent.ts` and the real Stripe `priceId`s from `app/pricing/page.tsx` rather than re-deriving pricing data.

## The two contenders

Two distinct directions, each on its own branch (`redesign/contender-a`, `redesign/contender-b`). **The split is not pre-specified, propose two genuinely different directions**, not cosmetic variants of the same idea (don't just swap one hero layout for a slightly different hero layout). Both must still hit: locked brand color/logo, the facts above, and the "these people get my business" feeling. Judge success by whether looking at A next to B next to the current live site feels like three real choices, not one choice with two paint jobs.

## Reuse before inventing

- `data/siteContent.ts`, contacts, FAQ items, pricing/scenario data. Import, don't duplicate.
- Shared components (`Section`, `Hero`, `CTASection`, `FAQSection`, `Navbar`, `Footer`), reuse the contract (props) even if the visual treatment changes; don't fork new prop shapes without reason.
- `site/CLAUDE.md`, Windows build/dev commands, CTA convention, design tokens as they exist today.
