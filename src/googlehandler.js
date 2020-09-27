const axios = require("axios");
const { GOOGLE_API_KEY, SEARCH_ENGINE_ID, DATABASE_URL } = process.env;
const { Client } = require("pg");
const Discord = require("discord.js");
const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

const handleGoogleCommands = async (command) => {
  const query = command.join(" ");
  const currentDateTime = new Date();
  const repeatSearch = await client.query(
    "SELECT * FROM SEARCH_HISTORY WHERE SEARCH_KEYWORD = $1",
    [query]
  );
  if (repeatSearch.rowCount > 0) {
    const updateResult = await client.query(
      "UPDATE SEARCH_HISTORY SET LAST_SEARCH_TIME=$1 WHERE SEARCH_KEYWORD =$2",
      [currentDateTime, query]
    );
  } else {
    const res = await client.query(
      "INSERT INTO SEARCH_HISTORY (SEARCH_KEYWORD,LAST_SEARCH_TIME) VALUES($1, $2)",
      [query, currentDateTime]
    );
  }

  const googleSearchQuery = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${query}`;

  const searchResult = await axios.get(googleSearchQuery);

  const finalResults = [];
  resultCount = 0;

  if (!searchResult.data.items || searchResult.data.items.length == 0) {
    return "";
  }

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
