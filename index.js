require('dotenv').config()
const url = "mongodb://Warns:warn@192.168.1.134:27017/Warns"
const mongoose = require('mongoose');
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
// Util
const ora = require('ora')
const config = require('./config')
const fs = require('fs')

// Slash Commands
const { Client, Collection } = require('discord.js')
const slash = require('./src/util/slash')
const { builtinModules } = require('module')

// CLI
const intentsLoader = ora('Registering Intents').start()

// Checks
let finalIntents = []
if (!Array.isArray(config.bot.intents)) {
  intentsLoader.warn(
    'Intents in config file must be in an array, default intents will be used'
  )
} else {
  finalIntents = config.bot.intents
  intentsLoader.succeed('Loaded intents successfully from the config file')
}

const client = new Client({ intents: finalIntents })
module.exports = client;

// Commands
client.commands = new Collection()

const events = fs
  .readdirSync('./src/events')
  .filter(file => file.endsWith('.js'))

events.forEach(event => {
  const eventFile = require(`./src/events/${event}`)
  if (eventFile.oneTime) {
    client.once(eventFile.event, (...args) => eventFile.run(...args))
  } else {
    client.on(eventFile.event, (...args) => eventFile.run(...args))
  }
})

client.login(config.bot.token)
