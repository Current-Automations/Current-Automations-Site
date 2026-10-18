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
