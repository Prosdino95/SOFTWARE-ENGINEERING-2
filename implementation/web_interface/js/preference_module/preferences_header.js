/**
 * @module preference_module/preferences_header
 * @description handles the loading and deleting of header preferences buttons.
 */

/**
 * creates the preferences buttons
 */
function loadPreferenceHeader(){

    // create buttons
    $('<a>', {
        class : "mdl-navigation__link mdl-layout--large-screen-only mdl-typography--font-bold",
        text : "Vehicle Preferences",
        id : "normal_preferences_link",
        href: '#normal_preferences'
    }).appendTo("#header_navigation");

    $('<a>', {
        class : "mdl-navigation__link mdl-layout--large-screen-only mdl-typography--font-bold",
        text : "Advanced Preferences",
        id : "advanced_preferences_link",
        href: '#advanced_preferences'
    }).appendTo("#header_navigation");

    componentHandler.upgradeDom();

}

/**
 * deletes the header buttons
 */

function deletePreferenceHeader(){
    $("#normal_preferences_link").remove();
    $("#advanced_preferences_link").remove();
}