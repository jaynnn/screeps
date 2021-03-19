const config = require('config');
const queue = require('queue');
const utils = require('./utils');
const timerManager = require('timerManager');

let spManager = {}

spManager.init = function(sp) {
    if (!sp.memory.queues) {
        timerManager.init();
        sp.memory.queues = {}
        for (let i = 0; i < config.spQueueLv; i++) {
            sp.memory.queues[i] = new queue();
            if (i==0) {
                sp.memory.queue.enqueue(config.baseCfg.creep);
                sp.memory.queue.enqueue(config.baseCfg.dragCreep);
            }
            Memory.sources = {}
            let sources = sp.room.find(FIND_SOURCE)
            for (let j in sources) {
                let source = sources[j];
                Memory.sources[source.id] = {
                    maxWorkNum : (source.energyCapacity / 300 ) / (2 + 1),
                    workNum : 0
                };
            }
        }
    } else {
        return
    }
},

spManager.run = function(sp) {
    for (let i = 0; i < config.spQueueLv; i++) {
        if (!sp.memory.queues[i].isEmpty()) {
            let aCreep = sp.memory.queues[i].dequeue();
            let goSource = aCreep.goSourceId && Gmae.findObjectById(aCreep.goSourceId) or {};
            let destinationId = goSource.id
            switch (!goSource && i) {
                case config.spQueueType.source :
                    goSource = sp.pos.findClosestByRange(FIND_SOURCES)[0];
                    destinationId = sp.pos.getDirectionTo(goSource).id;
                    for (let j in aCreep.body) {
                        let aBody = aCreep.body[j];
                        if (aBody == WORK) {
                            Memory.sources[goSource.id].workNum += 1;
                        }
                    }
                    break;
                default:
                    break;
            }
            sp.spawnCreep(aCreep.body, utils.genCreepName(aCreep.role), {
                dryRun : true,
                destinationId : destinationId,
                memory : {
                    role : aCreep.role,
                    status : config.creepStatus.free
                }
            });

            let cb = function() {
                sp.memory.queues[i].enqueue(aCreep);
            }
            timerManager.setAlarm(cb, config.creepDeadTime);
        }
    }
}

module.exports = spManager