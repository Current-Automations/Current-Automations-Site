// Port of ~/.claude/skills/humanize/lint.py (the parts that apply to one short reply)
// plus the slopmonster vocabulary. Strong hits mean rewrite; weak hits are notes.

const STRONG: [RegExp, string][] = [
  [/\b(?:is|are|was|were|do|does|did)\s+not\b[^.?!\n]*[.?!]\s+(?:It|They|That|This|He|She|We)\s+(?:is|are|was|were|do|does|did|go|goes|means?)\b/g, "not X. It is Y"],
  [/\b(?:isn't|aren't|wasn't|don't|doesn't)\b[^.?!\n]*[.?!,;]\s+(?:it's|they're|that's|it is|they are)\b/g, "not X, it is Y"],
  [/\bnot (?:just|only|merely|simply)\b/g, "not just X"],
  [/\bNot because\b/g, "Not because"],
  [/\b[Tt]he (?:fear|point|problem|truth|question|answer|goal|issue|trick|job) (?:is|was|with \w+ is) not\b/g, "the point is not X"],
  [/\b(?:just|simply) another\b/g, "just another X"],
  [/,\s+no \w+(?:ing)?\./g, "clipped negative tail"],
  [/\b(?:That is|That's) the (?:real|whole|actual) \w+\.|\bRead that again\b|\bLet that sink in\b|\bThat distinction matters\b|\bThat is the (?:point|difference)\./g, "stock closer"],
  [/\b(?:the real question|at its core|what really matters|the heart of the matter|the deeper issue|the (?:language|currency|architecture) of)\b/gi, "saying that sounds deep"],
  [/(?:^|[.?!]\s+)(?:Let's (?:dive|explore|break|be honest)|Here's (?:the thing|what you need)|The thing is|Honestly\?|Real talk|Look,|Without further ado)/gm, "staged run-up"],
  [/\b(?:To be clear|Don't get me wrong|This is not to say|You might think|Some might say|This isn't (?:mainly |really )?about)\b/g, "arguing with no one"],
  [/\b[A-Z][a-z]+(?: [a-z]+){0,2}\? [A-Z][^.?!]{0,60}\./g, "question then its own answer"],
  [/(?:^|\n)\s*(?:Key takeaways?|TL;DR|In (?:summary|conclusion)|The bottom line)\b/g, "summary label"],
  [/\b(?:I hope this helps|Great question|Let me know if|Would you like me to|Feel free to|Happy to help|DM me|DM us|Send us a DM)\b/gi, "chatbot or sales residue"],
  [/\*\*[^*\n]+\*\*/g, "bold in a comment"],
  [/!/g, "exclamation mark"],
  [/[—–]|&mdash;| -- /g, "dash used as a connector"],
];

const WEAK: [RegExp, string][] = [
  [/\b(?:rather than|instead of)\b[^.?!\n]*[.?!]\s*$/gm, "closing contrast (X instead of Y)"],
  [/\b(?:crucial|pivotal|landscape|testament|underscores?|showcas\w+|vibrant|quietly|intricate|foster\w*|enhanc\w+|align\w* with|deep dive|valuable insights?)\b/g, "AI word"],
  [/\b(?:serves? as|stands? as|functions? as|boasts?)\b/g, "avoiding is/has"],
  [/\b(?:could potentially|might arguably|may potentially|could possibly)\b/g, "stacked hedge"],
  [/[\u{1F300}-\u{1FAFF}✅➡→]/gu, "emoji or arrow"],
];

// slopmonster VOCAB, matched by root so every inflection fires.
const SLOP_ROOTS = [
  "delve", "leverage", "seamless", "elevate", "robust", "unlock", "unleash", "empower", "streamline", "cutting-edge",
  "state-of-the-art", "game-changer", "game-changing", "revolutioni", "transformative", "transformation", "innovate",
  "holistic", "synerg", "paradigm", "bespoke", "meticulous", "tapestry", "beacon", "unparalleled", "supercharge",
  "turbocharge", "effortless", "next-level", "compelling", "intuitive", "world-class", "best-in-class",
];
const SLOP = new RegExp(`\\b(?:${SLOP_ROOTS.map((r) => r.replace(/[-]/g, "\\-")).join("|")})\\w*`, "gi");

const NUMBER = /\d|\b(?:two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|forty|fifty|sixty|ninety|hundred|half|twice)\b/i;
const DAY = /\b(?:Mon|Tues?|Wed(?:nes)?|Thur?s?|Fri|Sat(?:ur)?|Sun)(?:day)?\b|\b(?:January|February|March|April|June|July|August|September|October|November|December)\b/;

function paragraphs(text: string): string[] {
  return text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
}

function sentences(text: string): string[] {
  return text.replace(/\n/g, " ").split(/(?<=[.?!])\s+/).map((s) => s.trim()).filter(Boolean);
}

function words(s: string): number {
  return (s.match(/[A-Za-z0-9'%$]+/g) ?? []).length;
}

function specific(text: string): boolean {
  if (NUMBER.test(text) || DAY.test(text)) return true;
  for (const s of sentences(text)) {
    if (/(?<=\s)(?!I\b)[A-Z][a-z]+/.test(s.slice(1))) return true;
  }
  return false;
}

function clip(m: string): string {
  return m.split(/\s+/).join(" ").slice(0, 70);
}

export type LintResult = { strong: string[]; weak: string[] };

export function lintReply(text: string): LintResult {
  const strong: string[] = [];
  const weak: string[] = [];
  for (const [re, name] of STRONG) for (const m of text.matchAll(re)) strong.push(`${name}: "${clip(m[0])}"`);
  for (const [re, name] of WEAK) for (const m of text.matchAll(re)) weak.push(`${name}: "${clip(m[0])}"`);
  for (const m of text.matchAll(SLOP)) weak.push(`AI word: "${m[0]}"`);

  const paras = paragraphs(text);
  for (const para of paras) {
    const ss = sentences(para);
    for (let i = 0; i + 2 < ss.length; i++) {
      const trio = ss.slice(i, i + 3);
      if (trio.every((s) => words(s) <= 5)) {
        strong.push(`three short fragments in a row: "${clip(trio.join(" "))}"`);
        break;
      }
      const firsts = new Set(trio.map((s) => s.split(/\s+/)[0].toLowerCase()));
      if (firsts.size === 1 && !firsts.has("the")) {
        weak.push(`three sentences open with "${trio[0].split(/\s+/)[0]}"`);
        break;
      }
    }
  }
  if (paras.length) {
    const ss = sentences(paras[paras.length - 1]);
    const last = ss[ss.length - 1];
    if (last.endsWith("?")) strong.push(`closes on a question: "${last.slice(0, 70)}"`);
    else if (ss.length >= 2 && words(last) <= 8 && words(ss[ss.length - 2]) <= 8) strong.push(`paired punchy closer: "${ss[ss.length - 2]} ${last}"`);
    else if (ss.length === 1 && words(last) <= 7 && paras.length > 1) strong.push(`one-line closer: "${last}"`);
    if (paras.length >= 4 && paras.every((p) => sentences(p).length === 1)) strong.push("every paragraph is one sentence");
    if (words(text) >= 25 && !specific(text)) strong.push("nothing specific: no number, name, day or place");
  }
  if (words(text) > 110) strong.push(`too long for a comment: ${words(text)} words`);
  const n = sentences(text.replace(/\s*\n+\s*/g, " ")).length;
  if (n > 5) strong.push(`${n} sentences, the cap is five`);
  if (/\bhere in [A-Z]/.test(text)) strong.push('"here in" claims we are based there');
  if (weak.length >= 3) strong.push(`${weak.length} weak tells together`);
  return { strong, weak };
}
