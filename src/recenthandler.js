const { DATABASE_URL } = process.env;
const { Client } = require("pg");
const Discord = require("discord.js");
const client = new Client({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
client.connect();

const handleRecentCommands = async (command) => {
  const query = command.join(" ");
  finalResults = [];
  const repeatSearch = await client.query(
    "SELECT * FROM SEARCH_HISTORY WHERE SEARCH_KEYWORD LIKE $1",
    [`%${query}%`]
  );
  if (repeatSearch.rowCount > 0) {
    repeatSearch.rows.forEach((row) => {
      const resEmbed = new Discord.MessageEmbed()
        .setTitle(row.search_keyword)
        .setDescription(`Last search on: ${row.last_search_time}`);
      finalResults.push(resEmbed);
    });
  }
  return finalResults;
};

module.exports = { handleRecentCommands };
