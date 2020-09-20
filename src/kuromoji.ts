import kuromoji from 'kuromoji'
import fs from 'fs'

const input = fs.readFileSync('input.txt', 'utf8').replace(/(\r\n|\n|\r)/gm, '')

kuromoji
  .builder({ dicPath: '../node_modules/kuromoji/dict/' })
  .build((err, tokenizer) => {
    const output = JSON.stringify(tokenizer.tokenize(input), null, 2)
    fs.writeFile('text.json', output, (err) => {
      if (err) {
        console.error(err)
      }
    })
  })
