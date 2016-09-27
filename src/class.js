
/**
 * util function 
 */
var Util = {
    merge: function (obj, args) {
        for (var i in args) {
            obj[i] = args[i];
        }
    }
}

var fnTest = /this.\$super\b/;

/**
 * constructor function should be applyed when object initialize;
 */
function CreateConstructor(obj, args, self, $super) {
    var CONSTRUCTORKEY = "constructor";
    if (typeof obj[CONSTRUCTORKEY] === 'function'&& fnTest.test(obj[CONSTRUCTORKEY]) )  {
        return LoadMethod($super,CONSTRUCTORKEY,obj[CONSTRUCTORKEY]).apply(self,args);
    }
    else{
        return obj[CONSTRUCTORKEY].apply(self, args);
    }
}

/**
 * curring for lazy apply
 */
function LoadMethod(_super, name, fn) {
    return function () {
        //this.$super should not be changed, need add temp to keep 
        var temp = this.$super;
        this.$super = _super[name];
        var ret = fn.apply(this, arguments);
        this.$super = temp;
        return ret;
    };
}


function Class(args) {

    var returnVal = function () {
        CreateConstructor(args, arguments, this);
    };

    Util.merge(returnVal.prototype, args);

    returnVal.extend = function (childArgs) {
        /**
         * get parent obj's function
         */
        var _super = this.prototype;

        var child = function () {
            CreateConstructor(childArgs, arguments, this, _super);
        };
        var templateFun = function () { };
        /**
         * template function avoid duplication constructor calling
         */
        templateFun.prototype = this.prototype;
        child.prototype = new templateFun();
        child.prototype.constructor = child;

        for (var name in childArgs) {
            if (typeof _super[name] == "function" && fnTest.test(childArgs[name])) {
                child.prototype[name] = LoadMethod(_super, name, childArgs[name]);
            }
            else {
                child.prototype[name] = childArgs[name];
            }
        }
        return child;
    }
    return returnVal;
}

module.exports = Class