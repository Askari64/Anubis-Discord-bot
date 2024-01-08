const {
  Client,
  IntentsBitField,
  EmbedBuilder,
  time,
  TimestampStyles,
} = require("discord.js");
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
    message.reply(`Hello ${message.author.username}`);
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
        .setFooter({ text: `ID ${guild.id} Created at ${guild.createdAt}` })
        .setAuthor({ name: guild.name, iconURL: guild.iconURL() });

      interaction.reply({ embeds: [serverinfoembed] });
    };

    // Call the async function
    fetchData();
  }

  //userinfo Embed

  if (interaction.commandName === "userinfo") {
    const targetUser = interaction.options.get("target") || interaction;


    const userInfoEmbed = new EmbedBuilder()
      .setAuthor({
        name: targetUser.user.globalName,
        iconURL: targetUser.user.avatarURL(),
      })
      .setTitle("Avatar")
      .setURL(targetUser.user.avatarURL())
      .setFields(
        {
          name: `**Created At**`,
          value: `${targetUser.user.createdAt}`,
          inline: false,
        },
        {
          name: "**Bot**",
          value: `${targetUser.user.bot}`,
          inline: false,
        },
        { name: "Joined at", value: `${targetUser.member.joinedAt}`, inline: false }
      )
      .setFooter({
        text: `id: ${targetUser.user.id}`,
      });

    interaction.reply({ embeds: [userInfoEmbed] });
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

// Message Create - Granny
client.on("messageCreate", (message) => {
  if(message.author.bot) {
    return;
  }

  if (message.content.toLowerCase() === 'granny') {
    message.channel.send(`Grandma periodically holds a timed event at the Ancestor’s table of Belonging in the elevated clearing of Hidden Forest, providing up to a certain amount of Light per day and a delicious meal to Sky children.

__Event times__ : (These timestamps are in your local time!)
> <t:1699259400:t> 》 <t:1699180200:t> 》<t:1699187400:t> 》<t:1699194600:t> 》<t:1699201800:t> 》 <t:1699209000:t>》<t:1699216200:t> 》<t:1699223400:t> 》<t:1699230600:t> 》<t:1699237800:t> 》<t:1699245000:t> 》<t:1699252200:t>`);
  }
});

//Message Create - Turtle
client.on("messageCreate", (message) => {
  if(message.author.bot) {
    return;
  }

  if(message.content.toLowerCase() === 'turtle') {
    message.channel.send(`A resident Light creature emerges periodically from the deep waters of Sanctuary Islands to seek help from Sky children, rewarding them with Light up to a certain amount each day. :turtle:

    :sunny: __Event times__: (These timestamps are in your local time!)
    > <t:1699260648:t> 》 <t:1699181400:t> 》<t:1699188600:t> 》<t:1699195800:t> 》<t:1699203000:t> 》 <t:1699210200:t>》<t:1699217400:t> 》<t:1699224600:t> 》<t:1699231800:t>》<t:1699239000:t> 》<t:1699246200:t> 》<t:1699253400:t>`)
  }
});

//Message Create - Geyser
client.on("messageCreate", (message)=> {
  if(message.author.bot) {
    return;
  }

  if(message.content.toLowerCase() === 'geyser') {
    message.channel.send(`A polluted geyser in Sanctuary Islands releases darkness periodically throughout the day, that can be burned away to collect Light up to a certain amount each day. :fountain:

    :candle:  __Event times__ : (These timestamps are in your local time!) 
    > <t:1699257609:t> 》 <t:1699178400:t>》<t:1699185600:t> 》<t:1699192800:t> 》<t:1699200000:t> 》 <t:1699207200:t>》<t:1699214400:t> 》<t:1699221600:t> 》<t:1699228800:t> 》<t:1699236000:t> 》<t:1699243200:t> 》<t:1699250400:t>`)
  }
}); 

client.on("messageCreate", (message)=> {
if(message.author.bot) {
  return;
}
if(message.content.toLowerCase() === 'test'){
  console.log(process.env.DISCORD_TOKEN)
}
})

client.login(process.env.DISCORD_TOKEN);