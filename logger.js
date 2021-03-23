let tab = "";

let logging = function(args) {
    switch(typeof(args)) {
        case "string" : return '\"' + args + '\"';
        case "number" : return args;
        case "boolean" : return args;
        case "function" : return "Function";
        case "undefined" : return "undefined";
        case "object" :
            if (args == null) {
                return 'null';
            }
            if (args instanceof Error) {
                return args.stack || args.message;
            }
            if(args instanceof Date) {
                return args.toString();
            }
    
            if (args instanceof Array) {
                var message = '[\n'
                for (var k in args) {
                    message += tab + '  ' + logging(tab + '  ', args[k]) + '\n';
                }
                return message + tab + ']'
            } else {
                var count = 0;
                var message = '{\n'
                for (var k in args) {
                    if (count++ > 1000) {
                        message += tab + '  ...\n';
                        break;
                    } else {
                        message += tab + '  ' + k + " = " + logging(tab + '  ', args[k]) + '\n';
                    }
                }
                return message + tab + '}'
            }
        default :
            return 'Unknow type ==> ' + typeof(args);
        }
}

module.exports = {
    log : function() {
        for (var i=0; i<arguments.length; i++) {
            console.log(logging(arguments[i]));
        }
    },
};