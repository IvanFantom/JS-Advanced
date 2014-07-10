
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
    
    function first(arr, predicateCallback) {
        if (typeof predicateCallback !== 'function') {
            return undefined;
        }
        
        for (var i = 0; i < arr.length; i++) {
            if (predicateCallback(arr[i])) return arr[i];
        }

        return undefined;
    }

    function memoize(func) {
        var cache = {};
        var slice = Array.prototype.slice;

        return function () {
            var args = slice.call(arguments);

            if (args in cache)
                return cache[args];
            else
                return (cache[args] = func.apply(this, args));
        };
    };

    var api = {
        first: first,
        memoize: memoize,
    };

    return api;
};