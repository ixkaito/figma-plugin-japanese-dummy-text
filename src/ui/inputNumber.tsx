/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

type Props = {
  num?: string;
  min: string;
  max: string;
  placeholder?: string;
  onChange: (num: string) => void;
}

export default class InputNumber extends React.Component<Props> {
  state = {
    num: this.props.num,
    min: this.props.min,
    max: this.props.max,
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    this.setState({ num: event.target.value })
    this.props.onChange(event.target.value)
  }

  render() {
    return (
      <input
        type="number"
        value={this.state.num}
        onChange={(e) => this.handleChange(e)}
        min={this.props.min}
        max={this.props.max}
        placeholder={this.props.placeholder}
        css={css`
          width: 25%;
          flex-grow: 1;
          padding: 0 8px;
        `}
      />
    )
  }
}
