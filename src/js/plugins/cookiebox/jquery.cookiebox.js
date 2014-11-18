// Cookie Box, a simple Cookies Law information
// version: 1.1
// release day: 16.03.2014
// kast update: 23.03.2014
// Author: Rafał Brzeski, https://github.com/raf-x

;(function ($) {

    $.cookieBox = function (options) {

        // plugin's default options, this is private property and is accessible only from inside the plugin
        var defaults = {
            privacyPolicy:      true,
            cookieBox:          '#cookieBox',
            cookiesPageURL:     '/polityka-plikow-cookies/',
            textParagraph_1:    '<p>Ta witryna używa <a class="cookieBoxUrl">plików cookie</a> m. in. w celach reklamowych i statystycznych oraz w celu dostosowania serwisu do indywidualnych potrzeb użytkowników. Korzystanie z naszego serwisu internetowego bez zmiany ustawień dotyczących cookie oznacza, że będą one zapisywane w pamięci urządzenia.</p>',
            textParagraph_2:    '<p>Jeżeli wyrażasz zgodę na zapisywanie informacji zawartej w cookies zamknij ten komunikat. Jeżeli nie wyrażasz zgody - zmień ustawienia swojej przeglądarki.</p>',
            delay:              0,
            animation:          true,
            position:           'bottom'
        };

        var plugin = this;

        // this will hold the merged default, and user-provided options
        plugin.settings = {};

        // the "constructor" method that gets called when the object is created
        // this is a private method, it can be called only from inside the plugin
        var init = function () {

            // the plugin's final properties are the merged default and user-provided options (if any)
            plugin.settings = $.extend({}, defaults, options);

            /*
            *  code goes here
            */

            // Get item from session
            var cookieInTheBox = localStorage.getItem('cookieIsInTheBox');

            // Generate cookie box if all conditions is met
            if (plugin.settings.privacyPolicy && !(cookieInTheBox)) {

                var cookieBoxHashFree = plugin.settings.cookieBox.replace("#", "");
                var transitionClass   = '';
                var cookieBoxElements = {
                    wrapper:    '<div id="' + cookieBoxHashFree + '" class="' + cookieBoxHashFree + ' ' + cookieBoxHashFree +'-'+ plugin.settings.position +'"></div>',
                    body:       '<div> ' + plugin.settings.textParagraph_1 + plugin.settings.textParagraph_2 + ' </div > ',
                    closebtn:   '<span class="closeBox"></span>'
                };

                // Generate box wrapper with proper position
                if (plugin.settings.position === 'top') {
                    $('body').prepend(cookieBoxElements.wrapper);
                }
                else {
                    $('body').append(cookieBoxElements.wrapper);
                }

                // if box is ready than generate box content
                if (plugin.settings.cookieBox.length = 1) {
                    // Generate box body
                    $(plugin.settings.cookieBox).append(cookieBoxElements.body);

                    // Set links
                    $(plugin.settings.cookieBox).find('.cookieBoxUrl').attr("href", plugin.settings.cookiesPageURL);

                    // Generate close btn
                    $(plugin.settings.cookieBox).append(cookieBoxElements.closebtn);
                    var $closeBtn = $(plugin.settings.cookieBox).find('.closeBox');

                    // Hide cookie box
                    $closeBtn.on('click', function () {
                        localStorage.setItem('cookieIsInTheBox', 'true'); // Set local storage
                        $(plugin.settings.cookieBox).removeClass('act');
                    });

                    // Show box
                    showCookieBox();
                }

                // Show cookie box (with delay if option is set)
                function showCookieBox() {
                    var delay = plugin.settings.delay;

                    // Activate box
                    var activateBox = function() {
                        if (plugin.settings.animation) {
                            transitionClass = ' trans';
                        }
                        $(plugin.settings.cookieBox).addClass('act' + transitionClass);
                    };

                    if (delay > 0) {
                        setTimeout(function () {
                            activateBox();
                        }, delay);
                    }
                    else {
                        activateBox();
                    }
                }
            }
        };

        init();

    };
})(jQuery);