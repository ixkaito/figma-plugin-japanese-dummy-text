/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import ReactDOM from 'react-dom'
import EosSelect from './eos'
import './ui.css'

const appCSS = css`
  .sectionHeader {
    color: #333;
    font-weight: 600;
    line-height: 16px;
    margin-bottom: 8px;
  }
`

class App extends React.Component {
  // eos: HTMLInputElement

  // select = (element: HTMLInputElement) => {
  //   this.eos = element
  // }

  autoGenerate = () => {
    // parent.postMessage({ pluginMessage: { type: 'auto', eos } }, '*')
  }

  render() {
    const unitOptions = [
      { value: 'character', name: 'Characters (文字)' },
      { value: 'sentence', name: 'Sentences (文)' },
    ].map((option) => <option value={option.value}>{option.name}</option>)

    const eosOptions = [
      { value: '', name: 'None (なし)' },
      { value: 'random', name: 'Random (ランダム)' },
      { value: '。', name: '。' },
    ].map((option) => <option value={option.value}>{option.name}</option>)

    return (
      <div css={appCSS}>
        <div
          id="error"
          css={css`
            color: #f24822;
            padding: 14px;
            text-align: center;
          `}
        >
          <p
            css={css`
              font-size: 16px;
            `}
          >
            Please select some text or rectangle layers.
          </p>
          <p
            css={css`
              margin-top: 8px;
            `}
          >
            テキストもしくは矩形レイヤーを
            <br />
            1つ以上選択してください。
          </p>
        </div>
        <div
          id="ui"
          css={css`
            /* display: none; */
          `}
        >
          <section
            css={css`
              display: flex;
              flex-direction: column;
            `}
          >
            <div className="sectionHeader">Manual (手動)</div>
            <div
              css={css`
                display: flex;
              `}
            >
              <input
                type="number"
                id="min"
                value="10"
                min="1"
                max="999"
                placeholder="Min"
                css={css`
                  width: 25%;
                  flex-grow: 1;
                  padding: 0 8px;
                `}
              />
              <span
                css={css`
                  line-height: 32px;
                  margin: 0 4px;
                `}
              >
                –
              </span>
              <input
                type="number"
                id="max"
                value=""
                min="1"
                max="999"
                placeholder="Max"
                css={css`
                  width: 25%;
                  flex-grow: 1;
                  padding: 0 8px;
                `}
              />
              <select
                id="unit"
                css={css`
                  flex-shrink: 0;
                  margin-left: 8px;
                  width: 120px;
                `}
              >
                {unitOptions}
              </select>
            </div>
            <EosSelect />
            <button
              id="manual"
              css={css`
                margin-top: 8px;
                white-space: nowrap;
              `}
            >
              Generate (生成)
            </button>
          </section>
          <section
            css={css`
              border-top: 1px solid #e5e5e5;
              display: flex;
              flex-direction: column;
            `}
          >
            <div className="sectionHeader">Auto (自動)</div>
            <p>
              Generate the perfect amount of text to fit the layer’s frame.
              (テキストボックスのサイズに合わせてダミーテキストを自動生成します。)
            </p>
            <EosSelect />
            <button
              css={css`
                margin-top: 8px;
                white-space: nowrap;
              `}
              onClick={this.autoGenerate}
            >
              Auto-generate (自動生成)
            </button>
          </section>
        </div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))