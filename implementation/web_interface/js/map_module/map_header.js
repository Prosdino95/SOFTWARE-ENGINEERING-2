/**
 * @module map_module/map_header
 * @description creates the header map buttons
 */

/**
 * load the buttons
 */
function loadMapHeader(){

    /**
     * @external ".appendTo()"
     * @see {@link http://api.jquery.com/appendTo/}
     */

    // create buttons
    $('<a>', {
        class : "mdl-navigation__link mdl-typography--font-bold",
        text : "Month Events",
        id : "map_event_list_link"
    }).appendTo("#header_navigation");

    // attach event handler
    $('#map_event_list_link').click(function (event) {
        event.preventDefault();
        if ($('.mdl-layout__drawer-right').hasClass('active')) {
            $('.mdl-layout__drawer-right').removeClass('active');
        }
        else {
            $('.mdl-layout__drawer-right').addClass('active');
        }
    });

    $('.mdl-layout__obfuscator-right').click(function () {
        if ($('.mdl-layout__drawer-right').hasClass('active')) {
            $('.mdl-layout__drawer-right').removeClass('active');
        }
        else {
            $('.mdl-layout__drawer-right').addClass('active');
        }
    });
    componentHandler.upgradeDom();
}

/**
 * delete header buttons
 */
function deleteMapHeader(){
    $("#map_event_list_link").remove();
}