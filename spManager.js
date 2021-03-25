const config = require('config');
const queue = require('queue');
const utils = require('./utils');
const timerManager = require('timerManager');
const sourceManager = require('sourceManager');
const creepManager = require('./creepManager');
const pathManager = require('./pathManager');
const logger = require('logger');
const flagManager = require('./flagManager');

let spManager = {}

spManager.init = function(sp) {
    if (!sp.memory.queues) {
        pathManager.init();
        timerManager.init();
        sourceManager.init(sp);
        creepManager.init();
        sp.memory.queues = {};
        for (let i = 0; i < config.spQueueLv; i++) {
            sp.memory.queues[i] = queue.new();
            if (i==config.spQueueLvs.base) {
                queue.enqueue(sp.memory.queues[i], config.baseCfg.creep);
                queue.enqueue(sp.memory.queues[i], config.baseCfg.dragCreep);
            }
        }
    }
    return
},

spManager.run = function(sp) {
    let isOk = true
    for (let i = 0; i < config.spQueueLv; i++) {
        while (!queue.isEmpty(sp.memory.queues[i])) {
            let aCreep = queue.peek(sp.memory.queues[i]);
            let goSource = aCreep.goSourceId && Gmae.findObjectById(aCreep.goSourceId) || {};
            let destinationId = goSource.id
            switch (!destinationId && i) {
                case config.spQueueLvs.base :
                    goSource = sp.pos.findClosestByRange(FIND_SOURCES)[0];
                    break;
                default:
                    console.log("ERROR!!!!! no destination!!!");
                    break;
            }
            let creepName = utils.genCreepName(aCreep.role)
            let ret = sp.spawnCreep(aCreep.body, creepName, {
                dryRun : true,
                directions : sp.pos.getDirectionTo(goSource),
                memory : {
                    role : aCreep.role,
                    status : config.creepStatus.free,
                    destinationId : goSource.id
                }
            });
            if (ret == OK) {
                sourceManager.onCreepBorn(aCreep, goSource.id);
                creepManager.onCreepBorn(aCreep);
                queue.dequeue(sp.memory.queues[i]);
    
                let cb = function() {
                    queue.enqueue(sp.memory.queues[i], aCreep);
                    flagManager.delFlag(creepName);
                }
                timerManager.setAlarm(cb, config.creepDeadTime);
    
                logger.log("spManager|| a creep born", aCreep);
            } else {
                isOk = false
                loggger.log("try spawn creep but ret =", ret);
                break;
            }
        }
        if (!isOk) break;
    }
}

module.exports = spManager