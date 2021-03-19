let timerManager = {}

timerManager.init = function() {
    Memory.timer = {};
    Memory.timer.alarmMap = {};
}

timerManager.tick = function() {
    let alarmMap = Memory.timer.alarmMap || {};
    if (alarmMap[Game.time]) {
        for (let i in alarmMap[Game.time]) {
            alarmMap[Game.time][i]();
        }
    }
}

timerManager.setAlarm = function(func, sec) {
    let alarmMap = Memory.timer.alarmMap;
    sec += Game.time;
    alarmMap[sec] = alarmMap[sec] || [];
    alarmMap[sec].push(func);
}

module.exports = timerManager