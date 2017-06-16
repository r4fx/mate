/* JavaScript for simple project
 */

// Page events
var events = {
    eventType: 'click',

    init: function () {
        this.misc();
        this.getIconContent();
    },

    misc: function () {
        $('#click-btn').unbind(events.eventType); // Don't ever keep listening for clicks !

        $('.aside-toggle').on(events.eventType, function(){
            $('body').toggleClass('sidebar-on');
        });
    },

    getIconContent: function () {
        $('.code-example__icons').on('click', '.example__icons-item', function () {
            var iconTag = this.getElementsByTagName('span')[0];
            var iconContent = window.getComputedStyle(iconTag, '::before').getPropertyValue("content");
            var char = '\\' + iconContent.charCodeAt(1).toString(16);

            if ($(this).find('i').length == 0){
                $(this).append('<div class="content-value"><i>'+ char +'</i><p>click to copy</p></div>');
                this.setAttribute('data-content', char);
            } else {
                copyToClipboard(char);
                $(this).removeAttr('data-content');
                $(this).find('.content-value').remove();
            }
        });

        function copyToClipboard(char) {
            var aux = document.createElement("input"); // Create an auxiliary hidden input
            aux.setAttribute("value", char); // Get the text from the element passed into the input
            document.body.appendChild(aux); // Append the aux input to the body
            aux.select(); // Highlight the content
            document.execCommand("copy"); // Execute the copy command
            document.body.removeChild(aux); // Remove the input from the body
        }
    }
};


// AUTO GENERATE CODE MARKUP
var codeMarkup = (function(){

    // Prism.js
    var buildPrism = function () {

        // Build Pre Tags
        $('pre').each(function (i, item) {
            var that = $(item);
            if (that.find('code').length == 0) {

                // get text
                var currentCode = that.html();
                that.empty();

                // get lang from data-lang attr
                var oldlang = that.prop('lang');
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

                $('<code>').addClass('language-' + lang).appendTo(that).html(currentCode);
            }
        });

        // Execute prism
        if ($.fn.Prism) {
            Prism.highlightAll();
        }
    };

    var buildMarkup = function(){
        var $codeWrapper = $('.code-example');

        $codeWrapper.each(function (i, item) {
            var that = $(item);
            var $codeToClone = that.find('[data-clone]');
            var $containerForClone = that.find('[lang]');

            if ($codeToClone.length > 0) {
                //console.log(i, $codeToClone);

                var $cloned = $codeToClone.clone();

                // Get the code from the clone and split it by new lines.
                // Then filter the array to remove blank lines.
                var code = $cloned.html().split("\n").filter(function (n) {
                    return (n.replace(/\s+$/, '') != '');
                });

                // Determine the number of spaces on the left of the first line
                var spacesOnLeft = code[0].match(/^ */)[0].length;

                // loop through each line, removing unnecessary indentation spaces.
                // Append the line to the output area
                for (var el = 0, len = code.length; el < len; el++) {

                    var $output = $containerForClone;
                    var existingText = $output.text();
                    var newText = code[el].substring(spacesOnLeft);

                    $output.text(existingText + newText + '\n');
                }
            }
        });

        // Prettify code markup by Prism.js
        buildPrism();
    };

    return {
        init: buildMarkup
    };

})();


$(document).ready(function () {
    codeMarkup.init();
    events.init();
});