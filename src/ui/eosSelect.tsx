/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React, { useState } from 'react'
import _uniqueId from 'lodash/uniqueId'

type Props = {
  eos?: string
}

const EosSelect: React.FC<Props> = ({ eos }) => {
  const [id] = useState(_uniqueId('eos-'))
  eos = eos == null ? 'random' : eos

  const eosOptions = [
    { value: '', name: 'None (なし)' },
    { value: 'random', name: 'Random (ランダム)' },
    { value: '。', name: '。' },
  ].map((option, index) => (
    <option key={index} value={option.value}>
      {option.name}
    </option>
  ))

  return (
    <div
      css={css`
        display: flex;
        margin-top: 8px;
      `}
    >
      <label
        htmlFor={id}
        css={css`
          flex-grow: 1;
          line-height: 32px;
          white-space: nowrap;
        `}
      >
        End of sentences (文末):
      </label>
      <select
        id={id}
        value={eos}
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

export default EosSelect