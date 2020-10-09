/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

type Props = {
  value?: string
  min: string
  max: string
  placeholder?: string
  onChange: (value: string) => void
}

export default class InputNumber extends React.Component<Props> {
  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <input
        type="number"
        value={this.props.value}
        onChange={(e) => this.handleChange(e)}
        min={this.props.min}
        max={this.props.max}
        placeholder={this.props.placeholder}
        css={css`
          width: 20%;
          flex-grow: 1;
          padding: 0 8px;
        `}
      />
    )
  }
}
