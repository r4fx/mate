/* Main JavaScript for simple project
*/

var events = {
    eventType: 'click',

    init: function () {
        this.events();
    },

    events: function () {
        $('#click-btn').unbind(events.eventType); // Don't ever keep listening for clicks !

        // more code...
    }
};

var navigation = {

    init: function () {
        this.navi();
    },

    navi: function () {
        // more code...
    }
};

$(document).ready(function () {
    events.init();
    navigation.init();
});