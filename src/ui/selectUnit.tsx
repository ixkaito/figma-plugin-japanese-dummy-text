/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

const unitOptions = [
  { value: 'character', name: '文字 (Character)' },
  { value: 'sentence', name: '文 (Sentence)' },
].map((option, index) => (
  <option key={index} value={option.value}>
    {option.name}
  </option>
))

type Props = {
  unit: string
  onChange: (unit: string) => void
}

export default class SelectUnit extends React.Component<Props> {
  handleChange(event: React.ChangeEvent<HTMLSelectElement>): void {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <select
        value={this.props.unit}
        onChange={(e) => this.handleChange(e)}
        css={css`
          flex-shrink: 0;
          margin-left: 8px;
          width: 120px;
        `}
      >
        {unitOptions}
      </select>
    )
  }
}
