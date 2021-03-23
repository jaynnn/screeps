const utils = require("./utils");

 module.exports = {
     levelCfg : {
        0 : {
            sourceCreep : {
                workNum : 2,
                workBody : [WORK, WORK, CARRY, CARRY],
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
         },
         dragCreep = {
            role = "drager",
            body = [MOVE, MOVE, MOVE],
         }
     },

     spQueueLv : 3,

     spQueueLvs : {
        base : 0,
        normal : 1,
        low : 2,
     },

     spQueueType : {
         source : 0,
     },

     sourceCfg : {
         workNum : 6
     },

     creepStatus : {
         free : 0,
         busy : 1
     },

     creepType : {
         base : "base",
         drager : "drager",
         soWorker : "source_worker",
         soCarryer : "source_carryer",
     },

     creepDeadTime : 1500,
 }