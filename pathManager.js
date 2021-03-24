const utils = require("./utils");
const config = require("config");

let pathManager = {}

pathManager.init = function(sp) {
    Memory.paths = {};
}

pathManager.genPosKey = function(roomName, x, y) {
    return roomName + "_" + x + "_" + y;
}

pathManager.createPath = function(room, startPos, endPos) {
    Memory.paths[posKey] = pathManager.createTmpPath(room, startPos, endPos);
    return Memory.paths[posKey]
}

pathManager.getUsedPos = function(room, pos) {
    let found = room.lookForAtArea(LOOK_FLAGS, pos.y-1, pos.x-1, pos.y+1, pos.x+1, true);
    let useFlags = [config.flagColor.creep];
    let usedPoses = [];
    for (let i in found) {
        let foundFlag = found[i].flag
        if (useFlags.indexOf(foundFlag.color) > -1) {
            usedPoses.push(foundFlag.pos);
        }
    }
    return usedPoses;
}

pathManager.createTmpPath = function(room, startPos, endPos) {
    let posKey = pathManager.genPosKey(room.name, endPos.x, endPos.y);
    if (Memory.paths[posKey]) return;
    let aPath = room.findPath(startPos, endPos, {
        avoid : pathManager.getUsedPos(endPos),
    });
    return room.serializePath(aPath);
}

// 到终点的路无法上路时找到离该路最近的点，连上去做支线
pathManager.findBranchPath = function(room, curPos, path) {
    let myPath = {}
    utils.deepClone(room.deserializePath(path), myPath);
    let minn = 10000000;
    let minnPosIndex = 0;
    for (let i in myPath) {
        let posObj = myPath[i];
        let distance = utils.getDistance(curPos, posObj);
        if (distance < minn) {
            minn = distance;
            minnPosIndex = i;
        }
    }
    if (minn == 0) {
        return path;
    }
    return pathManager.concatPath(pathManager.createPath(room, curPos, myPath[minnPosIndex]), path);
}

pathManager.concatPath = function(room) {
    let len = arguments.length;
    let afterList = [];
    for (let i = 1; i < len; i++) {
        let aPath = arguments[i];
        if (typeOf(arguments[i]) == 'string')
            aPath = room.deserializePath(arguments[i])
        afterList.push.apply(afterList, aPath);
    }
    return afterList;
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