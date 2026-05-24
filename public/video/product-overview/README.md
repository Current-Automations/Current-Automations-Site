# Current Automations — Product Overview Film

Concept demo video for Canadian trades owners. ~87-second master plus three cut-down variants. Built scene-by-scene using React + JSX, with custom motion via an in-house animation engine.

---

## What's in this folder

### Playable files (the videos)
- **`standalone/`** — **start here**. Each file is a single self-contained HTML that opens by double-clicking. No server, no internet, no install. These are what you screen-record into MP4.
  - `Storyboard Video (87s master).html` — full film
  - `Storyboard Video - 60s Social.html`
  - `Storyboard Video - 30s Pre-roll.html`
  - `Storyboard Video - 15s Bumper.html`

### Source files (for editing / handoff)
- `Storyboard Video.html` and the three `Storyboard Video - …` files in the root — same content as `standalone/`, but reference external `.jsx` files. Use these if you want to edit. Will NOT play if you just double-click them (browsers block local file fetches); see "Run locally" below.
- `scenes/` — every animated scene as its own JSX file (`chrome.jsx`, `cold-open.jsx`, `scenario1.jsx` … `scenario4.jsx`, `dashboard.jsx`, `cta.jsx`, `timemap.jsx`).
- `animations.jsx` — animation engine (Stage, Sprite, easings, scrubber).
- `assets/icon.png` — brand mark (also inlined as base64 in `scenes/chrome.jsx`).

### Documents
- `index.html` — overview/landing page that links to everything.
- `Storyboard & Script.html` — full production document: storyboard table, three-beat breakdown per scenario, voiceover script, brand vocab, production notes.

---

## Producing shareable MP4s (the real deliverable)

HTML is the source you record from — not what you send to anyone. To turn each cut into an MP4:

1. Open the file from `standalone/` in Chrome or Edge.
2. Press the play button (the cut auto-plays and loops).
3. Use a screen recorder to capture the canvas during one full loop:
   - **macOS:** QuickTime → File → New Screen Recording → drag a selection over the video frame. Or use the built-in `⌘+Shift+5` and select "Record Selected Portion".
   - **Windows:** Xbox Game Bar (`Win+G`) → Capture → Record.
   - **Anything cross-platform / better:** [OBS Studio](https://obsproject.com/) — free, gives you 1920×1080 60fps recording with no taskbar in frame.
4. Hit play in the video tab the moment you start recording. Stop recording the moment the playhead returns to 0 (each cut auto-loops, so the boundary is obvious).
5. Trim and export to MP4 (`.mov` from QuickTime works on most platforms too).

**Recommended record settings:** 1920×1080, 60fps, H.264 (or H.265 if uploading to YouTube). The film is designed at 1920×1080 — full-screen the browser window before recording for a clean capture without the URL bar.

---

## Run locally (source files, for editing)

The HTMLs in the root reference external `.jsx` files via `<script src="…">`. Browsers refuse those fetches when the page is opened from disk (`file://`). You need a tiny local web server:

```bash
# From this folder, in a terminal:
python3 -m http.server 8000

# Then open in your browser:
# http://localhost:8000/index.html
```

Or, in VS Code, install the "Live Server" extension and right-click `index.html` → "Open with Live Server".

The `standalone/` files do not need any of this — they're fully inlined.

---

## Editing notes

- Scene timing is absolute (master timeline runs 0–87s). Cut-down variants use a `TimeMap` wrapper (in `scenes/timemap.jsx`) that remaps an outer playback clock to non-contiguous segments of the master — so any edit to a scene flows through to the master and all three cuts automatically.
- After editing source `.jsx` or `.html` files, re-bundle the `standalone/` outputs (the bundler walks the dependency graph and inlines everything into single files).
- **CTA button:** the "Book Free Audit" button on the end card links to the real Google Calendar booking URL. If you ever need to change it, update `href` in the `CTAButton` function in `scenes/cta.jsx`, then re-bundle the `standalone/` files.
- **Concept-demo framing:** the dashboard and copy treat "Northstar Mechanical" as a fictional sample business — not a real client. Keep all language as "here is what the system does," never "here is what we delivered."

---

## Contact

- admin@currentautomations.ca
- 416 · 509 · 7474
