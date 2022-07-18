const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
let finalIntents = []
module.exports = {
  name: 'say',
  info: 'Talk as me!',
  data: new SlashCommandBuilder()
    .setName("say")
    .setDescription("Talk As Me!")
    .addStringOption(option => option.setName("text").setDescription("What you want me to say.").setRequired(true)),
  run: async (interaction) => {
    const string = interaction.options.getString('text')
    const embed = new MessageEmbed()
        .setDescription(`${string}`)
        .setColor('RANDOM')

    interaction.reply({ embeds: [embed] });
  },
};
