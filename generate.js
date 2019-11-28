const fs = require('fs')

const stream = fs.createWriteStream('src/index.js')
const folder = 'node_modules/bootstrap-icons/icons'

const camalize = (string) => {
  return (' ' + string).toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (match, char) => char.toUpperCase())
}

const stripExtension = (string) => string.substr(0, string.lastIndexOf('.'));

stream.once('open', () => {
  fs.readdirSync(folder).forEach(fileName => {
    stream.write(
      `export { default as ${camalize(stripExtension(fileName))} } from 'bootstrap-icons/icons/${fileName}'\n`
    )
  })

  stream.end()
})
