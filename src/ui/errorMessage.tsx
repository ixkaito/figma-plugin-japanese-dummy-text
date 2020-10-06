/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

const UnitSelect: React.FC = () => {
  return (
    <div
      id="error"
      css={css`
        padding: 16px;
      `}
    >
      <p>テキストレイヤーを1つ以上選択してください。</p>
      <p
        css={css`
          margin-top: 8px;
        `}
      >
        Please select some text layers.
      </p>
    </div>
  )
}

export default UnitSelect
