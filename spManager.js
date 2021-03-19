const config = require('config')
const queue = require('queue');
const utils = require('./utils');

let spManager = {}

spManager.init = function(sp) {
    if (!sp.memory.queues) {
        sp.memory.queues = {}
        for (let i = 0; i < config.spQueueLv; i++) {
            sp.memory.queues[i] = new queue();
            if (i==0) {
                sp.memory.queue.enqueue(config.baseCfg.creep);
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
            let goSource = aCreep.goSource;
            let directions
            if (!goSource) {
                swicth (i) {
                    case config.spQueueType.source :
                        goSource = sp.pos.findClosestByRange(FIND_SOURCES)[0];
                        directions = sp.pos.getDirectionTo(goSource);
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
            }
            sp.spawnCreep(aCreep.body, utils.genCreepName(aCreep.role), {
                dryRun : true,
                directions : directions,
                memory : {
                    role : aCreep.role
                }
            });
            (window.setTimeout(function(aCreep) {
                sp.memory.queues[i].enqueue(aCreep);
            }, config.creepDeadTime))(aCreep)
        }
    }
}

module.exports = spManager