const Discord = require("discord.js");
require("dotenv").config();

const { BOT_TOKEN } = process.env;
const googleHandler = require("./googlehandler");
const recentHandler = require("./recenthandler");
const client = new Discord.Client();
const prefix = "!";

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("message", async (message) => {
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
    const result = await googleHandler.handleGoogleCommands(args);
    if (result != "") {
      result.forEach((res) => {
        message.channel.send(res);
      });
    } else {
      message.reply("No results found your query. Try something else.");
    }
  } else if (command === "recent") {
    const result = await recentHandler.handleRecentCommands(args);
    if (result != "") {
      result.forEach((res) => {
        message.channel.send(res);
      });
    } else {
      message.reply("No recent query found. Try something else.");
    }
  }
});

client.login(BOT_TOKEN);
