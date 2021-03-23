const utils = require("./utils");

let pathManager = {}

pathManager.init = function(sp) {
    Memory.paths = {};
}

pathManager.genPosKey = function(roomName, x, y) {
    return roomName + "_" + x + "_" + y;
}

pathManager.createPath = function(room, startPos, endPos) {
    let posKey = pathManager.genPosKey(room.name, endPos.x, endPos.y);
    if (Memory.paths[posKey]) return;
    let aPath = room.findPath(startPos, endPos);
    Memory.paths[posKey] = room.serializePath(aPath);
    return Memory.paths[posKey]
}

// 到终点的路无法上路时找到离该路最近的点，连上去做支线
pathManager.findBranchPath = function(room, curPos, path) {
    let myPath = {}
    utils.deepClone(room.deserializePath(path), myPath);
    let minn = 10000000;
    let minnPos
    for (let i in myPath) {
        let posObj = myPath[i];
        let distance = math.sqrt((curPos.x - posObj.x)(curPos.x - posObj.x) + (curPos.y - posObj.y)(curPos.y - posObj.y));
        if (distance < minn) {
            minn = distance;
            minnPos = posObj;
        }
    }
    return pathManager.createPath(room, curPos, minnPos);
}

pathManager.getPathByKey = function(posKey) {
    return Memory.paths[posKey];
}

pathManager.getPathTo = function(room, startPos, endPos) {
    let posKey = pathManager.genPosKey(room.name, endPos.x, endPos.y);
    if (!Memory.paths[posKey]) {
        pathManager.createPath(room.name, startPos, endPos);
    }
    return {
        posKey : posKey,
        path : Memory.paths[posKey]
    }
}

module.exports = pathManager