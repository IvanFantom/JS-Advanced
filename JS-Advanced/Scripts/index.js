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
    var ind = 0;
    function a(x, y, z) {
        console.log(++ind + ': ' + x + ' and ' + y + ' or ' + z);
    };

    a('x', 'y', 'z');       // "1: x and y or z"

    var b = tool.curry(a);
    b();                    // nothing logged, `a` not invoked
    b('x');                 // nothing logged, `a` not invoked
    b('x', 'y');            // nothing logged, `a` not invoked
    b('x')('y');            // nothing logged, `a` not invoked
    b('x')('y')('z');       // "2: x and y or z"
    b('x', 'y', 'z');       // "3: x and y or z"

    var c = tool.curry(a, 'x');
    c();                    // nothing logged, `a` not invoked
    c('y');                 // nothing logged, `a` not invoked
    c('y', 'z');            // "4: x and y or z"
    c('y')('z');            // "5: x and y or z"

    //Problem 5: Map//
    var numbers = [1, 4, 9, 16, 25];
    var roots = tool.map(numbers, Math.sqrt);
    console.log(roots);

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