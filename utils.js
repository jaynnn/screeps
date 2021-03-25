var utils = {
    getCreepNumByRole : function(room, role) {
        return room.find(FIND_MY_CREEPS, {
            _filter : (creep) => {
                creep.role == role
            }
        }).length;
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
    },

    getCreepBodyNumByType : function(creep, type) {
        let count = 0;
        for (let i in creep.body) {
            if (type == creep.body[i]) 
                count++;
        }
        return count;
    },

    deepClone : function(initalObj, finalObj) {    
        var obj = finalObj || {};    
        for (var i in initalObj) {        
            var prop = initalObj[i]; 
            if(prop === obj) {            
                continue;
            }        
            if (typeof prop === 'object') {
                obj[i] = (prop.constructor === Array) ? [] : {};            
                arguments.callee(prop, obj[i]);
            } else {
                obj[i] = prop;
            }
        }
        return obj;
    },

    getDistance : function(startPos, endPos) {
        return math.sqrt((startPos.x - endPos.x)(startPos.x - endPos.x) + (startPos.y - endPos.y)(startPos.y - endPos.y));
    }
}

utils.genCreepName = function(name) {
    return name + "_" + utils.getCreepCounter()
},

module.exports = utils