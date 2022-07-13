const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require('fs')
const moment = require("moment")

const flags = {
	DISCORD_EMPLOYEE: 'Discord Employee',
	DISCORD_PARTNER: 'Discord Partner',
	BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
	BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
	HYPESQUAD_EVENTS: 'HypeSquad Events',
	HOUSE_BRAVERY: 'House of Bravery',
	HOUSE_BRILLIANCE: 'House of Brilliance',
	HOUSE_BALANCE: 'House of Balance',
	EARLY_SUPPORTER: 'Early Supporter',
	TEAM_USER: 'Team User',
	SYSTEM: 'System',
	VERIFIED_BOT: 'Verified Bot',
	VERIFIED_DEVELOPER: 'Verified Bot Developer'
};
function trimArray(arr, maxLen = 25) {
  if (arr.array().length > maxLen) {
    const len = arr.array().length - maxLen;
    arr = arr.array().sort((a, b) => b.rawPosition - a.rawPosition).slice(0, maxLen);
    arr.map(role => `<@&${role.id}>`)
    arr.push(`${len} more...`);
  }
  return arr.join(", ");
}
const statuses = {
  "online" : "🟢",
  "idle" : "🟠",
  "dnd" : "🔴",
  "offline" : "⚫️",
}

module.exports = {
  name: 'userinfo',
  info: "Check A User's Info",
  options: [{
      name: 'mention',
      description: 'mention a user',
      type: 'USER',
  }],
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Check A User's Info")
    .addUserOption(option => option.setName("user").setDescription("User To Grab Info From.").setRequired(true)),
  run: async (interaction) => {
    const user = interaction.options.getUser('user')

    const member = interaction.guild.members.cache.get(user.id);
    const embed = new MessageEmbed()
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 512 }))
        .setAuthor("Information about:   " + member.user.username + "#" + member.user.discriminator, member.user.displayAvatarURL({ dynamic: true }), "https://discord.gg/UA6sSqKXpZ")
        .addField('**❱ Username:**',`<@${member.user.id}>\n\`${member.user.tag}\``,true)
        .addField('**❱ ID:**',`\`${member.id}\``,true)
        .addField('**❱ Avatar:**',`[\`Link to avatar\`](${member.user.displayAvatarURL({ format: "png" })})`,true)
        .addField('**❱ Date Join DC:**', "\`"+moment(member.user.createdTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.user.createdTimestamp).format("hh:mm:ss") + "\`",true)
        .addField('**❱ Date Join Guild:**', "\`"+moment(member.joinedTimestamp).format("DD/MM/YYYY") + "\`\n" + "`"+ moment(member.joinedTimestamp).format("hh:mm:ss")+ "\`",true)
        .addField('**❱ Is a Bot:**',`\`${member.user.bot ? "✔️" : "❌"}\``,true)
        .setColor('RANDOM')

    interaction.reply({ embeds: [embed] });
  },
};
