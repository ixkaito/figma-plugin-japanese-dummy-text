import srcWords from './words'

const makeSentences = (words: string[], num: number = 10, eos: string = '。') => {
  let text: string = ''

  for (let i = 0; i < num; i++) {
    let word = words[Math.floor(Math.random() * words.length)]

    // Do not use "、", "」" or "）" for the first character
    if (i === 0) {
      while (word.match(/^(、|」|）)/g)) {
        word = words[Math.floor(Math.random() * words.length)]
      }
    }

    // Add spaces around English words
    if (word.match(/[a-zA-Z]+/g)) {
      word = ` ${word} `
    }

    text = `${text}${word}`.replace(/\s+/g, ' ')
  }
  return text.substr(0, num - (eos ? 1 : 0)) + eos
}

// This plugin will open a modal to prompt the user to enter a number, and
// it will then generate that many texts on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 316 })

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  const selections: any = figma.currentPage.selection

  for (const selection of selections) {
    if (selection && selection.type === 'TEXT') {

      figma.loadFontAsync({
        family: selection.fontName.family,
        style: selection.fontName.style
      }).then(() => {
        if (msg.type === 'manual') {
          const min: number = parseInt(msg.number.min, 10)
          const max: number = parseInt(msg.number.max, 10)
          const num: number = max > min
            ? Math.floor(Math.random() * (max - min + 1)) + min
            : min

          if (msg.unit === 'characters') {
            selection.characters = makeSentences(srcWords, num, msg.eos)
          } else if (msg.unit === 'sentences') {

          }
        } else if (msg.type === 'auto') {
          // text = 'Auto generate';
          // selection.characters = text
        }
      })
    } else {
      // Text is not selected.
    }
  }

  // 文字を入れるたびに、box内か外かを判定、はみでたらストップする？大きさを図る？
  // selection.widthとheightを計測してtextのサイズを変更？

};
