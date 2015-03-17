APP.modules.vendors = (function () {

    var _privateMethod = function (message) {
        console.log(message);
    };

    var publicMethod = function () {
        // Public stuff
    };

    var myObject = {
        myPlugin: function functionName() {
            // plugin settings
        },

        anotherPlugin: function (text) {
            _privateMethod(text);

            // Example of passing data into a private method
            //APP.modules.vendors.plugin.anotherPlugin('Hello!');
        }
    };

    return {
        publicMethod: publicMethod,
        plugin: myObject
    };
})();