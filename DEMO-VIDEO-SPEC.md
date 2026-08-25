# Demo Video Spec + Scene Brief

How the animations in `public/demos/` are built, and the template to brief a new one.

Two parts. **Part 1** is the technical contract, which does not change between videos.
**Part 2** is the brief you fill in, which is the only creative input needed.

Derived from the seven existing videos, which share one format almost exactly. Six are
three-scene. `video1` is the outlier at seven scenes and 89s, the full overview.

**Prior art, and where it disagrees.** The vault holds the original per-video build
prompts at `Life OS/Business/Operations/Demo Video Design Prompts.md`, written before
video4 to video7 were built, alongside `Demo Video Roadmap.md` which ranks what is built,
what is scoped, and what is permanently skipped. Read both before planning a new video.

Those prompts describe intent; this file describes what actually shipped, and the two have
drifted. The prompts specify "Georgia or serif fallback" for headlines, but every shipped
video uses Barlow Condensed. Where they disagree, **this file wins**, because it was read
out of the code rather than written before it.

---

# Part 1: House style (the contract)

## Stage

Fixed **1600x900**, absolutely composed. Nothing is viewport-relative. `#stage` is
centred and scaled by script; the CSS never adapts.

```
#stage{width:1600px;height:900px;position:absolute;left:50%;top:50%;
       transform-origin:center center;transform:translate(-50%,-50%) scale(1)}
```

`fitStage()` sets `k = min(innerWidth/1600, innerHeight/900)` with a floor of `0.5`, and
a `--boost` of `min(1.35, max(1, 0.55/kRaw))`. Both are exposed as CSS custom properties
so small type can defend itself:

```
font-size: max(13px, calc(11px / var(--stagek,1)));
```

Use that pattern for anything under roughly 14px. Everything larger is a plain px value.

## Palette and type

```
--teal:#4fd0ad   --teal-soft:rgba(79,208,173,.18)
--navy:#07111d   --ink:#fff
--muted:rgba(255,255,255,.62)   --dim:rgba(255,255,255,.5)

--display:'Barlow Condensed'   --sans:'Barlow'   --mono:'IBM Plex Mono'
```

Fonts are **self-hosted** from `public/demos/fonts/` as woff2 and declared with
`@font-face` in every file. Nothing is fetched at runtime. Copy the block verbatim.

Background is a radial on `#viewport`. `#stage::before` lays a vignette plus a 1px
repeating scanline over everything at `z-index:50`. Copy both verbatim.

`.sigil` sits top-left at 36/40px: a teal dot with a glow, plus the wordmark in
uppercase letterspaced `--sans`.

## Animation vocabulary

Twelve keyframes, shared by every file. Do not invent new ones without a reason.
Per-video extras such as `ring` and `borderTeal` are defined next to the element
that uses them.

| Name | Use |
|---|---|
| `sceneIn` | Scene wrapper. 0% op 0, 5% op 1, 95% op 1, 100% op 0 |
| `fadeUp` | Default entrance, 28px rise |
| `fadeIn` / `fadeOut` | Plain opacity |
| `pop` | Card or artifact entrance, scale .96 to 1 |
| `slideRight` / `slideLeft` | Lateral entrance, 40px |
| `slam` | The hook line. scale 1.4 plus blur 8px, overshoots to .96, settles at 1 |
| `holdGlow` | Infinite teal text-shadow pulse on the hook |
| `heroGrow` | Hook creeps to scale 1.15 across its hold |
| `setupDim` | Setup lines fall to opacity .42 behind the hook |
| `blink` | Cursors, live indicators |

### Three rules that have already been broken once

1. **All delays are absolute from page load.** There is no per-scene clock. Shortening a
   scene means shifting every delay after it, plus `TOTAL` and the playbar. Never
   hand-edit timings, script the shift.
2. **`heroGrow` and `setupDim` use `forwards`, never `both`.** With `both` the backwards
   fill applies from t=0, pinning the hook at `scale(1)` through its entrance and killing
   the overshoot.
3. **Derived values stay derived.** `TOTAL` drives the playbar. Scene comments and
   durations are regenerated, not typed. They have silently drifted before.

## Scene skeleton

```
#s1{animation:sceneIn 7.05s 0s both}
#s2{animation:sceneIn 15s 7.05s both}
#s3{animation:sceneIn 6s 22.05s both}
```

Each scene is `<section class="frame" id="sN">`, and `.frame` is
`position:absolute;inset:0;display:grid;place-items:center;opacity:0;padding:76px`.

`TOTAL` in the script is **last scene end plus 500ms** of black before the loop restarts.

### Scene 1, the hook (7.05s)

Exactly **three setup lines plus one slam line**, left-aligned in a `.stack` with 20px
gap and `max-width:1200px`.

```
.l  = 500 76px/1.05 display, white
.l1 fadeUp .8s @0.25s   +  setupDim .55s @3.55s forwards
.l2 fadeUp .8s @1.05s   +  setupDim .55s @3.55s forwards
.l3 fadeUp .8s @1.85s   +  setupDim .55s @3.55s forwards
.slam = 500 106px/1.05 display, teal, transform-origin:left center
        slam .65s @2.9s cubic-bezier(.2,.9,.2,1) both
      + holdGlow 3s @3.55s infinite
      + heroGrow 3.15s @3.55s forwards
```

The setup lines never leave. The hook takes the frame by growing while they dim behind it.

### Scene 2, the mechanism (about 15s)

`h1` at 56px teal, `.sub` at 20px muted underneath, then the artifact: a card, a list, a
pipeline, whatever the video is actually showing. This is the only scene that differs
meaningfully between videos. Stage its states with `pop`, then reveal changes with small
purpose-built keyframes defined inline.

### Scene 3, the closer (about 6s)

Exactly **two payoff lines**, then wordmark, then URL, then a bar.

```
Current Automations
currentautomations.ca
```

## Playbar

Fixed pill, bottom 26px, `opacity:.35` rising to 1 on hover, `z-index:200`. It overlays
roughly the bottom 80px of the frame, so **leave about 95px of clearance below the last
line of text** or it reads as crowded even when geometrically centred.

## Writing the lines

The format lives or dies on the copy. Observed pattern across all seven:

- **Setup lines are very short.** "It's 9pm." / "A customer calls." / "You're not
  answering tonight." Present tense, second person, concrete nouns.
- **Line 3 is the resignation**, the moment the reader accepts the loss. "So you moved
  on." / "Doing nothing." / "Most of it is dead ends."
- **The slam is the turn, three to six words.** "Someone still should." / "That job was
  still available." / "That list is money." / "Not anymore."
- **Closer line 1 is a noun phrase, line 2 is the state change.** "Names you forgot you
  had." / "Booked again."
- No jargon, no adjectives doing work a noun should do, no em dashes.

## If it is going to Instagram

New videos should keep the important content inside a **centred 1080x608 band** of the
1600x900 stage, because the vertical wrapper scales the whole stage to 1080 wide and puts
a hook headline above it and the CTA below. Anything hugging the far left or right edge
still works on the site but will feel cramped once wrapped.

**Never bake a phone number into a video.** Numbers change. The CTA belongs in the
wrapper and the bio, where it can be edited without re-rendering the asset.

---

# Part 2: Scene brief (fill this in)

Everything below is the complete creative input for a new video. Fill it in, hand it over
along with this file, and the HTML can be written without further questions.

```
WORKING TITLE:

THE PAIN (one sentence, plain):

WHO IT IS FOR (trade / role):

--- SCENE 1: HOOK (7.05s) ---
Setup line 1 (the situation):
Setup line 2 (what goes wrong):
Setup line 3 (the resignation):
SLAM line (the turn, 3 to 6 words):

--- SCENE 2: MECHANISM (about 15s) ---
Headline (56px teal, one line):
Subline (20px, one line):
What is on screen (card / list / pipeline / inbox / phone):
State 1:
State 2:
State 3:
What the viewer should understand by the end:

--- SCENE 3: CLOSER (about 6s) ---
Payoff line 1 (noun phrase):
Payoff line 2 (the state change):

--- NOTES ---
Target duration:
Research to fold in (Perplexity output, stats, specifics):
Anything to avoid:
```

## Worked example, three-scene (video7, as shipped)

```
WORKING TITLE: AI Answers, You Don't Have To
THE PAIN: Calls come in after hours and nobody picks up, so the job goes elsewhere.
WHO IT IS FOR: Any owner-operated trade taking calls on their own phone.

SCENE 1
  Setup 1: It's 9pm.
  Setup 2: A customer calls.
  Setup 3: You're not answering tonight.
  SLAM:    Someone still should.

SCENE 2
  On screen: a call card that rings, then moves through three status states
  States: incoming -> answered -> booked

SCENE 3
  Payoff 1: Every call answered.
  Payoff 2: Every job booked.
```

Duration 28.55s. Scenes at 0 / 7.05 / 22.05.

---

# Part 3: The loop format (social only)

A second, much smaller format. **Not a shortened three-scene video.** Different build,
different rules, and it never goes on the website.

## Why it is separate

All seven existing videos loop, but they fade to opacity 0, hold 500ms of black, then
hard-restart. On the site that is correct. On Reels a black gap reads as *the video
ended*, and that forfeits the only real advantage of a short clip: repeat views count as
watch time. A 6s clip watched three times outperforms a 40s clip abandoned at 30%.

So a loop asset has one requirement above all others.

> **The last frame must match the first.** No fade out, no black tail, no restart. The
> goal is that the clip reads as infinite length, with no visible seam to point at.

Pixel-identical is the safe default, but it is not the real bar. Close is usually enough,
especially for anything with organic motion. What actually breaks a loop is an element
caught **mid-transition** at the seam, since that produces a visible jump. Drift of a few
pixels on a settled element does not.

## Rules

- **4 to 8 seconds.** Long enough to read, short enough to cycle several times before a
  thumb moves.
- **One artifact, one state cycle.** A card moving through three states and returning to
  the first. Nothing else on screen competing.
- **No scene system.** No `sceneIn`, no `#s1`/`#s2`/`#s3`, no `TOTAL`, no `restart()`.
  Every animation is `infinite` on one shared cycle duration. The file is far smaller
  than a three-scene video and has no control script beyond `fitStage()`.
- **No playbar.** It is a social asset, not a site embed, so the bottom 95px of clearance
  rule does not apply here.
- **No hook lines and no closer scene.** The vertical wrapper carries the hook headline
  and the CTA. At most one short label inside the loop itself.
- **Keep the wordmark**, small, in the `.sigil` position. It is the only branding in the
  asset.
- **Reads with sound off**, same as everything else. No narration, no captions to sync.

## Building the seam

The cycle must return to its start state. Two ways, both fine:

1. **Return-to-origin.** The artifact moves through states and the final keyframe restores
   the initial values exactly. Cleanest when the content is genuinely cyclical, which most
   of these are.
2. **Crossfade at the seam.** Two stacked copies offset by half the cycle, each fading
   opposite the other. Use only when returning to origin would look mechanical.

Do not use `alternate`. It reverses the motion, which reads as a mistake rather than a loop.

## Where the first ones come from

These do not need authoring from scratch. **Scene 2 of an existing video is already a
built artifact with staged states**, which is exactly a loop's content. Lift it, strip
the scene wrapper, make the animations infinite, and close the seam.

Best candidates, in order of how cleanly they cycle:

| Source | Artifact | Cycle |
|---|---|---|
| video7 | Call card | incoming, answered, booked, reset |
| video3 | Quiet quote | sent, silence, follow-up fires, reply |
| video4 | Invoice | issued, ignored, reminder, paid |
| video6 | Old customer list | dormant rows, messages fire, bookings land |

The missed-call-to-text-back sequence is the single most important one to have, since it
is the product people actually buy first and it cycles naturally. It currently lives
inside video1, which is the seven-scene outlier, so it needs lifting rather than copying.

## Loop brief (fill this in)

```
WORKING TITLE:

ARTIFACT (what is on screen, one thing):

CYCLE (must return to state 1):
  State 1:
  State 2:
  State 3:
  back to State 1

LABEL (optional, one short line, or none):

CYCLE LENGTH (4 to 8s):

SEAM METHOD (return-to-origin / crossfade):

LIFTED FROM (existing video scene 2, or new):
```
