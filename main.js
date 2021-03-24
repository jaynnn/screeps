const levelDeal = require('levelDeal')
const spManager = require('spManager')
const timerManager = require('timerManager')
const sourceManager = require('sourceManager')
// const g_event = require('event')()

module.exports.loop = function() {
    for (const i in Game.spawns) {
        let sp = Game.spawns[i];
        let c = sp.room.controller;
        if (!c) continue;
        spManager.init(sp);
        spManager.run(sp);
        sourceManager.run(sp);
        levelDeal.run(c.level, sp);
    }
    timerManager.tick();
}