(function() {
    var tool = new FeaturesNS.Funcs();

    //Problem 1: Partial Application//
    function mul() {
        var result = 1;

        for (var i = 0; i < arguments.length; i++) {
            result *= arguments[i];
        }

        return result;
    }

    var mul2 = tool.partial(mul, 1, 2);
    mul2(3, 4, 5);
    mul2(3, 4, 5, 6, 7);

    var mul4 = tool.partial(mul, 1, 2, 3, 4);
    mul4(5, 6, 7);
    mul4(5, 6, 7, 8, 9);

    //Problem 2: Currying//
    function add(a, b, c) {
        var total = a + b + c;
        return a + '+' + b + '+' + c + '=' + total;
    }

    var add1curry = tool.curry(add, 1);
    console.log(add1curry(2, 3));  // "1+2+3=6"
    console.log(add1curry(4, 5));  // "1+4+5=10"

    var add1and2curry = add1curry(2);
    console.log(add1and2curry(3)); // "1+2+3=6"
    console.log(add1and2curry(4)); // "1+2+4=7"

    //Problem 3: Linear fold//
    var someArray = [1, 10, 100];
    var addCallback = function (prev, curr, ind, arr) {
        return prev + curr;
    };

    console.log(tool.fold(someArray, addCallback));
    console.log(tool.fold(someArray, addCallback, 1000));

    //Problem 5: Map//
    var numbers = [1, 4, 9, 16, 25];
    var roots = tool.map(numbers, Math.sqrt);
    console.log(roots);

    //Problem 6: Filter//
    var arr = [1, 2, 3, 4, 5];
    var odd = tool.filter(arr, function (val) {
        return 0 != val % 2;
    });
    console.log(odd);
    var even = tool.filter(arr, function (val) {
        return 0 == val % 2;
    });
    console.log(even);

    //Problem 9: First//
    var array = [{
            name: 'Alex',
            age: 22
        }, {
            name: 'Jhon',
            age: 20
        }, {
            name: 'Sub Zero',
            age: 21
        }, {
            name: 'Kira',
            age: 18,
            size: 4
        }];

    var r = tool.first(array, function(element) {
        return element.size === 4;
    });
    console.log(r);

})();