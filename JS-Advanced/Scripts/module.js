
var FeaturesNS = FeaturesNS || {};

FeaturesNS.createNS = function (namespace) {
    var nsparts = namespace.split(".");
    var parent = FeaturesNS;

    if (nsparts[0] === "FeaturesNS") {
        nsparts = nsparts.slice(1);
    }

    for (var i = 0; i < nsparts.length; i++) {
        var partname = nsparts[i];

        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }

        parent = parent[partname];
    }

    return parent;
};

FeaturesNS.createNS("FeaturesNS.Funcs");

FeaturesNS.Funcs = function () {

    function partial(fn /*, args...*/) {
        var slice = Array.prototype.slice,
            args = slice.call(arguments, 1);

        return function () {
            var t = args.concat(slice.call(arguments));
            return fn.apply(this, t);
        };
    }

    function curry(/* n,*/ fn /*, args...*/) {
        var n;
        var slice = Array.prototype.slice;
        var origArgs = slice.call(arguments, 1);

        if (typeof fn === 'number') {
            n = fn;
            fn = origArgs.shift();
        } else {
            n = fn.length;
        }

        return function() {
            var args = origArgs.concat(slice.call(arguments));

            return args.length < n
                ? curry.apply(this, [n, fn].concat(args))
                : fn.apply(this, args);
        };
    };

    function fold(array, callback /*[, initialValue]*/) {
        if (array === null || typeof array === 'undefined') 
            throw new TypeError('array is null or undefined');
        if (array.length === 0 && typeof arguments[2] === 'undefined')
            throw new TypeError('empty array with no initial value');
        if (typeof callback !== 'function') 
            throw new TypeError(callback + ' is not a function');
        
        var hasInitialValue, previousValue;

        if (hasInitialValue = arguments.length > 2) {
            previousValue = arguments[2];
        }

        array.forEach(function (currentValue, index) {
            if (!hasInitialValue) {
                previousValue = currentValue;
                hasInitialValue = true;
            } else {
                previousValue = callback.call(this, previousValue, currentValue, index, array);
            }
        });

        // return the final value of our accumulator
        return previousValue;
    };

    function map(array, callback /*, thisp*/) {
        if (typeof callback != "function")
            throw new TypeError(callback + ' is not a function');

        var len = array.length;
        var res = new Array(len);
        var thisp = arguments[2];

        for (var i = 0; i < len; i++) {
            if (i in array)
                res[i] = callback.call(thisp, array[i], i, array);
        }

        return res;
    };

    function first(arr, predicateCallback) {
        if (typeof predicateCallback !== 'function') {
            return undefined;
        }
        
        for (var i = 0; i < arr.length; i++) {
            if (predicateCallback(arr[i])) return arr[i];
        }

        return undefined;
    };

    function filter(array, callback /*, thisp*/) {
        if (typeof callback != "function") {
            throw new TypeError(callback + ' is not a function');
        }
        
        var result = [];
        var thisp = arguments[1];
        var len = array.length >>> 0;
        for (var i = 0; i < len; i++) {
            if (i in array) {
                var value = array[i]; // in case fun mutates this
                if (callback.call(thisp, value, i, array)) {
                    result.push(value);
                }
            }
        }

        return result;
    };

    function memoize(fn) {
        var cache = {};
        var slice = Array.prototype.slice;

        return function () {
            var args = slice.call(arguments);

            if (args in cache)
                return cache[args];
            else
                return (cache[args] = fn.apply(this, args));
        };
    };

    var api = {
        partial: partial,
        curry: curry,
        fold: fold,
        map: map,
        first: first,
        filter: filter,
        memoize: memoize,
    };

    return api;
};