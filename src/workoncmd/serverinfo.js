const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
let finalIntents = []
module.exports = {
  name: 'serverinfo',
  info: `Check a server's infomation!`,
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Check A Server's Infomation!"),
  run: async (interaction) => {
      const guild = interaction.guild
    const string = interaction.options.getString('text')
    const embed = new MessageEmbed()
        .setTitle(`Server: ${guild.name}`)
        .addField('Member Count', `${guild.memberCount}`)
        .addField('AFK Timeout', `${guild.afkTimeout} minutes`, true)
        .addField('Created', `${guild.createdAt.toLocaleString()}`, true)
        .setTimestamp()
        .setImage(interaction.guild.iconURL)
        .setColor('RANDOM')

    interaction.reply({ embeds: [embed] });
  },
};
