const fs = require('fs')
const array = []
const info = []
module.exports = {
    name: '/rrr',
    run: async (req, res) => {
      let commands = fs.readdirSync(`./src/commands/`).filter(f => f.endsWith('.js')).forEach((cmd) => {
        let prop = require(`./src/commands/${cmd}`)
        array.push(prop.name)
        info.push(prop.info)
       })
  
       const infomation = info.join("\n")
    
       const cmds = array.join("<br>")
       
      let file = fs.readFileSync('./src/express/html/index.html', { encoding: 'utf8'})
      file = file.replace('$$cmds$$', cmds)
      res.send(file)
    }
}

