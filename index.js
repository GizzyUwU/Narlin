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

// Express
const express = require('express');
const app = express();

// Slash Commands
const { Collection } = require('discord.js')
const discord = require('discord.js')
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

const Client = new discord.Client({ intents: finalIntents })

// Commands
Client.commands = new Collection()

const events = fs
  .readdirSync('./src/events')
  .filter(file => file.endsWith('.js'))

events.forEach(event => {
  const eventFile = require(`./src/events/${event}`)
  if (eventFile.oneTime) {
    Client.once(eventFile.event, (...args) => eventFile.run(...args))
  } else {
    Client.on(eventFile.event, (...args) => eventFile.run(...args))
  }
})

Client.login(config.bot.token)

const expresscli = ora('Registering Express').start()

const files = fs.readdirSync('./src/express/requests').filter(f => f .endsWith('.js'))
files.forEach(f => {
  const file = require(`./src/express/requests/${f}`)
  if(file && file.name) {
    try {
    app.get(file.name, file.run)
    expresscli.succeed(`Successfully Loaded Express System`)
    } catch(err) {
expresscli.warn(`[ERROR] ${err}`)
    }
  } 
})
const array = []
const info = []
app.get('/', (req, res) => {
  let commands = fs.readdirSync(`./src/commands/`).filter(f => f.endsWith('.js')).forEach((cmd) => {
    let prop = require(`./src/commands/${cmd}`)
    array.push(prop.name)
    info.push(prop.info)
   })

   const infomation = info.join("<br>")

   const cmds = array.join("<br>")
   
  let file = fs.readFileSync('./src/express/html/index.html', { encoding: 'utf8'})
  file = file.replace('$$cmds$$', cmds)
  res.send(file)
})
app.use('/css', express.static('./src/express/css'))
app.use('/bootstrap', express.static('./node_modules/bootstrap'))
app.listen(3000)
module.exports.Client = Client;
module.exports = Client;