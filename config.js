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
         creep : {
            role : "base",
            body : [MOVE, WORK, CARRY],
         },
         dragCreep : {
            role : "drager",
            body : [MOVE, MOVE, MOVE],
         }
     },

     spQueueLv : 3,

     spQueueLvs : {
        base : 0,
        normal : 1,
        low : 2,
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
         upper : "upgradger",
         builder : "builder",
     },

     creepDeadTime : 1500,

     flagColor : {
            creep : COLOR_RED,
            // COLOR_PURPLE,
            // COLOR_BLUE,
            // COLOR_CYAN,
            // COLOR_GREEN,
            // COLOR_YELLOW,
            // COLOR_ORANGE,
            // COLOR_BROWN,
            // COLOR_GREY,
            // COLOR_WHITE
     },

     flagSubColor_creep : {
         soWorker : COLOR_BLUE,
     }

 }