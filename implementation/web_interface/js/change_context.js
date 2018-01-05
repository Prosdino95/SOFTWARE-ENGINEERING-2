/**
 * @module change_context
 * @description jQuery script to load the html pages on travlendar.html
 * @listens click event
 * @fires calendar_load
 * @fires map_load
 * @fires preference_load
 * @fires profile_load
 */

$(function (){

    /**
     * @external ".ready()"
     * @see {@link http://api.jquery.com/ready/}
     */

    // Default load the welcome page
    $(document).ready(function () {

        refresh();
        $("#stage").load("./html/welcome.html");
        $("#TITLE").text("Home");

    });

    /**
     * @external ".click()"
     * @see {@link http://api.jquery.com/click/}
     */

    /**
     * @external ".load()"
     * @see {@link http://api.jquery.com/load/}
     */

    /**
     * @external ".trigger()"
     * @see {@link http://api.jquery.com/trigger/}
     */

    // load Welcome page
    $("#welcome").click(function(event){
        event.preventDefault();
        refresh();

        $("#stage").load("./html/welcome.html");
        $("#TITLE").text("Home");
    });

    // load calendar page
    $("#calendar").click(function(event){
        event.preventDefault();
        refresh();

        $("#stage").trigger("calendar_load");
    });

    $("#maps").click(function(event){
        event.preventDefault();
        refresh();

        $("#stage").trigger("map_load");
    });

    // load preference page
    $("#preferences").click(function(event){
        event.preventDefault();
        refresh();

        $("#stage").trigger("preference_load");
    });

    // load profile page
    $("#profile").click(function(event){
        event.preventDefault();
        refresh();

        $("#stage").trigger("profile_load");
    });
});

/**
 * remove dinamic html created and refresh the page
 */

// remove dinamic html created
function refresh(){
    deleteCalendarButtons();
    deleteSubmitEventHeader();
    deleteProfileHeader();
    deletePreferenceHeader();
    deleteMapHeader();
    deleteShowPathHeader();

    // delete geolocation of markers
   if(draggebleFeature){
       draggebleFeature.clear();
   }
   // refresh static map
    passEventRoute(null);

    // delete path
     $("#stage").trigger('unbind_path');

    // scroll to top page
    $('document').scrollTop(0);
}