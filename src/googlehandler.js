const axios = require("axios");
const { GOOGLE_API_KEY, SEARCH_ENGINE_ID } = process.env;
const Discord = require("discord.js");

const handleGoogleCommands = async (command) => {
  const query = command.join("+");
  
  const googleSearchQuery = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;

  const searchResult = await axios.get(googleSearchQuery);

  const finalResults = [];
  resultCount = 0;

  for (let i = 0; i < searchResult.data.items.length; i++) {
    if (i >= 5) {
      break;
    }
    const resEmbed = new Discord.MessageEmbed()
      .setTitle(searchResult.data.items[i].title)
      .setURL(searchResult.data.items[i].link)
      .setDescription(searchResult.data.items[i].snippet);
    finalResults.push(resEmbed);
  }

  return finalResults;
};

module.exports = { handleGoogleCommands };
