require("dotenv").config();
const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.DISCORD_TOKEN);

(async () => {
  console.log("🧡 Deregistering guild-specific commands...");

  try {
    const commands = await rest.get(Routes.applicationCommands(process.env.CLIENT_ID));
    
    for (const command of commands) {
      if (!command.guildId) continue; // Skip global commands

      await rest.delete(
        Routes.applicationCommand("YOUR_CLIENT_ID", command.id)
      );
      
      console.log(`❌ Deleted guild-specific command '${command.name}'`);
    }

    console.log("✅ Guild-specific commands deregistered");
  } catch (error) {
    console.error(`❌ Error occurred while deregistering commands: ${error}`);
  }
})();