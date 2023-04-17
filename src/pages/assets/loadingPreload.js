const { contextBridge, ipcRenderer } = require('electron');



window.addEventListener("DOMContentLoaded", async () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        } else {
            console.warn(`Element with selector ${selector} not found`);
        }
    };

    for (const type of ["chrome", "node", "electron", "package"]) {
        if (type === "package") {
            replaceText(
                `${type}-version`,
                await ipcRenderer.invoke('getVersion')
            );
        } else if (process.versions[type]) {
            replaceText(
                `${type}-version`,
                process.versions[type]
            );
        }
    }
});