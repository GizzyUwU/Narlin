const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const infoModel = require('../../models/infoModel')
let date = new Date().toLocaleDateString("fr-FR");
const dateTime = date;

module.exports = {
  name: 'sendupdate',
  info: 'Send a update message across the bot!',
  data: new SlashCommandBuilder()
    .setName("sendupdate")
    .setDescription("Send a update message across the bot!")
    .addStringOption(option => option.setName("msg").setDescription("Update message to send.").setRequired(true)),
    run: async (interaction) => {
    if(interaction.user.id === "669947245776338994") {

    const message = interaction.options.getString('msg')
    const update = new infoModel({
        msg: message,
        timestamp: dateTime,
    });

    update.save()
      .catch(err => console.log(err))
    const embed = new MessageEmbed()
        .setTitle(`Update sent!`)
        .setDescription(`The following update message has been sent to the database and now viewable with /info command!`)
        .addField('Update:', message)
        .setColor('RANDOM')

    interaction.reply({ embeds: [embed] });
  } else {
     interaction.reply(`Sorry but you do not have access to this command.`)
  }
}
};
