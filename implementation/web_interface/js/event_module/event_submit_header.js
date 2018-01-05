/**
 * @module event_module/event_submit_header
 * @description handles the creation of header buttons for submit form
 */

/**
 * creates the buttons to append on the header
 */
function loadSubmitEventHeader(){

    /**
     * @external ".appendTo()"
     * @see {@link http://api.jquery.com/appendTo/}
     */

    // create buttons
    $('<a>', {
        class : "mdl-navigation__link mdl-layout--large-screen-only mdl-typography--font-bold",
        text : "Event Property",
        id : "event_panel_link",
        href: '#event-panel'
    }).appendTo("#header_navigation");

    $('<a>', {
        class : "mdl-navigation__link mdl-layout--large-screen-only mdl-typography--font-bold",
        text : "Map Coordinates",
        id : "route_panel_link",
        href: '#route-panel'
    }).appendTo("#header_navigation");

    $('<a>', {
        class : "mdl-navigation__link mdl-layout--large-screen-only mdl-typography--font-bold",
        text : "Alarm Settings",
        id : "alarm_panel_link",
        href: '#alarm-panel'
    }).appendTo("#header_navigation");

    componentHandler.upgradeDom();

}

/**
 * removes the submit buttons from the header.
 */
function deleteSubmitEventHeader(){
    $("#event_panel_link").remove();
    $("#route_panel_link").remove();
    $("#alarm_panel_link").remove();
}