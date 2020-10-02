/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import ReactDOM from 'react-dom'
import ErrorMessage from './errorMessage'
import InputNumber from './inputNumber'
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

type Unit = {
  min?: string;
  max?: string;
  eos?: string;
}

type State = {
  [key: string]: any;
  showUI: boolean;
  manual: {
    unit: string;
    min: string;
    max: string;
    eos: string;
  };
  auto: {
    eos: string;
  };
  character: Unit;
  sentence: Unit;
}

class App extends React.Component<{}, State> {
  state: State = {
    showUI: false,
    manual: {
      unit: 'character',
      min: '10',
      max: '',
      eos: 'random',
    },
    auto: {
      eos: 'random',
    },
    character: {
      min: '10',
      max: '',
      eos: 'random',
    },
    sentence: {
      min: '1',
      max: '',
      eos: 'random',
    },
  }

  componentDidMount() {
    onmessage = (event) => {
      this.handleMessage(event)
    }
  }

  handleMessage = (event: any) => {
    const { pluginMessage } = event.data
    this.setState({ showUI: pluginMessage.showUI })
  }

  handleNumberChange = (value: string, method: string, minmax: string) => {
    this.state[method][minmax] = value
    if (method === 'manual') {
      const { unit } = this.state.manual
      this.state[unit][minmax] = value
    }
    this.setState({ ...this.state })
  }

  handleUnitChange = (unit: string, method: string) => {
    this.setState({ [method]: { ...this.state[unit], unit } })
  }

  handleEosChange = (eos: string, method: string) => {
    this.state[method].eos = eos
    if (method === 'manual') {
      const { unit } = this.state.manual
      this.state[unit].eos = eos
    }
    this.setState({ ...this.state })
  }

  generate = () => {
    parent.postMessage(
      { pluginMessage: { ...this.state.manual, method: 'manual' } },
      '*',
    )
  }

  autoGenerate = () => {
    parent.postMessage(
      { pluginMessage: { ...this.state.auto, method: 'auto' } },
      '*',
    )
  }

  render() {
    return (
      <div css={appCSS}>
        {this.state.showUI ? (
          <div>
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
                <InputNumber
                  value={this.state.manual.min}
                  min="1"
                  max={this.state.manual.unit === 'character' ? '999' : '20'}
                  placeholder="Min"
                  onChange={value =>
                    this.handleNumberChange(value, 'manual', 'min')
                  }
                />
                <span
                  css={css`
                    line-height: 32px;
                    margin: 0 4px;
                  `}
                >
                  –
                </span>
                <InputNumber
                  value={this.state.manual.max}
                  min="1"
                  max={this.state.manual.unit === 'character' ? '999' : '20'}
                  placeholder="Max"
                  onChange={value =>
                    this.handleNumberChange(value, 'manual', 'max')
                  }
                />
                <SelectUnit
                  onChange={value => this.handleUnitChange(value, 'manual')}
                  unit={this.state.manual?.unit}
                />
              </div>
              <SelectEos
                onChange={value => this.handleEosChange(value, 'manual')}
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
                onChange={(eos) => this.handleEosChange('auto', eos)}
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
        ) : (
          <ErrorMessage />
        )}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'))
