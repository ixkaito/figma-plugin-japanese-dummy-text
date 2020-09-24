class dummyText {
  public words: string[] = []

  public constructor(words: string[]) {
    this.words = words
  }

  public generate(num: number = 0, eos: string): string {
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
}

export default dummyText
