const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const warnModel = require('../../models/warnModel')

module.exports = {
  name: 'warns',
  info: `Check a member's warns!`,
  data: new SlashCommandBuilder()
    .setName("warns")
    .setDescription("Check a member's warns!")
    .addUserOption(option => option.setName("user").setDescription("User To See Warns From.").setRequired(true)),
    run: async (interaction) => {
    const user = interaction.options.getUser('user')
   const userWarnings = await warnModel.find({
       userId: user.id,
       guildId: interaction.guildId,
   })

   if(!userWarnings?.length) {
       interaction.reply( `${user} Has No Warning's In This Server.`)
   } else {
   const embedDesc = userWarnings.map((warn) => {
const moderator = interaction.guild.members.cache.get(
    warn.moderatorId
);
return [
    `ID Of Warn: ${warn._id}`,
    `Moderator: ${moderator || "Has Left"}`,
    `Date: ${warn.timestamp}`,
    `Reason: ${warn.reason}`
].join("\n");
   })
   .join("\n\n");
    const embed = new MessageEmbed()
        .setTitle(`${user.tag} Warnings!`)
        .setDescription(embedDesc)
        .setColor('RANDOM')

    interaction.reply({ embeds: [embed] });
}
  },
};
