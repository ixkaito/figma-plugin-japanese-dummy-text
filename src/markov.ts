import kuromoji from 'kuromoji'

class Markov {
  private name: string = ''

  public constructor(name: string) {
    this.name = name
  }
}

export default new Markov('test')
