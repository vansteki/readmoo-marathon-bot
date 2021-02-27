const commandLineArgs = require('command-line-args')
const optionDefinitions = [
  {name: 'book', alias: 'b', type: String},
  {name: 'page-flip-delay', alias: 'd', type: Number},
  {name: 'page-max-flip-step', alias: 's', type: Number},
  {name: 'username', alias: 'u', type: String},
  {name: 'password', alias: 'p', type: String}
]
const cmdOpts = commandLineArgs(optionDefinitions)

console.log('cmd opts:', cmdOpts)

const fs = require('fs')
const YAML = require('yaml')
let ymlconfig = YAML.parse(fs.readFileSync('./config.yml', 'utf8'))

const yamlOpts = {
  "book": ymlconfig.book.url,
  "page-flip-delay": ymlconfig.book["page-flip-delay"],
  "page-max-flip-step": ymlconfig.book["page-max-flip-step"],
  "username": ymlconfig.creds.username,
  "password": ymlconfig.creds.password,
}

let options = Object.assign({}, yamlOpts, cmdOpts)
// console.log('merged opts:', options)

// TODO options validation
// TODO puppeteer viewport

module.exports = options
