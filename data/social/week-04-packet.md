# Week 4 packet (Mon 2026-10-19 to Sun 2026-10-25)

Drafted Sun 2026-10-18 by hand, standing in for the Saturday draft routine (`ops/social/DRAFT-ROUTINE.md`, not created yet). Supersedes the 10/19 to 10/24 rows of `week-03-packet.md`.

Nothing here is approved. The queue (`site/data/social-queue.json`, week 2026-W43) holds every IG / FB post with `approved: false` and no true line.

## State going in (read from the repo, not from the accounts)

- `week-03-packet.md` says the three IG posts below, their FB copies and the three LinkedIn posts were **scheduled on 2026-10-06** in Business Suite and in LinkedIn's scheduler. He confirmed Sun 10/18 evening: Tue, Thu and Sat are in the Business Suite Planner. LinkedIn not re-checked. Nothing in the queue gets approved while those copies stand, or a post goes out twice.
- The Saturday Story test (`w42-story-test`) never ran: it was never approved, so the cron skipped it and Meta Live mode is still unproven. It is re-dated below.
- `CA Clips` folder: does not exist on this PC's OneDrive, no new clips anywhere in the repo since 10/2. The we-run-this series (`we-run-this-packet.md`) has captions but no recordings, so none of it can post yet.
- The publisher can only fire from the 6:00 ET daily cron. `CRON_SECRET` is a Vercel Secret and unreadable, so there is no by-hand trigger.

## The week

| Day | Platform | Post | Asset | Where it lives |
|---|---|---|---|---|
| Mon 10/19 6:00 | IG Story | Story test, `w43-story-test` | `stat78-1.png` | queue only; first API post, proves Live mode |
| Mon 10/19 8:00 | LinkedIn | Stat: 78%, single image | `out/stat78-slide-1.png` | LinkedIn scheduler (10/06), text in week-03 |
| Tue 10/20 6:00 | IG carousel + FB | Questions we get asked | `out/faq-slide-1..7.png` | Business Suite (10/06); queue copy `w43-faq` |
| Wed 10/21 8:00 | LinkedIn | We do not automate everything, document | `out/linkedin-notall.pdf` | LinkedIn scheduler (10/06), text in week-03 |
| Thu 10/22 6:00 | IG Reel + FB | Teardown 3, chasing money | `out/story-music/teardown3.mp4` (18s) | Business Suite (10/06); queue copy `w43-teardown3` |
| Fri 10/23 8:00 | LinkedIn | Questions we get asked, document | `out/linkedin-faq.pdf` | LinkedIn scheduler (10/06). Cadence is now Mon + Wed only (grill 10/16): leave it or cancel it, his call |
| Sat 10/24 6:00 | IG carousel + FB | Stat: 21x | `out/stat21-slide-1..2.png` | Business Suite (10/06); queue copy `w43-stat21` |
| Sun 10/25 | GBP | Post B, thermostat rebate (Post A if A never went up) | text below | by hand in the batch hour |
| Mon 10/26 6:00 | IG carousel + FB | $125 thermostat rebate, first home post | `out/rebate-slide-1..4.png` | drafted below, queued as W44's first post once this week is approved |

Three IG posts in the Mon to Sun window, not four: the every-other-day cadence runs from Sunday's teardown 2, so the fourth lands Mon 10/26.

## How the switch to our pipeline works this week

1. Story test fired by hand Sun 10/18: pipeline fine, Meta refused (token scopes), token redo blocked by a Meta account review. Unapproved until the account clears. Check the account logged out after 6:00: if the Story shows, Live mode works.
2. If it shows: cancel teardown 3 (Thu) and stat 21x (Sat) in Business Suite, approve `w43-teardown3` and `w43-stat21` in the queue, Claude merges and deploys. Tuesday's FAQ stays in Business Suite, too close to move.
3. If it does not show: everything stays in Business Suite this week, nothing in the queue gets approved, and the App Review question gets answered before W44.

Either way the three posts go out once. The queue entries carry a note saying which copy to cancel.

## True lines owed

One per post, his words, typed in chat. Posts in Business Suite need it edited into the scheduled caption there (his click, CA profile); posts moved to the queue get it in `trueLine`.

- FAQ carousel
- Teardown 3
- Stat: 21x
- Rebate carousel (before 10/26)

---

## Questions we get asked (Tue 10/20)

IG:
```
The five questions we get asked most, with the answers on the slides.

What gets automated first, what happens if missed calls are not the problem, and how long setup takes (business systems are usually live within 48 hours of your OK). Also whether you need to be technical, which you don't, and whether it fits how you already work, which it does.

If yours is not here, ask it in the comments, or book the free walkthrough from the link in our bio.
```
`#automation #durhamregion #smallbusinessautomation #smallbusinesstips #faq`

FB:
```
The five questions we get asked most, with the answers on the slides.

What gets automated first, what happens if missed calls are not the problem, and how long setup takes (business systems are usually live within 48 hours of your OK). Also whether you need to be technical, which you don't, and whether it fits how you already work, which it does.

If yours is not here, ask it in the comments, or book the free walkthrough at currentautomations.ca/book-a-demo
```

## Teardown 3, chasing money (Thu 10/22)

IG:
```
Invoice #2041 for $1,850 is still open on day 7, so a reminder goes out on its own and the customer writes back that they just sent payment.

Asking to be paid for work you already did is awkward, so most owners put it off. When the reminder arrives on a schedule it reads as routine to the customer, and nobody at the shop has to decide how firm to sound on a Thursday afternoon. You still get told when the money lands, and the thirty-minute walkthrough to set it up is booked from our bio.
```
`#automation #durhamregion #smallbusinessautomation #getpaid #smallbusinesstips`

FB:
```
Invoice #2041 for $1,850 is still open on day 7, so a reminder goes out on its own and the customer writes back that they just sent payment.

Asking to be paid for work you already did is awkward, so most owners put it off. When the reminder arrives on a schedule it reads as routine to the customer, and nobody at the shop has to decide how firm to sound on a Thursday afternoon. You still get told when the money lands, and the thirty-minute walkthrough to set it up is booked at currentautomations.ca/book-a-demo
```

## Stat: 21x (Sat 10/24)

IG:
```
Respond in five minutes instead of thirty and you are 21 times more likely to qualify the lead.

Five minutes is nothing on paper. On a job site it is impossible. Nobody is climbing down a ladder to answer a web form.

So the first response should not need a person. A text back, the details taken, the lead still warm when you get to it.

Source: MIT and InsideSales, Lead Response Management Study.

Free walkthrough in bio.
```
`#automation #durhamregion #smallbusinessautomation #speedtolead #leadfollowup`

FB:
```
Respond in five minutes instead of thirty and you are 21 times more likely to qualify the lead.

Five minutes is nothing on paper. On a job site it is impossible. Nobody is climbing down a ladder to answer a web form.

So the first response should not need a person. A text back, the details taken, the lead still warm when you get to it.

Source: MIT and InsideSales, Lead Response Management Study.

Free walkthrough at currentautomations.ca/book-a-demo
```

## LinkedIn (Mon 10/19 and Wed 10/21)

Both already in the company page's scheduler per week-03. If either is missing there, the paste-ready text is in `week-03-packet.md` under "Stat: 78%" (single image) and "We do not automate everything" (document, title `We do not automate everything`). Nothing new drafted for LinkedIn this week.

## Google Business Profile (Sun 10/25, by hand)

Check the Posts panel first. Post A (doorbell, $59 / $99) got a go on 10/11 and three Chrome attempts failed, so it may or may not be up.

Post B, if A is there:
```
Ontario pays $125 back on a qualifying smart thermostat if you heat with Enbridge gas or electric. We set it up for $99 + HST and tell you before we start whether yours qualifies. Text 365-299-3366, it answers.
```

Post A, if it never went up:
```
Doorbell in a box and no time to fight the app? $59 + HST onto your existing doorbell wire, $99 + HST with an automation built while you watch. Nothing rewired. Durham Region. Text a photo of it to 365-299-3366, it answers.
```

Add a photo to whichever goes up: the rebate slide 1 for B, a doorbell shot from the 10/12 batch for A if one exists, otherwise no photo.

## $125 thermostat rebate carousel (Mon 10/26, first home post)

Facts re-verified 2026-10-01 in week-03. Home posts show the system and never say whose house.

IG:
```
$125 back on a smart thermostat in Ontario.

The Home Renovation Savings program pays it on a qualifying smart thermostat if you are an Enbridge Gas customer heating with natural gas, or connected to the Ontario grid and heating or cooling electrically. It covers single and semi-detached homes, row and townhomes, and mobile homes on a permanent foundation, as long as you have not already claimed one through the program.

We tell you upfront whether the thermostat we are installing qualifies, and help you apply. Not sure what you have now? Send a photo of it. Link in bio.
```
`#automation #smarthome #durhamregion #smartthermostat #ontario`

FB:
```
$125 back on a smart thermostat in Ontario.

The Home Renovation Savings program pays it on a qualifying smart thermostat if you are an Enbridge Gas customer heating with natural gas, or connected to the Ontario grid and heating or cooling electrically. It covers single and semi-detached homes, row and townhomes, and mobile homes on a permanent foundation, as long as you have not already claimed one through the program.

We tell you upfront whether the thermostat we are installing qualifies, and help you apply. Not sure what you have now? Text a photo of it to 365-299-3366, it answers.
```

## Still needs you

- A clip. The CA Clips folder has nothing, so nothing from the we-run-this series or the home shot list can post. One phone clip a week is the floor from the 10/16 grill.
- The parent-phone test of the text door, still unlogged.
