import os
import re
import subprocess
import sys
from collections import Counter
from pathlib import Path

DESLOP = Path.home() / ".claude" / "skills-archived" / "slopmonster" / "tools" / "deslop.py"

# Strong: one sighting is enough to rewrite. LinkedIn named the first group itself.
STRONG = [
    (r"\b(?:is|are|was|were|do|does|did)\s+not\b[^.?!\n]*[.?!]\s+(?:It|They|That|This|He|She|We)\s+(?:is|are|was|were|do|does|did|go|goes|means?)\b", "not X. It is Y"),
    (r"\b(?:isn't|aren't|wasn't|don't|doesn't)\b[^.?!\n]*[.?!,;]\s+(?:it's|they're|that's|it is|they are)\b", "not X, it is Y"),
    (r"\bnot (?:just|only|merely|simply)\b", "not just X"),
    (r"\bNot because\b", "Not because"),
    (r"\b[Tt]he (?:fear|point|problem|truth|question|answer|goal|issue|trick|job) (?:is|was|with \w+ is) not\b", "the point is not X"),
    (r"\b(?:just|simply) another\b", "just another X"),
    (r",\s+no \w+(?:ing)?\.", "clipped negative tail"),
    (r"\b(?:That is|That's) the (?:real|whole|actual) \w+\.|\bRead that again\b|\bLet that sink in\b|\bThat distinction matters\b|\bThat is the (?:point|difference)\.", "stock closer"),
    (r"(?i)\b(?:the real question|at its core|what really matters|the heart of the matter|the deeper issue|the (?:language|currency|architecture) of)\b", "saying that sounds deep"),
    (r"(?:^|[.?!]\s+)(?:Let's (?:dive|explore|break|be honest)|Here's (?:the thing|what you need)|The thing is|Honestly\?|Real talk|Look,|Without further ado)", "staged run-up"),
    (r"\b(?:To be clear|Don't get me wrong|This is not to say|You might think|Some might say|This isn't (?:mainly |really )?about)\b", "arguing with no one"),
    (r"\b[A-Z][a-z]+(?: [a-z]+){0,2}\? [A-Z][^.?!]{0,60}\.", "question then its own answer"),
    (r"(?:^|\n)\s*(?:Key takeaways?|TL;DR|In (?:summary|conclusion)|The bottom line)\b", "summary label"),
    (r"\b(?:I hope this helps|Great question|Let me know if|Would you like me to)\b", "chatbot residue"),
    (r"\*\*[^*\n]+\*\*", "bold in a caption"),
]
# Weak: fine once, a tell in company. Printed as notes, never fail the run alone.
WEAK = [
    (r"\b(?:rather than|instead of)\b[^.?!\n]*[.?!]\s*$", "closing contrast (X instead of Y)"),
    (r"\b(?:crucial|pivotal|landscape|testament|underscores?|showcas\w+|vibrant|quietly|intricate|foster\w*|enhanc\w+|align\w* with|deep dive|valuable insights?)\b", "AI word"),
    (r"\b(?:serves? as|stands? as|functions? as|boasts?)\b", "avoiding is/has"),
    (r"\b(?:could potentially|might arguably|may potentially|could possibly)\b", "stacked hedge"),
    (r"[\U0001F300-\U0001FAFF✅➡→]", "emoji or arrow"),
]
CTA = re.compile(r"\S+\.\S+/\S+|(?:walkthrough|link) in bio|^#\w+", re.I)
NUMBER = re.compile(r"\d|\b(?:two|three|four|five|six|seven|eight|nine|ten|twenty|thirty|forty|fifty|sixty|ninety|hundred|half|twice)\b", re.I)
DAY = re.compile(r"\b(?:Mon|Tues?|Wed(?:nes)?|Thur?s?|Fri|Sat(?:ur)?|Sun)(?:day)?\b|\b(?:January|February|March|April|June|July|August|September|October|November|December)\b")


def paragraphs(text):
    return [p.strip() for p in text.split("\n\n") if p.strip()]


def sentences(text):
    return [s.strip() for s in re.split(r"(?<=[.?!])\s+", text.replace("\n", " ")) if s.strip()]


def words(s):
    return len(re.findall(r"[A-Za-z0-9'%$]+", s))


def body_of(text):
    return [p for p in paragraphs(text) if not CTA.search(p.splitlines()[-1])]


def specific(text):
    body = " ".join(body_of(text))
    if NUMBER.search(body) or DAY.search(body):
        return True
    for s in sentences(body):
        if re.search(r"(?<=\s)(?!I\b)[A-Z][a-z]+", s[1:]):
            return True
    return False


def check(text):
    strong, weak = [], []
    if "—" in text or "–" in text or "&mdash;" in text or " -- " in text:
        strong.append("dash used as a connector")
    for pats, out in ((STRONG, strong), (WEAK, weak)):
        for pat, name in pats:
            for m in re.finditer(pat, text, re.M):
                out.append(f"{name}: \"{' '.join(m.group(0).split())[:70]}\"")
    for para in paragraphs(text):
        ss = sentences(para)
        for i in range(len(ss) - 2):
            trio = ss[i:i + 3]
            if all(words(s) <= 5 for s in trio):
                strong.append(f"three short fragments in a row: \"{' '.join(trio)[:70]}\"")
                break
            firsts = {s.split()[0].lower() for s in trio}
            if len(firsts) == 1 and firsts != {"the"}:
                weak.append(f"three sentences open with \"{trio[0].split()[0]}\"")
                break
    body = body_of(text)
    if body:
        ss = sentences(body[-1])
        if ss[-1].endswith("?"):
            strong.append(f"closes on a question: \"{ss[-1][:70]}\"")
        elif len(ss) >= 2 and words(ss[-1]) <= 8 and words(ss[-2]) <= 8:
            strong.append(f"paired punchy closer: \"{ss[-2]} {ss[-1]}\"")
        elif len(ss) == 1 and words(ss[0]) <= 7 and len(body) > 1:
            strong.append(f"one-line closer: \"{ss[0]}\"")
        if len(body) >= 4 and all(len(sentences(p)) == 1 for p in body):
            strong.append("every paragraph is one sentence")
        if words(" ".join(body)) >= 25 and not specific(text):
            strong.append("nothing specific: no number, name, day or place. Could run under any company's name")
    r = subprocess.run([sys.executable, str(DESLOP), "--text", text], capture_output=True, text=True,
                       encoding="utf-8", errors="replace", env={**os.environ, "PYTHONIOENCODING": "utf-8"}) if DESLOP.exists() else None
    if r and r.returncode != 0:
        detail = " ".join(l.strip() for l in (r.stdout or "").splitlines() if l.strip() and "words of visible" not in l)
        weak.append("slopmonster: " + re.sub(r"[^\x20-\x7e]", "", detail)[:160])
    if len(weak) >= 3:
        strong.append(f"{len(weak)} weak tells together")
    return strong, weak


def blocks(path):
    raw = Path(path).read_text(encoding="utf-8")
    if path.endswith(".md") and "```" in raw:
        out = []
        for m in re.finditer(r"^(#{2,3} .+?)$(.*?)(?=^#{2,3} |\Z)", raw, re.M | re.S):
            for i, b in enumerate(re.findall(r"```\n(.*?)\n```", m.group(2), re.S)):
                out.append((f"{m.group(1).lstrip('# ')[:60]} [{i + 1}]", b))
        return out
    return [(Path(path).name, raw)]


def batch(items):
    out = []
    if len(items) < 3:
        return out
    seen = Counter()
    for _, text in items:
        for s in set(sentences(text)):
            if words(s) >= 3 and not s.startswith("Source:"):
                seen[s] += 1
    for s, n in seen.most_common():
        if n >= 3:
            out.append(f"same sentence in {n} posts: \"{s[:80]}\"")
    shapes = Counter(len(paragraphs(t)) for _, t in items)
    top, n = shapes.most_common(1)[0]
    if n == len(items):
        out.append(f"every post has {top} paragraphs")
    hooks = sum(1 for _, t in items if len(sentences(paragraphs(t)[0])) == 1 and words(paragraphs(t)[0]) <= 12)
    if hooks >= max(3, round(len(items) * 0.7)):
        out.append(f"{hooks} of {len(items)} posts open with a one-line hook")
    return out


def main(argv):
    if len(argv) > 1 and argv[0] == "--text":
        items = [("text", argv[1])]
    else:
        items = [b for p in argv for b in blocks(p)]
    bad = 0
    for name, text in items:
        strong, weak = check(text)
        bad += bool(strong)
        print(("FLAG  " if strong else "ok    ") + name)
        for h in strong:
            print("        " + h)
        for h in weak:
            print("        (weak) " + h)
    for b in batch(items):
        bad += 1
        print("BATCH  " + b)
    print(f"\n{len(items)} checked, {bad} flagged")
    return 1 if bad else 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
