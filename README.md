# Current Automations Site

Marketing website for [currentautomations.ca](https://currentautomations.ca). Current Automations finds where a trades or service business is losing time and money, then builds and runs the automation that fixes it.

The site sells one front door: a free 30-minute audit. Missed-call recovery is the flagship symptom, not the whole offer. See `PRODUCT.md` for positioning and `DESIGN.md` for the visual system.

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **Language**: TypeScript
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Fonts**: Barlow, Barlow Condensed and IBM Plex Mono for the Job Sheet system (`components/jobsheet/fonts.ts`); Manrope and Fraunces for global chrome (`app/layout.tsx`)
- **Payments**: Stripe Checkout via `app/api/checkout`
- **Deployment**: Vercel

## Pages

| Route | Description |
|---|---|
| `/` | Homepage: hero, four service pillars, how it works, FAQ |
| `/call-dispatch` | Pillar: calls answered and dispatched |
| `/follow-up` | Pillar: quote, no-show and database follow-up |
| `/back-office` | Pillar: invoicing and admin |
| `/lead-generation` | Pillar: outbound prospect pipeline |
| `/how-it-works` | Step-by-step walkthrough of the automation workflow |
| `/demo` | Demo line plus the video demos |
| `/pricing` | Tiers, a la carte scenarios, Stripe checkout |
| `/about` | Founder background and company story |
| `/contact` | Contact form and inbox routing |
| `/book-a-demo` | Redirects to the Google Calendar booking page |
| `/success` | Post-checkout confirmation |
| `/privacy`, `/privacy-policy` | Privacy policy |
| `/terms` | Terms of service |

## Demo videos

Seven self-contained HTML animations in `public/demos/`, embedded through `components/HomeDemoVideo.tsx`.

| File | Subject | Where it appears |
|---|---|---|
| `video1.html` | Full speed-to-lead overview | `/`, `/demo` |
| `video2.html` | Capture everywhere (four lead channels) | `/demo` |
| `video3.html` | Quote follow-up | `/demo`, `/follow-up` |
| `video4.html` | Invoice follow-up | `/back-office` |
| `video5.html` | Lead-gen pipeline | `/lead-generation` |
| `video6.html` | Database reactivation | `/follow-up` |
| `video7.html` | AI call answering | `/call-dispatch` |

Each file is a fixed 1600x900 stage that scales to its container, with fonts self-hosted from `public/demos/fonts/` so nothing is fetched at runtime. They autoplay, loop, and expose a play/restart bar.

**Editing timing:** every animation delay is absolute from page load, so changing one scene's length means shifting every delay after it, plus the loop total and the progress bar. Do that with a script, not by hand. Derived values (playbar totals, scene comments, header durations) are computed from `TOTAL` and the scene CSS rather than duplicated, so they cannot drift.

`components/HomeDemoVideo.tsx` handles the embed: it restarts a demo when it scrolls into view (they loop from page load, so a below-fold embed would otherwise be mid-scene), and the Expand button uses the Fullscreen API, falling back to a modal where that is unavailable.

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If `npm` is blocked by PowerShell execution policy, call node directly:

```powershell
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev
```

### Other commands

```bash
npm run build   # production build
npm run lint    # eslint
npm start       # serve the production build
```

There is no test suite.

### Known lint state

`npm run lint` reports one error: `components/Navbar.tsx` calls `setState` synchronously inside an effect (`react-hooks/set-state-in-effect`). Pre-existing, not a regression.

Lint also walks `public/` and `.claude/worktrees/`, so it surfaces issues in `public/video/product-overview/*.jsx` and in any stale git worktrees. Those are not part of the Next.js app.

## Contact

- **Email**: info@currentautomations.ca
- **Demo line**: +1 365 299 3366. Call it, let it ring to voicemail, and the missed-call automation texts you back.
- **Booking**: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb
