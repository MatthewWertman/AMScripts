// A simple and "hacky" function that expands all group header rows in AM Cloud.
// KNOWN Issues:
//  - Limited to working with no active filtering;
// Author: MatthewWertman
// Date created: 11/30/21
var expandGroups;
(expandGroups = function () {
    // get all group header rows
    // let rows = $('datatable-row-wrapper.datatable-row-wrapper');
    let rows = Array.from(document.getElementsByClassName('datatable-row-wrapper'));
    // loop through each header row and determine where the next one will be
    // after being expanded
    const rowOffsets = [];
    for (let row in rows) {
    	const headerText = rows[row].querySelectorAll('span')[2].textContent.trim();
        //parse out and save future position of next header using the total n of rigs
        rowOffsets.push(Number(headerText.slice(headerText.indexOf("Total") + 7, headerText.length - 1)));
    };
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
})();
