const { Client, IntentsBitField, EmbedBuilder } = require("discord.js");
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

//messages - auto responses

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }
  if (message.content === "hello" || message.content === "Hello") {
    message.reply(`Hello ${message.author.username} cutie 😘`);
  }
});

//Slash commands

client.on("interactionCreate", (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hey") {
    interaction.reply("Wassup");
  }

  if (interaction.commandName === "ping") {
    interaction.reply("Pong");
  }

  // Slash command options and choices

  if (interaction.commandName === "add") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`Sum of ${num1} and ${num2} is ** ${num1 + num2} **`);
  }

  // Embed

  if (interaction.commandName === 'askaris_memories') {
    const guild = interaction.guild;
    const askaris_memories_embed = new EmbedBuilder()
      .setTitle(`Askari's Memories`)
      .setDescription(
        "A safe place to store memories with my friends, their birthdays, talk to them, listen to music and watch movies with them ❤️"
      )
      .setColor(15277667)
      .setThumbnail(guild.iconURL())
      .setImage(guild.iconURL())
      .addFields(
        {
          name: `Our Server Manager`,
          value: `Anubis is our Official Server Manager Bot - Under Development`,
        },
        { name: "\u200B", value: "\u200B" }
      )
      .addFields(
        {
          name: `Checkout Askari's Website`,
          value: `https://askari-site.vercel.app/`,
          inline: true,
        },
        {
          name: `Checkout Askari's Github`,
          value: `https://github.com/Askari64`,
          inline: true,
        }
      )
      .setAuthor({ name: "Askari", iconURL: guild.iconURL() })
      .setFooter({ text: `Askari's Memories`, iconURL: guild.iconURL() })
      .setTimestamp();
    interaction.reply({ embeds: [askaris_memories_embed] });
  }
});

// Message create - embed reply

client.on('messageCreate', (message) => {
  if(message.author.bot) {
    return;
  }

  if(message.content === `Askari's server`) {
    const guild = message.guild;
    const askaris_memories_embed = new EmbedBuilder()
      .setTitle(`Askari's Memories`)
      .setDescription(
        "A safe place to store memories with my friends, their birthdays, talk to them, listen to music and watch movies with them ❤️"
      )
      .setColor(15277667)
      .setThumbnail(guild.iconURL())
      .setImage(guild.iconURL())
      .addFields(
        {
          name: `Our Server Manager`,
          value: `Anubis is our Official Server Manager Bot - Under Development`,
        },
        { name: "\u200B", value: "\u200B" }
      )
      .addFields(
        {
          name: `Checkout Askari's Website`,
          value: `https://askari-site.vercel.app/`,
          inline: true,
        },
        {
          name: `Checkout Askari's Github`,
          value: `https://github.com/Askari64`,
          inline: true,
        }
      )
      .setAuthor({ name: "Askari", iconURL: guild.iconURL() })
      .setFooter({ text: `Askari's Memories`, iconURL: guild.iconURL() })
      .setTimestamp();
    message.channel.send({embeds: [askaris_memories_embed]})
  }
})

client.login(process.env.DISCORD_TOKEN);
