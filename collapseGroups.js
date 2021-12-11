 // A simple and "hacky" function that COLLAPSES all group header rows in AM Cloud.
// with the added measure for not locking the website.
// thanks to Helgi on stackoverflow for the code snippet
//https://stackoverflow.com/a/719599
// Author: MatthewWertman
// Date created: 12/10/21
let rows = document.getElementsByClassName("fa-chevron-down");
const length = rows.length;
var index = 0;
console.log('[bitcap-collapsegroups] Collapsing groups...');
var worker = function() {
  for (; index < length; index++) {
    rows[0].click();
    // here we delay the worker a little bit every so often to prevent
    // the website from locking up.
    if (index + 1 < length && index % 100 == 0) {
        setTimeout(worker, 5);
        break;
    }
  }
};
console.time();
worker();
console.timeEnd();
console.log('[bitcap-collapsegroups] Done!');
