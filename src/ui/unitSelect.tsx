/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

type Props = {
  unit?: string
}

const UnitSelect: React.FC<Props> = ({ unit }) => {
  unit = unit || 'character'

  const unitOptions = [
    { value: 'character', name: 'Characters (文字)' },
    { value: 'sentence', name: 'Sentences (文)' },
  ].map((option, index) => (
    <option key={index} value={option.value}>
      {option.name}
    </option>
  ))

  return (
    <select
      value={unit}
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

export default UnitSelect
