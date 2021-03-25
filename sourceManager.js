const config = require("./config")
const utils = require("./utils")
const creepManager = require('creepManager')

let sourceManager = {}

sourceManager.init = function(sp) {
    Memory.sources = {}
    let sources = sp.room.find(FIND_SOURCES)
    for (let j in sources) {
        let source = sources[j];
        Memory.sources[source.id] = {
            maxWorkNum : Math.ceil((source.energyCapacity / 300 ) / (2 + 1)), // work and drop
            workNum : 0
        };
    }
}

sourceManager.onCreepBorn = function(creep, sourceId) {
}

sourceManager.run = function(sp) {
    for (let sourceId in Memory.sources) {
        let memorySource = Memory.sources[sourceId];
        let lvCfg = config.levelCfg[utils.getControlerLv(sp)];
        if (memorySource.workNum < memorySource.maxWorkNum) {
            let leftWork = Math.ceil((memorySource.maxWorkNum - memorySource.workNum) /  lvCfg.workNum)
            let leftCarry = leftWork * lvCfg.sourceCreep.carryPerWork
            while(leftWork--) {
                creepManager.createCreep(sp, config.spQueueLvs.normal, {
                    role : config.creepType.soWorker,
                    goSourceId : sourceId,
                    body : lvCfg.sourceCreep.workBody,
                });
                memorySource.workNum += 2;
            }
            while(leftCarry--) {
                creepManager.createCreep(sp, config.spQueueLvs.normal, {
                    role : config.creepType.soCarryer,
                    goSourceId : sourceId,
                    body : lvCfg.sourceCreep.carryBody,
                });
            }

        }
    }
}

module.exports = sourceManager