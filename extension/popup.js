
let expandGroups = document.getElementById("expandGroupsBtn");

expandGroups.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true, url: ["https://cloud.awesomeminer.com/miners", "http://192.168.101.100:17790/miners"] });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: execExpandGroupsUtil,
    });
});

// The body of this function will be executed as a content script inside the
// current page
function execExpandGroupsUtil() {
    // // get all group header rows
    let rows = Array.from(document.getElementsByClassName('datatable-row-wrapper'));
    // loop through each header row and determine where the next one will be
    // after being expanded
    const rowOffsets = [];
    for (let row in rows) {
        const headerText = rows[row].querySelectorAll('span')[2].textContent.trim();
        rowOffsets.push(Number(headerText.slice(headerText.indexOf("Total") + 7, headerText.length - 1)));
    }
    console.log('[bitcap-expandgroups] Expanding groups...');
    let rowPointer = 0;  // keep track of what row we are on
    for (let i = 0; i < rowOffsets.length; i++) {
        // trigger click event on row of rowPointer
        rows[rowPointer].querySelector('i.fa-chevron-right').click();
        // refresh the total number of rows
        rows = Array.from(document.getElementsByClassName('datatable-row-wrapper'));
        // set our counter to the position of the next group header row
        rowPointer += rowOffsets[i] + 1;
    }
    console.log('[bitcap-expandgroups] Done!');
}
