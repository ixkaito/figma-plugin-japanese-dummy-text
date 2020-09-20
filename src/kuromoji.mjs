import path from 'path'
import fs from 'fs'
import kuromoji from 'kuromoji'

const input = fs
  .readFileSync('input.txt', 'utf8')
  .replace(/(\r\n|\n|\r)/gm, '')

kuromoji
  .builder({ dicPath: '../node_modules/kuromoji/dict/' })
  .build((err, tokenizer) => {
    const output = JSON.stringify(tokenizer.tokenize(input))
    fs.writeFile('text.json', output, (err) => {
      if (err) {
        console.error(err)
      }
    })
  })
