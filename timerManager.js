let timerManager = {}

timerManager.init = function() {
    Memory.timer = {};
    Memory.timer.alarmMap = {};
}

timerManager.tick = function() {
    let alarmMap = Memory.timer.alarmMap || {};
    if (alarmMap[cpu.time]) {
        for (let i in alarmMap[cpu.time]) {
            alarmMap[cpu.time][i]();
        }
    }
}

timerManager.setAlarm = function(func, sec) {
    let alarmMap = Memory.timer.alarmMap;
    sec += cpu.time;
    alarmMap[sec] = alarmMap[sec] || [];
    alarmMap[sec].push(func);
}

module.exports = timerManager