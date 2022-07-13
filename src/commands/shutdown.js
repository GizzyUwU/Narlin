const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')


module.exports = {
  name: 'shutdown',
  info: "Bot Runs Protocol Shutdown.",
  data: new SlashCommandBuilder()
    .setName("shutdown")
    .setDescription("Bot Runs Protocol Shutdown.")
    .addStringOption(option => option.setName("password").setDescription("Password To Use Command.").setRequired(true)),
    run: async (interaction) => {
    const password = interaction.options.getString('password')
    // This function cleans up and prepares the
// result of our eval command input for sending
// to the channel
    if(password === "Skegness12"){
      try {
   

        const embed = new MessageEmbed()
        .setTitle('Shutting Down!')
        .setDescription(`Protocol Shutdown Commencing In 3 Seconds!`)

    interaction.reply({ embeds: [embed], ephemeral: true });
    setTimeout(function(){
        process.exit()
    }, 3000);
      } catch(err) {
          console.log(err)
      }
    } else {
        const embed = new MessageEmbed()
        .setTitle('Password Incorrect!')
        .setDescription('Sorry But Password Is Incorrect!')
        .setColor('RANDOM')

    interaction.reply({ embeds: [embed], ephemeral: true });
    }
  },
};
