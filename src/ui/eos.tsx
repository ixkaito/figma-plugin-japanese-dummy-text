/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

export default class EosSelect extends React.Component {
  // eos: HTMLInputElement

  // select = (element: HTMLInputElement) => {
  //   this.eos = element
  // }

  autoGenerate = () => {
    // parent.postMessage({ pluginMessage: { type: 'auto', eos } }, '*')
  }

  render() {
    const eosOptions = [
      { value: '', name: 'None (なし)' },
      { value: 'random', name: 'Random (ランダム)' },
      { value: '。', name: '。' },
    ].map((option, index) => <option key={index} value={option.value}>{option.name}</option>)

    return <div
      css={css`
        display: flex;
        margin-top: 8px;
      `}
    >
      <label
        htmlFor="eos"
        css={css`
          flex-grow: 1;
          line-height: 32px;
          white-space: nowrap;
        `}
      >
        End of sentences (文末):
      </label>
      <select
        id="eos"
        css={css`
          flex-shrink: 0;
          margin-left: 8px;
          width: 120px;
        `}
      >
        {eosOptions}
      </select>
    </div>
  }
}
