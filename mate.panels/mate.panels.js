// ---------------------------------------------------------
// MATE PANELS
// TABS & ACCORDION IN ONE
// ---------------------------------------------------------

var matePanels = function () {
    var panelsNavContainer = $('.mate-panels__nav');

    function handleTabNaviState(navItemHref) {
        panelsNavContainer.find('[href="' + navItemHref + '"]').parent().addClass('active').siblings().removeClass('active');
    }

    function handlePanelsState (hash) {
        $(hash).addClass('active').siblings().removeClass('active');
    }

    function checkPanelStateByHash(newHash) {
        var panelId = window.location.hash;

        // If URL contain hash to panel ID at page load
        if ($(panelId).length && !newHash) {
            handleTabNaviState(panelId);
            handlePanelsState(panelId);
        }

        // If location hash has changed
        if ($(newHash).length && newHash){
            handleTabNaviState(newHash);
            handlePanelsState(newHash)
        }
    }

    // Detect changes on location hash
    window.onpopstate = function () {
        checkPanelStateByHash(window.location.hash);
    };

    // Panels tabs nav
    panelsNavContainer.on('click', 'a', function (evt) {
        var hrefTarget = this.getAttribute('href');

        // Prevent page jump on hash change
        evt.preventDefault();
        window.location.hash = '_';
        history.pushState('', document.title, hrefTarget);

        checkPanelStateByHash(hrefTarget)
    });

    checkPanelStateByHash();
};


// ---------------------------------------------------------
// REINIT PANELS ON WINDOW RESIZE
// ---------------------------------------------------------
window.addEventListener('resize', function () {
    matePanels();
});


// ---------------------------------------------------------
// INIT PANELS ON DOCUMENT READY
// ---------------------------------------------------------
$(document).ready(function () {
    matePanels();
});