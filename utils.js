var gEnum = require('enum') 

var utils = {
    // get cur len of worder by type
    getWorkerNumByType : function(type) {
        return _.filter(Game.creeps, (creep) => creep.memory.role == type);
    },

    getNearSource :function(creepPos, sources) {
        var min = Number.MAX_SAFE_INTEGER;
        var index = 0;
        for (var i = 0; i < sources.length; i++) {
            var _source = sources[i];
            //console.log(creepPos, _source)
            if (Math.sqrt(Math.abs(creepPos.x - _source.x) +  Math.abs(creepPos.y - _source.y)) < min) {
                index = i;
            }
        }
        return sources[i];
    },

    getCreepNum : function() {
        return Object.keys(Game.creeps).length
    },

    createCreep : function(spName, body, name, role) {
        Game.spawns[spName].spawnCreep(body, name, { memory: { role: role } });
    },

    getCreepCounter : function() {
        Memory.creepCounter = (Memory.creepCounter || 0) + 1
        return Memory.creepCounter
    },

    getControlerLv : function(sp) {
        return sp.room.controller.level;
    }
}

utils.genCreepName = function(name) {
    return name + "_" + utils.getCreepCounter()
},

module.exports = utils