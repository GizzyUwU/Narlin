const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const infoModel = require('../../models/infoModel')
module.exports = {
  name: 'info',
  info: 'Infomation about me!',
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Information about me!")
    .addStringOption(option =>
        option.setName('category')
            .setDescription('Categories of infomation.')
            .setRequired(true)
            .addChoice('Updates', 'updates')
            .addChoice('About me', 'about')),
  run: async (interaction, Client) => {
    const string = interaction.options.getString('category')
    if(string === "updates") {
const updateStrings = await infoModel.find()
const embedDesc = updateStrings.map((logs) => {
  return [
    `Update ID: ${logs._id}`,
    `Date: ${logs.timestamp}`,
    `Message: ${logs.msg}`
  ].join("\n");       
}) 
.join("\n\n");
    const embed = new MessageEmbed()
    .setTitle('Updates')
        .setDescription(`${embedDesc}`)
        .setColor('RANDOM')

    interaction.reply({ embeds: [embed] });
    } else if (string === "about") {
      const embed = new MessageEmbed()
      .setTitle('About me!')
          .setDescription(`See what's about me!`)
          .addField('Programming language:', `NodeJS`)
          .addField('Owner:', `NeroGizmo#9443`)
          .addField('Version:', '2')
          .addField('Discord.JS Version:', 'V13')
          .setFooter('Revamped Version Of Narlin#0238')
          .setColor('RANDOM')
  
      interaction.reply({ embeds: [embed] });
    }
  },
};
