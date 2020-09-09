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
    if (msg.type === 'generate-texts') {
        const nodes = [];
        for (let i = 0; i < msg.count; i++) {
            const text = figma.createText();
            figma.loadFontAsync({
                family: "Roboto", style: "Regular"
            }).then(() => {
                text.x = i * 50;
                return text.characters = `test x ${i}`;
            });
            figma.currentPage.selection = nodes;
            figma.viewport.scrollAndZoomIntoView(nodes);
            figma.currentPage.appendChild(text);
            nodes.push(text);
            console.log(`${i}times`);
        }
    }
    if (msg.type === 'word-selected') {
        console.log(`Word is selected = ${msg.word}`);
    }
    else if (msg.type === 'sentence-selected') {
        console.log(`Sentence is selected = ${msg.sentence}`);
    }
    else if (msg.type === 'para-selected') {
        console.log(`Paragraph is selected = ${msg.para}`);
    }
};
