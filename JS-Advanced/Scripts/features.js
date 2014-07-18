'use strict';

var Features = Features || {};

Features.createNamespace = function (namespace) {
    var parts = namespace.split(".");
    var parent = Features;

    for (var i = 0; i < parts.length; i++) {
        var partname = parts[i];

        if (typeof parent[partname] === "undefined") {
            parent[partname] = {};
        }

        parent = parent[partname];
    }

    return parent;
};

Features.createNamespace("Features.Funcs");

Features.Funcs = function () {

    function partial(fn /*, args...*/) {
        var slice = Array.prototype.slice,
            partialArgs = slice.call(arguments, 1);

        return function () {
            var allArgs = partialArgs.concat(slice.call(arguments));
            return fn.apply(this, allArgs);
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

        return function () {
            var args = origArgs.concat(slice.call(arguments));

            return args.length < n
                ? curry.apply(this, [n, fn].concat(args))
                : fn.apply(this, args);
        };
    }

    function fold(array, callback /*[, initialValue]*/) {
        if (!array)
            throw new TypeError('array is null or undefined');
        if (array.length === 0)
            throw new TypeError('empty array with no initial value');
        if (typeof callback !== 'function')
            throw new TypeError(callback + ' is not a function');

        var previousValue;
        var startIndex;

        if (arguments.length > 2) {
            previousValue = arguments[2];
            startIndex = 0;
        } else {
            previousValue = array[0];
            startIndex = 1;
        }

        var len = array.length;
        for (var i = startIndex; i < len; i++) {
            previousValue = callback.call(this, previousValue, array[i], i, array);
        }

        return previousValue;
    }

    function unfold(callback, initialValue) {
        var array = [];
        var currentState = initialValue;

        do {
            var result = callback(currentState);
            currentState = result.state;
            array.push(result.element);
        } while (result);

        return array;
    }

    function map(array, callback /*, context*/) {
        if (typeof callback !== "function")
            throw new TypeError(callback + ' is not a function');

        var len = array.length;
        var res = [];
        var context = arguments[2];

        for (var i = 0; i < len; i++) {
            if (i in array) {
                res[i] = callback.call(context, array[i], i, array);
            }
        }

        return res;
    }

    function first(array, predicateCallback) {
        if (typeof predicateCallback !== 'function') {
            return;
        }

        var element;
        for (var i = 0; i < array.length; i++) {
            element = array[i];
            if (predicateCallback(array[i])) {
                return element;
            }
        }
    }

    function filter(array, callback /*, context*/) {
        if (typeof callback !== "function") {
            throw new TypeError(callback + ' is not a function');
        }

        var result = [];
        var context = arguments[2];
        var len = array.length;
        for (var i = 0; i < len; i++) {
            if (i in array) {
                var value = array[i]; // in case fun mutates this
                if (callback.call(context, value, i, array)) {
                    result.push(value);
                }
            }
        }

        return result;
    }

    function lazy(func /*, [args_for_func]*/) {
        if (typeof func !== "function") {
            throw new TypeError(func + ' is not a function');
        }

        var slice = Array.prototype.slice;
        var args = slice.call(arguments, 1);

        var lazied = function () {
            return func.apply(this, args);
        };

        return lazied;
    }

    function memoize(fn) {
        var cache = {};
        var slice = Array.prototype.slice;

        return function () {
            var args = slice.call(arguments);
            var key = JSON.stringify(args);

            if (key in cache) {
                console.log('cache hit');
                return cache[key];
            }
            else {
                console.log('cache miss, adding new row into cache');
                return (cache[key] = fn.apply(this, args));
            }
        };
    }

    return {
        partial: partial,
        curry: curry,
        fold: fold,
        unfold: unfold,
        map: map,
        first: first,
        filter: filter,
        lazy: lazy,
        memoize: memoize,
    };
};