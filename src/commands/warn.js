const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const warnModel = require('../../models/warnModel')
let date = new Date().toLocaleDateString("fr-FR");
const dateTime = date;

module.exports = {
  name: 'warn',
  info: 'Warn a user for being naughty!',
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Warn a user for being naughty!")
    .addUserOption(option => option.setName("user").setDescription("User To Warn.").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Reason For Issued Warning.").setRequired(true)),
    run: async (interaction) => {
    const user = interaction.options.getUser('user')
    if(user.id === "993172709531988069") {
      interaction.reply("OI WHAT DID I DO TO YOU DON'T TRY WARN ME ILL WARN YOU YOUR SO RUDE!!!!!!!!")
    } else {
    const reasontxt = interaction.options.getString('reason')
    const warn = new warnModel({
        userId: user.id,
        guildId: interaction.guildId,
        moderatorId: interaction.user.id,
        reason: reasontxt,
        timestamp: dateTime,
    });

    warn.save()
      .catch(err => console.log(err))
    const embed = new MessageEmbed()
        .setTitle(`A warning has been issued!`)
        .setDescription(`A warning has been issued to user ${user} by Modeator ${interaction.user}.`)
        .addField('Reason:', reasontxt)
        .setColor('#AD1457')

    interaction.reply({ embeds: [embed] });
  }
  },
};
