
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

        $("#stage").load("./html/calendar.html");
        $("#stage").trigger("calendar_load");
        $("#TITLE").text("Calendar");

    });

    // load preference page
    $("#preferences").click(function(event){
        event.preventDefault();
        refresh();

        $("#stage").load("./html/preferences.html");
        $("#TITLE").text("Preferences");
    });

    // load profile page
    $("#profile").click(function(event){
        event.preventDefault();
        refresh();

        $("#stage").load("./html/profile.html");
        $("#TITLE").text("Profile");

    });
});

function refresh(){
    deleteCalendarButtons();
    deleteSubmitEventHeader();
    deleteProfileHeader();
    deletePreferenceHeader();
}