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

  if (interaction.commandName === "askaris_memories") {
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

  //Serverinfo embed

  if (interaction.commandName === "serverinfo") {
    const guild = interaction.guild;

    // Define an async function to use await
    const fetchData = async () => {
      // Fetch all members to ensure the collection is complete
      await guild.members.fetch();

      const humans = guild.members.cache.filter((member) => !member.user.bot);
      const bots = guild.members.cache.filter((member) => member.user.bot);
      const textChannels = guild.channels.cache.filter((channel) =>
        channel.isTextBased()
      );
      const nsfwChannel = textChannels.filter((channel) => channel.nsfw);
      const voiceChannels = guild.channels.cache.filter((channel) =>
        channel.isVoiceBased()
      );
      const roles = guild.roles.cache;

      const serverinfoembed = new EmbedBuilder()
        .setTitle(`Info for ${guild.name}`)
        .setThumbnail(guild.iconURL())
        .addFields(
          {
            name: "Owner",
            value: `<@${guild.ownerId}>`,
            inline: true,
          },
          {
            name: "Members",
            value: `Total Members: ${guild.memberCount} \n Humans: ${humans.size} \n Bots: ${bots.size}`,
            inline: true,
          },
          { name: "\u200B", value: "\u200B" },
          {
            name: "Verification Level",
            value: `${guild.verificationLevel}`,
            inline: true,
          },
          {
            name: "Channels",
            value: `#️⃣ ${textChannels.size} 🔞${nsfwChannel.size} \n 🔊 ${voiceChannels.size}`,
            inline: true,
          },
          {
            name: "Roles",
            value: `${roles.size}`,
          }
        )
        .setFooter({ text: `ID ${guild.id} Created at ${guild.createdAt}` });

      interaction.reply({ embeds: [serverinfoembed] });
    };

    // Call the async function
    fetchData();
  }
});

// Message create - embed reply

client.on("messageCreate", (message) => {
  if (message.author.bot) {
    return;
  }

  if (message.content === `Askari's server`) {
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
    message.channel.send({ embeds: [askaris_memories_embed] });
  }
});

client.login(process.env.DISCORD_TOKEN);
