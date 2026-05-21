# Current Automations Design System

## Visual Theme & Atmosphere
- Mood: professional_minimal
- Feel: Trustworthy, direct, quietly confident — built for trades business owners who are skeptical of tech and respond to clarity over cleverness
- Brand name: Current Automations (no "& Systems")
- Icon: Wave-circle mark (teal-to-blue gradient on dark navy circle) — keep unchanged
- References: Industrial tool brands, Canadian regional service companies, Basecamp/Shopify in restraint and directness

## Color Palette & Roles
- Background: #f4f7fb (canvas, light sections)
- Surface: #ffffff (cards, panels)
- Text primary: #07111d (ink — near-black navy)
- Text secondary: #62748b (muted — mid-grey-blue)
- Accent: #4fd0ad (brand teal)
- Accent strong: #149676 (dark teal — buttons, hover states)
- Dark background: #07111d (hero, dark sections)
- Line / border: rgba(15,27,44,0.12)

## Typography Rules
- Display: Fraunces (serif), 600, clamp(2rem, 5vw, 4.35rem) — section headings and hero title
- Body: Manrope (geometric humanist sans), 400, 1rem/1.75 — all body copy
- Mono: not used decoratively
- Wordmark (in UI): "CURRENT" in Manrope 700 tracking-[0.18em], "Automations" in Manrope 500 tracking-[0.22em] at 75% opacity

## Component Stylings
- Buttons (primary): rounded-full, teal gradient (#4fd0ad → #149676), ink text, teal glow shadow
- Buttons (secondary): rounded-full, transparent bg, border, ink text on light / white text on dark
- Cards (light): frosted white, 1px white border, 72px blur, soft shadow — class: surface-card
- Cards (dark): radial teal glow + dark gradient, 1px white/8% border — class: dark-card
- Pill labels / badges: teal-tinted, 0.72rem uppercase tracking-[0.24em]
- Inputs: rounded-[1.15rem], white bg, subtle border, teal focus ring

## Layout Principles
- Max width: 1280px (container-shell)
- Grid: single_column sections with 2–3 col content grids inside
- Section spacing: py-20 sm:py-24 lg:py-28 (balanced density)
- Content padding: px-6 sm:px-8 lg:px-10

## Depth & Elevation
- Light sections: shadow-[0_24px_72px_rgba(7,17,29,0.10)] on cards
- Dark sections: shadow-[0_36px_100px_rgba(2,6,23,0.34)] on dark cards
- Navbar: backdrop-blur-md, rgba(7,17,29,0.72) bg — floating pill
- No decorative drop shadows on text

## Do's and Don'ts
- DO use the declared color tokens exclusively
- DO maintain consistent section spacing
- DO ensure all text meets WCAG AA contrast ratio
- DO use "Current Automations" — never "Current Automations & Systems"
- DO write for a 45-year-old trades owner: concrete, plain language, no jargon
- DON'T invent colors outside this palette
- DON'T use "AI" as a lead concept — lead with the business outcome (missed calls, jobs won)
- DON'T add fake testimonials or placeholder social proof
- DON'T use emojis in UI copy

## Responsive Behavior
- Breakpoints: 640px (sm), 768px (md), 1024px (lg), 1280px (xl)
- Mobile: single column, full-width CTAs, tap-to-call phone numbers
- Tablet: allow 2-column feature grids
- Desktop: full layout, hero right-column panel visible
- Navbar: pill collapses to hamburger below lg breakpoint

## Agent Prompt Guide
- Do NOT use "& Systems" anywhere in brand copy or UI
- Do NOT invent colors outside this palette
- Accent color (teal) appears maximum 3 times per viewport
- All interactive elements need :focus-visible outline (2px teal)
- Primary CTA label is always "Book Free Audit"
- All primary CTAs link to the Google Calendar booking URL (see CLAUDE.md → "CTA convention" for the canonical link)
- Phone: 416-509-7474 (display) / +14165097474 (href)
- Demo line: 1-365-601-7474
- Service area: Durham Region + GTA, remote across Ontario
