const config = require("./config");
const flagManager = require("./flagManager");
const pathManager = require("./pathManager");
const queue = require('queue');
const logger =require('logger');

let creepManager = {}

creepManager.init = function(sp) {

}

creepManager.takeDrop2Func ={
    [config.takeDropsTo.toControler] : function(creep) {
        if (creep.upgradeController(creep.room.controler) == ERR_NOT_IN_RANGE) {
            let pathObj = pathManager.getPathTo(creep.room, creep.pos, creep.room.controler);
            let ret = creep.moveByPath(pathObj.path);
            if (ret != OK) {
                console.log("toControler ERROR=", ret)
                return;
            }
            logger.sayLog("upgrading~ 🏃")
        }
    },
    [config.takeDropsTo.toStructure] : function(creep, structures) {
        var targets = creep.room.find(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structures.indexOf(structure.structureType) > -1) &&
                    structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
            }
        });
        if(targets.length > 0) {
            if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {   
                let pathObj = pathManager.getPathTo(creep.room, creep.pos, targets[0].pos);
                let ret = creep.moveByPath(pathObj.path);
                if (ret != OK) {
                    console.log("toStructure ERROR=", ret)
                    return;
                }
                logger.sayLog("to structures 😵")
            }
        }
    },
    [config.takeDropsTo.toSite] : function(creep) {
        const target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if(target) {
            let tmpPath = creep.memory.tmpPath
            if(creep.build(target) == ERR_NOT_IN_RANGE) {
                if(!tmpPath) {
                    tmpPath = pathManager.createTmpPath(creep.room, creep.pos, target.pos);
                    creep.memory.tmpPath = tmpPath
                }
                let ret = creep.moveByPath(pathObj.path);
                if (ret != OK) {
                    console.log("toSite ERROR=", ret)
                    return;
                }
                logger.sayLog("to sites 🏃")
            } else {
                creep.memory.tmpPath = undefined;
            }
        }
    }
} 
creepManager.commonMove = function(creep, destPos) {
    let pathObj = pathManager.getPathTo(creep.room, destPos);
    let myPath = pathObj.path;
    if (creep.moveByPath(myPath) == ERR_NOT_FOUND) {
        myPath = pathManager.findBranchPath(creep.room, creep.pos, myPath);
    }
    let ret = creep.moveByPath(myPath);
    if (ret != OK) {
        console.log("common move ERROR=", ret)
        return;
    }
    logger.sayLog("moving~ 💨");
}

creepManager.takeBackDrops = function(creep, dests, toWhere) {
    const targets = creep.room.find(FIND_DROPPED_RESOURCES);
    if(creep.store.getFreeCapacity() > 0) {
        if (target.length && creep.pickup(targets[0]) == ERR_NOT_IN_RANGE){
            creepManager.commonMove(creep, target[0].pos);
        }
    } else {
        creepManager.takeDrop2Func[toWhere](creep, dests);
    }
}

creepManager.type2Deal = {
    [config.creepType.base] : function(creep) {
        if (creep.store.getFreeCapacity() > 0) {
            const source = Game.getObjectById(creep.memory.destinationId);
            if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                let pathObj = pathManager.getPathTo(creep.room, creep.pos, source.pos);
                let ret = creep.moveByPath(pathObj.path);
                if (ret != OK) {
                    console.log("base move ERROR=", ret);
                    return;
                }
                logger.sayLog("hangry 😋")
            }
        } else {
            creepManager.takeDrop2Func[config.takeDropsTo.toStructure](creep, [STRUCTURE_SPAWN]);
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
                    creep.memory.tmpPath = tmpPath
                }
                let ret = creep.moveByPath(tmpPath);
                if (ret != OK) {
                    console.log("drager move ERROR=", ret);
                } 
                logger.sayLog("pull someone 💪")
            } else {
                if (tmpPath) creep.memory.tmpPath = undefined;
                target.move(creep);
                if(creep.pos.isNearTo(Game.getObjectById(target.memory.destinationId))) {
                    creep.move(creep.pos.getDirectionTo(target));
                    logger.sayLog("following 👬");
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
        creepManager.takeBackDrops(creep, [STRUCTURE_SPAWN, STRUCTURE_EXTENSION], config.takeDropsTo.toStructure);
    },
    [config.creepType.upper] : function(creep) {
        creepManager.takeBackDrops(creep, [], config.takeDropsTo.toControler);
    },
    [config.creepType.builder] : function(creep) {
        creepManager.takeBackDrops(creep, [], config.takeDropsTo.toSite);
    },
    [config.creepType.towerGiver] : function(creep) {
        creepManager.takeBackDrops(creep, [STRUCTURE_TOWER], config.takeDropsTo.toStructure);
    },
}

creepManager.createCreep = function(sp, queueLv, creepObj) {
    queue.enqueue(sp.memory.queues[queueLv], creepObj);
}

creepManager.onCreepBorn = function(creep) {
    Memory.creepCounters = Memory.creepCounters || {};
    Memory.creepCounters[creep.role] = (Memory.creepCounters[creep.role] || 0) + 1;
}

creepManager.getCreepNum = function(role) {
    Memory.creepCounters = Memory.creepCounters || {};
    return Memory.creepCounters[role] || 0;
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