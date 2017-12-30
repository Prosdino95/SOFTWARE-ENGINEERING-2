
// jQuery script to load the html pages on index.html
$(function (){

    // Default load the welcome page
    $(document).ready(function () {

        refresh();
        $("#stage").load("./html/welcome.html");
        $("#TITLE").text("Home");

    });

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

// remove dinamic html created
function refresh(){
    deleteCalendarButtons();
    deleteSubmitEventHeader();
    deleteProfileHeader();
    deletePreferenceHeader();
    deleteMapHeader();
    deleteShowPathHeader();

    // scroll to top page
    $('document').scrollTop(0);
}