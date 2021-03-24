const config = require("./config");
const flagManager = require("./flagManager");
const pathManager = require("./pathManager");

let creepManager = {}

creepManager.init = function(sp) {

}

creepManager.takeBackResource = function(creep, structures) {
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

creepManager.takeToControler = function(creep) {
    if (creep.upgradeController(creep.room.controler) == ERR_NOT_IN_RANGE) {
        let pathObj = pathManager.getPathTo(creep.room, creep.pos, creep.room.controler);
        creep.moveByPath(pathObj.path);
    }
}

creepManager.commonMove = function(creep, destPos) {
    let pathObj = pathManager.getPathTo(creep.room, destPos);
    let myPath = pathObj.path;
    if (creep.moveByPath(myPath) == ERR_NOT_FOUND) {
        myPath = pathManager.findBranchPath(creep.room, creep.pos, myPath);
    }
    creep.moveByPath(myPath);
}

creepManager.takeBackDrops = function(creep, structures, toControler) {
    const targets = creep.room.find(FIND_DROPPED_RESOURCES);
    if(creep.store.getFreeCapacity() > 0) {
        if (target.length && creep.pickup(targets[0]) == ERR_NOT_IN_RANGE){
            creepManager.commonMove(creep, target[0].pos);
        }
    } else {
        if (toControler) {
            creepManager.takeToControler(creep)
        } else {
            creepManager.takeBackResource(creep, structures);
        }
    }
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
            creepManager.takeBackResource(creep, [STRUCTURE_SPAWN]);
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
            let tmpPath = creep.memory.tmpPath
            if(creep.pull(target) == ERR_NOT_IN_RANGE) {
                if (!tmpPath) {
                    tmpPath = pathManager.createTmpPath(creep.room, creep.pos, target.pos)
                }
                creep.moveByPath(tmpPath);
            } else {
                if (tmpPath) creep.memory.tmpPath = undefined;
                target.move(creep);
                if(creep.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) {
                    creep.move(creep.pos.getDirectionTo(target));
                } else {
                    let destObj = Game.getObjectById(target.memory.destinationId);
                    creepManager.commonMove(creep, destObj.pos);
                }
            }
        }
    },
    [config.creepType.soWroker] : function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const source = Game.getObjectById(creep.memory.destinationId);
            creep.harvest(source); 
        } else {
            creep.drop(RESOURCE_ENERGY);
            flagManager.createFlag(creep.name, config.flagColor.creep, config.flagSubColor_creep.soWorker, creep.pos);
        }
    },
    [config.creepType.soCarry] : function(creep) {
        creepManager.takeBackDrops(creep, [STRUCTURE_SPAWN, STRUCTURE_EXTENSION]);
    },
    [config.creepType.upper] : function(creep) {
        creepManager.takeBackDrops(creep, [STRUCTURE_CONTROLLER], true);
    },
    [config.creepType.builder] : function(creep) {
        
    },
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