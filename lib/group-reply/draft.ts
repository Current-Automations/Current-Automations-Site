import Anthropic from "@anthropic-ai/sdk";
import type { Beta } from "@anthropic-ai/sdk/resources";
import { lintReply } from "./lint";
import { GROUP_REPLY_PROMPT } from "./prompt";

export const MODEL = "claude-opus-5-5";

export type GroupReplyInput = { post: string; group?: string | null; note?: string | null };
export type GroupReplyDraft = { draft: string; flags: string[]; weak: string[]; passes: number };

type Claude = (params: Beta.MessageCreateParamsNonStreaming) => Promise<Beta.BetaMessage>;

export function liveClaude(apiKey: string): Claude {
  const client = new Anthropic({ apiKey });
  return (params) => client.beta.messages.create(params);
}

function userTurn(input: GroupReplyInput): string {
  const lines = [`Group: ${input.group?.trim() || "not named"}`];
  if (input.note?.trim()) lines.push(`Jarrett's note: ${input.note.trim()}`);
  lines.push("", "The post or comment to reply to:", input.post.trim());
  return lines.join("\n");
}

function textOf(res: Beta.BetaMessage): string {
  return res.content
    .filter((b): b is Beta.BetaTextBlock => b.type === "text")
    .map((b) => b.text)
    .join("\n")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/^["“]|["”]$/g, "")
    .trim();
}

// One draft, one rewrite if the linter still flags it. The flags that survive go
// back to him with the draft, never silently dropped.
export async function draftGroupReply(input: GroupReplyInput, claude: Claude): Promise<GroupReplyDraft> {
  const messages: Beta.BetaMessageParam[] = [{ role: "user", content: userTurn(input) }];
  const params: Beta.MessageCreateParamsNonStreaming = {
    model: MODEL,
    max_tokens: 1200,
    betas: ["server-side-fallback-2026-07-01"],
    fallbacks: "default",
    thinking: { type: "adaptive" },
    system: [{ type: "text", text: GROUP_REPLY_PROMPT, cache_control: { type: "ephemeral" } }],
    messages,
  };
  let draft = textOf(await claude(params));
  let lint = lintReply(draft);
  let passes = 1;
  if (lint.strong.length && draft) {
    params.messages = [
      ...messages,
      { role: "assistant", content: draft },
      { role: "user", content: `Rewrite it to clear these, same facts, same length:\n${lint.strong.map((f) => `- ${f}`).join("\n")}\nComment text only.` },
    ];
    const second = textOf(await claude(params));
    if (second) {
      draft = second;
      lint = lintReply(draft);
      passes = 2;
    }
  }
  return { draft, flags: lint.strong, weak: lint.weak, passes };
}
