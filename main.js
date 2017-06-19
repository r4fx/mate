/* JavaScript main file
 */

// ---------------------------------------------------------
// PAGE EVENTS
// ---------------------------------------------------------
var pageEvents = {

    collection: function () {

        // Events only for mobile devices!
        if (mateTools.agent().system === 'mobile') {
            console.log('mateTools.collection for mobile');
        }

        // a lot of events goes here
    },

    someEvent: function () {
        // event code
    },

    init: function () {
        this.collection();
        this.someEvent();
    }
};


// ---------------------------------------------------------
// VENDORS
// ---------------------------------------------------------
var vendors = {

    // Slick
    slick: function () {
        //slick configuration goes here
    },

    init: function () {
        this.slick();
    }
};

// ---------------------------------------------------------
// ON WINDOW SCROLL
// ---------------------------------------------------------
window.addEventListener('scroll', function () {
    mateTools.debounce(function () {

        // Set of function initialized on page scroll:
        pageEvents.someEvent();

    }, 250)();
});

// ---------------------------------------------------------
// ON WINDOW RESIZE
// ---------------------------------------------------------
window.addEventListener('resize', function () {
    mateTools.debounce(function () {

        // Set of function initialized on page resize:
        mateTools.agent();

    }, 250)();
});

// ---------------------------------------------------------
// ON DOCUMENT READY
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    pageEvents.init();
    vendors.init();
}, false);