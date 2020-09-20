const path = require('path')
const fs = require('fs')
const kuromoji = require('kuromoji')

const input = fs
  .readFileSync(path.resolve(__dirname, 'input.txt'), 'utf8')
  .replace(/(\r\n|\n|\r)/gm, '')

kuromoji
  .builder({ dicPath: path.resolve(__dirname, '../node_modules/kuromoji/dict/') })
  .build((err, tokenizer) => {
    const output = JSON.stringify(tokenizer.tokenize(input))
    fs.writeFile(path.resolve(__dirname, 'text.json'), output, (err) => {
      if (err) {
        console.error(err)
      }
    })
  })
