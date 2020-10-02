interface Minmax {
  min?: number
  max?: number
}

interface Default {
  character: number | Minmax
  sentence: number | Minmax
  eos: string
}

interface Options {
  character?: number | Minmax
  sentence?: number | Minmax
  eos?: string
}

class Generator {
  public words: string[] = []

  public defaults: Default = {
    character: {
      min: 40,
      max: 80,
    },
    sentence: 1,
    eos: ''
  }

  public constructor(words: string[], defaults?: Default) {
    this.words = words
    this.defaults = {...this.defaults, ...defaults}
  }

  /**
   * Returns an exact number of characters
   *
   * @param {number} num Character number
   * @param {string} eos The end of a sentence
   */
  public generateChar(num: number, eos: string = ''): string {
    eos = this.eos(eos)
    let text: string = ''

    for (let i = 0; i < num; i++) {
      let word = this.words[Math.floor(Math.random() * this.words.length)]

      // Do not use "、", "」" or "）" for the first character
      if (i === 0) {
        while (word.match(/^(、|」|）)/g)) {
          word = this.words[Math.floor(Math.random() * this.words.length)]
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

  /**
   * Returns an exact or random number of sentences with an exact or random
   * number of characters.
   *
   * @param {Object} options Character number, sentence number or the end of a
   * sentence to overwrite the default settings.
   */
  public generate(options: Options = {}): string {
    const config = {...this.defaults, ...options}
    const character: number = this.num(config.character)
    let sentence: number = this.num(config.sentence)
    let text: string = ''

    while (sentence--) {
      text = text + this.generateChar(character, config.eos)
    }

    return text
  }

  /**
   * Returns a random integer between min (included) and max (included)
   *
   * @param {number} min Minimun number
   * @param {number} max Maximum number
   */
  private random(min: number, max: number): number {
    if (min > max) {
      [min, max] = [max, min]
    }
    return min + Math.floor(Math.random() * (max - min + 1))
  }

  /**
   * Returns the input number or a random integer between min (included) and
   * max (included) of an object
   *
   * @param {number|Object} num A number or an object with min and max
   */
  private num(num: number | Minmax): number {
    if (typeof num === 'object' && num !== null) {
      return num.min && num.max
        ? this.random(num.min, num.max)
        : num.min
          ? num.min
          : num.max
            ? num.max
            : 0
    }
    return num
  }

  /**
   * Returns a period or an empty string.
   *
   * @param {string} eos Empty string, "。" or "random"
   */
  private eos(eos: string): string {
    if (eos === 'random') {
      eos = ['', '。'][this.random(0, 1)]
    }
    return eos
  }
}

export default Generator
