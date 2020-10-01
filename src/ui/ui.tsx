/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import ReactDOM from 'react-dom'
import ErrorMessage from './errorMessage'
import EosSelect from './eosSelect'
import UnitSelect from './unitSelect'
import './ui.css'

const appCSS = css`
  .sectionHeader {
    color: #333;
    font-weight: 600;
    line-height: 16px;
    margin-bottom: 8px;
  }
`

type Props = {
  [key: string]: any
}

class App extends React.Component<Props> {
  state: Props = {
    manual: {
      eos: 'random',
    },
    auto: {
      eos: 'random',
    },
  }

  handleUnitChange = (type: string, unit: string) => {
    this.state[type].unit = unit
  }

  handleEosChange = (type: string, eos: string) => {
    this.state[type].eos = eos
  }

  autoGenerate = () => {
    parent.postMessage(
      { pluginMessage: { type: 'auto', eos: this.state.auto.eos } },
      '*',
    )
  }

  render() {
    return (
      <div css={appCSS}>
        <ErrorMessage />
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
              <UnitSelect
                onChange={this.handleUnitChange}
                type="manual"
                unit={this.state.manual?.unit}
              />
            </div>
            <EosSelect
              onChange={this.handleEosChange}
              type="manual"
              eos={this.state.manual?.eos}
            />
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
            <EosSelect
              onChange={this.handleEosChange}
              type="auto"
              eos={this.state.auto?.eos}
            />
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
