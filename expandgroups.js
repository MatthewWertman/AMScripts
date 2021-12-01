function expandGroups() {
    let rows = $('datatable-row-wrapper.datatable-row-wrapper');
    // loop through each initial group row and get the total number of rigs in that group
    // Which is going to be used to determine the future position of the next group header row
    const rowOffsets = [];
    rows.each(function () {
    	const groupText = $(this).find('span').eq(2).text().trim();
        rowOffsets.push(Number(groupText.slice(groupText.indexOf("Total") + 7, groupText.length - 1)));
    });
    console.log('[bitcap-expandgroups] Expanding groups...');
    let rowCounter = 0;  // keep track of what row we are on
    for (let i = 0; i < rowOffsets.length; i++) {
        // trigger click event on row of rowCounter
        $(rows[rowCounter]).find('i.fa-chevron-right').click();
        // refresh the total number of rows
        rows = $('datatable-row-wrapper.datatable-row-wrapper');
        // set our counter to the position of the next group header row
        rowCounter += rowOffsets[i] + 1;
    }
    console.log('[bitcap-expandgroups] Done!');
};
expandGroups();
