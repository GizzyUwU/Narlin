const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const warnModel = require('../../models/warnModel')
let date = new Date().toLocaleDateString("fr-FR");
const dateTime = date;

module.exports = {
  name: 'rm-warn',
  info: `Remove Warn's From A User`,
  data: new SlashCommandBuilder()
    .setName("rm-warn")
    .setDescription("Remove Warn's From A User")
    .addStringOption(option => option.setName("id").setDescription("ID Of Warning.").setRequired(true)),
    run: async (interaction) => {
    const id = interaction.options.getString('id')
 warnModel.findByIdAndRemove(id)

      .catch(err => console.log(err))
    const embed = new MessageEmbed()
        .setTitle(`Warning Removed!`)
        .setDescription(`Warning ${id} Is Removed`)
        .setColor('#AD1457')

    interaction.reply({ embeds: [embed] });
  
  },
};
