/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import ReactDOM from 'react-dom'
import ErrorMessage from './errorMessage'
import SelectUnit from './selectUnit'
import SelectEos from './selectEos'
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
      number: {
        min: '10',
      },
      unit: 'character',
      eos: 'random',
    },
    auto: {
      eos: 'random',
    },
  }

  handleUnitChange = (method: string, unit: string) => {
    this.state[method].unit = unit
  }

  handleEosChange = (method: string, eos: string) => {
    this.state[method].eos = eos
  }

  generate = () => {
    parent.postMessage(
      { pluginMessage: { ...this.state.manual, method: 'manual' } },
      '*',
    )
  }

  autoGenerate = () => {
    parent.postMessage(
      { pluginMessage: { ...this.state.auto , method: 'auto' } },
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
              <SelectUnit
                onChange={this.handleUnitChange}
                method="manual"
                unit={this.state.manual?.unit}
              />
            </div>
            <SelectEos
              onChange={this.handleEosChange}
              method="manual"
              eos={this.state.manual?.eos}
            />
            <button
              id="manual"
              css={css`
                margin-top: 8px;
                white-space: nowrap;
              `}
              onClick={this.generate}
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
            <SelectEos
              onChange={this.handleEosChange}
              method="auto"
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
