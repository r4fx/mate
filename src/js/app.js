/* Main JavaScript with modules pattern
 */

var APP = window.APP || {}; // create namespace for our app
APP.modules = {}; // namespace for modules

// Globally initiated functions
document.addEventListener('DOMContentLoaded', function () {
    APP.modules.vendors.plugin.myPlugin();
}, false);