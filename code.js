// This plugin will open a modal to prompt the user to enter a number, and
// it will then generate that many texts on the screen.
// This file holds the main code for the plugins. It has access to the *document*.
// You can access browser APIs in the <script> tag inside "ui.html" which has a
// full browser environment (see documentation).
// This shows the HTML page in "ui.html".
figma.showUI(__html__);
// Calls to "parent.postMessage" from within the HTML page will trigger this
// callback. The callback will be passed the "pluginMessage" property of the
// posted message.
figma.ui.onmessage = msg => {
    // One way of distinguishing between different types of messages sent from
    // your HTML page is to use an object with a "type" property like this.
    // 選択レイヤーが単一のテキストの時のみ発動する
    if (figma.currentPage.selection[0] && figma.currentPage.selection[0].type === "TEXT") {
        if (msg.type === 'word-selected') {
            const nodes = [];
            const text = figma.createText();
            figma.loadFontAsync({
                family: "Roboto",
                style: "Regular"
            }).then(() => {
                for (let i = 0; i < msg.count; i++) {
                    text.characters = text.characters + `${i + 1}語目`;
                }
                nodes.push(text);
                figma.currentPage.selection = nodes;
            });
            figma.viewport.scrollAndZoomIntoView(nodes);
            console.log(`Word is selected = ${msg.word}`);
        }
        else if (msg.type === 'sentence-selected') {
            const nodes = [];
            const text = figma.createText();
            figma.loadFontAsync({
                family: "Roboto",
                style: "Regular"
            }).then(() => {
                for (let i = 0; i < msg.count; i++) {
                    text.characters = text.characters + `これは${i + 1}つ目の文です。`;
                }
                nodes.push(text);
                figma.currentPage.selection = nodes;
            });
            figma.viewport.scrollAndZoomIntoView(nodes);
            console.log(`Sentence is selected = ${msg.sentence}`);
        }
        else if (msg.type === 'para-selected') {
            const nodes = [];
            const text = figma.createText();
            figma.loadFontAsync({
                family: "Roboto",
                style: "Regular"
            }).then(() => {
                for (let i = 0; i < msg.count; i++) {
                    text.characters = text.characters + `これはテストです。${i + 1}段落目です。 / `;
                }
                nodes.push(text);
                figma.currentPage.selection = nodes;
            });
            figma.viewport.scrollAndZoomIntoView(nodes);
            console.log(`Paragraph is selected = ${msg.para}`);
        }
    }
};
