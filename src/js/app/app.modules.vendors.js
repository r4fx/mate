APP.modules.vendors = (function () {

    var _privateMethod = function (message) {
        console.log(message);
    };

    var publicMethod = function () {
        // Public stuff
    };

    var myObject = {
        myPlugin: function functionName(text) {
            _privateMethod(text);
        },

        anotherPlugin: function () {
            _privateMethod(text);
        }
    };

    return {
        publicMethod: publicMethod,
        plugin: myObject
    };
})();

// Example of passing data into a private method
//APP.modules.vendors.publicMethod('Hello!');