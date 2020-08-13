const commandLineArgs = require('command-line-args')
const optionDefinitions = [
  {name: 'book', alias: 'b', type: String},
  {name: 'read-type', alias: 'r', type: String},
  {name: 'page-flip-delay', alias: 'p', type: Number}
]
const cmdOpts = commandLineArgs(optionDefinitions)

console.log('cmd opts:', cmdOpts)

const fs = require('fs')
const YAML = require('yaml')
let ymlconfig = YAML.parse(fs.readFileSync('./options-merge/config.yml', 'utf8'))

const yamlOpts = {
  'book': ymlconfig.book.url,
  'read-type': ymlconfig.book['read-type'],
  'page-flip-delay': ymlconfig.book['page-flip-delay'],
  'creds': ymlconfig.creds,
}

let options = Object.assign({}, yamlOpts, cmdOpts)
console.log('merged opts:', options)

module.exports = options
