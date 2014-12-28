$(document).ready(function(){

    // Prism.js
    // Build Pre Tags
    $('pre').each(function (i, item) {
        var item = $(item);
        if (item.find('code').length == 0) {

            // get text
            var currentCode = item.html();
            item.empty();

            // get lang from data-lang attr
            var oldlang = item.prop('lang');
            var lang = '';

            switch (oldlang) {
                case 'html':
                    lang = 'markup';
                    break;
                case 'scss':
                    lang = 'scss';
                    break;
                case 'css':
                    lang = 'css';
                    break;
                case 'js':
                    lang = 'javascript';
                    break;
                default:
                    lang = 'markup';
            }

            $('<code>').addClass('language-' + lang).appendTo(item).html(currentCode);
        }
    });

    if ($.fn.Prism) {
        Prism.highlightAll();
    }
    //END: Prism.js
});