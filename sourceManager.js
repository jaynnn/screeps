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
            maxWorkNum : (source.energyCapacity / 300 ) / (2 + 1), // work and drop
            workNum : 0
        };
    }
}

sourceManager.onCreepBorn = function(creep, sourceId) {
    Memory.sources[sourceId].workNum = utils.getCreepBodyNumByType(creep, WORK);
}

sourceManager.run = function(sp) {
    for (let i in Memory.sources) {
        let source = Memory.sources[i];
        let lvCfg = config.levelCfg[utils.getControlerLv(sp)];
        let memorySource = Memory.sources[source.id];
        if (memorySource.workNum < memorySource.maxWorkNum) {
            let leftWork = Math.ceil((source.maxWorkNum - memorySource.workNum) /  lvCfg.workNum)
            let leftCarry = leftWork * lvCfg.sourceCreep.carryPerWork
            while(leftWork--) {
                creepManager.createCreep(sp, config.spQueueLvs.normal, {
                    role : config.creepType.soWorker,
                    goSourceId : source.id,
                    body : lvCfg.sourceCreep.workBody,
                });
                memorySource.workNum += 2;
            }
            while(leftCarry--) {
                creepManager.createCreep(sp, config.spQueueLvs.normal, {
                    role : config.creepType.soCarryer,
                    goSourceId : source.id,
                    body : lvCfg.sourceCreep.carryBody,
                });
            }

        }
    }
}

module.exports = sourceManager