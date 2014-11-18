/*
 * mate helpers
 */

define('helpers', function () {

    var helper = {};

    // Universal hider for elements
    helper.hider = {
        run: function mateHider() {

            $(document).on('mouseup', function (e) {
                var tooltip = $('[data-tooltip-temp = "true"]');

                // if the target of the click isn't the container...
                // && nor a descendant of the container
                if (!tooltip.is(e.target) && tooltip.has(e.target).length === 0) {

                    // Relocate tooltip and clean temp objects
                    tooltip.fadeOut('fast', function () {
                        $(this)
                            .insertAfter('.tooltip-temp')
                            .removeAttr("data-tooltip-temp");
                        $('.tooltip-temp').remove();
                    });
                }

                console.log('exit');
            });
        }
    };

    // More helpers...
    helper.test = {
        run1: function () {
            console.log("test2 - method 1");
        },

        run2: function () {
            console.log("test2 - method 2");
        }
    };

    return helper;
});