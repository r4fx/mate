// create module in 'APP.modules' namespace
APP.modules.mod = (function () {

    function showModule() {
        alert('hello from module');
    }

    return {
        showModule: showModule
    };
}());