function loadSubmitEventHeader(){

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

function deleteSubmitEventHeader(){
    $("#event_panel_link").remove();
    $("#route_panel_link").remove();
    $("#alarm_panel_link").remove();
}