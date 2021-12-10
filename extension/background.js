// background.js
const tabQuery = {
    active: true,
    currentWindow: true,
    url: ["https://cloud.awesomeminer.com/miners", "http://192.168.101.100:17790/miners"]
}

chrome.runtime.onInstalled.addListener(() => {
    console.log('AMScripts successfully activated');
});

chrome.commands.onCommand.addListener(async (command) => {
    console.log(`Command "${command}" triggered`);
    let [tab] = await chrome.tabs.query(tabQuery);
    if (command === "expandGroups") {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: exec,
            args: ["datatable-row-wrapper", "fa-chevron-right", "bitcap-expandgroups", "Expanding"]
        });
    } else if (command === "collapseGroups") {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            function: exec,
            args: ["datatable-row-wrapper", "fa-chevron-down", "bitcap-collapsegroups", "Collapsing"]
        });
    }
});

function exec(class1, class2, utilName, actionString) {
    const rowCount = document.getElementsByClassName(class1).length;
    let rows = document.getElementsByClassName(class2);
    console.log(`[${utilName}] ${actionString} groups...`);
    for (let i = 0; i < rowCount; i++) {
        rows[0].click();
    }
    console.log(`[${utilName}] Done!`);
}
