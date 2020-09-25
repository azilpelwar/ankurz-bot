const Discord = require("discord.js");
const config = require("./config.json");

const client = new Discord.Client();
const prefix = "!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", (message) => {
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) {
    if (message.content === "hi") {
      message.reply("Greetings!");
    }
    return;
  }
  const commandBody = message.content.slice(prefix.length);
  const args = commandBody.split(" ");
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.reply(`Pong! This message had latency of ${timeTaken}ms.`);
  } else if (command === "google") {
    //TODO User google custom serach api to search on google and return the first 5 links
    //TODO store the recent searches, skip the duplicate search keywords
  } else if (command === "recent") {
    //TODO: search the heroku DB for replying the search keyword from the DB
  }
});

client.login(config.BOT_TOKEN);