const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const array = []
const info = []

module.exports = {
  name: 'help',
  info: 'Check out my commands!',
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Check out my commands!"),
  run: async (interaction) => {
    let commands = fs.readdirSync(__dirname).filter(f => f.endsWith('.js')).forEach((command) => {
      let prop = require(`./${command}`)
      array.push(prop.name)
      info.push(prop.info)
     })

     const infomation = info.join("\n")
  
     const cmds = array.join("\n")
    const embed = new MessageEmbed()
        .setTitle("Heyyy, here's my commands!")
        .setDescription(`Hey there, heard you needed help using me. Here are my commands!`)
        .setColor('RANDOM')
        .addFields(
            { name: 'My commands:', value: `${cmds}`, inline: true },
            { name: `Descriptions:`, value: `${infomation}`, inline: true },
        )

    interaction.reply({ embeds: [embed] });
  },
};
