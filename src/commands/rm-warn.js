const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const warnModel = require('../../models/warnModel')
let date = new Date().toLocaleDateString("fr-FR");
const dateTime = date;

module.exports = {
  name: 'rmwarn',
  info: `Remove warn's from a user.`,
  data: new SlashCommandBuilder()
    .setName("rmwarn")
    .setDescription("Remove warn's from a user.")
    .addStringOption(option => option.setName("id").setDescription("ID of Warning.").setRequired(true)),
    run: async (interaction) => {
    const id = interaction.options.getString('id')
 warnModel.findByIdAndRemove(id)

      .catch(err => console.log(err))
    const embed = new MessageEmbed()
        .setTitle(`Warning removed!`)
        .setDescription(`Warning ${id} is removed.`)
        .setColor('RANDOM')

    interaction.reply({ embeds: [embed] });
  
  },
};
