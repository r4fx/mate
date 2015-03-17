/* Main JavaScript with modules pattern
 */

var APP = window.APP || {}; // create namespace for our app
APP.modules = {}; // namespace for modules

// Globally initiated functions
$(document).ready(function () {
    APP.modules.vendors.plugin.myPlugin();
});