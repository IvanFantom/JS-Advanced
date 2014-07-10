
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
        var n,
          slice = Array.prototype.slice,
          origArgs = slice.call(arguments, 1);

        if (typeof fn === 'number') {
            n = fn;
            fn = origArgs.shift();
        } else {
            n = fn.length;
        }

        return function () {
            var args = origArgs.concat(slice.call(arguments));

            return args.length < n
              ? curry.apply(this, [n, fn].concat(args))
              : fn.apply(this, args);
        };
    };

    function map(arr, fn /*, thisp*/) {
        
        if (typeof fn != "function")
            throw new TypeError();

        var len = arr.length;
        var res = new Array(len);
        var thisp = arguments[2];

        for (var i = 0; i < len; i++) {
            if (i in arr)
                res[i] = fn.call(thisp, arr[i], i, arr);
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
        map: map,
        first: first,
        memoize: memoize,
    };

    return api;
};