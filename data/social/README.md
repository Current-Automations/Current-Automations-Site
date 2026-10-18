# Social packets and banks

Source of truth for what gets posted, moved here from `brand/social-cuts/` on 2026-10-18 so the
Saturday draft routine can read it. Captions are marketing copy and the repo is public; nothing
private goes in here.

- `week-NN-packet.md`: one week each, the table, every caption, what is still owed. The newest one is the current week.
- `we-run-this-packet.md`: the five-post series on systems we run ourselves (no clips recorded yet).
- `text-door-packet.md`: the demo-line text door series.
- `social-queue.json` (one folder up): the machine-read queue the publisher fires from.

Rendered media stays in OneDrive (`brand/social-cuts/out/`) and is copied into `public/social/<ISO week>/`
when a week is queued. The routine writes the queue with those paths; the Sunday session copies the files.
Captions go through `humanize` before they land here, and nothing is approved until he says so.

## Caption rules (the routine and the Sunday session both follow these)

- Company "we", never "I". No client claims, no absolute claims ("every call, handled"), no volunteered weaknesses.
- Every fact comes from the asset: the dollar figure, the day count, the time on the call. Nothing invented, no made-up anecdote, no customer story that is not sourced.
- Mechanism, not subject. Never BlinkzKnowzBall, picks, the journal or the job search.
- Home posts show the system and never say whose house. Nothing not installed is shown as running; a built scene says "This is a built scene, not phone footage."
- 60 to 140 words on Instagram. Vary the opening and the close across the week; one post can be three lines. No "not X, it is Y", no one-line closer that sounds like a saying, no closing question, no three fragments in a row.
- Door line last: "Free walkthrough in bio" or "Link in bio" (business), "Text a photo of it to 365-299-3366, it answers" (home). The demo line is 1 365 299 3366 when it is the point.
- Instagram hashtags on their own line: `#automation #durhamregion` plus `#smallbusinessautomation` or `#smarthome`, then two swapped per post. None on Facebook.
- Facebook copy is the same caption with the bio line swapped for `currentautomations.ca/book-a-demo` (business) or the text line (home).
- LinkedIn: 150 to 300 words, a fact in the first line, three hashtags max, ends on a fact or a plain invitation. Google Business: two or three sentences, price with "+ HST", ends "Text 365-299-3366, it answers."
- No em dashes anywhere. Lint with `py -3 scripts/humanize-lint.py data/social/week-NN-packet.md` (copy of the humanize skill's checker). A source line may close a post; the same sign-off on three posts may not.
- Reddit is never drafted.
