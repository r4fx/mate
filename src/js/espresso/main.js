require.config({
    //baseUrl: 'js/lib',
    paths: {
        'jquery': '../vendor/jquery-2.1.0.min',
        'helpers': '../mate/mate.helpers',
        'tooltip': '../plugins/tooltipp/jquery.tooltipp',
        'cookiebox': '../plugins/cookiebox/jquery.cookiebox'
    },
    shim: {
        'jquery': {
            exports: '$' // if someone use 'jQuery' name, use global '$' variable as module value
        },
        'cookiebox': {
            // These script dependencies should be loaded before loading jquery.cookiebox.min
            deps: ['jquery'],
            // Once loaded, use the global 'cookiebox' as the module value.
            exports: 'cookiebox'
         }
     }
});

// Events collection
require(['jquery'], function ($) {

    // Tooltip on demands
    // todo: odpalic tu plugin
    $('.js-show-tooltip').on('click', function(){
        var selector = $(this);
        require(['tooltip'], function (tooltip) {
            tooltip.mateTooltip(selector);
        });
    });

});


// Plugin: Cookie box
require(['jquery', 'cookiebox'], function ($) {
    $.cookieBox({
        textParagraph_1: '<p>Ta witryna używa plików cookie m. in. w celach reklamowych i statystycznych oraz w celu dostosowania serwisu do indywidualnych potrzeb użytkowników. Korzystanie z naszego serwisu internetowego bez zmiany ustawień dotyczących cookie oznacza, że będą one zapisywane w pamięci urządzenia.</p>'
    });
});