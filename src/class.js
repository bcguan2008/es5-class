
var Util = {
    merge: function (obj, args) {
        for (var i in args) {
            obj[i] = args[i];
        }
    }
}

var fnTest = /xyz/.test(function () { xyz; }) ? /this.\$super\b/ : /.*/;

function CreateConstructor(Obj, args, self) {
    var CONSTRUCTORKEY = "constructor";

    if (typeof Obj[CONSTRUCTORKEY] === 'function') {
        return Obj[CONSTRUCTORKEY].apply(self, args);
    }
}

/**
 * curring for lazy apply 
 */
function CreateMethod(_super, name, fn) {
    return function () {
        var tmp = this.$super;
        this.$super = _super[name];
        var ret = fn.apply(this, arguments);
        this.$super = tmp;
        return ret;
    };
}

function Class(args) {

    var returnVal = function () {
        CreateConstructor(args, arguments, this);
    };

    Util.merge(returnVal.prototype, args);

    returnVal.extend = function (childArgs) {
        var child = function () {
            CreateConstructor(childArgs, arguments, this);
        };
        var templateFun = function () { };
        /**
         * template function avoid duplication constructor calling 
         */
        templateFun.prototype = this.prototype;
        child.prototype = new templateFun();
        child.prototype.constructor = child;

        /**
         * get parent obj's function
         */
        var _super = this.prototype;

        for (var name in childArgs) {
            if (typeof _super[name] == "function" && fnTest.test(childArgs[name])) {
                child.prototype[name] = CreateMethod(_super, name, childArgs[name]);
            }
            else {
                child.prototype[name] = childArgs[name];
            }
        }
        return child;
    }
    return returnVal;
}

module.exports = Class;
