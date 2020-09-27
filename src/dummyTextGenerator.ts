interface Minmax {
  min?: number;
  max?: number;
}

interface Config {
  character?: number | Minmax;
  sentence?: number | Minmax;
  eos?: string;
}

class dummyTextGenerator {
  public words: string[] = []

  public constructor(words: string[]) {
    this.words = words
  }

  public generateChar(num: number, eos: string = ''): string {
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

  public generate(config: Config = {
    character: {
      min: 60,
      max: 80,
    },
    sentence: 1,
    eos: ''
  }): string {
    let text: string = ''
    let sentence: number = this.num(config.sentence)
    const character: number = this.num(config.character)

    while (sentence--) {
      text = text + this.generateChar(character, config.eos)
    }

    return text
  }

  private random(min: number, max: number): number {
    if (min > max) {
      [min, max] = [max, min]
    }
    return min + Math.floor(Math.random() * (max - min + 1))
  }

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
}

export default dummyTextGenerator
