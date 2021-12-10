var expandGroups;
(expandGroups = function () {
    let rA = Array.from(document.getElementsByClassName('datatable-row-wrapper'));
    const rOffs = [];
    for (let r in rA) {
    	const t = rA[r].querySelectorAll('span')[2].textContent.trim();
        rOffs.push(Number(t.slice(t.indexOf("Total") + 7, t.length - 1)));
    };
    console.log('[bitcap-expandgroups] Expanding groups...');
    let rP = 0;
    for (let o = 0; o < rOffs.length; o++) {
        rA[rP].querySelector('i.fa-chevron-right').click();
        rA = Array.from(document.getElementsByClassName('datatable-row-wrapper'));
        rP += rOffs[o] + 1;
    }
    console.log('[bitcap-expandgroups] Done!');
})();
