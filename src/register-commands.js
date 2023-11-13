require('dotenv').config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: 'hey',
    description: 'Replies with Wassup',
  },
  {
    name: 'ping',
    description: 'Replies with Pong',
  },
  
 {
    name: 'add',
    description: 'Add numbers',
    options: [
        {
            name: 'first-number',
            description: 'First argument',
            type: ApplicationCommandOptionType.Number,
            required: true,
        },
        {
            name: 'second-number',
            description: 'Second argument',
            type: ApplicationCommandOptionType.Number,
            required: true,
        }
    ]
 }
];

const rest = new REST({ version: 10 }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  console.log("🧡registering command");
  try {
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID
      ),
      { body: commands }
    );
    console.log("❤️command registered");
  } catch (error) {
    console.log(`An error occured: ${error}`);
  }
})();