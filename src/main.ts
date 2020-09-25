import words from './words'
import dummyText from './dummyText'

const dummy = new dummyText(words)

// This plugin will open a modal to prompt the user to enter a number, and
// it will then generate that many texts on the screen.

// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).

// This shows the HTML page in "ui.html".
figma.showUI(__html__, { height: 353 })

// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
  // One way of distinguishing between different types of messages sent from
  // your HTML page is to use an object with a "type" property like this.

  const selections: any = figma.currentPage.selection
  const eos: string = msg.eos

  for (const selection of selections) {
    let text: string = ''

    if (selection && selection.type === 'TEXT') {

      figma.loadFontAsync({
        family: selection.fontName.family,
        style: selection.fontName.style
      }).then(() => {
        /**
         * Manual Generation
         */
        if (msg.type === 'manual') {
          dummy.randomGenerate(0, 3)
          const min: number = parseInt(msg.number.min, 10)
          const max: number = parseInt(msg.number.max, 10)
          const num: number = min && max && max > min
            ? Math.floor(Math.random() * (max - min + 1)) + min
            : min
              ? min
              : max
                ? max
                : 0
          if (!num) return

          let sentenceNum: number = 1
          let characterNum: number = num > 999 ? 999 : num
          if (msg.unit === 'sentence') {
            sentenceNum = num > 20 ? 20 : num
            characterNum = Math.floor(Math.random() * 21) + 60
          }

          while (sentenceNum--) {
            text = text + dummy.generate(
              characterNum,
              eos,
            )
          }

          selection.characters = text

        /**
         * Auto Generation
         */
        } else if (msg.type === 'auto') {
          const _width: number = selection.width
          const _height: number = selection.height
          let _characters: string = ''

          if (selection.textAutoResize === 'WIDTH_AND_HEIGHT') {
            const _count: number = selection.characters.length
            selection.characters = dummy.generate(_count, '')

            do {
              _characters = selection.characters
              selection.characters = selection.characters.slice(0, -1)
            } while (selection.width > _width || selection.height > _height)

            selection.characters = _characters

          } else {
            const _textAutoResize: string = selection.textAutoResize
            selection.textAutoResize = 'HEIGHT'
            selection.characters = ''

            while (selection.width < _width || selection.height < _height) {
              _characters = selection.characters
              selection.characters = selection.characters + dummy.generate(
                Math.floor(Math.random() * 21) + 60,
                eos,
              )
            }

            do {
              _characters = selection.characters
              selection.characters = selection.characters.slice(0, -1)
            } while (selection.width > _width || selection.height > _height)

            selection.characters = selection.characters.slice(
              0,
              Math.floor(
                -0.1 * Math.random() * selection.characters.length
              ) - (eos ? 1 : 0)
            ) + eos

            if (_textAutoResize === 'NONE') {
              selection.resize(_width, _height)
            }
          }
        }
      })
    } else {
      // Text is not selected.
    }
  }

  // 文字を入れるたびに、box内か外かを判定、はみでたらストップする？大きさを図る？
  // selection.widthとheightを計測してtextのサイズを変更？

};
