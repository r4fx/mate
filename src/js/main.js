/* JavaScript for simple project
*/

// Page events
var events = {
    eventType: 'click',

    init: function () {
        this.firstEvent();
        this.secondEvent();
    },

    firstEvent: function () {
        $('#click-btn').unbind(events.eventType); // Don't ever keep listening for clicks !

        // more code...
    },

    secondEvent: function () {
        // event code
    }
};

// Example object
var Module = (function () {

    var _privateMethod = function () {
        // private stuff
    };

    var publicMethod = function () {
        _privateMethod();

        // other public stuff
    };

    return {
        publicMethod: publicMethod
    };

})();


$(document).ready(function () {
    events.init();
    Module.publicMethod();
});