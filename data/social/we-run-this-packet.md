# "We run on this" series: shot list + captions

Written 2026-09-30. Five posts. Each one shows a system we already run and says what the same
system does for a business. **Mechanism, not subject:** the viewer sees what the system does,
never what we use it for.

Jarrett records Sat 10/3 in the batch hour, on a sample shop (see below). Claude cuts each clip to 9:16 and 1:1 with the
headline on it. Jarrett posts. Each finished clip takes the next open slot ahead of the bank in
`week-03-packet.md` (first open slot is Sat 10/10).

## How it is recorded: one sample shop

Nothing personal is on screen because nothing personal is used. The systems are real; the data
is a made-up shop, **Rowan Plumbing Co.**, twelve jobs in `C:\Users\Jarre\tools\ca-demo-shop\jobs.csv`.
Captions say "we run this ourselves, here it is on a sample shop."

Built and tested 2026-09-30 (texts tested in print-only mode, no real text sent yet):

| Piece | What it does | Tested |
|---|---|---|
| `shop.py brief` | Writes the morning brief page from the jobs sheet and opens it | Yes, page checked |
| `shop.py watch` | Watches the sheet. Texts when a job changes, silent otherwise | Yes, two changes in a row, print-only |
| `shop.py move` | Moves one job (Helen Dvorak, Thu 2:00pm to Fri 9:00am, and back on the next press) | Yes, also through the deck launcher |
| `shop.py backup --break` | Runs the backup with the drive missing, texts the failure | Yes, print-only |
| `notes.py` (in `tools\call-notes`) | Voice memo in, transcript and call notes out | Yes, on a .wav |
| Deck keys | Morning Brief, Move a Job, Backup Fails in the Demo folder on the Business profile's CA page | Installed, not yet pressed on the device |

## Before Saturday

Done 2026-09-30: the keys are installed (Business profile, CA page, **Demo** folder at the
bottom left), your cell is in the local config, and a test text went out through Twilio.

Left for you: on the phone, save the demo line as a contact named `Rowan Plumbing Alerts` so
the texts show a name, not our number.

The cell number lives only in `C:\Users\Jarre\tools\ca-demo-shop\config.json` (not synced,
not in git). It removes itself after Sun 10/4. To remove it sooner: `py -3 shop.py forget`.

## Saturday run sheet

Every clip: 20 to 30 seconds, no talking, no music. Phone on Do Not Disturb with that one contact allowed.

| # | Post | Do this | Record |
|---|---|---|---|
| 1 | The morning brief | Press **Morning Brief** | Screen: the brief opening, then one slow scroll to the bottom |
| 2 | Calls into notes | Record a 30 to 60 second voice memo of a made-up service call, then `py -3 notes.py memo.m4a` in `tools\call-notes` (run it once beforehand so the first-run warning is gone) | Screen: terminal with a large font, from the command to the notes |
| 3 | Tell me when it changes | Start `py -3 shop.py watch` in a terminal and leave it. Wait three seconds, then press **Move a Job** | Phone screen: quiet, then the text landing |
| 4 | It says so when it breaks | Press **Backup Fails** | Phone screen: the failure text landing |
| 5 | One button | Press **Morning Brief** again | Phone camera, vertical, close on the key: finger, press, and the brief opening on the monitor behind |

Afterwards: `py -3 shop.py reset` puts the sheet back and `py -3 shop.py forget` removes your number. Drop the clips anywhere and tell Claude.

The texts read:
- Shot 3: `Rowan Plumbing Co.: Helen Dvorak, water heater install, moved from Thu 2:00pm to Fri 9:00am.` (day names follow the real calendar)
- Shot 4: `Rowan Plumbing Co.: last night's backup did not finish (backup drive not found). Nothing was lost.`

---

## Post 1: The morning brief

Headline on clip: **Written before you are up.**

IG:
```
Every morning at 6:57 a file gets written before anyone here is awake.

The day's plan, what is due, what carried over from yesterday. Nobody opens a laptop to make it. It is there when the day starts.

We run this ourselves. The clip is the same system pointed at a sample shop: yesterday's jobs, today's schedule, who has not been called back.

The owner reads one page with coffee and already knows where the day stands.

Free walkthrough in bio.
```
`#automation #durhamregion #smallbusinessautomation #smallbusinesstips #businesssystems`

LinkedIn:
```
Every morning at 6:57 a file gets written here before anyone is awake.

The day's plan, what is due, what carried over. Nobody builds it by hand. It is waiting when the day starts.

We run this ourselves. The clip shows the same system pointed at a sample shop: yesterday's jobs, today's schedule, the callbacks nobody got to.

An owner who starts the day already knowing where things stand makes better calls by 8am than one who spends the first hour finding out.

Book a free walkthrough: currentautomations.ca/book-a-demo
```
`#smallbusiness #automation #durhamregion`

## Post 2: Calls into notes

Headline on clip: **The call ends. The notes are already written.**

IG:
```
A phone call is the worst place to keep information.

Someone says what is wrong, when they need it, what they were quoted last time. Then the call ends and all of it lives in one person's memory until they forget.

We run a system that turns audio into notes: what was said, who said it, what matters. Here it is on a short recording.

For a shop, that is every call written down without anyone typing. What the customer asked for. What was promised. What happens next.

Free walkthrough in bio.
```
`#automation #durhamregion #smallbusinessautomation #customerservice #tradesbusiness`

LinkedIn:
```
A phone call is the worst place to keep information.

The customer says what is wrong, when they need it, and what they were quoted last time. Then the call ends and all of it lives in one person's memory.

We run a system that turns audio into notes: what was said, who said it, and what matters. The clip shows it on a short recording.

For a service business that means every call written down without anyone typing. What was asked for, what was promised, what happens next. The dispute three weeks later gets settled by a note instead of two people's recollections.

Book a free walkthrough: currentautomations.ca/book-a-demo
```
`#smallbusiness #automation #durhamregion`

## Post 3: Tell me when it changes

Headline on clip: **Quiet until something changes.**

IG:
```
Most alerts are noise. So people mute them, and then miss the one that mattered.

The alerts we run on ourselves follow one rule: say nothing until something changes. No hourly updates. No "all good" messages. Silence means nothing moved.

The clip is a sample shop: one job moves, one text lands. For a business that is a message when a job reschedules, a part arrives, or a customer replies. And nothing at all when nothing happened.

You stop checking. It tells you.

Free walkthrough in bio.
```
`#automation #durhamregion #smallbusinessautomation #scheduling #dispatch`

LinkedIn:
```
Most alerts are noise. People mute them, and then miss the one that mattered.

The alerts we run on ourselves follow one rule: say nothing until something changes. No hourly updates and no "all good" messages. Silence means nothing moved.

The clip shows it on a sample shop: one job moves, one text lands. For a service business that is one message when a job reschedules, a part arrives, or a customer replies, and nothing when nothing happened.

The office stops refreshing the schedule to see what changed. The change comes to them.

Book a free walkthrough: currentautomations.ca/book-a-demo
```
`#smallbusiness #automation #durhamregion`

## Post 4: It says so when it breaks

Headline on clip: **When it stops, it says so.**

IG:
```
The fear with automation is not that it breaks. Everything breaks.

The fear is that it breaks quietly, and you find out three weeks later when a customer asks why nobody called.

So everything we run reports its own failures. A job that stalls sends a message. A backup that goes stale raises a flag. Slow is reported before stopped.

It is the first thing we build into anything for a business. A system you have to check on is just another job.

Free walkthrough in bio.
```
`#automation #durhamregion #smallbusinessautomation #businesssystems #smallbusinesstips`

LinkedIn:
```
The fear with automation is not that it breaks. Everything breaks.

The fear is that it breaks quietly, and the owner finds out three weeks later when a customer asks why nobody called.

So the systems we run report their own failures. A job that stalls sends a message. A backup that goes stale raises a flag. Slow gets reported before stopped.

We build that in first, before the useful part, because a system someone has to check on is just another job on the list.

Book a free walkthrough: currentautomations.ca/book-a-demo
```
`#smallbusiness #automation #durhamregion`

## Post 5: One button

Headline on clip: **One press. The whole routine.**

IG:
```
Count the steps in something your office does ten times a day.

Open this. Copy that. Paste it there. Send the text. Update the sheet.

We put ours on a button. One press and the whole routine runs, in order, the same way each time. Here that is a sample shop's morning brief.

It does not have to be a physical key. It can be a link, a text, or a tag on the wall. The point is that ten steps become one, and nobody has to remember step six.

Free walkthrough in bio.
```
`#automation #durhamregion #smallbusinessautomation #productivity #workflow`

LinkedIn:
```
Count the steps in something the office does ten times a day.

Open this, copy that, paste it there, send the text, update the sheet.

We put ours on a button. One press and the routine runs in order, the same way each time. In the clip that is a sample shop's morning brief.

It does not need to be a physical key. A link, a text message or a tag on the wall does the same job. Ten steps become one, and nobody has to remember step six on a busy afternoon.

Book a free walkthrough: currentautomations.ca/book-a-demo
```
`#smallbusiness #automation #durhamregion`

---

## Held back on purpose

- **Job scout** (the weekday scan that files matches): good mechanism, a tender or lead watch for contractors, but there is no way to show it running without showing what it scans for. Caption-only at most, later.
- **Friends site** (PIN sign-in, saves send a ping): works as "a small customer portal", but every screen names BlinkzKnowzBall. Needs a neutral demo skin before it can be shown.
- **CardSnap:** stays out.
- **NFC lights tag:** home lane, already in `week-03-packet.md` under "Still needs you". Same Saturday session if there is time.
