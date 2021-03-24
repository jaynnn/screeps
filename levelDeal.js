const creepManager = require('./creepManager')
const structureManager = require('structureManager')

function execOnce(lv, sp) {
    let uniName = 'site_' + lv
    if (!(global[uniName])) {
        structureManager.createSites(lv, sp);
        global.uniName = true;
    }
}

let deals ={
    0 : function(sp) {
        creepManager.run();
    },
    1 : function(sp) {

    },
    2 : function(sp) {

    },
    3 : function(sp) {

    },
    4 : function(sp) {

    },
    5 : function(sp) {

    },
    6 : function(sp) {

    },
    7 : function(sp) {

    },
    8 : function(sp) {

    },
}

let run = function(lv, sp) {
    execOnce(lv, sp);
    deals[lv](sp);
}

module.exports = {
    run = run,
}
