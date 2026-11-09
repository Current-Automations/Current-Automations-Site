# Week 7 packet (Mon 2026-11-09 to Sun 2026-11-15), IN PROGRESS

Rebuilt Sun 2026-11-08 by hand from the Saturday routine's log (its push 403'd again, GitHub App not installed). Paused mid-session; the captions below are locked by him in chat, the queue is NOT written yet.

## Locked 2026-11-08 (his calls)
- Captions straight and to the point, saying exactly what we do (his note on video5).
- video2 clip changed: GBP message now "Hi, our water heater is leaking, can someone come out today?", intent "Leaking water heater · today" (`public/demos/video2.html`, re-rendered story + feed, music re-muxed; old cuts in `brand/social-cuts/out/_backup-2026-11-08/`). Site demo needs a deploy.
- video2 stays Wed at 51s; no home post this week.
- Post time stays 5:00 EST (cron `0 10 * * *` unchanged).
- "Possible invented proof" lint flag on the teardown 2 LinkedIn opener overruled ("no merit").

## Still to do on restart
1. **LinkedIn clash:** week-06 packet says Mon 11/9 8:00 is already scheduled on the page (stat21 single image) and Mon 11/16 (statrg). Teardown 2 LinkedIn would double Monday; bank it for 11/23 unless he says otherwise. Read the page's scheduled list back.
2. Write the W46 queue in `data/social-queue.json` (three reels, 05:00 EST Mon/Wed/Fri), copy `video5.mp4`, `video2.mp4`, `teardown2.mp4` from `brand/social-cuts/out/story-music/` to `public/social/2026-W46/`, lint this packet, commit, deploy.
3. GBP Post E by hand: $99 + HST first device, $49 + HST each extra, ends "Text 365-299-3366."
4. Rebate: the program page says $125 for everyone who qualifies, no end date; the PDF terms (which an earlier week said give $100 except EAP kit recipients) were unreadable by fetch. Extract the PDF text before any caption or bot line states the figure. Earlier today Claude told him "$125 confirmed": that is page-only.

| Day | Platform | Post | Asset |
|---|---|---|---|
| Mon 11/9 5:00 | IG Reel + FB | video5, subcontractor list | `out/story-music/video5.mp4` |
| Wed 11/11 5:00 | IG Reel + FB | video2, every channel in one place (re-rendered) | `out/story-music/video2.mp4` |
| Fri 11/13 5:00 | IG Reel + FB | teardown 2, quote follow-ups | `out/story-music/teardown2.mp4` |
| Mon 11/9 8:00 | LinkedIn | stat21 (already scheduled); teardown 2 banked to 11/23 pending his call | |
| Sun 11/15 | GBP | Post E | text, by hand |

FB copy: same caption, bio line swapped for `currentautomations.ca/book-a-demo`, no hashtags.

---

## video5 (Mon 11/9)
```
Tell us the trade, the region, the crew size, and whether they need to be licensed and bonded.

We find the subs that fit and send back a list with a named person to call at each company. That skips the crews that are too small and the contacts who left two years ago.

You make the calls. We do the digging, and we do it fast.

Free walkthrough in bio.
```
`#automation #durhamregion #smallbusinessautomation #subcontractors #contractorlife`

## video2 (Wed 11/11)
```
Calls, texts, the web form, a message on your Google profile. We tie all four together.

Each lead gets its own reply. A missed call gets a text back in 9 seconds. Then you get one summary of every lead and where it came from, so you're not checking four inboxes after the last job.

Link in bio.
```
`#automation #durhamregion #smallbusinessautomation #leadmanagement #tradesbusiness`

## teardown 2, IG (Fri 11/13)
```
You send the quote. We send the follow-ups.

A text on day 0 checks it arrived. Two days later one says the timing still works, and on day 5 a last one says the quote stays open. All in your name, and they stop the moment the customer replies.

In the clip it's a $1,400 quote, and the customer writes back asking to book this week.

Free walkthrough in bio.
```
`#automation #durhamregion #smallbusinessautomation #followup #quotes`

## teardown 2, LinkedIn (banked, see item 1)
```
A $1,400 quote goes out on day 0. By day 5 the customer has written back asking to book this week, and nobody at the shop had to remember to chase it.

The follow-up runs on a schedule. A message on day 0 checks the quote arrived. Two days later another says the timing still works, and on day 5 a last one says the quote stays open. Each goes out in the owner's name, and the whole thing stops as soon as the customer replies, yes or no.

The owner sends the quote and has the conversation when it comes back. The remembering in between is the part we take off their plate.

If you want to see it run on your own quotes, the walkthrough link is on our page.

#automation #smallbusiness #followup
```
