import words from './words'
import Generator from './generator'

const dummyText = new Generator(words)

interface Minmax {
  min: number;
  max: number;
}

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
    if (selection && selection.type === 'TEXT') {
      figma.loadFontAsync({
        family: selection.fontName.family,
        style: selection.fontName.style
      }).then(() => {
        /**
         * Manual Generation
         */
        if (msg.type === 'manual') {
          const limit: number = msg.unit === 'sentence' ? 20 : 999
          const minmax: Minmax = {
            min: parseInt(msg.number.min, 10),
            max: parseInt(msg.number.max, 10),
          }
          minmax.min = minmax.min > limit ? limit : minmax.min
          minmax.max = minmax.max > limit ? limit : minmax.max

          let character: Minmax = minmax
          let sentence: number | Minmax = 1
          if (msg.unit === 'sentence') {
            character = {
              min: 60,
              max: 80,
            }
            sentence = minmax
          }

          selection.characters = dummyText.generate({
            character,
            sentence,
            eos,
          })

        /**
         * Auto Generation
         */
        } else if (msg.type === 'auto') {
          const _width: number = selection.width
          const _height: number = selection.height
          const _textAutoResize: string = selection.textAutoResize
          let _characters: string = ''

          if (selection.textAutoResize === 'WIDTH_AND_HEIGHT') {
            selection.characters = dummyText.generateChar(
              selection.characters.length,
              eos
            )
          } else {
            selection.textAutoResize = 'HEIGHT'
            selection.characters = ''

            while (selection.width < _width || selection.height < _height) {
              _characters = selection.characters
              selection.characters = selection.characters + dummyText.generateChar(
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
