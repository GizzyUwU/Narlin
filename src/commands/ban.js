const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs');
module.exports = {
  name: 'ban',
  info: `Ban a member who's being naughty`,
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member who's being naughty")
    .addUserOption(option => option.setName("user").setDescription("User to ban.").setRequired(true))
    .addStringOption(option => option.setName("reason").setDescription("Reason for ban.").setRequired(false)),
    run: async (interaction) => {
    const target = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || "No reason provided.";

   await target.send(`You have been banned from ${interaction.guild.name} for ${reason}`)
   await target.ban(reason)
    const embed = new MessageEmbed()
        .setTitle('User has been banned!')
        .setDescription(`User ${target.tag} has been banned!`)
        .setColor('RANDOM')

    interaction.reply({ embeds: [embed] });
  },
};
