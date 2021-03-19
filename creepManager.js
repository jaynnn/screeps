const config = require("./config");

let creepManager = {}

creepManager.init = function() {

}

creepManager.type2Deal = {
    [config.creepType.base] : function(creep) {
        const target = creep.pos.findClosestByRange(FIND_SOURCE, {})
    },
    [config.creepType.drager] : function(creep) {
        const target = creep.pos.findClosestByRange(FIND_MY_CREEPS, {
            filter: function(object) {
                return (object.getActiveBodyparts(MOVE) == 0) && 
                    object.memory.destinationId &&
                    !object.pos.isNearTo(Game.getObjectById(object.memory.destinationId));
            }
        });
        if(target) {
            if(creep.pull(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            } else {
                target.move(creep);
                if(creep.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) {
                    creep.move(creep.pos.getDirectionTo(target));
                } else {
                    creep.moveTo(Game.getObjectById(target.memory.destinationId));
                }
            }
        }
    },
    [config.creepType.soWroker] : function(creep) {

    },
    [config.creepType.soCarry] : function(creep) {

    }
}

creepManager.run = function() {
    for (let i in Game.creeps) {
        let aCreep = Game.creeps[i];
        if (aCreep.memory.status == config.creepStatus.free) {
            if (creepManager.type2Deal[aCreep.memory.role]) {
                creepManager.type2Deal[aCreep.memory.role](aCreep);
            }
            aCreep.memory.status = config.creepStatus.busy
        }
    }
}

module.exports = creepManager