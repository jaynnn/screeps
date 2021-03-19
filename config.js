const utils = require("./utils");

 module.exports = {
     levelCfg : {
        0 : {
            sourceCreep : {
                workNum : 2,
                workBody : [MOVE, WORK, WORK, CARRY],
                carryPerWork : 2,
                carryBody : [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
            }
        },
        1 : {
        },
        2 : {

        },
        3 : {

        },
        4 : {

        },
        5 : {

        },
        6 : {

        },
        7 : {

        },
        8 : {

        },
     },

     baseCfg : {
         creep = {
            role = "base",
            body = [MOVE, WORK, CARRY],
         }
     },

     spQueueLv : 3,

     spQueueType : {
         source : 0,
     },

     sourceCfg : {
         workNum : 6
     },

     creepDeadTime : 1500000,
 }