const config = require("./config");
const pathManager = require("./pathManager");

let creepManager = {}

creepManager.init = function(sp) {

}

creepManager.takeBackSpawn = function(creep, structures) {
    var targets = creep.room.find(FIND_STRUCTURES, {
        filter: (structure) => {
            return (structures.indexOf(structure.structureType) > -1) &&
                structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
        }
    });
    if(targets.length > 0) {
        if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {   
            let pathObj = pathManager.getPathTo(creep.room, creep.pos, targets[0].pos);
            creep.moveByPath(pathObj.path);
        }
    }
}

creepManager.commonMove = function(creep, destinationId) {
    let destObj = Game.getObjectById(destinationId);
    let pathObj = pathManager.getPathTo(creep.room, destObj.pos);
    let myPath = pathObj.path;
    if (creep.moveByPath(myPath) == ERR_NOT_FOUND) {
        myPath = pathManager.findBranchPath(creep.room, creep.pos, myPath);
    }
    creep.moveByPath(myPath);
}

creepManager.type2Deal = {
    [config.creepType.base] : function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const source = Game.getObjectById(creep.memory.destinationId);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                let pathObj = pathManager.getPathTo(creep.room, creep.pos, source.pos);
                creep.moveByPath(pathObj.path);
            }
        } else {
            creepManager.takeBackSpawn(creep, [STRUCTURE_SPAWN]);
        }
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
                    creepManager.commonMove(creep, target.memory.destinationId);
                }
            }
        }
    },
    [config.creepType.soWroker] : function(creep) {

    },
    [config.creepType.soCarry] : function(creep) {

    }
}

creepManager.createCreep = function(sp, queueLv, creepObj) {
    sp.memory.queues[queueLv].enqueue(creepObj);
}

creepManager.run = function() {
    for (let i in Game.creeps) {
        let aCreep = Game.creeps[i];
        if (creepManager.type2Deal[aCreep.memory.role]) {
            creepManager.type2Deal[aCreep.memory.role](aCreep);
        }
    }
}

module.exports = creepManager