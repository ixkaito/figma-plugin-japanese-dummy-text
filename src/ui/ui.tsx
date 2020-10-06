/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import ReactDOM from 'react-dom'
import ErrorMessage from './errorMessage'
import InputNumber from './inputNumber'
import SelectUnit from './selectUnit'
import SelectEos from './selectEos'
import './ui.css'

type UnitConfig = {
  min?: string
  max?: string
  eos?: string
}

type Config = {
  [key: string]: any
  manual: {
    [key: string]: string
    unit: string
    min: string
    max: string
    eos: string
  }
  auto: {
    eos: string
  }
  character: UnitConfig
  sentence: UnitConfig
}

type State = {
  [key: string]: any
  showUI: boolean
  config: Config
}

class App extends React.Component<{}, State> {
  state: State = {
    showUI: false,
    config: {
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
    },
  }

  componentDidMount() {
    onmessage = (event) => {
      this.handleMessage(event)
    }
  }

  handleMessage = (event: any) => {
    const { pluginMessage } = event.data
    const { showUI, hasPluginData, config } = pluginMessage
    this.setState({ showUI })
    if (hasPluginData) {
      config.manual = { ...config.manual, ...config[config.manual.unit] }
      this.setState({ config })
    }
  }

  handleNumberChange = (value: string, minmax: string) => {
    const { config } = this.state
    const { unit } = config.manual
    config.manual[minmax] = value
    config[unit][minmax] = value
    this.setState({ config })
  }

  handleUnitChange = (unit: string) => {
    const { config } = this.state
    config.manual = { ...config[unit], unit }
    this.setState({ config })
  }

  handleEosChange = (eos: string, method: string) => {
    const { config } = this.state
    config[method].eos = eos
    if (method === 'manual') {
      const { unit } = config.manual
      config[unit].eos = eos
    }
    this.setState({ config })
  }

  generate = (method: any) => {
    const { config } = this.state
    parent.postMessage({ pluginMessage: { method, config } }, '*')
  }

  render() {
    const { showUI, config } = this.state
    return (
      <div>
        {showUI ? (
          <div>
            <section
              css={css`
                display: flex;
                flex-direction: column;
              `}
            >
              <div className="sectionHeader">手動 (Manual)</div>
              <div
                css={css`
                  display: flex;
                `}
              >
                <InputNumber
                  value={config.manual.min}
                  min="1"
                  max={config.manual.unit === 'character' ? '999' : '20'}
                  placeholder="Min"
                  onChange={(value) => this.handleNumberChange(value, 'min')}
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
                  value={config.manual.max}
                  min="1"
                  max={config.manual.unit === 'character' ? '999' : '20'}
                  placeholder="Max"
                  onChange={(value) => this.handleNumberChange(value, 'max')}
                />
                <SelectUnit
                  onChange={(value) => this.handleUnitChange(value)}
                  unit={config.manual.unit}
                />
              </div>
              <SelectEos
                onChange={(value) => this.handleEosChange(value, 'manual')}
                eos={config.manual.eos}
              />
              <button
                id="manual"
                css={css`
                  margin-top: 8px;
                  white-space: nowrap;
                `}
                onClick={() => this.generate('manual')}
              >
                生成 (Generate)
              </button>
            </section>
            <section
              css={css`
                border-top: 1px solid #e5e5e5;
                display: flex;
                flex-direction: column;
              `}
            >
              <div className="sectionHeader">自動 (Auto)</div>
              <p className="description">
                テキストボックスのサイズに合わせてダミーテキストを自動生成します。
                (Generate the perfect amount of text to fit the text box.)
              </p>
              <SelectEos
                onChange={(value) => this.handleEosChange(value, 'auto')}
                eos={config.auto.eos}
              />
              <button
                css={css`
                  margin-top: 8px;
                  white-space: nowrap;
                `}
                onClick={() => this.generate('auto')}
              >
                自動生成 (Auto-generate)
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
