const fs = require('fs')
const YAML = require('yaml')
const creds = fs.readFileSync('./creds.yml', 'utf8')
const book = fs.readFileSync('./book.yml', 'utf8')

console.log(YAML.parse(creds), YAML.parse(book))
