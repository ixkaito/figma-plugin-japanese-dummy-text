/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'
import _uniqueId from 'lodash/uniqueId'

const eosOptions = [
  { value: '', name: 'None (なし)' },
  { value: 'random', name: 'Random (ランダム)' },
  { value: '。', name: '。' },
].map((option, index) => (
  <option key={index} value={option.value}>
    {option.name}
  </option>
))

type Props = {
  method: string;
  eos?: string;
  onChange: (method: string, eos: string) => void;
}

export default class EosSelect extends React.Component<Props> {
  id: string = _uniqueId('eos-')
  state = {
    eos: this.props.eos == null ? 'random' : this.props.eos,
  }

  handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    this.setState({ eos: event.target.value })
    this.props.onChange(this.props.method, event.target.value)
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
          End of sentences (文末):
        </label>
        <select
          id={this.id}
          value={this.state.eos}
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
