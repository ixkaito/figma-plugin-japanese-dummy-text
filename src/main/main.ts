import words from './words'
import Generator from './generator'

const dummyText = new Generator(words)

const filterNodes = (nodes: any) => {
  return nodes.filter((node: any) => {
    if (typeof node !== 'object') {
      return false
    }
    if (node.type === 'TEXT' || node.type === 'RECTANGLE') {
      return true
    }
    return false
  })
}

type Minmax = {
  min: number
  max: number
}

type Unit = {
  min: string
  max: string
  eos: string
}

const settings: {
  manual: {
    unit: string
  }
  auto: {
    eos: string
  }
  character: Unit
  sentence: Unit
} = {
  manual: {
    unit: figma.root.getPluginData('manualUnit'),
  },
  auto: {
    eos: figma.root.getPluginData('autoEos'),
  },
  character: {
    min: figma.root.getPluginData('characterMin'),
    max: figma.root.getPluginData('characterMax'),
    eos: figma.root.getPluginData('characterEos'),
  },
  sentence: {
    min: figma.root.getPluginData('sentenceMin'),
    max: figma.root.getPluginData('sentenceMax'),
    eos: figma.root.getPluginData('sentenceEos'),
  },
}

const pluginMessage: { [key: string]: any } = {
  showUI: false,
  ...settings,
}

figma.showUI(__html__, { height: 353 })

let nodes: any = filterNodes(figma.currentPage.selection)
pluginMessage.showUI = nodes.length > 0
figma.ui.postMessage(pluginMessage)

figma.on('selectionchange', () => {
  nodes = filterNodes(figma.currentPage.selection)
  figma.ui.postMessage({
    showUI: nodes.length > 0,
  })
})

figma.ui.onmessage = (msg) => {
  const { method, config } = msg
  const { manual, auto } = config

  nodes.forEach((node: any) => {
    figma
      .loadFontAsync({
        family: node.fontName.family,
        style: node.fontName.style,
      })
      .then(() => {
        /**
         * Manual Generation
         */
        if (method === 'manual') {
          // figma.root.setPluginData('manualUnit', manual.unit)
          const { eos } = config.manual
          const limit: number = manual.unit === 'sentence' ? 20 : 999
          const minmax: Minmax = {
            min: parseInt(manual.min, 10),
            max: parseInt(manual.max, 10),
          }
          minmax.min = minmax.min > limit ? limit : minmax.min
          minmax.max = minmax.max > limit ? limit : minmax.max

          let character: Minmax = minmax
          let sentence: number | Minmax = 1
          if (manual.unit === 'sentence') {
            character = {
              min: 60,
              max: 80,
            }
            sentence = minmax
          }

          node.characters = dummyText.generate({
            character,
            sentence,
            eos,
          })

          /**
           * Auto Generation
           */
        } else if (method === 'auto') {
          const _width: number = node.width
          const _height: number = node.height
          const _textAutoResize: string = node.textAutoResize
          const { eos } = config.auto

          if (node.textAutoResize === 'WIDTH_AND_HEIGHT') {
            node.characters = dummyText.generateChar(
              node.characters.length,
              eos,
            )
          } else {
            let _characters: string = ''
            node.characters = _characters
            node.textAutoResize = 'HEIGHT'

            while (node.width <= _width && node.height <= _height) {
              _characters = node.characters
              node.characters = node.characters + dummyText.generate({ eos })
            }

            while (node.width > _width || node.height > _height) {
              node.characters = node.characters.slice(0, -1)
            }

            const min: number =
              Math.floor(node.characters.length * 0.9) - _characters.length
            const max: number = node.characters.length - _characters.length

            node.characters = _characters

            if (!node.characters || min >= 10) {
              node.characters =
                node.characters +
                dummyText.generate({
                  character: { min, max },
                  sentence: 1,
                  eos,
                })
            }

            if (_textAutoResize === 'NONE') {
              node.textAutoResize = 'NONE'
              node.resize(_width, _height)
            }
          }
        }
      })
  })
}
