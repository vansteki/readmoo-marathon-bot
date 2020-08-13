const commandLineArgs = require('command-line-args')
const optionDefinitions = [
  { name: 'book', alias: 'b', type: String },
  { name: 'read-type', alias: 't', type: String }
]
const opts = commandLineArgs(optionDefinitions)

console.log(opts)
