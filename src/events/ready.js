// Util
const ora = require("ora");
const config = require("../../config");
const fs = require("fs");
const list = [
  'You :D',
  `Your Lovely Request's :D`,
  `Discord Request's From You :D`,
];

// Slash Commands
const slash = require("../util/slash");

// CLI
const botLoader = ora("Starting Discord.js Client").start();

module.exports = {
  event: "ready", // Name of the event
  oneTime: true, // If set to true the event will only be fired once until the Client is restarted
  run: async (Client) => {
    const commandFiles = fs
      .readdirSync("./src/commands")
      .filter((file) => file.endsWith(".js"));

    let commandsArray = [];
    commandFiles.forEach((file) => {
      const command = require(`../commands/${file}`);
      Client.commands.set(command.data.name, command);

      commandsArray.push(command);
    });

    const finalArray = commandsArray.map((e) => e.data.toJSON());
    slash.register(Client.user.id, finalArray);
    botLoader.succeed(`${Client.user.tag} Started`);
    setInterval(() => {
      // generate random number between 1 and list length.
      const randomIndex = Math.floor(Math.random() * (list.length - 1) + 1);
      const newActivity = list[randomIndex];

      Client.user.setPresence({ activities: [{ name: `${newActivity}`, type: `LISTENING` }] });
    }, 5000);
  },
};
