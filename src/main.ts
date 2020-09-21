import Markov from './markov'
import words from './words'
// This plugin will open a modal to prompt the user to enter a number, and
// it will then generate that many texts on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 280 })

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  const markov = new Markov
  // console.log(markov.chain(text))

  const selection: any = figma.currentPage.selection[0]

  const dummy: any = {
    characters: ['文', 'は', '意', '見', '解', 'が', '引', '用'],
    sentences: [
      'ペディアの公表認め投稿困難な形式を引用あり。',
      '許諾できれ下を編集号有効の引用主題がありれがはするり。',
      '投稿法引用なけれますとの著作にありことは。',
      'プロジェクトのFreeは。',
      '文は意見解が引用満たさ商業ですませ以下。',
    ],
    paragraphs: [
      '',
    ],
  }

  if (selection && selection.type === 'TEXT') {

    figma.loadFontAsync({
      family: selection.fontName.family,
      style: selection.fontName.style
    }).then(() => {
      let text: string = '' // selection.characters;

      if (msg.type === 'manual') {

        if (msg.unit === 'characters') {
          for (let i = 0; i < msg.number; i++) {
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

            text = `${text}${word}`
            text = text.replace(/\s+/g, ' ')
            // const num: number = i >= dummy[msg.unit].length ? i % dummy[msg.unit].length : i
            // text = `${text}${dummy[msg.unit][num]}`
          }
          text = text.substr(0, msg.number)
        } else if (msg.unit === 'sentences') {

        }

        selection.characters = text

      } else if (msg.type === 'auto') {
        // text = 'Auto generate';
        // selection.characters = text
      }
    })
  } else {
    // Text is not selected.
  }

  // 文字を入れるたびに、box内か外かを判定、はみでたらストップする？大きさを図る？
  // selection.widthとheightを計測してtextのサイズを変更？

};
