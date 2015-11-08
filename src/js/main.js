/* JavaScript for simple project
 */

var globals = {
    scrollValInit: 40,
    didScroll: '',
    eventType: 'click'
};

var helpers = {

    // Uniwersal hider
    // ============================================================
    hider: function (targetToHide, triggerNode, e) {
        var receivedTargetToHide = targetToHide;
        var _hiderFunc = function (e) {
            var targetToHide = function () {
                var slector = document.querySelectorAll(receivedTargetToHide);
                for (var i = 0; i < slector.length; i++) {
                    if (slector[i].classList.contains('active')) {
                        return slector[i];
                    }
                }
            }();

            if (targetToHide === undefined) {
                document.removeEventListener('mouseup', _hiderFunc, false);
                return false
            }

            // Hide element
            if (!(targetToHide === e.target)             // if the target of the click isn't the container...
                && !(targetToHide.contains(e.target))    // ... nor a descendant of the container
                && !(triggerNode === e.target)           // ... nor a trigger of the container
                && !(triggerNode.contains(e.target))     // ... nor a container contain trigger
            ) {
                targetToHide.classList.remove('active');
                triggerNode.classList.remove('active');
            }
        };

        document.addEventListener('mouseup', _hiderFunc, false);
    },

    // Debounce is needed for performance improvments for scroll & resize events
    // ============================================================
    debounce: function (func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    },

    // GET USER OS, BROWSER & SCREEN
    // ============================================================
    userEnvironment: function () {

        var userOS = '';
        var userBrowser = '';

        getDeviceSize = function () {
            var htmlTag = document.getElementsByTagName('html')[0];
            var deviceSize = window.getComputedStyle(
                document.querySelector('html'), ':after' // Magic!
            ).getPropertyValue('content').slice(1, -1);

            htmlTag.setAttribute('data-device-size', deviceSize);
            return deviceSize;
        };

        // Get user's mobile data
        var mobile = {

            isPhone: function () {

            },

            isTablet: function () {

            }
        };

        // Get user's system
        var system = function () {
            if (navigator.appVersion.indexOf("Win") != -1) userOS = "windows";
            if (navigator.appVersion.indexOf("Mac") != -1) userOS = "mac";
            if (navigator.userAgent.match(/Mobi/)) userOS = "mobile";

            document.documentElement.setAttribute('data-os', userOS);
            return userOS;
        };

        // Get user's browser
        var browser = function () {
            //console.log(navigator.appVersion);
            if (navigator.appVersion.indexOf("MSIE") != -1) userBrowser = "oldIE"; // IE =< 10

            document.documentElement.setAttribute('data-browser', userBrowser);
        };

        return {
            getDeviceSize: getDeviceSize(),
            isPhone: mobile.isPhone(),
            isTablet: mobile.isTablet(),
            system: system(),
            browser: browser()
        };
    }
};

// ---------------------------------------------------------
// Page events
// ---------------------------------------------------------
var pageEvents = {

    collection: function () {

        // Events only for mobile devices!
        if (helpers.userEnvironment.system === 'mobile') {
            console.log('pageTools.collection for mobile');
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
// Page tools
// ---------------------------------------------------------
var pageTools = {

    /*
     Common js trigger, do something with target
     "data-js-trigger" is a namespace for synchronized actions,
     in "data-js-target" please precise class or id of target,
     "data-js-target" can get additional attribute called "parent"
     example use: <span class="sub-nav__close" data-js-trigger="nav-main" data-js-target="#main-nav, parent">
     */
    pullTheTrigger: function () {
        $('[data-js-trigger]').on(globals.eventType, function () {
            var triggerNode = this;
            var triggerTarget = triggerNode.getAttribute("data-js-target");
            var triggerData = triggerNode.getAttribute("data-js-trigger");

            if (triggerTarget) {
                var triggerTargetArray = triggerTarget.split(/[\s,]+/); // comas and trim
            } else {
                console.warn('pullTheTrigger: clicked element missed attr "data-js-target"');
                return false
            }

            // check if namespace for trigger is defined
            if (triggerData) {
                var triggerDataArr = document.querySelectorAll('[data-js-trigger=' + triggerData + ']');
                for (var i = 0; i < triggerDataArr.length; i++) {
                    triggerDataArr[i].classList.toggle('active');
                }
            }

            // check if triggerTarget is for parent only (use second attribute "parent")
            if (triggerTargetArray.indexOf('parent') > -1) {
                triggerTarget = triggerTargetArray[0];
                $(triggerNode).closest(triggerTarget).toggleClass('active');
                //trigger.closest(triggerTarget).classList.toggle('active'); // Future js
            } else {
                document.querySelector(triggerTarget).classList.toggle('active');
            }

            helpers.hider(triggerTarget, triggerNode);
        });
    },

    somePublicMethod: function () {

    },

    init: function () {
        this.pullTheTrigger();
        this.somePublicMethod();
    }
};

// ---------------------------------------------------------
// SPECIFIC PLUGINS
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
// WHEN WINDOW SCROLL
// ---------------------------------------------------------
window.addEventListener('scroll', function () {
    helpers.debounce(function () {

        // Set of function initialized on page scroll:
        pageEvents.someEvent();

    }, 250)();
});

// ---------------------------------------------------------
// WHEN WINDOW RESIZE
// ---------------------------------------------------------
window.addEventListener('resize', function () {
    helpers.debounce(function () {

        // Set of function initialized on page scroll:
        helpers.userEnvironment();

    }, 250)();
});

// ---------------------------------------------------------
// WHEN DOCUMENT READY
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    helpers.userEnvironment();
    pageEvents.init();
    pageTools.init();
    vendors.init();
}, false);