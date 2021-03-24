let config = require('config');
const pathManager = require('./pathManager');

let structureManager = {}

structureManager.init = function() {

}

structureManager.findSite = function(pos, num, minArea, maxArea, lookAt) {
    let count = 1;
    let plants = [];
    while(minArea <= count && count <= maxArea) {
        plants = sp.room.lookForAtArea(lookAt, pos.y-count, pos.x-count, pos.y+count, pos.x+count, true);
        if (plants >= num) return plants;
        count++;
    }
    return plants;
}

structureManager.buildExtension = function(sp, num) {
    if (!num) return;
    let plants = structureManager.findSite(sp.pos, num, 1, 10, LOOK_TERRAIN);
    for (let i = 0; i < num; i++) {
        if (!plants[i]) return
        sp.room.createConstructionSite(plants[i].x, plants[i].y, STRUCTURE_EXTENSION);
    }
}

structureManager.buildRoad = function(sp) {
    let roadList = pathManager.getRoomPaths(sp.room);
    for (let i in roadList) {
        sp.room.createConstructionSite(roadList[i].x, roadList[i].y, STRUCTURE_ROAD);
    }    
}

structureManager.buildLink = function(sp, num) {
    if(!num) return;
    let poses = [];
    let sources = sp.room.find(FIND_SOURCES);
    for (let i in sources) {
        poses.push(sources[i].pos); 
    }
    poses.push(sp.room.controler.pos);
    poses.push(sp.pos);
    let towers = sp.room.find(FIND_STRUCTURES, {
        filter : (structure) => {
            return structure.STRUCTURE_TYPE == STRUCTURE_TOWER
        }
    });
    for (let i in towers) {
        poses.push(towers[i].pos);
    }
    
    let plants = [];
    for (let i = 0; i < poses.length; i++) {
        let hasLink = false
        let found = structureManager.findSite(poses[i], 1, 2, 2, LOOK_STRUCTURES);
        if (found.length > 0) {
            for (let j in found) {
                if (found[j].STRUCTURE_TYPE == STRUCTURE_LINK) {
                    hasLink = true;
                    break;
                }
            }
        }
        if (hasLink) continue;
        plants = structureManager.findSite(poses[i], 1, 2, 2, LOOK_TERRAIN);
        if (plants.length) break;
    }
    if (!plants.length) return;
    sp.room.createConstructionSite(plants[0].x, plants[0].y, STRUCTURE_LINK);
}

structureManager.buildTower = function(sp, num){
    if (!num) return;
    let plants = structureManager.findSite(sp.pos, num, 10, 11, LOOK_TERRAIN);
    for (let i = 0; i < num; i++) {
        if (!plants[i]) return
        sp.room.createConstructionSite(plants[i].x, plants[i].y, STRUCTURE_TOWER);
    }
}

structureManager.createSite = function(lv, sp) {
    let lvCfg = config.lvCfg[lv];
    structureManager.buildRoad(sp);
    structureManager.buildExtension(sp, lvCfg.sites.extension);
    structureManager.buildLink(sp, lvCfg.sites.link);
    structureManager.buildTower(sp, lvCfg.sites.tower);
}

module.exports = structureManager;