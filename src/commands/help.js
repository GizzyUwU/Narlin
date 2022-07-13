const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const array = []
const info = []

module.exports = {
  name: 'help',
  info: 'See My Commands :D',
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("See My Commands :D"),
  run: async (interaction) => {
    let commands = fs.readdirSync(__dirname).filter(f => f.endsWith('.js')).forEach((command) => {
      let prop = require(`./${command}`)
      array.push(prop.name)
      info.push(prop.info)
     })

     const infomation = info.join("\n")
  
     const cmds = array.join("\n")
    const embed = new MessageEmbed()
        .setTitle("Heyyy, Here's Commands")
        .setDescription(`Heyyy, Heard You Needed Help Using Me. Here Are My Command's`)
        .setColor('#AD1457')
        .addFields(
            { name: 'My Commands', value: `${cmds}`, inline: true },
            { name: `Infomation`, value: `${infomation}`, inline: true },
        )

    interaction.reply({ embeds: [embed] });
  },
};
