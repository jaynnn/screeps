let flagManager = {};

flagManager.createFlag = function(name, color, subColor, pos) {
    name = name + "_flag";
    if (!Game.flags[name]) {
        pos.createFlag(name, color, subColor);
    }
}

flagManager.delFlag = function(name) {
    Game.flags[name].remove();
}

module.exports = flagManager;