/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import React from 'react'

const UnitSelect: React.FC = () => {
  return (
    <div
      id="error"
      css={css`
        color: #f24822;
        padding: 14px;
        text-align: center;
      `}
    >
      <p
        css={css`
          font-size: 16px;
        `}
      >
        Please select some text or rectangle layers.
      </p>
      <p
        css={css`
          margin-top: 8px;
        `}
      >
        テキストもしくは矩形レイヤーを
        <br />
        1つ以上選択してください。
      </p>
    </div>
  )
}

export default UnitSelect
