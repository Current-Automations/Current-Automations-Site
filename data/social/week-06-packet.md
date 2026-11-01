# Week 6 packet (Mon 2026-11-02 to Sun 2026-11-08)

Drafted Sun 2026-11-01 by hand. The Saturday routine (Sat 10/31 21:00) drafted this week, but GitHub refused its push again (the Claude GitHub App is still not installed on the org), so the Sunday session rebuilt it locally from the routine's log. Queue: `site/data/social-queue.json`, week 2026-W45. Nothing in it is approved.

## State going in

- Business bank is empty. Everything drafted has posted or is queued; teardown 1 stays held for its on-screen absolute claim; the we-run-this and text-door series have no clips recorded. `OneDrive/CA Clips` is still empty. So all three IG slots are home posts, all three built scenes.
- Results Grow case card (`w44-statrg`, approved, set for Sun 11/1 6:00 EST) did not go out this morning: 6:00 EST is 11:00 UTC and the cron fires at 10:00 UTC, which is 5:00 EST since the clocks fell back. It stays in the W45 queue unchanged and goes out at the Mon 11/2 run (5:00 EST), since the publisher posts anything approved, past due and not yet logged. Check #ca for this morning's "Publisher:" line to confirm it did not post.
- Post times this week are 5:00 EST (`T05:00:00-05:00`), the hour the cron actually runs now. A 6:00 EST time would wait 23 hours and post the next day. To get 6:00 back, the cron in `vercel.json` moves to `0 11 * * *` until DST returns in March (his call, not changed here).
- Rebate: the $125 figure is in doubt (the program's January 2026 terms say $100, $125 only for Energy Affordability Program kit recipients; the program page says $125). No caption this week carries a rebate figure or the "about $15" line. Saturday's thermostat post does not mention the rebate at all.

## The week

| Day | Platform | Post | Asset |
|---|---|---|---|
| Mon 11/2 5:00 | IG carousel + FB | Case card: three days to reply (Results Grow), carried from Sun 11/1 | `/social/2026-W44/statrg-1..2.png`, already in the repo |
| Mon 11/2 8:00 | LinkedIn | One trigger, four jobs (video9, built scene) | `out/feed/video9.mp4` (29s, 1080x1080, silent) |
| Tue 11/3 5:00 | IG Reel + FB | You leave, it locks up (video9, built scene) | `out/story/video9.mp4` (29s, silent, needs music) |
| Thu 11/5 5:00 | IG Reel + FB | The house wakes up first (video10, built scene) | `out/story/video10.mp4` (32s, silent, needs music) |
| Sat 11/7 5:00 | IG Reel + FB | Cool the house down from the car (home1, built scene) | `out/home1.mp4` (13s, silent, needs music) |
| Sun 11/8 | GBP | Post D, one leave-home routine | text below, by hand |

Monday has two IG posts back to back (the carried case card, then video9 on Tuesday). If that is too tight, video9 can move to Wed 11/4 and the rest stay put.

## True lines owed

One per post, his words, in chat. No true line, the post waits.

- video9 (Tue)
- video10 (Thu)
- home1 (Sat)
- LinkedIn Mon: his call whether it needs one (last week's stats post went without).
- GBP Post D: his call.

---

## video9, you leave, it locks up (Tue 11/3)

Home bank caption from week-03, rewritten so the door ends on the text line instead of "Link in bio" after a photo ask. Facts from the scene: phone crossing the driveway is the trigger, lights off, thermostat to eco, garage door confirmed shut, doors locked.

IG:
```
You leave for work with the lights on, the heat running and maybe the garage still open.

In this routine the trigger is your phone crossing the end of the driveway. Every light goes off, the thermostat drops to eco, the garage door gets confirmed shut and the doors lock. The clip shows each one tick off while you are already down the road.

No checklist at the door, and no turning the car around to check.

This is a built scene, not phone footage.

Text a photo of your lock or thermostat to 365-299-3366.
```
`#automation #smarthome #durhamregion #smartlock #geofence`

FB:
```
You leave for work with the lights on, the heat running and maybe the garage still open.

In this routine the trigger is your phone crossing the end of the driveway. Every light goes off, the thermostat drops to eco, the garage door gets confirmed shut and the doors lock. The clip shows each one tick off while you are already down the road.

No checklist at the door, and no turning the car around to check.

This is a built scene, not phone footage.

Text a photo of your lock or thermostat to 365-299-3366.
```

## video10, the house wakes up first (Thu 11/5)

Home bank caption from week-03, reworked. The scene opens on "Cold house" and then shows the AC cooling the room, so the caption drops "cold" and says what the card shows. Facts from the scene: weekday 5:40, AC since 5:40, blinds partway, lights up slow, NFC tag tap, coffee, weather and the day and anything that broke overnight, podcast in the kitchen.

IG:
```
The alarm goes off at 6 and the room is still dark.

Part of the morning has been running since 5:40 on a weekday. The AC has the room cool, the blinds open partway and the lights come up slow. The rest waits for a tap on an NFC tag, wherever you put it: the coffee starts, the weather and your day get read out with anything that broke overnight, and your podcast picks up in the kitchen.

Which steps run on their own and which wait for the tap gets set when we build it.

This is a built scene, not phone footage.

Send a photo of the bedroom thermostat to 365-299-3366.
```
`#automation #smarthome #durhamregion #morningroutine #nfc`

FB:
```
The alarm goes off at 6 and the room is still dark.

Part of the morning has been running since 5:40 on a weekday. The AC has the room cool, the blinds open partway and the lights come up slow. The rest waits for a tap on an NFC tag, wherever you put it: the coffee starts, the weather and your day get read out with anything that broke overnight, and your podcast picks up in the kitchen.

Which steps run on their own and which wait for the tap gets set when we build it.

This is a built scene, not phone footage.

Send a photo of the bedroom thermostat to 365-299-3366.
```

## home1, cool the house down from the car (Sat 11/7)

Week-01's held caption said "Tell me" and promised real footage later; both are out. Facts from the scene: one line to Siri twelve minutes before the door opens, thermostat to 68°F, AC on for the whole house, living room 74°F to 70°F, 68°F reached, built with a Shortcut. No rebate mention.

IG:
```
Twelve minutes from home, one line to Siri: cool the house down.

The thermostat sets to 68°F, the AC comes on for the whole house, and the living room is already down from 74 to 70 on the way there. No app opened. A Shortcut does the work, built once.

This is a built scene, not phone footage.

Text a photo of your thermostat to 365-299-3366.
```
`#automation #smarthome #durhamregion #siri #shortcuts`

FB:
```
Twelve minutes from home, one line to Siri: cool the house down.

The thermostat sets to 68°F, the AC comes on for the whole house, and the living room is already down from 74 to 70 on the way there. No app opened. A Shortcut does the work, built once.

This is a built scene, not phone footage.

Text a photo of your thermostat to 365-299-3366.
```

## LinkedIn (Mon 11/2, 8:00)

Upload `out/feed/video9.mp4` (the square cut) as a video. Tuesday's Reel uses the same scene, so this text takes the why-one-trigger angle.

```
One trigger, four jobs. When a phone crosses the end of the driveway, the house turns every light off, sets the thermostat to eco, confirms the garage door is shut and locks the doors.

That is the scene in this clip, and it is a built scene, not phone footage from an install. The part worth looking at is the order. A lot of homes already have a few of these devices, each with its own app and its own schedule: a lock that locks at 9, a thermostat on a timer, lights on a routine that assumes you leave at the same time every day. None of them know you actually left.

A location trigger makes leaving the event. Everything else hangs off it in one routine, and the last step checks the garage door and reports it shut, so nobody turns the car around at the end of the street.

We set these up in Durham Region with the devices a home already has: plug-in, battery and Wi-Fi gear, nothing inside the walls. $99 + HST covers the first device and one automation built while you watch.

Text a photo of the lock or thermostat to 365-299-3366, or book a free walkthrough at currentautomations.ca/book-a-demo
```
`#smarthome #automation #durhamregion`

## Google Business Profile (Sun 11/8, by hand)

Post D, new this week (A, B and C are in `brand/home-lane-listings.md`). B quotes $125 and should not be reused until the rebate amount is confirmed.

```
We build one routine that runs when you leave: lights off, thermostat down and doors locked, using the devices you already own. $99 + HST covers the first device and one automation built while you watch, Oshawa to Pickering. Text 365-299-3366.
```

## Media to copy

Not copied yet. All three Reel sources are silent (measured -91 dB, an empty audio track), and the publisher posts the file as is, so a silent cut would go out silent on approval. Bake music first the way video8 was done 10/25 (a freetouse.com pack track, faded, matched to teardown4's loudness, about -24 LUFS), write it to `out/story-music/`, then copy.

| Source (`brand/social-cuts/out/`) | Destination (`site/public/social/2026-W45/`) |
|---|---|
| `story-music/video9.mp4` (to be baked from `story/video9.mp4`) | `video9.mp4` |
| `story-music/video10.mp4` (to be baked from `story/video10.mp4`) | `video10.mp4` |
| `story-music/home1.mp4` (to be baked from `home1.mp4`) | `home1.mp4` |

LinkedIn uploads `out/feed/video9.mp4` by hand; it is not copied.

## Still needs you

- True lines for video9, video10 and home1, or "leave it" on each.
- Music: say go and the three get baked from the pack (one track each, not reused from video8's), or pick tracks.
- home1 and video10 both show the AC cooling the house. They post in November. Say if that reads wrong and they wait for spring; the only other home asset left is the 9/08 carousels, which still say "I".
- Post times: 5:00 EST this week, or move the cron to `0 11 * * *` for 6:00.
- Mon 11/2: the carried case card and video9 land two days running. Leave it, or video9 moves to Wed.
- A clip in `OneDrive/CA Clips`. Anything real from the phone goes ahead of the bank.
- Install the Claude GitHub App on the Current-Automations org so Saturday's routine can open its PR: https://github.com/apps/claude/installations/select_target
