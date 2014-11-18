/*
* Dynamic Tooltip
*/

// todo: 1. convert to plugin
// todo: 2. show tooltip on hover or click
// TODO: 3. zmienić selectora na atrybuty "data", drugi atrybut na wielkość tooltipa


var flag = false;

function mateTooltip(selector) {

    var $selector = selector;
    //var $tooltipBody = $('.tooltip');
    var $tooltipTemp = $('<span class="tooltip-temp"/>');

    $selector.on('click', function (e) {

        // todo: sprawdzić .map!
//        $('ul#nav li a').map(function () {
//            return $(this).attr('title');
//        });  // now the collection is the link titles
//        // this could be the beginning of a tooltip plugin.

        //e.preventDefault();
        var $that = $selector;
        var offset = $that.offset();
        var $tooltip = $that.closest('.hasTooltip').find('.tooltip');
        var $tooltipWidth = $tooltip.outerWidth(true);
        var $tooltipHeight = $tooltip.outerHeight(true);

        // Default position (top)
        var posX = offset.left - ($tooltipWidth - 25);
        var posY = offset.top - ($tooltipHeight + 5);

        // Position left
        if ($tooltip.hasClass('position-left')) {
            posX = offset.left - ($tooltipWidth + 15);
            posY = offset.top - ($tooltipHeight / 2 - 9);
        }

        // Show tooltip and activate hider
        $tooltip.fadeIn('fast', function () {
            if (!flag) {
                // Run hider
                require(['helpers'], function (helper) {
                    var runHider = helper.hider.run();
                    flag = true;
                });
            }
        });

        $tooltipTemp.insertAfter($tooltip);
        $tooltip
            .attr('data-tooltip-temp', 'true')
            .appendTo('body')
            .css({'top': posY, 'left': posX});
    });
}