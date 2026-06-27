# Current Automations Site

Marketing website for [currentautomations.ca](https://currentautomations.ca), Speed to Lead automation for trades and service businesses.

## Tech Stack

- **Framework**: Next.js 16.2.1 (App Router)
- **Language**: TypeScript
- **UI**: React 19
- **Styling**: Tailwind CSS v4
- **Fonts**: Google Fonts: Manrope + Fraunces
- **Deployment**: Vercel

## Pages

| Route | Description |
|---|---|
| `/` | Homepage - hero, how it works, why us, FAQ |
| `/about` | Founder background and company story |
| `/how-it-works` | Step-by-step walkthrough of the automation workflow |
| `/demo` | Live demo line and video |
| `/pricing` | Pricing plans and setup details |
| `/privacy-policy` | Privacy policy |
| `/terms` | Terms of service |
| `/book-a-demo` | Redirects to Google Calendar booking page |

## Demo Line

**+1 365 601 7474** - Call and let it go to voicemail. You will receive a text within 60 seconds demonstrating the missed-call automation.

## Development

On **macOS / Linux**:

```bash
npm install
npm run dev
```

On **Windows / PowerShell** (`npm` may be blocked by execution policy, use node directly):

```powershell
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Other commands

```powershell
# Production build
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run build

# Lint
& "C:\Program Files\nodejs\node.exe" "C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js" run lint
```

> `app/privacy/page.tsx` and `app/terms/page.tsx` have pre-existing unescaped-apostrophe lint errors, not regressions.

## Contact

- **Email**: info@currentautomations.ca
- **Booking**: https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0OTjmz9j1ktY0mE3akCYvLZ6qwzY3HKAd_IA4m4nqcqTzuzZJJQj8CzEw8p2jA7GKEkHyw_8wb
