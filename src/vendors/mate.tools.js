var mateGlobals = {
    scrollValInit: 40,
    didScroll: '',
    eventType: 'click'
};

// ---------------------------------------------------------
// Page tools
// ---------------------------------------------------------
var mateTools = {

    /*
     Common js trigger, do something with target
     "data-js-trigger" is a namespace for synchronized actions,
     in "data-js-target" please precise class or id of target,
     "data-js-target" can get additional attribute called "parent"
     example use: <span class="sub-nav__close" data-js-trigger="nav-main" data-js-target="#main-nav, parent">
     */
    pullTheTrigger: function (el) {
        var $triggerEl = $('[data-js-trigger]');

        if (el) {
            $triggerEl = $(el);
        }

        $triggerEl.on(mateGlobals.eventType, function (e) {
            if (!this.getAttribute("data-js-target")) {
                console.warn('pullTheTrigger: Na klikniętym elemencie brakuje atrybutu "data-js-target"');
                return false
            }

            var triggerNode = this;
            var triggerData = triggerNode.getAttribute("data-js-trigger");
            var triggerTarget = triggerNode.getAttribute("data-js-target");
            var triggerTargetArr = triggerNode.getAttribute("data-js-target").split(/[\s,]+/);
            var triggerTargetEl = triggerTargetArr[0] || triggerTarget;
            var triggerTargetType = triggerTargetArr[1];

            // check if namespace for trigger is defined
            if (triggerData) {
                var triggerDataArr = document.querySelectorAll('[data-js-trigger=' + triggerData + ']');
                for (var i = 0; i < triggerDataArr.length; i++) {
                    triggerDataArr[i].classList.toggle('active');
                }
            }

            // check if triggerTarget is for "self" only (use second attribute called "self")
            if (triggerTargetType == 'self') {
                var eTargetArray = e.target.getAttribute("data-js-target");
                if ((eTargetArray) && (eTargetArray.split(/[\s,]+/)[1] === "parent")){
                    return false
                }

                $(triggerNode).toggleClass('active');
            }

            // check if triggerTarget is for "parent" only (use second attribute called "parent")
            if (triggerTargetType == 'parent') {
                $(triggerNode).closest(triggerTargetEl).toggleClass('active');
                //trigger.closest(triggerTarget).classList.toggle('active'); // Future js
            }

            if (!triggerTargetType) {
                document.querySelector(triggerTargetEl).classList.toggle('active');
            }

            mateTools.hider(triggerTargetEl, triggerNode);
        });
    },

    // Example: <h4 data-js-toggle=".job-filters">Filters</h4>
    toggler: function () {
        var $toggleEl = $('[data-js-toggle]');

        $toggleEl.on(mateGlobals.eventType, function (e) {
            var triggerNode = this;
            var triggerTarget = triggerNode.getAttribute("data-js-toggle");

            if (triggerTarget) {
                var triggerDataArr = document.querySelectorAll('[data-js-toggle="' + triggerTarget + '"]');
                var triggerTargetArr = document.querySelectorAll(triggerTarget);

                for (var i = 0; i < triggerDataArr.length; i++) {
                    triggerDataArr[i].classList.toggle('active');
                }

                for (var y = 0; y < triggerTargetArr.length; y++) {
                    triggerTargetArr[y].classList.toggle('active');
                }
            }
        });
    },

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
    agent: function () {

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
    },

    init: function () {
        this.pullTheTrigger();
        this.toggler();
    }
};

// ---------------------------------------------------------
// WHEN DOCUMENT READY
// ---------------------------------------------------------
document.addEventListener('DOMContentLoaded', function () {
    mateTools.agent();
    mateTools.init();
}, false);