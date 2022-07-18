module.exports = {
  event: "interactionCreate", // Name of the event
  oneTime: false, // If set to true the event will only be fired once until the Client is restarted
  run: async (i) => {
    if (!i.isCommand()) return;
    const commandCheck = i.Client.commands.get(i.commandName);

    if (!commandCheck) {
      return console.log(`Could not find command" '${i.commandName}'`);
    } else {
      await commandCheck.run(i);
    }
  },
};
