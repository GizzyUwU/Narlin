const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
let finalIntents = []
module.exports = {
  name: 'serverinfo',
  info: `Check A Server's Infomation!`,
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Check A Server's Infomation!"),
  run: async (interaction) => {
      const server = interaction.guild.name
    const string = interaction.options.getString('text')
    const embed = new MessageEmbed()
        .setTitle(`Server: ${server}`)
        .setDescription(`Owner: ${interaction.guild.owner.user.tag} (${interaction.guild.owner.id})`)
        .addField('Member Count', `${interaction.guild.memberCount - interaction.guild.members.filter(m=>m.user.bot).size} (${interaction.guild.members.filter(m=>m.user.bot).size} bots)`, true)
        .addField('AFK Timeout', `${interaction.guild.afkTimeout / 60} minutes`, true)
        .addField('Location', interaction.guild.region, true)
        .addField('Created', interaction.guild.createdAt.toLocaleString(), true)
        .addBlankField(true)
        .setTimestamp()
        .setImage(interaction.guild.iconURL)
        .setColor('#AD1457');

    interaction.reply({ embeds: [embed] });
  },
};
