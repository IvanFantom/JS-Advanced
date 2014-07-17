(function() {
    var tool = new Features.Funcs();

    //Problem 1: Partial Application//
    console.log('Problem 1: Partial Application');

    function mul() {
        var result = 1;

        for (var i = 0; i < arguments.length; i++) {
            result *= arguments[i];
        }

        return result;
    }

    var mul2 = tool.partial(mul, 1, 2);
    console.log(mul2(3, 4, 5));
    console.log(mul2(3, 4, 5, 6, 7));

    var mul4 = tool.partial(mul, 1, 2, 3, 4);
    console.log(mul4(5, 6, 7));
    console.log(mul4(5, 6, 7, 8, 9));

    //Problem 2: Currying//
    console.log('\nProblem 2: Currying');

    function add(a, b, c, d) {
        var total = a + b + c + d;
        return a + '+' + b + '+' + c + '+' + d + '=' + total;
    }

    var curriedSum = tool.curry(add);
    console.log(curriedSum(1)(2)(3)(4));

    //Problem 3: Linear fold//
    console.log('\nProblem 3: Linear fold');

    var someArray = [1, 10, 100, -5, 27, 42, 0, -17, 0.85, 1.24];
    var addCallback = function (prev, curr, ind, list) {
        return prev + curr;
    };

    console.log(tool.fold(someArray, addCallback));
    console.log(tool.fold(someArray, addCallback, 1000));

    //Problem 4: Linear unfold//
    console.log('\nProblem 4: Linear unfold');
    
    function randomNumArray(currentState) {
        if (!currentState) {
            return null;
        }

        currentState--;
        
        return {
            element: Math.floor((Math.random() * 100) + 1),
            state: currentState
        };
    }
    
    var result = tool.unfold(randomNumArray, 10);
    console.log(result);

    //Problem 5: Map//
    console.log('\nProblem 5: Map');

    var numbers = [1, 4, 9, 16, 25];
    var roots = tool.map(numbers, Math.sqrt);
    console.log(roots);

    //Problem 6: Filter//
    console.log('\nProblem 6: Filter');

    var arr = [1, 2, 3, 4, 5];
    var odd = tool.filter(arr, function (val) {
        return 0 !== val % 2;
    });
    console.log(odd);
    
    //Problem 7: Average of even numbers//
    console.log('\nProblem 7: Average of even numbers');

    var nums = [1, 23, 2, 6, 12, 0];
    var even = tool.filter(nums, function(val) {
        return 0 === val % 2;
    });
    console.log(even);
    var average = tool.fold(even, addCallback) / even.length;
    console.log(average);

    //Problem 8: Sum of random numbers//
    console.log('\nProblem 8: Sum of random numbers');

    var randArr = tool.unfold(randomNumArray, 10);
    console.log('random nums: ' + randArr);
    var sum = tool.fold(randArr, addCallback);
    console.log('sum of rand nums: ' + sum);

    //Problem 9: First//
    console.log('\nProblem 9: First');

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

    //Problem 10: Lazy evaluation//
    console.log('\nProblem 10: Lazy evaluation');

    var lazyFunc = tool.lazy(function(a, b) {
        return a * a * a + 3 * a * a * b + 3 * a * b * b + b * b * b;
    }, 2, 3);
    
    console.log(lazyFunc());

    //Problem 11: Memoization//
    console.log('\nProblem 11: Memoization');

    function func(obj1, obj2) {
        return { name: 'Kit' };
    }

    var memFunc = tool.memoize(mul);
    console.log(memFunc(1, 2, 3, 4, 5));
    console.log(memFunc(1, 2, 3, 4, 5));

    var memFuncObj = tool.memoize(func);
    console.log(memFuncObj({ prop: 'prop1' }, { prop: 'prop2' }));
    console.log(memFuncObj({ prop: 'prop1' }, { prop: 'prop2' }));
})();