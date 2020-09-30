/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import './ui.css'

const appCSS = css`
  .sectionHeader {
    color: #333;
    font-weight: 600;
    line-height: 16px;
    margin-bottom: 8px;
  }
`

const App = () => {
  return (
    <div css={appCSS}>
      <div id="error" css={css`
        color: #f24822;
        padding: 14px;
        text-align: center;
      `}>
        <p css={css`
          font-size: 16px;
        `}>
          Please select some text or rectangle layers.
        </p>
        <p css={css`
          margin-top: 8px;
        `}>
          テキストもしくは矩形レイヤーを<br />
          1つ以上選択してください。
        </p>
      </div>
      <div id="ui" css={css`
        /* display: none; */
      `}>
        <section css={css`
          display: flex;
          flex-direction: column;
        `}>
          <div className="sectionHeader">Manual (手動)</div>
          <div css={css`
            display: flex;
          `}>
            <input type="number" id="min" value="10" min="1" max="999" placeholder="Min" css={css`
              width: 25%;
              flex-grow: 1;
              padding: 0 8px;
            `} />
            <span css={css`
              line-height: 32px;
              margin: 0 4px;
            `}>–</span>
            <input type="number" id="max" value="" min="1" max="999" placeholder="Max" css={css`
              width: 25%;
              flex-grow: 1;
              padding: 0 8px;
            `} />
            <select id="unit" css={css`
              flex-shrink: 0;
              margin-left: 8px;
              width: 120px;
            `}>
              <option value="character">Characters (文字)</option>
              <option value="sentence">Sentences (文)</option>
            </select>
          </div>
          <div css={css`
            display: flex;
            margin-top: 8px;
          `}>
            <label htmlFor="eos" css={css`
              flex-grow: 1;
              line-height: 32px;
              white-space: nowrap;
            `}>End of sentences (文末):</label>
            <select id="manual-eos" css={css`
              flex-shrink: 0;
              margin-left: 8px;
              width: 120px;
            `}>
              <option value="">None (なし)</option>
              <option value="random" selected>Random (ランダム)</option>
              <option value="。">。</option>
            </select>
          </div>
          <button id="manual" css={css`
            margin-top: 8px;
            white-space: nowrap;
          `}>Generate (生成)</button>
        </section>
        <section css={css`
          border-top: 1px solid #e5e5e5;
          display: flex;
          flex-direction: column;
        `}>
          <div className="sectionHeader">Auto (自動)</div>
          <p>Generate the perfect amount of text to fit the layer’s frame. (テキストボックスのサイズに合わせてダミーテキストを自動生成します。)</p>
          <div css={css`
            display: flex;
            margin-top: 8px;
          `}>
            <label htmlFor="eos" css={css`
              flex-grow: 1;
              line-height: 32px;
              white-space: nowrap;
            `}>End of sentences (文末):</label>
            <select id="auto-eos" css={css`
              flex-shrink: 0;
              margin-left: 8px;
              width: 120px;
            `}>
              <option value="">None (なし)</option>
              <option value="random" selected>Random (ランダム)</option>
              <option value="。">。</option>
            </select>
          </div>
          <button id="auto" css={css`
            margin-top: 8px;
            white-space: nowrap;
          `}>Auto-generate (自動生成)</button>
        </section>
      </div>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))
