const { Client, IntentsBitField, IntegrationExpireBehavior } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.on("ready", (c) => {
  console.log(`🟢 ${c.user.tag} is ready`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content === "hello" || message.content === "Hello") {
    message.reply(`Hello ${message.author.username} cutie 😘`);
  }
});

client.on('interactionCreate', (interaction) => {
  if(!interaction.isChatInputCommand()) return;

  if(interaction.commandName === 'hey') {
    interaction.reply('Wassup');
  }

  if(interaction.commandName === 'ping') {
    interaction.reply('Pong')
  }

  if(interaction.commandName === 'add') {
    const num1 = interaction.options.get('first-number').value;
    const num2 = interaction.options.get('second-number').value;
    interaction.reply(`Sum of ${num1} and ${num2} is ** ${num1 + num2} **`)
  }
});

client.login(process.env.DISCORD_TOKEN);