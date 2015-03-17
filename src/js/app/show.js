// another module which uses "mod"
APP.modules.show = (function () {

    // declaration of dependecies
    var mod = APP.modules.mod;

    function useModule() {
        mod.showModule(); // use module from mod.js
    }

    // Example of use: <input type="button" onclick="APP.modules.show.useModule()" value="Click!">

    return {
        useModule: useModule
    };
}());