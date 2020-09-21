import kuromoji from 'kuromoji'

type IpadicFeaturesList = kuromoji.IpadicFeatures[]
interface Dict {
  [key: string]: {
    [key: string]: {
      [key: string]: number
    }
  }
}

class Markov {
  private dicPath: string

  public constructor(config: { dicPath?: string } = {}) {
    this.dicPath = config?.dicPath || 'node_modules/kuromoji/dict/'
  }

  /**
   * chain
   */
  public chain(text: any, num: number = 1) {
    const dict = this.makeDic(text)
    return this.makeSentence(dict, num)
  }

  private makeDic(items: IpadicFeaturesList): Dict {
    let tmp: string[] = ['@']
    const dic: Dict = {}
    for (const i in items) {
      const t: kuromoji.IpadicFeatures = items[i]
      let word: string = t.surface_form
      word = word.replace(/\s*/, '')

      if (word === '' || word === 'EOS') continue
      tmp.push(word)
      if (tmp.length < 3) continue
      if (tmp.length > 3) tmp.splice(0, 1)

      this.setWord3(dic, tmp)

      if (word === '。') {
        tmp = ['@']
        continue
      }
    }

    return dic
  }

  private setWord3(p: Dict, s3: string[]): void {
    const w1 = s3[0]
    const w2 = s3[1]
    const w3 = s3[2]
    if (p[w1] === undefined) p[w1] = {}
    if (p[w1][w2] === undefined) p[w1][w2] = {}
    if (p[w1][w2][w3] === undefined) p[w1][w2][w3] = 0
    p[w1][w2][w3]++
  }

  private makeSentence(dic: Dict, sentence: number): string {
    let output = ''
    for (let i = 0; i < sentence; i++) {
      const ret = []
      const top = dic['@']
      if (!top) continue
      let w1: string = this.choiceWord(top)
      let w2: string = this.choiceWord(top[w1])
      ret.push(w1)
      ret.push(w2)
      for (;;) {
        if (!dic[w1] || !dic[w1][w2]) break
        const w3 = this.choiceWord(dic[w1][w2])
        ret.push(w3)
        if (w3 === '。') break
        w1 = w2
        w2 = w3
      }
      output = ret.join('')
    }
    return output
  }

  private choiceWord(obj: { [key: string]: string | {} }): string {
    const ks: string[] = Object.keys(obj)
    const i = this.rnd(ks.length)
    return ks[i]
  }

  private rnd(num: number): number {
    return Math.floor(Math.random() * num)
  }
}

export default Markov
