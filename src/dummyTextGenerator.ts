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
    let num: number = 0
    if (typeof config.character === 'object' && config.character !== null) {
      num = config.character.min && config.character.max
        ? this.random(config.character.min, config.character.max)
        : config.character.min
          ? config.character.min
          : config.character.max
            ? config.character.max
            : num
    } else if (config.character) {
      num = config.character
    }

    console.log(this.generateChar(num, config.eos))
    return ''
  }

  private random(min: number, max: number): number {
    if (min > max) {
      [min, max] = [max, min]
    }
    return min + Math.floor(Math.random() * (max - min + 1))
  }
}

export default dummyTextGenerator
