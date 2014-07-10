(function() {
    var tool = new FeaturesNS.Funcs();

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