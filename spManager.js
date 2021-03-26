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
    for (let i = 0; i < config.spQueueLv; i++) {
        let q = sp.memory.queues[i];
        if (!queue.isEmpty(q)) {
            let aCreep = queue.peek(q);
            let goSource = aCreep.goSourceId && Gmae.findObjectById(aCreep.goSourceId) || {};
            let destinationId = aCreep.goSourceId
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
                directions : sp.pos.getDirectionTo(goSource),
                memory : {
                    role : aCreep.role,
                    status : config.creepStatus.free,
                    destinationId : destinationId
                }
            });
            if (ret == OK) {
                sourceManager.onCreepBorn(aCreep, destinationId);
                creepManager.onCreepBorn(aCreep);
                queue.dequeue(q);
    
                let cb = function() {
                    queue.enqueue(q, aCreep);
                    flagManager.delFlag(creepName);
                }
                timerManager.setAlarm(cb, config.creepDeadTime);
    
                logger.log("spManager|| a creep born", aCreep);
            } else {
                loggger.log("try spawn creep but ret =", ret);
            }
            break;
        }
    }
}

module.exports = spManager