const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
let finalIntents = []
module.exports = {
  name: 'say',
  info: 'Talk As Me!',
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Talk As Me!")
    .addStringOption(option => option.setName("text").setDescription("what you want me to say.").setRequired(true)),
  run: async (interaction) => {
    const string = interaction.options.getString('text')
    const embed = new MessageEmbed()
        .setDescription(`${string}`)
        .setColor('#AD1457')

    interaction.reply({ embeds: [embed] });
  },
};
