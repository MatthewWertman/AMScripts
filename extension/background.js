// background.js
var isBtnsLoaded = true
try {
    var exGroupsBtn = document.getElementById("exGroupsBtn");
    var collGroupsBtn = document.getElementById("collGroupsBtn");
    var homeBtn = document.getElementById("homeBtn");
} catch (err) {
    isBtnsLoaded = false
}
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
            target: {
                tabId: tab.id
            },
            function: exec,
            args: ["fa-chevron-right", "bitcap-expandgroups", "Expanding"]
        });
    } else if (command === "collapseGroups") {
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            function: exec,
            args: ["fa-chevron-down", "bitcap-collapsegroups", "Collapsing"]
        });
    }
});
// button listeners
if (isBtnsLoaded) {
    exGroupsBtn.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query(tabQuery)
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            function: exec,
            args: ["fa-chevron-right", "bitcap-expandgroups", "Expanding"]
        })
    });
    collGroupsBtn.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query(tabQuery)
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            function: exec,
            args: ["fa-chevron-down", "bitcap-collapsegroups", "Collapsing"]
        })
    });
    homeBtn.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query(tabQuery);
        chrome.scripting.executeScript({
            target: {
                tabId: tab.id
            },
            function: goHome,
        })
    });
}
}

function exec(class2, utilName, actionString) {
    let rows = document.getElementsByClassName(class2);
    const length = rows.length;
    let index = 0;
    console.log(`[${utilName}] ${actionString} groups...`);
    var worker = function() {
        try {
            rows[0].click()
        } catch (err) {}
    };
    worker();
    for (; index < length; index++) {
        setTimeout(worker, 5);
    }
    console.log(`[${utilName}] Done!`);
}