# "Text us" clip: the demo line answering a real text

Written 2026-10-07. One clip, two cuts. Not posted, not recorded. Record only after the Twilio
webhook is flipped and the step 7 test in `ops/twilio/SMS-BOT-RUNBOOK.md` has passed.

**What it shows:** a stranger texts our line about a doorbell, and gets a straight answer, a price
and real times inside a minute. Mechanism, not subject: the thread is a made-up customer from a
second phone, and nothing on screen is anyone's real home or name.

## Before recording

- The GitHub token has to be in Vercel first (runbook step 2). Without it the bot says Jarrett
  will text times, and the clip loses its best moment.
- A second phone that is not your cell. Your cell's texts to the line are owner commands.
- On the test phone: Do Not Disturb on, dark mode on, keyboard suggestions off, the line saved as
  a contact named `Current Automations`.
- Screen recording on, portrait. No talking, no music.

## The thread (type these, wait for each reply)

1. `hi, I have a ring doorbell still in the box. can you set it up?`
2. When it asks the town: `Whitby`
3. When it asks about power or the old doorbell: `battery one`
4. `what days work?`
5. Pick one of the times, then give a first name and a street address when it asks.
6. **Stop recording once it confirms the hold.**

Afterwards, from your cell, send `CANCEL CODE` (code from the forward). That frees the slot and
texts the test phone that the visit is cancelled. Then delete the HOLD event on Google Calendar
by hand. Only go as far as booking once Make's Google connection has Calendar access (see the bot
runbook); until then stop at the offered times.

The bot writes its own replies, so the words on screen will differ from any draft. Check them
before posting: one price with "+ HST", no promise we have not made, and no emoji. If a reply
reads wrong, that is a prompt fix first and a re-record second.

## Cuts (Claude makes these from the recording)

- 9:16 for IG Reels and TikTok, 1:1 for LinkedIn and the Facebook Page.
- Headline on the clip: **Text us a photo. Get an answer.**
- Speed up the typing, never the replies, so the reply time stays honest. The time between
  messages stays visible in the status bar.
- Blur the test phone's number if it shows in the thread header.

## IG caption

```
Somebody had a Ring doorbell still in the box. This is the whole conversation.

They texted our line. A price came back with the tax on it, then two questions, then three real times this week. The whole thing took under a minute.

$99 + HST sets up your first device and walks everyone in the house through it. Oshawa, Whitby, Courtice, Bowmanville, Ajax, Pickering.

Text a photo of the device to 365-299-3366.
```
`#durhamregion #smarthome #whitby #oshawa #ringdoorbell`

## LinkedIn (company page)

```
Our demo line answers texts now. This clip is a doorbell question from start to finish.

A message comes in, and the reply gives the price with HST on it, asks the two things it needs, then offers three slots that are actually open this week. The slots come from our real schedule, and a time someone else just took gets turned down and replaced. Anything it should not handle, like a complaint or wiring behind a wall, goes straight to Jarrett's phone with the thread attached.

The same setup works for a shop that answers its own phone. The texts that come in after hours get an answer and a booked time that same night.

Text 365-299-3366 to try it, or book a walkthrough at currentautomations.ca/book-a-demo
```
`#smallbusiness #automation #durhamregion`

## Check before posting

- The bot's real words match what the captions say: a price with tax, two questions, three times.
  If it asked one question or offered two times, change the caption numbers to match.
- "Under a minute" only if the clip shows it.
- One true line from Jarrett is still owed on the IG version (house rule for outward posts). His
  call whether the doorbell framing is enough.
