// Personal Discord, #ca. Fire and forget: a failed ping never fails the job that sent it.
export async function notifyDiscord(text: string): Promise<void> {
  const url = process.env.DISCORD_WEBHOOK_CA ?? "";
  if (!url) {
    console.error("[discord] DISCORD_WEBHOOK_CA unset:", text);
    return;
  }
  try {
    await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text.slice(0, 1900), username: "CA", allowed_mentions: { parse: [] } }),
      signal: AbortSignal.timeout(10000),
    });
  } catch (err) {
    console.error("[discord] post failed", err);
  }
}
