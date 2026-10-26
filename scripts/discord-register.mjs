// Registers the CA Bot's /reply slash command. Run from his terminal, once, and
// again only if the command's options change:
//   DISCORD_CA_APP_ID=... DISCORD_CA_BOT_TOKEN=... node scripts/discord-register.mjs
// Add DISCORD_CA_GUILD_ID=<server id> to register on one server (shows up at once).
// Without it the command is global and can take up to an hour to appear.
const appId = process.env.DISCORD_CA_APP_ID;
const token = process.env.DISCORD_CA_BOT_TOKEN;
const guild = process.env.DISCORD_CA_GUILD_ID;
if (!appId || !token) {
  console.error("Set DISCORD_CA_APP_ID and DISCORD_CA_BOT_TOKEN in this terminal first.");
  process.exit(1);
}

const commands = [
  {
    name: "reply",
    description: "Draft a Current Automations reply to a Facebook group post",
    type: 1,
    options: [
      { name: "post", description: "The post or comment, pasted", type: 3, required: true, max_length: 4000 },
      { name: "group", description: "Which group it is in", type: 3, required: false, max_length: 120 },
      { name: "note", description: "Anything the reply has to say or avoid", type: 3, required: false, max_length: 400 },
    ],
  },
];

const url = guild
  ? `https://discord.com/api/v10/applications/${appId}/guilds/${guild}/commands`
  : `https://discord.com/api/v10/applications/${appId}/commands`;
const res = await fetch(url, {
  method: "PUT",
  headers: { Authorization: `Bot ${token}`, "Content-Type": "application/json" },
  body: JSON.stringify(commands),
});
const body = await res.text();
console.log(res.status, guild ? `guild ${guild}` : "global");
if (!res.ok) {
  console.error(body);
  process.exit(1);
}
console.log(JSON.parse(body).map((c) => `/${c.name}`).join(" "));
