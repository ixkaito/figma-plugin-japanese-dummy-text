const path = require('path')
const fs = require('fs')
const kuromoji = require('kuromoji')

const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')
  .replace(/(\r\n|\n|\r)/gm, '')

kuromoji
  .builder({ dicPath: path.resolve(__dirname, '../node_modules/kuromoji/dict/') })
  .build((err, tokenizer) => {
    if (err) console.error(err)
    let words = []
    for (const word of tokenizer.tokenize(input)) {
      if (word.surface_form.match(/\s+/g)) continue
      words.push(word.surface_form)
    }
    words = JSON.stringify(words)
    words = `export default ${words}`
    fs.writeFile(path.resolve(__dirname, 'words.js'), words, (err) => {
      if (err) console.error(err)
    })
  })
