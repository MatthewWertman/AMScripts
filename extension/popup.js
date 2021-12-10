const tabQuery = {
    active: true,
    currentWindow: true,
    url: ["https://cloud.awesomeminer.com/miners", "http://192.168.101.100:17790/miners"]
}
const expandGroups = document.getElementById("expandGroupsBtn");
const collapseGroups = document.getElementById("collapseGroupsBtn");

// Listeners
expandGroups.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query(tabQuery);

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: exec,
        args: ["datatable-row-wrapper", "fa-chevron-right", "bitcap-expandgroups", "Expanding"]
    });
});

collapseGroups.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query(tabQuery);

    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        function: exec,
        args: ["datatable-row-wrapper", "fa-chevron-down", "bitcap-collapsegroups", "Collapsing"]
    });
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
