const config = require("./config")
const utils = require("./utils")

let sourceManager = {}

sourceManager.run = function(sp) {
    for (let i in Memory.sources) {
        let source = Memory.sources[i];
        let lvCfg = config.levelCfg[utils.getControlerLv(sp)];
        while (Memory.soureCreep.workNum < source.maxWorkNum) {
            let leftWork = Math.ceil((source.maxWorkNum - Memory.soureCreep.workNum) /  lvCfg.workNum)
            let leftCarry = leftWork * lvCfg.carryPerWork
            while(leftWork--) {
                sp.memory.queues[1].enqueue({
                    role : config.creepType.soWorker,
                    goSourceId : source.id,
                    body : lvCfg.workBody,
                });
            }
            while(leftCarry--) {
                sp.memory.queues[1].enqueue({
                    role : config.creepType.soCarryer,
                    goSourceId : source.id,
                    body : lvCfg.carryBody,
                });
            }

        }
    }
}