![Screenshot](https://user-images.githubusercontent.com/5457539/95561209-5c2ec900-0a55-11eb-9063-decb7b603374.png)

# Japanese Dummy Text

Generate Japanese dummy text to fill your text layers.

Select all the text layers you want to generate dummy text for then click "Generate" — it will generate for each layer uniquely. If you only input a number to either Min or Max, it will generate the exact number of characters or sentences. If you input different numbers to Min/Max, it will generate the number of characters or sentences in that range.

"Auto-generate" will automatically fill the selected layers with the perfectly amount of dummy text to fit the text box.

----

日本語のダミーテキストを生成します。

ダミーテキストを生成したいテキストレイヤーをすべて選択し「生成」をクリックすると、レイヤーごとにダミーテキストを生成します。Min/Max のどちらかのみを入力すると、正確な文字 (文) 数を生成します。Min/Max に異なる数値を入力すると、その範囲内の文字 (文) 数を生成します。

「自動生成」は、選択したレイヤーのテキストボックスに最適な量のダミーテキストで自動的に生成します。

## Local development

1.  Clone the repository

    ```bash
    git clone https://github.com/ixkaito/figma-plugin-japanese-dummy-text
    cd figma-plugin-japanese-dummy-text
    ```

2.  Install the dependencies

    ```bash
    npm install
    ```

3.  Build the plugin

    ```bash
    npm run dev
    ```

4.  Open the [Figma desktop app](https://www.figma.com/downloads/)

5.  Go to `Menu > Plugins > Development > New Plugin...`

6.  Choose figma-plugin-japanese-dummy-text/manifest.json

7.  Run the plugin by going to `Menu > Plugins > Development > Japanese Dummy Text`

## Copyright / License

© 2020 Kite / MIT
