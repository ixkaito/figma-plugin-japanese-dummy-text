import kuromoji from 'kuromoji'

class Markov {
  private dicPath: string

  public constructor(config: { dicPath?: string } = {}) {
    this.dicPath = config?.dicPath || 'node_modules/kuromoji/dict/'
  }

  /**
   * chain
   */
  public chain(text: string, num: number = 1) {
    kuromoji.builder({ dicPath: this.dicPath }).build((err, tokenizer) => {
      if (err) {
        console.log(err)
      } else {
        const path = tokenizer.tokenize(text)
        return path
      }
    })
  }
}

export default Markov
