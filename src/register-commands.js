require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
  {
    name: "hey",
    description: "Replies with Wassup",
  },
  {
    name: "ping",
    description: "Replies with Pong",
  },
  {
    name: "add",
    description:
      "Add numbers - this is made for understanding purpose and may not work as you wish",
    options: [
      {
        name: "first-number",
        description: "First argument",
        type: ApplicationCommandOptionType.Number,
        required: true,
        choices: [
          {
            name: "One",
            value: 1,
          },
          {
            name: "Seven",
            value: 7,
          },
          {
            name: "Thirteen",
            value: 13,
          },
        ],
      },
      {
        name: "second-number",
        description: "Second argument",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "askaris_memories",
    description: `Sends an embed about Askari's Memories Server`,
  },
  {
    name: "serverinfo",
    description: "Information about server",
  },
  {
    name: "userinfo",
    description: "Information about a user",
    options: [
      {
        name: "target",
        description: "User",
        type: ApplicationCommandOptionType.User,
        required: false,
      },
    ],
  },
];

const rest = new REST({ version: 10 }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  console.log("🧡registering command");
  try {
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: commands,
    });
    console.log("❤️command registered");
  } catch (error) {
    console.log(`An error occured: ${error}`);
  }
})();