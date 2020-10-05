/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import _uniqueId from 'lodash/uniqueId'

const eosOptions = [
  { value: '', name: 'なし (None)' },
  { value: 'random', name: 'ランダム (Random)' },
  { value: '。', name: '。' },
].map((option, index) => (
  <option key={index} value={option.value}>
    {option.name}
  </option>
))

type Props = {
  eos: string
  onChange: (eos: string) => void
}

export default class SelectEos extends React.Component<Props> {
  id: string = _uniqueId('eos-')

  handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <div
        css={css`
          display: flex;
          margin-top: 8px;
        `}
      >
        <label
          htmlFor={this.id}
          css={css`
            flex-grow: 1;
            line-height: 32px;
            white-space: nowrap;
          `}
        >
          文末 (End of sentences):
        </label>
        <select
          id={this.id}
          value={this.props.eos}
          onChange={(e) => this.handleChange(e)}
          css={css`
            flex-shrink: 0;
            margin-left: 8px;
            width: 120px;
          `}
        >
          {eosOptions}
        </select>
      </div>
    )
  }
}
