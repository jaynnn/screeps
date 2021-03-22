let pathManager = {}

pathManager.init = function() {
    Memory.paths = {}
}

pathManager.genPosKey = function(roomName, x, y) {
    return roomName + "_" + x + "_" + y;
}

pathManager.createPath = function(room, startPos, endPos) {
    let posKey = pathManager.genPosKey(room.name, endPos.x, endPos.y);
    if (Memory.paths[posKey]) return
    let aPath = room.findPath(startPos, endPos);
}

pathManager.getPathTo = function(room, startPos, endPos) {
    let posKey = pathManager.genPosKey(room.name, endPos.x, endPos.y);
    if (!Memory.Paths[posKey]) {
        pathManager.createPath(room.name, startPos, endPos);
    }
    return Memory.Paths[posKey];
}

module.exports = pathManager