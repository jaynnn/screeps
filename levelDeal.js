const creepManager = require('./creepManager')
const structureManager = require('structureManager');
const config = require('./config');

let creepBorner = function(sp, lvCfg) {
    if (creepManager.getCreepNum(config.creepType.upper) < lvCfg.otherCreep.upperNum) {
        creepManager.createCreep(sp, config.spQueueLvs.normal, {
            role : config.creepType.upper,
            body : lvCfg.otherCreep.upper,
        });
    }
    if (creepManager.getCreepNum(config.creepType.builder) < lvCfg.otherCreep.builderNum) {
        creepManager.createCreep(sp, config.spQueueLvs.low, {
            role : config.creepType.builder,
            body : lvCfg.otherCreep.builder,
        });
    }
}

//被回收可能会再次执行，但无所谓
let execOnce = function(lv, sp) {
    let uniName = 'site_' + lv
    if (!(global[uniName])) {
        structureManager.createSites(lv, sp);
        let cfg = config.lvCfg[lv];
        creepBorner(sp, cfg);
        global.uniName = true;
    }
}

let deals ={
    0 : function(sp, lvCfg) {
        
    },
    1 : function(sp, lvCfg) {

    },
    2 : function(sp, lvCfg) {

    },
    3 : function(sp, lvCfg) {

    },
    4 : function(sp, lvCfg) {

    },
    5 : function(sp, lvCfg) {

    },
    6 : function(sp, lvCfg) {

    },
    7 : function(sp, lvCfg) {

    },
    8 : function(sp, lvCfg) {

    },
}

let run = function(lv, sp) {
    execOnce(lv, sp);
    deals[lv](sp, cfg);
    creepManager.run();
}

module.exports = {
    run : run,
}
