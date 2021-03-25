const utils = require("./utils");

 module.exports = {
     levelCfg : {
        0 : {
            sourceCreep : {
                workNum : 2,
                workBody : [WORK, WORK, CARRY, CARRY],
                carryPerWork : 2,
                carryBody : [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
            },
            otherCreep : {
                upperNum : 1,
                builder : 1,
                upper : [MOVE, CARRY, WORK],
                builder : [MOVE, CARRY, WORK],
            },
        },
        1 : {
            sourceCreep : {
                workNum : 2,
                workBody : [WORK, WORK, CARRY, CARRY],
                carryPerWork : 3,
                carryBody : [MOVE, MOVE, CARRY, CARRY, CARRY, CARRY],
            },
            otherCreep : {
                upper : [MOVE, CARRY, WORK],
                builder : [MOVE, CARRY, WORK],
            },
        },
        2 : {
            sourceCreep : {
                workNum : 4,
                workBody : [WORK, WORK, WORK, WORK, CARRY, CARRY],
                carryPerWork : 3,
                carryBody : [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            },
            otherCreep : {
                upper : [MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                builder : [MOVE, CARRY, WORK, MOVE, CARRY, WORK],
            },
            sites : {
                extentions : 5,
            },

        },
        3 : {
            sourceCreep : {
                workNum : 4,
                workBody : [WORK, WORK, WORK, WORK, CARRY, CARRY],
                carryPerWork : 3,
                carryBody : [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            },
            otherCreep : {
                upper : [MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                builder : [MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                towerGiver : [MOVE, CARRY, WORK, MOVE, CARRY, WORK],
            },
            sites : {
                extentions : 5,
                tower : 1,
            },

        },
        4 : {
            sourceCreep : {
                workNum : 6,
                workBody : [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY],
                carryPerWork : 4,
                carryBody : [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            },
            otherCreep : {
                upper : [MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                builder : [MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                towerGiver : [MOVE, CARRY, WORK, MOVE, CARRY, WORK],
            },
            sites : {
                extentions : 10,
                storage : 1,
                tower : 1,
                link : 1,
            },

        },
        5 : {
            sourceCreep : {
                workNum : 6,
                workBody : [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY],
                carryPerWork : 4,
                carryBody : [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            },
            otherCreep : {
                upper : [MOVE, CARRY, WORK, MOVE, CARRY, WORK,MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                builder : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                towerGiver : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
            },
            sites : {
                extentions : 10,
                tower : 1,
                link : 1,
            },

        },
        6 : {
            sourceCreep : {
                workNum : 6,
                workBody : [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY],
                carryPerWork : 4,
                carryBody : [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            },
            otherCreep : {
                upper : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                builder : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                towerGiver : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
            },
            sites : {
                extentions : 10,
                tower : 1,
                link : 1,
            },

        },
        7 : {
            sourceCreep : {
                workNum : 6,
                workBody : [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY],
                carryPerWork : 4,
                carryBody : [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            },
            otherCreep : {
                upper : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                builder : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                towerGiver : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
            },
            sites : {
                extentions : 10,
                tower : 1,
                link : 1,
            },

        },
        8 : {
            sourceCreep : {
                workNum : 6,
                workBody : [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, CARRY],
                carryPerWork : 4,
                carryBody : [MOVE, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            },
            otherCreep : {
                upper : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                builder : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
                towerGiver : [MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK, MOVE, CARRY, WORK],
            },
            sites : {
                extentions : 10,
                tower : 1,
                link : 1
            },

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
         towerGiver : "towerGiver",
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
     },

     takeDropsTo : {
         toStructure : 0,
         toControler : 1,
         toSite : 2
     }

 }